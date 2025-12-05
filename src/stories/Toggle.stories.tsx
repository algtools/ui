import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Star,
  Bookmark,
  Share,
  Download,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Sun,
  Moon,
  Mic,
  MicOff,
  Wifi,
  WifiOff,
  Camera,
  CameraOff,
  Shield,
  ShieldOff,
  Globe,
  Code,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Quote,
  Grid,
  LayoutList,
  Filter,
} from 'lucide-react';

const meta = {
  title: 'Forms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A two-state button that can be either on or off.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pressed: {
      control: 'boolean',
      description: 'The controlled pressed state of the toggle',
    },
    defaultPressed: {
      control: 'boolean',
      description: 'The default pressed state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'Visual style of the toggle',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the toggle',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label>Bold Text</Label>
      <Toggle {...args} aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default toggle button with an icon, allowing users to toggle a feature on or off (commonly used in toolbars and settings).',
      },
    },
  },
};

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Default Variant</Label>
        <div className="flex space-x-2">
          <Toggle variant="default" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="default" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="default" aria-label="Underline" defaultPressed>
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Outline Variant</Label>
        <div className="flex space-x-2">
          <Toggle variant="outline" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Underline" defaultPressed>
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle variants (default and outline) demonstrating different visual styles, with examples showing both pressed and unpressed states.',
      },
    },
  },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Small Size</Label>
        <div className="flex items-center space-x-2">
          <Toggle size="sm" variant="outline" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" variant="outline" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" variant="outline" aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Default Size</Label>
        <div className="flex items-center space-x-2">
          <Toggle size="default" variant="outline" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="default" variant="outline" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="default" variant="outline" aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Large Size</Label>
        <div className="flex items-center space-x-2">
          <Toggle size="lg" variant="outline" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" variant="outline" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" variant="outline" aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle size variants (small, default, large) demonstrating how to adjust the component size for different layout contexts and toolbars.',
      },
    },
  },
};

export const WithText: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Text Only</Label>
        <div className="flex space-x-2">
          <Toggle variant="outline">Bold</Toggle>
          <Toggle variant="outline">Italic</Toggle>
          <Toggle variant="outline">Underline</Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Icon with Text</Label>
        <div className="flex space-x-2">
          <Toggle variant="outline">
            <Bold className="mr-2 h-4 w-4" />
            Bold
          </Toggle>
          <Toggle variant="outline">
            <Italic className="mr-2 h-4 w-4" />
            Italic
          </Toggle>
          <Toggle variant="outline">
            <Underline className="mr-2 h-4 w-4" />
            Underline
          </Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle buttons with text labels (text-only and icon with text), providing clearer context for users when icons alone might be ambiguous.',
      },
    },
  },
};

export const ControlledState: Story = {
  args: {},
  render: () => {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(true);
    const [isUnderline, setIsUnderline] = useState(false);

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Controlled Text Formatting</Label>
          <div className="flex space-x-2">
            <Toggle
              variant="outline"
              pressed={isBold}
              onPressedChange={setIsBold}
              aria-label="Toggle bold"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              variant="outline"
              pressed={isItalic}
              onPressedChange={setIsItalic}
              aria-label="Toggle italic"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              variant="outline"
              pressed={isUnderline}
              onPressedChange={setIsUnderline}
              aria-label="Toggle underline"
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Bold: {isBold ? 'On' : 'Off'}</p>
          <p>Italic: {isItalic ? 'On' : 'Off'}</p>
          <p>Underline: {isUnderline ? 'On' : 'Off'}</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled toggle buttons with React state management, demonstrating how to programmatically control toggle states and display current status.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Normal State</Label>
        <div className="flex space-x-2">
          <Toggle variant="outline" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Disabled (Off)</Label>
        <div className="flex space-x-2">
          <Toggle variant="outline" disabled aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" disabled aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" disabled aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
        <p className="text-sm text-muted-foreground">These toggles are disabled in the off state</p>
      </div>

      <div className="space-y-2">
        <Label>Disabled (On)</Label>
        <div className="flex space-x-2">
          <Toggle variant="outline" disabled defaultPressed aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" disabled defaultPressed aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" disabled defaultPressed aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
        <p className="text-sm text-muted-foreground">These toggles are disabled in the on state</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle disabled states showing both disabled off and disabled on appearances, demonstrating when controls are not available for interaction.',
      },
    },
  },
};

