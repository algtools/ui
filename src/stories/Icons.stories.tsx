import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

// Common icons organized by category
const iconCategories = {
  'Actions & Controls': [
    'Play',
    'Pause',
    'Stop',
    'SkipForward',
    'SkipBack',
    'FastForward',
    'Rewind',
    'Volume2',
    'VolumeX',
    'Volume1',
    'VolumeOff',
    'Download',
    'Upload',
    'Share',
    'Copy',
    'Cut',
    'Paste',
    'Edit',
    'Edit2',
    'Edit3',
    'Trash2',
    'Delete',
    'Save',
    'SaveAll',
    'Plus',
    'Minus',
    'X',
    'Check',
    'CheckCircle',
    'XCircle',
    'Search',
    'Filter',
    'Sort',
    'SortAsc',
    'SortDesc',
    'Refresh',
    'RotateCw',
    'RotateCcw',
    'RefreshCw',
    'RefreshCcw',
    'Maximize',
    'Minimize',
    'Square',
    'Circle',
    'Triangle',
    'Power',
    'PowerOff',
    'Settings',
    'Sliders',
    'MoreHorizontal',
    'MoreVertical',
  ],
  'Navigation & Movement': [
    'ChevronUp',
    'ChevronDown',
    'ChevronLeft',
    'ChevronRight',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUpRight',
    'ArrowUpLeft',
    'ArrowDownRight',
    'ArrowDownLeft',
    'Move',
    'Move3d',
    'Navigation',
    'Navigation2',
    'Compass',
    'Home',
    'House',
    'Building',
    'Store',
    'MapPin',
    'Map',
    'Menu',
    'AlignJustify',
    'AlignLeft',
    'AlignCenter',
    'AlignRight',
    'Sidebar',
    'PanelLeft',
    'PanelRight',
    'PanelTop',
    'PanelBottom',
  ],
  Communication: [
    'Mail',
    'Send',
    'MessageSquare',
    'MessageCircle',
    'MessagesSquare',
    'Phone',
    'PhoneCall',
    'PhoneIncoming',
    'PhoneOutgoing',
    'PhoneMissed',
    'Video',
    'VideoOff',
    'Camera',
    'CameraOff',
    'Mic',
    'MicOff',
    'Bell',
    'BellOff',
    'BellRing',
    'Megaphone',
    'Speaker',
    'AtSign',
    'Hash',
    'Users',
    'User',
    'UserPlus',
    'UserMinus',
    'UserCheck',
    'UserX',
  ],
  'Files & Data': [
    'File',
    'FileText',
    'FileImage',
    'FileVideo',
    'FileAudio',
    'FilePlus',
    'FileMinus',
    'Folder',
    'FolderOpen',
    'FolderPlus',
    'Archive',
    'Package',
    'Package2',
    'Database',
    'HardDrive',
    'Server',
    'Cloud',
    'CloudDownload',
    'CloudUpload',
    'Image',
    'Images',
    'Music',
    'Music2',
    'Film',
    'FileSpreadsheet',
    'BookOpen',
    'Book',
    'Bookmark',
    'BookmarkPlus',
    'Library',
    'Newspaper',
  ],
  'Interface Elements': [
    'Eye',
    'EyeOff',
    'Visible',
    'Hidden',
    'Lock',
    'Unlock',
    'Star',
    'StarHalf',
    'Heart',
    'ThumbsUp',
    'ThumbsDown',
    'Flag',
    'Bookmark',
    'Tag',
    'Tags',
    'Award',
    'Trophy',
    'Crown',
    'Zap',
    'Flash',
    'Flame',
    'Sun',
    'Moon',
    'SunMoon',
    'Shield',
    'ShieldCheck',
    'ShieldAlert',
    'ShieldX',
    'Key',
    'Grid',
    'Grid2x2',
    'Grid3x3',
    'List',
    'LayoutGrid',
    'LayoutList',
  ],
  'Status & Feedback': [
    'Info',
    'AlertCircle',
    'AlertTriangle',
    'AlertOctagon',
    'HelpCircle',
    'CheckCircle2',
    'XCircle',
    'Clock',
    'Timer',
    'Hourglass',
    'Activity',
    'TrendingUp',
    'TrendingDown',
    'BarChart',
    'BarChart2',
    'BarChart3',
    'PieChart',
    'LineChart',
    'DotChart',
    'Gauge',
    'Signal',
    'SignalHigh',
    'SignalLow',
    'Battery',
    'BatteryLow',
    'Wifi',
    'WifiOff',
    'Bluetooth',
    'BluetoothConnected',
  ],
  'Text & Formatting': [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'Type',
    'FontFamily',
    'FontSize',
    'Palette',
    'Paintbrush',
    'Brush',
    'Quote',
    'Code',
    'Code2',
    'Terminal',
    'FileCode',
    'FileCode2',
    'Link',
    'Link2',
    'Unlink',
    'Paperclip',
    'Text',
    'TextCursor',
    'Heading1',
    'Heading2',
    'Heading3',
    'Heading4',
    'Heading5',
    'Heading6',
  ],
  'Tools & Utilities': [
    'Wrench',
    'Hammer',
    'Screwdriver',
    'Cog',
    'Gear',
    'Tool',
    'Scissors',
    'Ruler',
    'Compass',
    'Calculator',
    'Printer',
    'Scanner',
    'Flashlight',
    'Magnet',
    'Microscope',
    'Telescope',
    'Thermometer',
    'Scale',
    'Timer',
    'Stopwatch',
    'Clock3',
  ],
  'Shopping & Commerce': [
    'ShoppingCart',
    'ShoppingBag',
    'Package',
    'Gift',
    'CreditCard',
    'Banknote',
    'Coins',
    'Wallet',
    'Receipt',
    'DollarSign',
    'Store',
    'Storefront',
    'Tag',
    'Ticket',
    'Percent',
    'TrendingUp',
  ],
  Transportation: [
    'Car',
    'Truck',
    'Bus',
    'Bike',
    'Plane',
    'Train',
    'Ship',
    'Fuel',
    'Route',
    'MapPin',
    'Navigation',
    'Compass',
    'ParkingCircle',
    'Traffic',
    'Construction',
    'Road',
  ],
  'Weather & Nature': [
    'Sun',
    'Moon',
    'Cloud',
    'CloudRain',
    'CloudSnow',
    'CloudLightning',
    'Umbrella',
    'Droplets',
    'Snowflake',
    'Wind',
    'Rainbow',
    'Tree',
    'TreePine',
    'Flower',
    'Leaf',
    'Mountain',
    'Waves',
  ],
  'Health & Medical': [
    'Heart',
    'HeartPulse',
    'Activity',
    'Thermometer',
    'Pill',
    'Stethoscope',
    'Syringe',
    'Bandage',
    'Cross',
    'Plus',
    'Hospital',
    'Ambulance',
    'FirstAid',
    'Shield',
    'ShieldCheck',
  ],
};

