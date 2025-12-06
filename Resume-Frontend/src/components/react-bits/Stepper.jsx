import React, { useState, Children, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stepper({
  children,
  initialStep = 1,
  currentStep: controlledCurrentStep,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [internalStep, setInternalStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  
  // Use controlled step if provided, otherwise use internal state
  const currentStep = controlledCurrentStep !== undefined ? controlledCurrentStep : internalStep;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    if (controlledCurrentStep === undefined) {
      setInternalStep(newStep);
    }
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  // Update direction when step changes externally
  const prevStepRef = useRef(initialStep);
  useEffect(() => {
    if (controlledCurrentStep !== undefined) {
      const prevStep = prevStepRef.current;
      if (controlledCurrentStep > prevStep) {
        setDirection(1);
      } else if (controlledCurrentStep < prevStep) {
        setDirection(-1);
      }
      prevStepRef.current = controlledCurrentStep;
      setInternalStep(controlledCurrentStep);
    }
  }, [controlledCurrentStep, initialStep]);

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div
      className="w-full h-full"
      {...rest}
    >
      <div
        className={`mx-auto w-full ${stepCircleContainerClassName}`}
        style={stepCircleContainerClassName.includes('border-0') ? {} : { border: '1px solid #222' }}
      >
        <div className={`${stepContainerClassName} p-4 sm:p-6`}>
          <div className="flex w-full items-center">
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;

              return (
                <React.Fragment key={stepNumber}>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    {renderStepIndicator ? (
                      renderStepIndicator({
                        step: stepNumber,
                        currentStep,
                        onStepClick: clicked => {
                          setDirection(clicked > currentStep ? 1 : -1);
                          updateStep(clicked);
                        }
                      })
                    ) : (
                      <StepIndicator
                        step={stepNumber}
                        disableStepIndicators={disableStepIndicators}
                        currentStep={currentStep}
                        onClickStep={clicked => {
                          setDirection(clicked > currentStep ? 1 : -1);
                          updateStep(clicked);
                        }}
                      />
                    )}
                  </div>
                  {isNotLastStep && (
                    <div className="flex-1 flex items-center px-2">
                      <StepConnector isComplete={currentStep > stepNumber} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {!isCompleted && (
          <div 
            className={contentClassName} 
            style={{ 
              width: '100%', 
              minHeight: '500px'
            }}
          >
            {stepsArray[currentStep - 1] ? (
              <div key={`step-${currentStep}`} style={{ width: '100%', opacity: 1 }}>
                {stepsArray[currentStep - 1]}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-gray-500">Step content not available</p>
              </div>
            )}
          </div>
        )}
        {!isCompleted && (
          <div className={`px-4 sm:px-8 pb-8 ${footerClassName}`}>
            <div className={`mt-6 sm:mt-10 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={(e) => {
                    if (backButtonProps.onClick) {
                      backButtonProps.onClick(e);
                    } else {
                      handleBack();
                    }
                  }}
                  className={`duration-350 flex items-center justify-center rounded-full bg-gray-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-gray-600 active:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${backButtonProps.className || ''}`}
                  {...(Object.fromEntries(Object.entries(backButtonProps).filter(([key]) => key !== 'onClick' && key !== 'className')))}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={(e) => {
                  if (nextButtonProps.onClick) {
                    nextButtonProps.onClick(e);
                  } else {
                    isLastStep ? handleComplete() : handleNext();
                  }
                }}
                className={`duration-350 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed ${nextButtonProps.className || ''}`}
                disabled={nextButtonProps.disabled}
                {...(Object.fromEntries(Object.entries(nextButtonProps).filter(([key]) => key !== 'onClick' && key !== 'className' && key !== 'disabled' && key !== 'children')))}
              >
                {nextButtonProps.children !== undefined ? nextButtonProps.children : (isLastStep ? 'Complete' : nextButtonText)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  // Always render content immediately without any delays
  if (isCompleted) {
    return null;
  }
  
  // Render content directly - React will handle the update when currentStep changes
  return (
    <div 
      className={className} 
      style={{ 
        width: '100%',
        minHeight: '400px'
      }}
    >
      {children}
    </div>
  );
}

export function Step({ children }) {
  return <div className="w-full">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-4 w-4 text-black" />
        ) : status === 'active' ? (
          <div className="h-3 w-3 rounded-full bg-[#060010]" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#2563eb' } // blue-600 to match active step
  };

  return (
    <div className="relative h-0.5 w-full overflow-hidden rounded bg-neutral-300">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