export const MediaControls: Story = {
  args: {},
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Media Controls</CardTitle>
          <CardDescription>Toggle-based media control interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Playback</Label>
            <div className="flex space-x-2">
              <Toggle
                variant="outline"
                pressed={isPlaying}
                onPressedChange={setIsPlaying}
                aria-label="Play/Pause"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Toggle>
              <Toggle
                variant="outline"
                pressed={isMuted}
                onPressedChange={setIsMuted}
                aria-label="Mute/Unmute"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Toggle>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Video Call Controls</Label>
            <div className="flex space-x-2">
              <Toggle
                variant="outline"
                pressed={isMicOn}
                onPressedChange={setIsMicOn}
                aria-label="Toggle microphone"
              >
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                Mic
              </Toggle>
              <Toggle
                variant="outline"
                pressed={isCameraOn}
                onPressedChange={setIsCameraOn}
                aria-label="Toggle camera"
              >
                {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                Camera
              </Toggle>
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
            <p>Audio: {isMuted ? 'Muted' : 'On'}</p>
            <p>Microphone: {isMicOn ? 'On' : 'Off'}</p>
            <p>Camera: {isCameraOn ? 'On' : 'Off'}</p>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Media player controls with toggles for play/pause, mute, microphone, and camera, featuring dynamic icons and status display for video/audio applications.',
      },
    },
  },
};

export const ToolbarActions: Story = {
  args: {},
  render: () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    const toggleFavorite = (item: string) => {
      setFavorites((prev) =>
        prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
      );
    };

    const toggleBookmark = (item: string) => {
      setBookmarks((prev) =>
        prev.includes(item) ? prev.filter((b) => b !== item) : [...prev, item]
      );
    };

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Article Actions</CardTitle>
          <CardDescription>Interact with articles using toggle buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Article 1: Getting Started with React</h3>
            <div className="flex space-x-2">
              <Toggle
                variant="outline"
                size="sm"
                pressed={favorites.includes('article1')}
                onPressedChange={() => toggleFavorite('article1')}
                aria-label="Add to favorites"
              >
                <Heart className="h-4 w-4" />
                {favorites.includes('article1') ? 'Favorited' : 'Favorite'}
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={bookmarks.includes('article1')}
                onPressedChange={() => toggleBookmark('article1')}
                aria-label="Bookmark"
              >
                <Bookmark className="h-4 w-4" />
                Bookmark
              </Toggle>
              <Toggle variant="outline" size="sm" aria-label="Share">
                <Share className="h-4 w-4" />
                Share
              </Toggle>
              <Toggle variant="outline" size="sm" aria-label="Download">
                <Download className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Article 2: Advanced TypeScript Tips</h3>
            <div className="flex space-x-2">
              <Toggle
                variant="outline"
                size="sm"
                pressed={favorites.includes('article2')}
                onPressedChange={() => toggleFavorite('article2')}
                aria-label="Add to favorites"
              >
                <Star className="h-4 w-4" />
                {favorites.includes('article2') ? 'Starred' : 'Star'}
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={bookmarks.includes('article2')}
                onPressedChange={() => toggleBookmark('article2')}
                aria-label="Bookmark"
              >
                <Bookmark className="h-4 w-4" />
                Save
              </Toggle>
              <Toggle variant="outline" size="sm" aria-label="Share">
                <Share className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" size="sm" aria-label="Download">
                <Download className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Favorites: {favorites.length}</p>
            <p>Bookmarks: {bookmarks.length}</p>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Article action toolbar with toggles for favorites, bookmarks, share, and download, demonstrating content interaction patterns with dynamic text labels and counters.',
      },
    },
  },
};

