import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CodeBlock } from '../components/ai/code-block';

const meta = {
  title: 'AI Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CodeBlock component for displaying syntax-highlighted code with copy functionality for AI-generated code. Supports multiple languages, themes, line numbers, and line highlighting.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: 'text',
      description: 'The code content to display',
    },
    language: {
      control: 'text',
      description: 'Programming language for syntax highlighting',
    },
    filename: {
      control: 'text',
      description: 'Optional filename to display',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Whether to show line numbers',
    },
    highlightLines: {
      control: 'object',
      description: 'Lines to highlight (1-indexed array)',
    },
    showCopyButton: {
      control: 'boolean',
      description: 'Whether to show the copy button',
    },
    showLanguage: {
      control: 'boolean',
      description: 'Whether to show the language label',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height before scrolling',
    },
    lightTheme: {
      control: 'text',
      description: 'Custom theme for light mode',
    },
    darkTheme: {
      control: 'text',
      description: 'Custom theme for dark mode',
    },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic code block with JavaScript syntax highlighting.
 */
export const JavaScript: Story = {
  args: {
    code: `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome, \${name}!\`;
}

const message = greet('World');
console.log(message);`,
    language: 'javascript',
    showCopyButton: true,
    showLanguage: true,
  },
};

/**
 * TypeScript code with filename display.
 */
export const TypeScript: Story = {
  args: {
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

// Usage
const user = await fetchUser(1);
console.log(user.name);`,
    language: 'typescript',
    filename: 'user-api.ts',
    showCopyButton: true,
  },
};

/**
 * Python code with line numbers.
 */
export const PythonWithLineNumbers: Story = {
  args: {
    code: `def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    fib_sequence = []
    a, b = 0, 1
    
    for _ in range(n):
        fib_sequence.append(a)
        a, b = b, a + b
    
    return fib_sequence

# Generate first 10 Fibonacci numbers
result = fibonacci(10)
print(result)`,
    language: 'python',
    filename: 'fibonacci.py',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

/**
 * React component with highlighted lines.
 */
export const ReactWithHighlighting: Story = {
  args: {
    code: `import React, { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div className="counter">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}`,
    language: 'tsx',
    filename: 'Counter.tsx',
    showLineNumbers: true,
    highlightLines: [6, 7, 8],
    showCopyButton: true,
  },
};

/**
 * JSON configuration example.
 */
export const JSON: Story = {
  args: {
    code: `{
  "name": "@algtools/ui",
  "version": "0.2.0",
  "description": "Algtools UI component library",
  "main": "dist/index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}`,
    language: 'json',
    filename: 'package.json',
    showCopyButton: true,
  },
};

/**
 * CSS/SCSS styling example.
 */
export const CSS: Story = {
  args: {
    code: `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}`,
    language: 'css',
    filename: 'button.css',
    showCopyButton: true,
  },
};

/**
 * SQL query example with line numbers.
 */
export const SQL: Story = {
  args: {
    code: `-- Get users with their order counts
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
  AND u.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY u.id, u.name, u.email
HAVING order_count > 0
ORDER BY total_spent DESC
LIMIT 10;`,
    language: 'sql',
    filename: 'user-orders.sql',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

/**
 * Shell/Bash script example.
 */
export const Bash: Story = {
  args: {
    code: `#!/bin/bash

# Deploy script
echo "Starting deployment..."

# Build the project
npm run build

# Run tests
npm test

# Deploy to production
if [ $? -eq 0 ]; then
  echo "Tests passed. Deploying..."
  npm run deploy:prod
  echo "Deployment complete!"
else
  echo "Tests failed. Aborting deployment."
  exit 1
fi`,
    language: 'bash',
    filename: 'deploy.sh',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

/**
 * Markdown example.
 */
export const Markdown: Story = {
  args: {
    code: `# Getting Started

Welcome to the **CodeBlock** component documentation.

## Features

- ✨ Syntax highlighting for 100+ languages
- 📋 Copy to clipboard functionality
- 🎨 Light and dark theme support
- 🔢 Optional line numbers
- ✅ Line highlighting
- ♿ Fully accessible

## Installation

\`\`\`bash
npm install @algtools/ui
\`\`\`

## Usage

\`\`\`tsx
import { CodeBlock } from '@algtools/ui';

<CodeBlock code="console.log('Hello');" language="javascript" />
\`\`\``,
    language: 'markdown',
    filename: 'README.md',
    showCopyButton: true,
  },
};

/**
 * Go example with highlighted error handling.
 */
export const Go: Story = {
  args: {
    code: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}`,
    language: 'go',
    filename: 'server.go',
    showLineNumbers: true,
    highlightLines: [10, 11, 12],
    showCopyButton: true,
  },
};

/**
 * Rust example.
 */
export const Rust: Story = {
  args: {
    code: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Red"), 50);
    
    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
    
    println!("Score for {}: {}", team_name, score);
}`,
    language: 'rust',
    filename: 'hashmap.rs',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

/**
 * Multiple code blocks to demonstrate scrolling.
 */
export const WithMaxHeight: Story = {
  args: {
    code: `function longFunction() {
  console.log('Line 1');
  console.log('Line 2');
  console.log('Line 3');
  console.log('Line 4');
  console.log('Line 5');
  console.log('Line 6');
  console.log('Line 7');
  console.log('Line 8');
  console.log('Line 9');
  console.log('Line 10');
  console.log('Line 11');
  console.log('Line 12');
  console.log('Line 13');
  console.log('Line 14');
  console.log('Line 15');
  console.log('Line 16');
  console.log('Line 17');
  console.log('Line 18');
  console.log('Line 19');
  console.log('Line 20');
}`,
    language: 'javascript',
    filename: 'long-file.js',
    showLineNumbers: true,
    maxHeight: '300px',
    showCopyButton: true,
  },
};

/**
 * Code block without copy button.
 */
export const NoCopyButton: Story = {
  args: {
    code: `const readOnlyCode = 'This code cannot be copied';
console.log(readOnlyCode);`,
    language: 'javascript',
    showCopyButton: false,
    showLanguage: true,
  },
};

/**
 * Plain text without syntax highlighting.
 */
export const PlainText: Story = {
  args: {
    code: `This is plain text without any syntax highlighting.
It can be useful for displaying logs or simple text content.

Example output:
Server started on port 3000
Connected to database
Ready to accept connections`,
    language: 'plaintext',
    showCopyButton: true,
    showLanguage: true,
  },
};

/**
 * Minimal example without headers or decorations.
 */
export const Minimal: Story = {
  args: {
    code: `console.log('Hello, World!');`,
    language: 'javascript',
    showCopyButton: false,
    showLanguage: false,
  },
};

/**
 * HTML example.
 */
export const HTML: Story = {
  args: {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Block Example</title>
</head>
<body>
  <div class="container">
    <h1>Welcome</h1>
    <p>This is a code block component demonstration.</p>
    <button onclick="handleClick()">Click Me</button>
  </div>
  
  <script>
    function handleClick() {
      alert('Button clicked!');
    }
  </script>
</body>
</html>`,
    language: 'html',
    filename: 'index.html',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

/**
 * YAML configuration example.
 */
export const YAML: Story = {
  args: {
    code: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build`,
    language: 'yaml',
    filename: '.github/workflows/ci.yml',
    showLineNumbers: true,
    showCopyButton: true,
  },
};
