import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  FileText,
  Folder,
  Home,
  Search,
  Mail,
  Bell,
  Download,
  Share,
  Copy,
  Trash,
  Edit,
  Eye,
  Star,
  Heart,
  MessageSquare,
  Phone,
  Clock,
  MapPin,
} from 'lucide-react';

const meta = {
  title: 'Navigation/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the command input',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback fired when the input value changes',
    },
    filter: {
      description: 'Custom filter function for items',
    },
    shouldFilter: {
      control: 'boolean',
      description: 'Whether to enable built-in filtering',
    },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  args: {
    shouldFilter: true,
  },
  render: (args) => (
    <Command className="rounded-lg border shadow-md" {...args}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const DialogCommand: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)} variant="outline">
          Open Command Palette
          <CommandShortcut className="ml-2">⌘K</CommandShortcut>
        </Button>

        <p className="text-sm text-muted-foreground">
          Try pressing{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ⌘K
          </kbd>{' '}
          to open the command palette
        </p>

        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          title="Command Palette"
          description="Search for commands, actions, and more"
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>New Document</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Folder className="mr-2 h-4 w-4" />
                <span>New Folder</span>
                <CommandShortcut>⌘⇧N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search Files</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <Home className="mr-2 h-4 w-4" />
                <span>Go to Dashboard</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Go to Inbox</span>
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Go to Calendar</span>
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notification Settings</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>General Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

export const FileCommands: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput placeholder="Search files and actions..." />
      <CommandList>
        <CommandEmpty>No files or actions found.</CommandEmpty>
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Project Proposal.docx</span>
            <CommandShortcut>2 min ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Meeting Notes.md</span>
            <CommandShortcut>1 hour ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Budget 2024.xlsx</span>
            <CommandShortcut>Yesterday</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="File Actions">
          <CommandItem>
            <Download className="mr-2 h-4 w-4" />
            <span>Download Selected</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Share className="mr-2 h-4 w-4" />
            <span>Share Files</span>
            <CommandShortcut>⌘⇧S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy to Clipboard</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Trash className="mr-2 h-4 w-4" />
            <span>Move to Trash</span>
            <CommandShortcut>⌘⌫</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search keyboard shortcuts..." />
      <CommandList>
        <CommandEmpty>No shortcuts found.</CommandEmpty>
        <CommandGroup heading="Editor">
          <CommandItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Quick Edit</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy className="mr-2 h-4 w-4" />
            <span>Duplicate Line</span>
            <CommandShortcut>⌘⇧D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Find and Replace</span>
            <CommandShortcut>⌘⇧F</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="View">
          <CommandItem>
            <Eye className="mr-2 h-4 w-4" />
            <span>Toggle Preview</span>
            <CommandShortcut>⌘⇧P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Folder className="mr-2 h-4 w-4" />
            <span>Toggle Sidebar</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem>
            <Star className="mr-2 h-4 w-4" />
            <span>Add to Favorites</span>
            <CommandShortcut>⌘⇧⭐</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>Add to Liked</span>
            <CommandShortcut>⌘L</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const ContactSearch: Story = {
  render: () => {
    const contacts = [
      { name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer' },
      { name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
      { name: 'Carol Brown', email: 'carol@example.com', role: 'Manager' },
      { name: 'David Wilson', email: 'david@example.com', role: 'Developer' },
      { name: 'Eva Davis', email: 'eva@example.com', role: 'Designer' },
    ];

    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search contacts..." />
        <CommandList>
          <CommandEmpty>No contacts found.</CommandEmpty>
          <CommandGroup heading="Team Members">
            {contacts.map((contact, index) => (
              <CommandItem key={index}>
                <User className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{contact.name}</span>
                  <span className="text-xs text-muted-foreground">{contact.email}</span>
                </div>
                <CommandShortcut>{contact.role}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Contact Actions">
            <CommandItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Send Message</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Phone className="mr-2 h-4 w-4" />
              <span>Start Call</span>
              <CommandShortcut>⌘⇧C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Send Email</span>
              <CommandShortcut>⌘⇧E</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

export const CustomEmpty: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search for something that doesn't exist..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-6">
            <Search className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">No results found</p>
              <p className="text-xs text-muted-foreground">
                Try searching for something else or check your spelling
              </p>
            </div>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Quick Actions">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Create New Document</span>
          </CommandItem>
          <CommandItem>
            <Folder className="mr-2 h-4 w-4" />
            <span>Browse Files</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const MenuCommand: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Search for actions and commands</CardDescription>
      </CardHeader>
      <CardContent>
        <Command className="rounded-lg border">
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No actions found.</CommandEmpty>
            <CommandGroup heading="Common Actions">
              <CommandItem>
                <Clock className="mr-2 h-4 w-4" />
                <span>Set Reminder</span>
                <CommandShortcut>⌘R</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <MapPin className="mr-2 h-4 w-4" />
                <span>Add Location</span>
                <CommandShortcut>⌘L</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Schedule Meeting</span>
                <CommandShortcut>⌘⇧M</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Star className="mr-2 h-4 w-4" />
                <span>Add to Favorites</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Sharing">
              <CommandItem>
                <Share className="mr-2 h-4 w-4" />
                <span>Share Link</span>
                <CommandShortcut>⌘⇧L</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy to Clipboard</span>
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Download</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="Available Actions">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Create Document</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy Selection</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Disabled Actions">
          <CommandItem disabled>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit (No selection)</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem disabled>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete (Read-only)</span>
            <CommandShortcut>⌘⌫</CommandShortcut>
          </CommandItem>
          <CommandItem disabled>
            <Share className="mr-2 h-4 w-4" />
            <span>Share (No permission)</span>
            <CommandShortcut>⌘⇧S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const ControlledCommand: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    return (
      <div className="space-y-4">
        <div className="text-sm space-y-1">
          <p>
            <strong>Search value:</strong> {value || '(empty)'}
          </p>
          <p>
            <strong>Selected item:</strong> {selectedItem || '(none)'}
          </p>
        </div>

        <Command className="rounded-lg border shadow-md" value={value} onValueChange={setValue}>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found for &quot;{value}&quot;</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setSelectedItem('Calendar')}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem onSelect={() => setSelectedItem('Calculator')}>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
              <CommandItem onSelect={() => setSelectedItem('Settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setValue('');
            setSelectedItem('');
          }}
        >
          Clear All
        </Button>
      </div>
    );
  },
};
