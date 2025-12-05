import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FileText, Globe, Info } from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';

import { useDocumentTitle } from '../hooks/use-document-title';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';

/**
 * Basic demo component that uses the useDocumentTitle hook
 */
function UseDocumentTitleDemo() {
  const [currentTitle, setCurrentTitle] = useState('');

  useDocumentTitle('useDocumentTitle Demo');

  // Poll document.title to show real-time updates
  React.useEffect(() => {
    const updateTitle = () => {
      const doc =
        window.self !== window.top && window.top?.document ? window.top.document : document;
      setCurrentTitle(doc.title);
    };

    updateTitle();
    const interval = setInterval(updateTitle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">useDocumentTitle Hook</h3>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">Current document title:</p>
          <p className="text-sm font-mono font-medium break-words">{currentTitle}</p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950 p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Look at your browser tab to see the updated title!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with dynamic title updates
 */
function DynamicTitleDemo() {
  const [title, setTitle] = useState('Dynamic Page Title');
  const [currentTitle, setCurrentTitle] = useState('');

  useDocumentTitle(title);

  // Poll document.title to show real-time updates
  React.useEffect(() => {
    const updateTitle = () => {
      const doc =
        window.self !== window.top && window.top?.document ? window.top.document : document;
      setCurrentTitle(doc.title);
    };

    updateTitle();
    const interval = setInterval(updateTitle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dynamic Title Updates</h3>

        <div className="space-y-2">
          <Label htmlFor="title-input">Enter Title</Label>
          <Input
            id="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new title..."
          />
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Document title:</p>
          <p className="text-sm font-mono break-words">{currentTitle}</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setTitle('Home')} variant="outline" size="sm" className="flex-1">
            Home
          </Button>
          <Button onClick={() => setTitle('About')} variant="outline" size="sm" className="flex-1">
            About
          </Button>
          <Button
            onClick={() => setTitle('Contact')}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Contact
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with prefix and suffix
 */
function PrefixSuffixDemo() {
  const [page, setPage] = useState('Dashboard');
  const [usePrefix, setUsePrefix] = useState(true);
  const [useSuffix, setUseSuffix] = useState(true);
  const [currentTitle, setCurrentTitle] = useState('');

  useDocumentTitle(page, {
    prefix: usePrefix ? 'MyApp - ' : '',
    suffix: useSuffix ? ' | v1.0' : '',
  });

  // Poll document.title to show real-time updates
  React.useEffect(() => {
    const updateTitle = () => {
      const doc =
        window.self !== window.top && window.top?.document ? window.top.document : document;
      setCurrentTitle(doc.title);
    };

    updateTitle();
    const interval = setInterval(updateTitle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Prefix & Suffix</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="prefix-switch" className="text-sm">
              Prefix: &quot;MyApp - &quot;
            </Label>
            <Switch id="prefix-switch" checked={usePrefix} onCheckedChange={setUsePrefix} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="suffix-switch" className="text-sm">
              Suffix: &quot; | v1.0&quot;
            </Label>
            <Switch id="suffix-switch" checked={useSuffix} onCheckedChange={setUseSuffix} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Select Page</Label>
          <div className="grid grid-cols-2 gap-2">
            {['Dashboard', 'Profile', 'Settings', 'Reports'].map((pageName) => (
              <Button
                key={pageName}
                onClick={() => setPage(pageName)}
                variant={page === pageName ? 'default' : 'outline'}
                size="sm"
              >
                {pageName}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground mb-2">Resulting title:</p>
          <p className="text-sm font-mono break-words font-medium">{currentTitle}</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with restore on unmount
 */
function RestoreOnUnmountDemo() {
  const [showModal, setShowModal] = useState(false);

  function Modal() {
    useDocumentTitle('Modal Open - Action Required', { restoreOnUnmount: true });

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="p-6 w-96 m-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Modal Dialog</h3>
            <p className="text-sm text-muted-foreground">
              The document title changes while this modal is open and will restore when closed.
            </p>
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950 p-3">
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Check your browser tab - the title is &quot;Modal Open - Action Required&quot;
              </p>
            </div>
            <Button onClick={() => setShowModal(false)} className="w-full">
              Close Modal
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Restore on Unmount</h3>

        <p className="text-sm text-muted-foreground">
          The title will be restored to its original value when the modal closes.
        </p>

        <Button onClick={() => setShowModal(true)} className="w-full">
          Open Modal
        </Button>

        <div className="rounded-lg border p-3 bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Modal Status:</span>
            <Badge variant={showModal ? 'default' : 'secondary'}>
              {showModal ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>

        {showModal && <Modal />}
      </div>
    </Card>
  );
}

/**
 * Demo simulating a multi-page app
 */
function MultiPageDemo() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'about' | 'contact'>('home');
  const [currentTitle, setCurrentTitle] = useState('');

  const pages = {
    home: {
      title: 'Home',
      icon: '🏠',
      content: 'Welcome to our website!',
    },
    products: {
      title: 'Products',
      icon: '📦',
      content: 'Browse our amazing products.',
    },
    about: {
      title: 'About Us',
      icon: 'ℹ️',
      content: 'Learn more about our company.',
    },
    contact: {
      title: 'Contact',
      icon: '📧',
      content: 'Get in touch with us.',
    },
  };

  const page = pages[currentPage];

  useDocumentTitle(page.title, {
    prefix: 'MyWebsite - ',
    suffix: ' | Shop Online',
  });

  // Poll document.title to show real-time updates
  React.useEffect(() => {
    const updateTitle = () => {
      const doc =
        window.self !== window.top && window.top?.document ? window.top.document : document;
      setCurrentTitle(doc.title);
    };

    updateTitle();
    const interval = setInterval(updateTitle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Multi-Page Navigation</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(pages).map(([key, pageData]) => (
            <Button
              key={key}
              onClick={() => setCurrentPage(key as typeof currentPage)}
              variant={currentPage === key ? 'default' : 'outline'}
              size="sm"
            >
              <span className="mr-2">{pageData.icon}</span>
              {pageData.title}
            </Button>
          ))}
        </div>

        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{page.icon}</span>
            <h4 className="font-semibold">{page.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{page.content}</p>
        </div>

        <div className="rounded-lg border p-3 bg-primary/5">
          <p className="text-xs text-muted-foreground mb-1">Document title:</p>
          <p className="text-xs font-mono">{currentTitle}</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Demo with notification counter
 */
function NotificationCounterDemo() {
  const [count, setCount] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('');

  useDocumentTitle(count > 0 ? `(${count}) New Messages` : 'Messages', {
    suffix: ' | Chat App',
  });

  // Poll document.title to show real-time updates
  React.useEffect(() => {
    const updateTitle = () => {
      const doc =
        window.self !== window.top && window.top?.document ? window.top.document : document;
      setCurrentTitle(doc.title);
    };

    updateTitle();
    const interval = setInterval(updateTitle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Counter</h3>

        <div className="rounded-lg border p-4 bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground mb-2">Unread Messages</p>
          <p className="text-4xl font-bold">{count}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => setCount(Math.max(0, count - 1))}
            variant="outline"
            disabled={count === 0}
          >
            -1
          </Button>
          <Button onClick={() => setCount(0)} variant="outline">
            Clear
          </Button>
          <Button onClick={() => setCount(count + 1)} variant="outline">
            +1
          </Button>
        </div>

        <div className="rounded-lg border p-3 bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Document title:</p>
          <p className="text-xs font-mono">{currentTitle}</p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950 p-3">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Useful for showing notification counts in the browser tab!
          </p>
        </div>
      </div>
    </Card>
  );
}

const meta: Meta<typeof UseDocumentTitleDemo> = {
  title: 'Hooks/useDocumentTitle',
  component: UseDocumentTitleDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A custom hook for dynamically updating the browser's document title (tab title). Features include SSR-safe implementation, title restoration on unmount, and prefix/suffix support for consistent branding across your application.",
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <UseDocumentTitleDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the useDocumentTitle hook. The document title is set to a static value.',
      },
      source: {
        code: `import { useDocumentTitle } from '@algtools/ui';

function MyComponent() {
  useDocumentTitle('My Page Title');

  return <p>Page content</p>;
}`,
        language: 'tsx',
      },
    },
  },
};

export const DynamicTitle: Story = {
  render: () => <DynamicTitleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Dynamic title updates - the document title changes based on user input or actions.',
      },
      source: {
        code: `import { useDocumentTitle } from '@algtools/ui';
import { useState } from 'react';
import { Input } from '@algtools/ui';

function MyComponent() {
  const [title, setTitle] = useState('Dynamic Page Title');

  useDocumentTitle(title);

  return (
    <>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter page title"
      />
      <p>Document title will update as you type</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const WithPrefixAndSuffix: Story = {
  render: () => <PrefixSuffixDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Using prefix and suffix options to maintain consistent branding. Perfect for adding site names or version info to page titles.',
      },
      source: {
        code: `import { useDocumentTitle } from '@algtools/ui';

function MyComponent() {
  useDocumentTitle('Dashboard', {
    prefix: 'My App',
    suffix: 'v2.0',
  });

  // Document title will be: "My App - Dashboard - v2.0"
  return <p>Dashboard content</p>;
}`,
        language: 'tsx',
      },
    },
  },
};

export const RestoreOnUnmount: Story = {
  render: () => <RestoreOnUnmountDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the restoreOnUnmount option - the original title is restored when the component unmounts. Useful for modals, temporary views, or notification states.',
      },
      source: {
        code: `import { useDocumentTitle } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

function Modal({ onClose }: { onClose: () => void }) {
  useDocumentTitle('New Message', { restoreOnUnmount: true });

  return (
    <div>
      <p>Modal content</p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultiPageApp: Story = {
  render: () => <MultiPageDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Simulates a multi-page application where each page has its own title with consistent prefix and suffix.',
      },
      source: {
        code: `import { useDocumentTitle } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [page, setPage] = useState('home');

  useDocumentTitle(
    page === 'home' ? 'Home' : page === 'about' ? 'About' : 'Contact',
    {
      prefix: 'My App',
      suffix: 'v2.0',
    }
  );

  return (
    <>
      <Button onClick={() => setPage('home')}>Home</Button>
      <Button onClick={() => setPage('about')}>About</Button>
      <Button onClick={() => setPage('contact')}>Contact</Button>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const NotificationCounter: Story = {
  render: () => <NotificationCounterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to use the hook for notification counters - displaying unread message counts in the browser tab.',
      },
      source: {
        code: `import { useDocumentTitle } from '@algtools/ui';
import { useState } from 'react';
import { Button } from '@algtools/ui';

function MyComponent() {
  const [unreadCount, setUnreadCount] = useState(0);

  useDocumentTitle(
    unreadCount > 0 ? \`(\${unreadCount}) Messages\` : 'Messages',
    {
      prefix: 'My App',
    }
  );

  return (
    <>
      <Button onClick={() => setUnreadCount((c) => c + 1)}>
        Add Notification
      </Button>
      <p>Unread: {unreadCount}</p>
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <DynamicTitleDemo />
      <NotificationCounterDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple components using useDocumentTitle. The last one to render or update will set the title.',
      },
    },
  },
};
