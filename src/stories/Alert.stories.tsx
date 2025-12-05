import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Terminal,
  Lightbulb,
  Shield,
  Download,
  Wifi,
  WifiOff,
} from 'lucide-react';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays a callout for user attention. Alerts are used to communicate important information to users, such as warnings, errors, or success messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'The visual style variant of the alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md" {...args}>
      <Info />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A default alert with an icon, title, and description, demonstrating basic alert functionality.',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <Alert className="max-w-md" {...args}>
      <AlertTriangle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A destructive alert for errors and critical issues, using a warning icon and destructive styling.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md border-green-200 bg-green-50 text-green-800" {...args}>
      <CheckCircle className="text-green-600" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A success alert with green styling, indicating successful completion of an action.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md border-yellow-200 bg-yellow-50 text-yellow-800" {...args}>
      <AlertTriangle className="text-yellow-600" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action will permanently delete your data. This cannot be undone.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A warning alert with yellow styling, indicating caution or important information that requires attention.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md" {...args}>
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        A new software update is available. You can download it from the settings page.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert without an icon, showing just the title and description for a cleaner look.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md" {...args}>
      <Info />
      <AlertTitle>New features are now available!</AlertTitle>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert with only a title and icon, demonstrating minimal alert content.',
      },
    },
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md" {...args}>
      <Terminal />
      <AlertDescription>
        Run <code className="bg-muted px-1 py-0.5 rounded">npm install</code> to install
        dependencies.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert with only a description and icon, demonstrating description-only alerts.',
      },
    },
  },
};

export const NetworkStatus: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div className="space-y-4 max-w-md">
      <Alert className="border-green-200 bg-green-50 text-green-800" {...args}>
        <Wifi className="text-green-600" />
        <AlertTitle>Connected</AlertTitle>
        <AlertDescription>You&apos;re connected to the internet.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <WifiOff />
        <AlertTitle>Connection Lost</AlertTitle>
        <AlertDescription>
          Unable to connect to the internet. Please check your connection.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Network status alerts showing connection status, demonstrating how to use alerts for system status indicators.',
      },
    },
  },
};

export const SecurityAlert: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-lg border-blue-200 bg-blue-50 text-blue-800" {...args}>
      <Shield className="text-blue-600" />
      <AlertTitle>Security Notice</AlertTitle>
      <AlertDescription>
        We&apos;ve detected a new login from an unrecognized device. If this wasn&apos;t you, please
        secure your account immediately.
        <div className="mt-2 flex gap-2">
          <button className="text-blue-600 hover:text-blue-800 underline text-sm">
            Secure Account
          </button>
          <button className="text-blue-600 hover:text-blue-800 underline text-sm">Not Me</button>
        </div>
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A security alert with action buttons, demonstrating how to include interactive elements in alerts.',
      },
    },
  },
};

export const DownloadProgress: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-md" {...args}>
      <Download />
      <AlertTitle>Download in Progress</AlertTitle>
      <AlertDescription>
        Your file is being downloaded. This may take a few minutes depending on your connection
        speed.
        <div className="mt-2 w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="text-xs mt-1 text-muted-foreground">45% complete</div>
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A download progress alert with a progress bar, demonstrating how to show progress within alerts.',
      },
    },
  },
};

export const TipAlert: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert className="max-w-lg border-amber-200 bg-amber-50 text-amber-800" {...args}>
      <Lightbulb className="text-amber-600" />
      <AlertTitle>Pro Tip</AlertTitle>
      <AlertDescription>
        You can use keyboard shortcuts to navigate faster. Press{' '}
        <kbd className="bg-amber-100 border border-amber-300 rounded px-1 py-0.5 text-xs">
          Ctrl + K
        </kbd>{' '}
        to open the command palette.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A tip alert with amber styling and keyboard shortcut information, demonstrating how to show helpful tips and shortcuts.',
      },
    },
  },
};

export const MultipleAlerts: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <Info />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational alert with additional context.</AlertDescription>
      </Alert>

      <Alert className="border-green-200 bg-green-50 text-green-800">
        <CheckCircle className="text-green-600" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully.</AlertDescription>
      </Alert>

      <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
        <AlertTriangle className="text-yellow-600" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please review your settings before proceeding.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple alerts displayed together, demonstrating how to show different types of alerts in a list.',
      },
    },
  },
};
