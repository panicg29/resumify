import React, { useRef, useEffect } from 'react';

/**
 * EditableText - A contentEditable component that properly handles cursor position
 * by being fully uncontrolled while the user is typing.
 */
function EditableTextComponent({
  value = '',
  placeholder = '',
  editable = false,
  onChange,
  className = '',
  multiline = false,
  style = {},
}) {
  const elementRef = useRef(null);
  const isFocusedRef = useRef(false);
  const isInternalChangeRef = useRef(false);
  const lastPropValueRef = useRef(value);
  const hasInitializedRef = useRef(false);

  // Set the ref - CRITICAL: Never reset content if element already exists
  // Use useCallback with stable dependencies to prevent recreation
  const setRef = React.useCallback((node) => {
    if (node) {
      const wasAlreadySet = elementRef.current === node;
      elementRef.current = node;
      
      // Only initialize content on first mount, never reset it
      if (editable && !hasInitializedRef.current) {
        const initialValue = value || '';
        node.textContent = initialValue;
        lastPropValueRef.current = initialValue;
        hasInitializedRef.current = true;
      } else if (editable && !wasAlreadySet && hasInitializedRef.current) {
        // If React gave us a new node (shouldn't happen), preserve our state
        node.textContent = lastPropValueRef.current;
      }
    }
  }, [editable]); // Only depend on editable, not value

  // Effect to sync prop changes to DOM - but NEVER when focused or during user input
  useEffect(() => {
    if (!elementRef.current || !editable || !hasInitializedRef.current) return;
    
    // If this change came from our own internal update, ignore it completely
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      lastPropValueRef.current = value || ''; // Still update our tracking
      return;
    }

    // CRITICAL: If user is focused, DO NOT TOUCH THE DOM AT ALL
    if (isFocusedRef.current) {
      // Still update our tracking ref, but don't touch DOM
      lastPropValueRef.current = value || '';
      return;
    }

    // Only update if prop value actually changed and differs from DOM
    const propValue = value || '';
    if (propValue !== lastPropValueRef.current) {
      const currentText = elementRef.current.textContent || '';
      if (propValue !== currentText) {
        // Save selection before updating (if any)
        const selection = window.getSelection();
        let savedOffset = null;
        
        if (selection.rangeCount > 0 && elementRef.current.contains(selection.anchorNode)) {
          try {
            const range = selection.getRangeAt(0);
            const preRange = range.cloneRange();
            preRange.selectNodeContents(elementRef.current);
            preRange.setEnd(range.endContainer, range.endOffset);
            savedOffset = preRange.toString().length;
          } catch (e) {
            // Ignore
          }
        }
        
        // Update content
        elementRef.current.textContent = propValue;
        lastPropValueRef.current = propValue;
        
        // Restore cursor if we saved it
        if (savedOffset !== null && savedOffset <= propValue.length && elementRef.current.firstChild) {
          try {
            const range = document.createRange();
            const textNode = elementRef.current.firstChild;
            if (textNode.nodeType === Node.TEXT_NODE) {
              const offset = Math.min(savedOffset, textNode.textContent.length);
              range.setStart(textNode, offset);
              range.setEnd(textNode, offset);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          } catch (e) {
            // Ignore cursor restoration errors
          }
        }
      } else {
        lastPropValueRef.current = propValue;
      }
    }
  }, [value, editable]);

  // Handle input events from user
  const handleInput = (e) => {
    if (!elementRef.current || !onChange) return;

    // Get the actual DOM content BEFORE any potential React interference
    const newValue = elementRef.current.textContent || '';
    
    // Mark that this is an internal change BEFORE calling onChange
    // This ensures our effect will ignore the upcoming prop update
    isInternalChangeRef.current = true;
    lastPropValueRef.current = newValue;

    // Save current selection/cursor position
    const selection = window.getSelection();
    let savedOffset = null;
    
    if (selection.rangeCount > 0) {
      try {
        const range = selection.getRangeAt(0);
        if (elementRef.current.contains(range.commonAncestorContainer)) {
          const preRange = range.cloneRange();
          preRange.selectNodeContents(elementRef.current);
          preRange.setEnd(range.endContainer, range.endOffset);
          savedOffset = preRange.toString().length;
        }
      } catch (e) {
        // Ignore
      }
    }

    // Notify parent - this will trigger a re-render
    onChange(newValue);

    // Restore cursor position after React's update cycle
    // Use double RAF to ensure React has fully finished rendering
    if (savedOffset !== null) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (elementRef.current) {
            const currentText = elementRef.current.textContent || '';
            
            // Verify the text hasn't been unexpectedly modified
            // If it has, the user's input was likely overwritten - don't restore cursor
            if (currentText !== newValue) {
              // Text was modified, restore user's version
              elementRef.current.textContent = newValue;
            }
            
            // Restore cursor position
            if (savedOffset <= currentText.length) {
              try {
                const selection = window.getSelection();
                const range = document.createRange();
                
                // Find text node and set cursor position
                let charCount = 0;
                const walker = document.createTreeWalker(
                  elementRef.current,
                  NodeFilter.SHOW_TEXT,
                  null
                );
                
                let node;
                while ((node = walker.nextNode())) {
                  const nodeLength = node.textContent.length;
                  if (charCount + nodeLength >= savedOffset) {
                    const offset = Math.min(savedOffset - charCount, nodeLength);
                    range.setStart(node, offset);
                    range.setEnd(node, offset);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    break;
                  }
                  charCount += nodeLength;
                }
              } catch (e) {
                // Ignore cursor restoration errors
              }
            }
          }
          // Reset flag after cursor is restored
          isInternalChangeRef.current = false;
        });
      });
    } else {
      // No cursor to restore, reset flag after a delay
      setTimeout(() => {
        isInternalChangeRef.current = false;
      }, 0);
    }
  };

  // Track focus state
  const handleFocus = () => {
    isFocusedRef.current = true;
    isInternalChangeRef.current = false;
  };

  // Handle blur - sync with prop if needed
  const handleBlur = () => {
    isFocusedRef.current = false;
    isInternalChangeRef.current = false;

    // After blur, sync with prop value in case parent made changes
    if (elementRef.current) {
      const propValue = value || '';
      const currentText = elementRef.current.textContent || '';
      
      // Only update if prop differs and we didn't just update it
      if (propValue !== currentText && propValue !== lastPropValueRef.current) {
        elementRef.current.textContent = propValue;
        lastPropValueRef.current = propValue;
      }
    }
  };

  // Handle composition events (for IME input like Chinese, Japanese, etc.)
  const handleCompositionStart = () => {
    isFocusedRef.current = true;
  };

  const handleCompositionEnd = () => {
    // Composition end will be followed by an input event, so we keep focus state
  };

  if (!editable) {
    if (multiline) {
      return (
        <div className={className} style={style}>
          {value && value.length > 0 ? (
            value.split('\n').map((line, i) => <div key={i} style={style}>{line}</div>)
          ) : (
            <span className="opacity-60" style={style}>{placeholder}</span>
          )}
        </div>
      );
    }
    return (
      <span className={className} style={style}>
        {value && value.length > 0 ? (
          value
        ) : (
          <span className="opacity-60" style={style}>{placeholder}</span>
        )}
      </span>
    );
  }

  const Tag = multiline ? 'div' : 'span';
  
  return (
    <Tag
      ref={setRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className={`${className} outline-none ring-0 focus:ring-2 focus:ring-blue-300 rounded-sm`}
      style={{ 
        whiteSpace: multiline ? 'pre-wrap' : 'normal',
        // Ensure LTR text direction to prevent reversal
        direction: 'ltr',
        unicodeBidi: 'embed',
        ...style
      }}
    />
  );
}

export default EditableTextComponent;
