import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Upload,
  Edit,
  Trash,
  Plus,
  Search,
  FileText,
  Video,
  Music,
  Star,
  Heart,
  ImageIcon,
} from 'lucide-react';

const meta = {
  title: 'Overlays/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the dialog is open or closed',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback fired when the dialog open state changes',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a simple dialog with a title and description. Click the X button or press Escape
            to close.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is the main content area of the dialog. You can place any content here.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A default dialog component with a title, description, content area, and footer buttons, demonstrating basic modal dialog functionality.',
      },
    },
  },
};

export const FormDialog: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Form</DialogTitle>
            <DialogDescription>
              Send us a message and we&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-3"
                placeholder="Your message..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A dialog containing a contact form with name, email, and message fields, demonstrating how to integrate forms within dialogs.',
      },
    },
  },
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm text-destructive">
              <strong>Warning:</strong> Deleting your account will:
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-destructive space-y-1">
              <li>Remove all your data permanently</li>
              <li>Cancel all active subscriptions</li>
              <li>Revoke access to all connected apps</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A confirmation dialog for destructive actions like deleting an account, featuring warning messages and a destructive action button.',
      },
    },
  },
};

export const ProfileDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <User className="mr-2 h-4 w-4" />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>View and edit your profile information.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Product Designer</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Pro Member</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined March 2023</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A profile dialog displaying user information including avatar, name, role, badges, contact details, and an edit button.',
      },
    },
  },
};

export const SettingsDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings and preferences.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Account</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email notifications</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Privacy settings</span>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Security</CardTitle>
                <CardDescription>Keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Two-factor authentication</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Change password</span>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A settings dialog with multiple sections for account preferences, notifications, and security settings, demonstrating a comprehensive settings interface.',
      },
    },
  },
};

export const FileUploadDialog: Story = {
  render: () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      setSelectedFiles(files);
    };

    const getFileIcon = (fileName: string) => {
      const extension = fileName.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return <ImageIcon className="h-4 w-4" />;
        case 'mp4':
        case 'avi':
        case 'mov':
          return <Video className="h-4 w-4" />;
        case 'mp3':
        case 'wav':
        case 'flac':
          return <Music className="h-4 w-4" />;
        default:
          return <FileText className="h-4 w-4" />;
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Select files to upload to your account.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here, or click to browse
              </p>
              <Input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="w-full"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded">
                      {getFileIcon(file.name)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={selectedFiles.length === 0}>
              Upload {selectedFiles.length} file(s)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A file upload dialog with drag-and-drop functionality, file selection, and a preview of selected files before upload.',
      },
    },
  },
};

export const SearchDialog: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches] = useState([
      'React components',
      'TypeScript tutorial',
      'UI design patterns',
      'Accessibility guidelines',
    ]);

    const filteredSearches = recentSearches.filter((search) =>
      search.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Search through your content and recent searches.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchQuery === '' && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Searches</h4>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 text-sm hover:bg-muted rounded-md flex items-center gap-2"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery !== '' && (
              <div>
                <h4 className="text-sm font-medium mb-2">Results</h4>
                {filteredSearches.length > 0 ? (
                  <div className="space-y-1">
                    {filteredSearches.map((search, index) => (
                      <div key={index} className="p-2 text-sm border rounded-md">
                        {search}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No results found.</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button disabled={!searchQuery}>Search</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A search dialog with a search input field and dynamic results display, demonstrating how to implement search functionality within a dialog.',
      },
    },
  },
};

export const SuccessDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Complete Action</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <DialogTitle>Success!</DialogTitle>
              <DialogDescription>Your action has been completed successfully.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Your changes have been saved and will take effect immediately.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Continue</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A success dialog with a checkmark icon and success message, typically used to confirm successful completion of an action.',
      },
    },
  },
};

export const InfoDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>About This Feature</DialogTitle>
          <DialogDescription>
            Learn more about how this feature works and its benefits.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-base font-semibold">Key Benefits</h3>
            <ul className="space-y-1 text-sm">
              <li>• Improved user experience with responsive design</li>
              <li>• Accessibility features built-in for screen readers</li>
              <li>• Keyboard navigation support</li>
              <li>• Customizable appearance and behavior</li>
            </ul>

            <h3 className="text-base font-semibold mt-4">How It Works</h3>
            <p className="text-sm text-muted-foreground">
              This dialog component uses Radix UI primitives to provide a robust, accessible
              foundation. It includes focus management, escape key handling, and backdrop click to
              close functionality.
            </p>

            <div className="flex gap-2 mt-4">
              <Badge variant="secondary">Accessible</Badge>
              <Badge variant="secondary">Responsive</Badge>
              <Badge variant="secondary">Customizable</Badge>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Got it</Button>
          </DialogClose>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Guide
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'An informational dialog displaying detailed information about features, with structured content and helpful tips.',
      },
    },
  },
};

export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open (No Close Button)</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Dialog Without Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t show the X close button. You can still close it with Escape or
            the Cancel button.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Sometimes you want to force users to make a deliberate choice rather than accidentally
            closing the dialog.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A dialog without a close button in the header, requiring users to use the footer buttons to close the dialog.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">Custom Styled Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-purple-900">Custom Styled Dialog</DialogTitle>
          <DialogDescription className="text-purple-700">
            This dialog has custom styling applied to demonstrate theming capabilities.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-purple-900">Premium Feature</span>
            </div>
            <p className="text-sm text-purple-800">
              This is an example of how you can customize the dialog appearance to match your brand
              or design system.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Heart className="mr-2 h-4 w-4" />
            Love It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A dialog with custom styling including gradient backgrounds, custom colors, and themed buttons, demonstrating how to customize dialog appearance.',
      },
    },
  },
};