// Convert icon names to actual icon components
const getIconComponent = (
  iconName: string
): React.ComponentType<{ className?: string }> | undefined => {
  return (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    iconName
  ];
};

const meta = {
  title: 'UI/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive showcase of all available Lucide React icons for easy browsing and copying.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive icon browser with search functionality and category organization. Click icons to copy their names, or use the import button to copy import statements. Browse hundreds of Lucide React icons organized by category.',
      },
    },
  },
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Actions & Controls');
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

    const copyIconName = async (iconName: string) => {
      try {
        await navigator.clipboard.writeText(iconName);
        setCopiedIcon(iconName);
        toast.success(`Icon name "${iconName}" copied to clipboard!`);
        setTimeout(() => setCopiedIcon(null), 2000);
      } catch (err) {
        console.error(err);
        toast.error('Failed to copy to clipboard');
      }
    };

    const copyImportStatement = async (iconName: string) => {
      try {
        const importStatement = `import { ${iconName} } from 'lucide-react';`;
        await navigator.clipboard.writeText(importStatement);
        toast.success(`Import statement copied to clipboard!`);
      } catch (err) {
        console.error(err);
        toast.error('Failed to copy to clipboard');
      }
    };

    const filteredIcons = (icons: string[]) => {
      if (!searchTerm) return icons;
      return icons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const allIcons = Object.values(iconCategories).flat();
    const searchResults = searchTerm ? filteredIcons(allIcons) : [];

    return (
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Lucide Icons Showcase</h1>
            <p className="text-muted-foreground">
              Browse and copy Lucide React icon names. Click on any icon to copy its name, or use
              the import button to copy the full import statement.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-sm">
              <Label htmlFor="search">Search Icons</Label>
              <Input
                id="search"
                placeholder="Search for icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Badge variant="outline">{allIcons.length} icons total</Badge>
              {searchTerm && <Badge variant="secondary">{searchResults.length} results</Badge>}
            </div>
          </div>
        </div>

        {searchTerm ? (
          // Search Results
          <Card>
            <CardHeader>
              <CardTitle>Search Results for &quot;{searchTerm}&quot;</CardTitle>
              <CardDescription>
                {searchResults.length} icon{searchResults.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {searchResults.map((iconName) => {
                  const IconComponent = getIconComponent(iconName);
                  if (!IconComponent) return null;

                  return (
                    <div
                      key={iconName}
                      className="group flex flex-col items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => copyIconName(iconName)}
                    >
                      <div className="flex items-center justify-center w-8 h-8 mb-2">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-xs text-center space-y-1">
                        <div
                          className={`font-mono break-all ${copiedIcon === iconName ? 'text-green-600 font-medium' : ''}`}
                        >
                          {iconName}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyImportStatement(iconName);
                          }}
                        >
                          Import
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {searchResults.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No icons found matching &quot;{searchTerm}&quot;
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Category View
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
              {Object.keys(iconCategories)
                .slice(0, 6)
                .map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-xs p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.replace(' & ', ' &\n')}
                  </TabsTrigger>
                ))}
            </TabsList>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 mt-4">
              {Object.keys(iconCategories)
                .slice(6)
                .map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs h-auto py-2"
                  >
                    {category}
                  </Button>
                ))}
            </div>

            {Object.entries(iconCategories).map(([category, icons]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                    <CardDescription>
                      {icons.length} icon{icons.length !== 1 ? 's' : ''} in this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                      {icons.map((iconName) => {
                        const IconComponent = getIconComponent(iconName);
                        if (!IconComponent) return null;

                        return (
                          <div
                            key={iconName}
                            className="group flex flex-col items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => copyIconName(iconName)}
                          >
                            <div className="flex items-center justify-center w-8 h-8 mb-2">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="text-xs text-center space-y-1">
                              <div
                                className={`font-mono break-all ${copiedIcon === iconName ? 'text-green-600 font-medium' : ''}`}
                              >
                                {iconName}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyImportStatement(iconName);
                                }}
                              >
                                Import
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
            <CardDescription>How to use these icons in your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Install Lucide React</h4>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                npm install lucide-react
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">2. Import and Use Icons</h4>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm space-y-1">
                <div>import &#123; Heart, Star, Settings &#125; from &apos;lucide-react&apos;;</div>
                <div></div>
                <div>function MyComponent() &#123;</div>
                <div>&nbsp;&nbsp;return (</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Heart className=&quot;w-6 h-6
                  text-red-500&quot; /&gt;
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Star className=&quot;w-4 h-4&quot; /&gt;
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Settings size=&#123;24&#125; /&gt;
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</div>
                <div>&nbsp;&nbsp;);</div>
                <div>&#125;</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">3. Common Props</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <code>size</code>: Number (e.g., 24) or string (e.g., &quot;24px&quot;)
                </li>
                <li>
                  • <code>className</code>: CSS classes (e.g., &quot;w-6 h-6 text-blue-500&quot;)
                </li>
                <li>
                  • <code>color</code>: Color value (e.g., &quot;#3b82f6&quot;,
                  &quot;currentColor&quot;)
                </li>
                <li>
                  • <code>strokeWidth</code>: Number (default: 2)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const IconSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of common icon sizes from extra small (12px) to hero size (40px), showing how icons scale and the corresponding Tailwind CSS classes.',
      },
    },
  },
  render: () => {
    const sampleIcons = ['Heart', 'Star', 'Settings', 'Bell', 'User', 'Home'];

    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Icon Sizes</h2>
          <p className="text-muted-foreground">Common icon sizes used in UI components</p>
        </div>

        <div className="grid gap-6">
          {[
            { size: 'xs', className: 'w-3 h-3', description: '12px - Very small icons' },
            { size: 'sm', className: 'w-4 h-4', description: '16px - Small icons' },
            { size: 'md', className: 'w-5 h-5', description: '20px - Medium icons' },
            { size: 'lg', className: 'w-6 h-6', description: '24px - Large icons' },
            { size: 'xl', className: 'w-8 h-8', description: '32px - Extra large icons' },
            { size: '2xl', className: 'w-10 h-10', description: '40px - Hero icons' },
          ].map(({ size, className, description }) => (
            <Card key={size}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {size.toUpperCase()} - {description}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 flex-wrap">
                  {sampleIcons.map((iconName) => {
                    const IconComponent = getIconComponent(iconName);
                    if (!IconComponent) return null;

                    return (
                      <div key={iconName} className="flex flex-col items-center space-y-2">
                        <IconComponent className={className} />
                        <span className="text-xs text-muted-foreground font-mono">{className}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 bg-muted p-3 rounded-lg font-mono text-sm">
                  &lt;Heart className=&quot;{className}&quot; /&gt;
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

export const IconColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Different ways to color icons using Tailwind CSS classes, including semantic colors (primary, secondary, destructive), status colors (success, warning, error, info), and custom color options.',
      },
    },
  },
  render: () => {
    const IconComponent = getIconComponent('Heart');
    if (!IconComponent) return <div>Icon not found</div>;

    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Icon Colors</h2>
          <p className="text-muted-foreground">
            Different ways to color icons using Tailwind CSS classes
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Semantic Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Primary', className: 'text-primary' },
                  { name: 'Secondary', className: 'text-secondary-foreground' },
                  { name: 'Destructive', className: 'text-destructive' },
                  { name: 'Muted', className: 'text-muted-foreground' },
                ].map(({ name, className }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center space-y-2 p-4 border rounded-lg"
                  >
                    <IconComponent className={`w-8 h-8 ${className}`} />
                    <span className="text-sm font-medium">{name}</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{className}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Success', className: 'text-green-500' },
                  { name: 'Warning', className: 'text-yellow-500' },
                  { name: 'Error', className: 'text-red-500' },
                  { name: 'Info', className: 'text-blue-500' },
                ].map(({ name, className }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center space-y-2 p-4 border rounded-lg"
                  >
                    <IconComponent className={`w-8 h-8 ${className}`} />
                    <span className="text-sm font-medium">{name}</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{className}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[
                  { name: 'Purple', className: 'text-purple-500' },
                  { name: 'Pink', className: 'text-pink-500' },
                  { name: 'Indigo', className: 'text-indigo-500' },
                  { name: 'Teal', className: 'text-teal-500' },
                  { name: 'Orange', className: 'text-orange-500' },
                  { name: 'Cyan', className: 'text-cyan-500' },
                ].map(({ name, className }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center space-y-2 p-4 border rounded-lg"
                  >
                    <IconComponent className={`w-8 h-8 ${className}`} />
                    <span className="text-sm font-medium">{name}</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{className}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
};
