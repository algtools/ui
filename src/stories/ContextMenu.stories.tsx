import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '@/components/ui/context-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Copy,
  Scissors,
  Clipboard,
  Download,
  Share,
  Edit,
  Trash,
  Star,
  Heart,
  Eye,
  File,
  FileText,
  Settings,
  Info,
  Link,
  Bookmark,
  Flag,
  MoreHorizontal,
  Maximize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Crop,
  ImageIcon,
} from 'lucide-react';

const meta = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a menu to the user — such as a set of actions or functions — triggered by a right-click or long-press.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback fired when the menu open state changes',
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm cursor-pointer">
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Scissors className="mr-2 h-4 w-4" />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Clipboard className="mr-2 h-4 w-4" />
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic context menu triggered by right-clicking, displaying common actions like copy, cut, paste, edit, and delete with keyboard shortcuts.',
      },
    },
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [showUrls, setShowUrls] = useState(false);
    const [showIcons, setShowIcons] = useState(true);

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card className="w-[300px] cursor-pointer">
            <CardHeader>
              <CardTitle>Browser Settings</CardTitle>
              <CardDescription>Right-click to configure view options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {showBookmarks && <Badge variant="outline">Bookmarks Bar</Badge>}
              {showUrls && <Badge variant="outline">Show URLs</Badge>}
              {showIcons && <Badge variant="outline">Favicons</Badge>}
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>View Options</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            <Bookmark className="mr-2 h-4 w-4" />
            Show Bookmarks Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showUrls} onCheckedChange={setShowUrls}>
            <Link className="mr-2 h-4 w-4" />
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showIcons} onCheckedChange={setShowIcons}>
            <Star className="mr-2 h-4 w-4" />
            Show Favicons
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            More Settings
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A context menu with checkbox items for toggling view options, demonstrating state management for multiple boolean settings.',
      },
    },
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [theme, setTheme] = useState('light');
    const [layout, setLayout] = useState('grid');

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex h-[200px] w-[300px] items-center justify-center rounded-md border bg-muted/50 cursor-pointer">
            <div className="text-center">
              <p className="text-lg font-medium">App Interface</p>
              <p className="text-sm text-muted-foreground">
                Theme: {theme} | Layout: {layout}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Light Theme</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark Theme</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System Theme</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuLabel>Layout</ContextMenuLabel>
          <ContextMenuRadioGroup value={layout} onValueChange={setLayout}>
            <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="card">Card View</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A context menu with radio group items for selecting single options from multiple choices, such as theme and layout preferences.',
      },
    },
  },
};

export const WithSubmenus: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed cursor-pointer">
          Right click for nested menus
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Scissors className="mr-2 h-4 w-4" />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share className="mr-2 h-4 w-4" />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <Link className="mr-2 h-4 w-4" />
              Copy Link
            </ContextMenuItem>
            <ContextMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Share className="mr-2 h-4 w-4" />
              Share via Email
            </ContextMenuItem>
            <ContextMenuItem>
              <Share className="mr-2 h-4 w-4" />
              Share on Social
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            More Actions
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Add to Favorites
            </ContextMenuItem>
            <ContextMenuItem>
              <Flag className="mr-2 h-4 w-4" />
              Report Content
            </ContextMenuItem>
            <ContextMenuItem>
              <Info className="mr-2 h-4 w-4" />
              Properties
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A context menu with nested submenus, allowing hierarchical organization of related actions and options.',
      },
    },
  },
};

export const FileContextMenu: Story = {
  render: () => {
    const files = [
      { name: 'Document.pdf', type: 'pdf', size: '2.4 MB' },
      { name: 'Image.jpg', type: 'image', size: '1.8 MB' },
      { name: 'Presentation.pptx', type: 'presentation', size: '5.2 MB' },
    ];

    const getFileIcon = (type: string) => {
      switch (type) {
        case 'pdf':
          return <FileText className="h-4 w-4 text-red-500" />;
        case 'image':
          return <ImageIcon className="h-4 w-4 text-blue-500" />;
        case 'presentation':
          return <File className="h-4 w-4 text-orange-500" />;
        default:
          return <File className="h-4 w-4" />;
      }
    };

    return (
      <div className="w-[400px] space-y-2">
        {files.map((file, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger asChild>
              <div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
                {getFileIcon(file.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Open
                <ContextMenuShortcut>Enter</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Scissors className="mr-2 h-4 w-4" />
                Cut
                <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>
                    <Link className="mr-2 h-4 w-4" />
                    Copy Share Link
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Add to Favorites
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Info className="mr-2 h-4 w-4" />
                Properties
                <ContextMenuShortcut>⌘I</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Move to Trash
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A file context menu displaying file-specific actions like open, edit, copy, share, and delete, with file type icons and keyboard shortcuts.',
      },
    },
  },
};

export const ImageContextMenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden cursor-pointer">
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <div className="text-white text-center">
              <ImageIcon className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Sample Image</p>
              <p className="text-xs opacity-75">Right-click for options</p>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View Full Size
          <ContextMenuShortcut>Space</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Download Image
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <Crop className="mr-2 h-4 w-4" />
              Crop
            </ContextMenuItem>
            <ContextMenuItem>
              <RotateCw className="mr-2 h-4 w-4" />
              Rotate Right
            </ContextMenuItem>
            <ContextMenuItem>
              <RotateCcw className="mr-2 h-4 w-4" />
              Rotate Left
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ZoomIn className="mr-2 h-4 w-4" />
            Zoom
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <ZoomIn className="mr-2 h-4 w-4" />
              Zoom In
              <ContextMenuShortcut>⌘+</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <ZoomOut className="mr-2 h-4 w-4" />
              Zoom Out
              <ContextMenuShortcut>⌘-</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Maximize className="mr-2 h-4 w-4" />
              Fit to Screen
              <ContextMenuShortcut>⌘0</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy Image
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Link className="mr-2 h-4 w-4" />
          Copy Image URL
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          Add to Favorites
        </ContextMenuItem>
        <ContextMenuItem>
          <Share className="mr-2 h-4 w-4" />
          Share Image
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An image context menu with image-specific actions like rotate, zoom, crop, copy, and share, organized in submenus for related operations.',
      },
    },
  },
};

