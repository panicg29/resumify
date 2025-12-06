# Quick Reference: Update Resume with AI

## Endpoint
```
PUT /api/ai/update-resume/:id
```

## Request
```javascript
fetch(`http://localhost:5000/api/ai/update-resume/${resumeId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Your update instruction here' })
})
```

## Response
```javascript
{
  success: true,
  data: {
    resume: { /* updated resume object */ },
    aiUpdate: {
      fieldsUpdated: ["summary", "experience"]
    }
  }
}
```

## React Hook (Copy-Paste Ready)
```javascript
const updateResume = async (resumeId, prompt) => {
  const res = await fetch(
    `http://localhost:5000/api/ai/update-resume/${resumeId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    }
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data.resume;
};
```

## Prompt Examples
- `"Add React to skills list"`
- `"Update summary to highlight leadership"`
- `"Add new experience: Developer at Google 2022-2024"`
- `"Remove oldest education entry"`

See `FRONTEND_UPDATE_RESUME_AI.md` for full documentation.