export const SystemSettings: Story = {
  args: {},
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [wifi, setWifi] = useState(true);
    const [security, setSecurity] = useState(true);
    const [location, setLocation] = useState(false);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure your system preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications</Label>
              <p className="text-sm text-muted-foreground">Enable system notifications</p>
            </div>
            <Toggle
              variant="outline"
              pressed={notifications}
              onPressedChange={setNotifications}
              aria-label="Toggle notifications"
            >
              {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </Toggle>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch to dark theme</p>
            </div>
            <Toggle
              variant="outline"
              pressed={darkMode}
              onPressedChange={setDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Toggle>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Wi-Fi</Label>
              <p className="text-sm text-muted-foreground">Connect to wireless networks</p>
            </div>
            <Toggle
              variant="outline"
              pressed={wifi}
              onPressedChange={setWifi}
              aria-label="Toggle Wi-Fi"
            >
              {wifi ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            </Toggle>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Shield</Label>
              <p className="text-sm text-muted-foreground">Enable enhanced security</p>
            </div>
            <Toggle
              variant="outline"
              pressed={security}
              onPressedChange={setSecurity}
              aria-label="Toggle security"
            >
              {security ? <Shield className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
            </Toggle>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Location Services</Label>
              <p className="text-sm text-muted-foreground">Allow location access</p>
            </div>
            <Toggle
              variant="outline"
              pressed={location}
              onPressedChange={setLocation}
              aria-label="Toggle location"
            >
              {location ? <Globe className="h-4 w-4" /> : <Globe className="h-4 w-4 opacity-50" />}
            </Toggle>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'System settings panel with toggles for notifications, dark mode, Wi-Fi, security, and location services, featuring dynamic icons and descriptive labels.',
      },
    },
  },
};

export const TextFormatting: Story = {
  args: {},
  render: () => {
    const [formatting, setFormatting] = useState({
      bold: false,
      italic: false,
      underline: false,
      code: false,
      link: false,
    });

    const toggleFormat = (format: keyof typeof formatting) => {
      setFormatting((prev) => ({
        ...prev,
        [format]: !prev[format],
      }));
    };

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Text Editor Toolbar</CardTitle>
          <CardDescription>Format your text with toggle buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Text Formatting</Label>
            <div className="flex flex-wrap gap-2">
              <Toggle
                variant="outline"
                pressed={formatting.bold}
                onPressedChange={() => toggleFormat('bold')}
                aria-label="Bold"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                variant="outline"
                pressed={formatting.italic}
                onPressedChange={() => toggleFormat('italic')}
                aria-label="Italic"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                variant="outline"
                pressed={formatting.underline}
                onPressedChange={() => toggleFormat('underline')}
                aria-label="Underline"
              >
                <Underline className="h-4 w-4" />
              </Toggle>
              <Toggle
                variant="outline"
                pressed={formatting.code}
                onPressedChange={() => toggleFormat('code')}
                aria-label="Code"
              >
                <Code className="h-4 w-4" />
              </Toggle>
              <Toggle
                variant="outline"
                pressed={formatting.link}
                onPressedChange={() => toggleFormat('link')}
                aria-label="Link"
              >
                <Link className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Alignment</Label>
            <div className="flex gap-2">
              <Toggle variant="outline" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Lists & Blocks</Label>
            <div className="flex gap-2">
              <Toggle variant="outline" aria-label="Bullet list">
                <List className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Quote">
                <Quote className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Active Formatting</h4>
            <div className="text-sm text-muted-foreground">
              {Object.entries(formatting)
                .filter(([, active]) => active)
                .map(([format]) => format)
                .join(', ') || 'None'}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Text editor toolbar with toggles for formatting (bold, italic, underline, code, link), alignment, and lists, with an active formatting summary display.',
      },
    },
  },
};

export const ViewModes: Story = {
  args: {},
  render: () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list' | null>('grid');
    const [showDetails, setShowDetails] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>View Options</CardTitle>
          <CardDescription>Customize how content is displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Layout Mode</Label>
            <div className="flex gap-2">
              <Toggle
                variant="outline"
                pressed={viewMode === 'grid'}
                onPressedChange={(pressed) => setViewMode(pressed ? 'grid' : null)}
                aria-label="Grid view"
              >
                <Grid className="mr-2 h-4 w-4" />
                Grid
              </Toggle>
              <Toggle
                variant="outline"
                pressed={viewMode === 'list'}
                onPressedChange={(pressed) => setViewMode(pressed ? 'list' : null)}
                aria-label="List view"
              >
                <LayoutList className="mr-2 h-4 w-4" />
                List
              </Toggle>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Show Details</Label>
              <Toggle
                variant="outline"
                pressed={showDetails}
                onPressedChange={setShowDetails}
                aria-label="Toggle details"
              >
                {showDetails ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Toggle>
            </div>

            <div className="flex items-center justify-between">
              <Label>Show Filters</Label>
              <Toggle
                variant="outline"
                pressed={showFilters}
                onPressedChange={setShowFilters}
                aria-label="Toggle filters"
              >
                <Filter className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>View: {viewMode || 'None'}</p>
            <p>Details: {showDetails ? 'Visible' : 'Hidden'}</p>
            <p>Filters: {showFilters ? 'Visible' : 'Hidden'}</p>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'View mode selector with toggles for grid/list layout and visibility options (details, filters), demonstrating content display customization interfaces.',
      },
    },
  },
};