export const TextContextMenu: Story = {
  render: () => {
    const [selectedText, setSelectedText] = useState('');

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className="p-4 border rounded-lg cursor-text min-h-[120px] w-[400px]"
            onMouseUp={() => {
              const selection = window.getSelection();
              setSelectedText(selection?.toString() || '');
            }}
          >
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris. Select some text and right-click.
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {selectedText ? (
            <>
              <ContextMenuLabel>Selected Text</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Scissors className="mr-2 h-4 w-4" />
                Cut
                <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Share Selection
              </ContextMenuItem>
              <ContextMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Highlight
              </ContextMenuItem>
            </>
          ) : (
            <>
              <ContextMenuItem>
                <Clipboard className="mr-2 h-4 w-4" />
                Paste
                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Select All
                <ContextMenuShortcut>⌘A</ContextMenuShortcut>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A text selection context menu that dynamically shows different options based on whether text is selected, providing copy, cut, and paste actions.',
      },
    },
  },
};

export const TableContextMenu: Story = {
  render: () => {
    const data = [
      { id: 1, name: 'Alice Johnson', role: 'Designer', status: 'Active' },
      { id: 2, name: 'Bob Smith', role: 'Developer', status: 'Active' },
      { id: 3, name: 'Carol Brown', role: 'Manager', status: 'Away' },
    ];

    return (
      <div className="w-full max-w-[500px]">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border p-2 text-left text-sm font-medium">Name</th>
              <th className="border border-border p-2 text-left text-sm font-medium">Role</th>
              <th className="border border-border p-2 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <ContextMenu key={row.id}>
                <ContextMenuTrigger asChild>
                  <tr className="hover:bg-muted/50 cursor-pointer">
                    <td className="border border-border p-2 text-sm">{row.name}</td>
                    <td className="border border-border p-2 text-sm">{row.role}</td>
                    <td className="border border-border p-2 text-sm">
                      <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuLabel>{row.name}</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit User
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Email
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    Share Contact
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <Settings className="mr-2 h-4 w-4" />
                      Change Status
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-40">
                      <ContextMenuItem>Active</ContextMenuItem>
                      <ContextMenuItem>Away</ContextMenuItem>
                      <ContextMenuItem>Busy</ContextMenuItem>
                      <ContextMenuItem>Offline</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuItem variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove User
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A table row context menu displaying row-specific actions like view profile, edit user, copy email, and change status, with submenus for status options.',
      },
    },
  },
};

export const DisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed cursor-pointer">
          Right click (some items disabled)
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Scissors className="mr-2 h-4 w-4" />
          Cut (No selection)
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Clipboard className="mr-2 h-4 w-4" />
          Paste (Empty clipboard)
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Share className="mr-2 h-4 w-4" />
          Share (No permission)
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete (Read-only)
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A context menu with disabled items, demonstrating how to show unavailable actions with visual indicators and explanatory text for why they are disabled.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border-2 border-blue-200 bg-blue-50 cursor-pointer">
          <div className="text-center">
            <p className="text-blue-900 font-medium">Custom Styled Menu</p>
            <p className="text-blue-700 text-sm">Right click me</p>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 bg-blue-50 border-blue-200">
        <ContextMenuLabel className="text-blue-900">Custom Actions</ContextMenuLabel>
        <ContextMenuSeparator className="bg-blue-200" />
        <ContextMenuItem className="text-blue-800 focus:bg-blue-100 focus:text-blue-900">
          <Star className="mr-2 h-4 w-4 text-yellow-500" />
          Special Action
        </ContextMenuItem>
        <ContextMenuItem className="text-blue-800 focus:bg-blue-100 focus:text-blue-900">
          <Heart className="mr-2 h-4 w-4 text-red-500" />
          Favorite
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-blue-200" />
        <ContextMenuItem className="text-blue-800 focus:bg-blue-100 focus:text-blue-900">
          <Settings className="mr-2 h-4 w-4" />
          Configure
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A context menu with custom styling, demonstrating how to theme the menu with a coordinated color scheme and custom design.',
      },
    },
  },
};
