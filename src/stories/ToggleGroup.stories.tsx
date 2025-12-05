import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Undo,
  Redo,
  Copy,
  Scissors,
  Clipboard,
  BarChart3,
  PieChart,
  LineChart,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Share,
  Download,
  Grid,
  LayoutList,
  Smartphone,
  Tablet,
  Monitor,
  Users,
  Globe,
  Building,
  Home,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
} from 'lucide-react';

const meta = {
  title: 'Forms/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A set of two-state buttons that can be toggled on or off.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Whether multiple items can be selected at once',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'Visual style of the toggle group',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the toggle group items',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle group is disabled',
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label>Text Alignment</Label>
      <ToggleGroup {...args}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify">
          <AlignJustify className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default toggle group with single selection mode, allowing users to choose one option from multiple related toggles (commonly used for alignment, view modes, etc.).',
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
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>Outline Variant</Label>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle group variants (default and outline) demonstrating different visual styles for grouped toggle buttons.',
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
        <ToggleGroup type="single" size="sm" variant="outline">
          <ToggleGroupItem value="bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>Default Size</Label>
        <ToggleGroup type="single" size="default" variant="outline">
          <ToggleGroupItem value="bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>Large Size</Label>
        <ToggleGroup type="single" size="lg" variant="outline">
          <ToggleGroupItem value="bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle group size variants (small, default, large) demonstrating how to adjust the component size for different layout contexts and toolbars.',
      },
    },
  },
};

export const MultipleSelection: Story = {
  args: {},
  render: () => {
    const [formatting, setFormatting] = useState<string[]>([]);

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Text Formatting (Multiple Selection)</Label>
          <ToggleGroup
            type="multiple"
            value={formatting}
            onValueChange={setFormatting}
            variant="outline"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="code" aria-label="Code">
              <Code className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="link" aria-label="Link">
              <Link className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {formatting.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Active formatting: {formatting.join(', ')}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toggle group with multiple selection mode, allowing users to select multiple options simultaneously (useful for text formatting where multiple styles can be active).',
      },
    },
  },
};

export const WithText: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>View Mode</Label>
        <ToggleGroup type="single" variant="outline" defaultValue="grid">
          <ToggleGroupItem value="grid">
            <Grid className="mr-2 h-4 w-4" />
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <LayoutList className="mr-2 h-4 w-4" />
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>File Type Filter</Label>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem value="images">
            <ImageIcon className="mr-2 h-4 w-4" />
            Images
          </ToggleGroupItem>
          <ToggleGroupItem value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </ToggleGroupItem>
          <ToggleGroupItem value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </ToggleGroupItem>
          <ToggleGroupItem value="audio">
            <Music className="mr-2 h-4 w-4" />
            Audio
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle groups with text labels alongside icons, providing clearer context for users when icons alone might be ambiguous (view modes, file type filters).',
      },
    },
  },
};

export const TextEditor: Story = {
  args: {},
  render: () => {
    const [formatting, setFormatting] = useState<string[]>(['bold']);
    const [alignment, setAlignment] = useState('left');
    const [listType, setListType] = useState('');

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Rich Text Editor Toolbar</CardTitle>
          <CardDescription>Toggle groups for text formatting controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Text Formatting */}
            <div className="space-y-2">
              <Label>Formatting</Label>
              <ToggleGroup
                type="multiple"
                value={formatting}
                onValueChange={setFormatting}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="code">
                  <Code className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Alignment */}
            <div className="space-y-2">
              <Label>Alignment</Label>
              <ToggleGroup
                type="single"
                value={alignment}
                onValueChange={setAlignment}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="justify">
                  <AlignJustify className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Lists */}
            <div className="space-y-2">
              <Label>Lists</Label>
              <ToggleGroup
                type="single"
                value={listType}
                onValueChange={setListType}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="bullet">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="numbered">
                  <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="quote">
                  <Quote className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Label>Actions</Label>
            <ToggleGroup type="multiple" variant="outline" size="sm">
              <ToggleGroupItem value="undo">
                <Undo className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="redo">
                <Redo className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="copy">
                <Copy className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="cut">
                <Scissors className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="paste">
                <Clipboard className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Active formatting: {formatting.length > 0 ? formatting.join(', ') : 'None'}</p>
            <p>Text alignment: {alignment || 'None'}</p>
            <p>List type: {listType || 'None'}</p>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Rich text editor toolbar with multiple toggle groups for formatting (multiple selection), alignment (single selection), lists (single selection), and actions, demonstrating a complete editor interface.',
      },
    },
  },
};

export const MediaPlayer: Story = {
  args: {},
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState('on');
    const [repeat, setRepeat] = useState('');

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Media Player Controls</CardTitle>
          <CardDescription>Toggle-based media player interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Playback Controls */}
          <div className="space-y-2">
            <Label>Playback</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={isPlaying ? 'play' : ''}
              onValueChange={(value) => setIsPlaying(value === 'play')}
            >
              <ToggleGroupItem value="prev">
                <SkipBack className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="play">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </ToggleGroupItem>
              <ToggleGroupItem value="next">
                <SkipForward className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex gap-2">
              <ToggleGroup
                type="single"
                value={volume}
                onValueChange={setVolume}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="off">
                  <VolumeX className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="on">
                  <Volume2 className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup
                type="single"
                value={repeat}
                onValueChange={setRepeat}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="shuffle">
                  <Shuffle className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="repeat">
                  <Repeat className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup type="multiple" variant="outline" size="sm">
                <ToggleGroupItem value="favorite">
                  <Heart className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="share">
                  <Share className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="download">
                  <Download className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
            <p>Volume: {volume === 'on' ? 'On' : 'Muted'}</p>
            <p>Mode: {repeat || 'Normal'}</p>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Media player controls with toggle groups for playback (prev/play/next), volume (on/off), repeat mode (shuffle/repeat), and actions (favorite/share/download), demonstrating audio/video player interfaces.',
      },
    },
  },
};

export const Dashboard: Story = {
  args: {},
  render: () => {
    const [chartType, setChartType] = useState('bar');
    const [period, setPeriod] = useState('week');
    const [filters, setFilters] = useState<string[]>([]);

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Configure your dashboard view and filters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chart Type */}
          <div className="space-y-2">
            <Label>Chart Type</Label>
            <ToggleGroup
              type="single"
              value={chartType}
              onValueChange={setChartType}
              variant="outline"
            >
              <ToggleGroupItem value="bar">
                <BarChart3 className="mr-2 h-4 w-4" />
                Bar Chart
              </ToggleGroupItem>
              <ToggleGroupItem value="line">
                <LineChart className="mr-2 h-4 w-4" />
                Line Chart
              </ToggleGroupItem>
              <ToggleGroupItem value="pie">
                <PieChart className="mr-2 h-4 w-4" />
                Pie Chart
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <Label>Time Period</Label>
            <ToggleGroup
              type="single"
              value={period}
              onValueChange={setPeriod}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
              <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
              <ToggleGroupItem value="year">Year</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Filters */}
          <div className="space-y-2">
            <Label>Data Filters</Label>
            <ToggleGroup
              type="multiple"
              value={filters}
              onValueChange={setFilters}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </ToggleGroupItem>
              <ToggleGroupItem value="revenue">Revenue</ToggleGroupItem>
              <ToggleGroupItem value="sessions">Sessions</ToggleGroupItem>
              <ToggleGroupItem value="conversions">Conversions</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Current Configuration</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Chart: {chartType}</p>
              <p>Period: {period}</p>
              <p>Filters: {filters.length > 0 ? filters.join(', ') : 'None'}</p>
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
          'Analytics dashboard with toggle groups for chart type selection (single), time period (single), and data filters (multiple), demonstrating dashboard configuration interfaces.',
      },
    },
  },
};

export const ResponsiveDesign: Story = {
  args: {},
  render: () => {
    const [device, setDevice] = useState('desktop');
    const [orientation, setOrientation] = useState('portrait');

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Responsive Design Preview</CardTitle>
          <CardDescription>Test your design across different devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Device Type</Label>
            <ToggleGroup type="single" value={device} onValueChange={setDevice} variant="outline">
              <ToggleGroupItem value="mobile">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </ToggleGroupItem>
              <ToggleGroupItem value="tablet">
                <Tablet className="mr-2 h-4 w-4" />
                Tablet
              </ToggleGroupItem>
              <ToggleGroupItem value="desktop">
                <Monitor className="mr-2 h-4 w-4" />
                Desktop
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>Orientation</Label>
            <ToggleGroup
              type="single"
              value={orientation}
              onValueChange={setOrientation}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="portrait">Portrait</ToggleGroupItem>
              <ToggleGroupItem value="landscape">Landscape</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="text-center text-sm text-muted-foreground">
              Preview: {device} - {orientation}
            </div>
            <div
              className={`mx-auto mt-2 bg-background border rounded ${
                device === 'mobile'
                  ? orientation === 'portrait'
                    ? 'w-16 h-28'
                    : 'w-28 h-16'
                  : device === 'tablet'
                    ? orientation === 'portrait'
                      ? 'w-24 h-32'
                      : 'w-32 h-24'
                    : 'w-32 h-20'
              }`}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Responsive design preview tool with toggle groups for device type (mobile/tablet/desktop) and orientation (portrait/landscape), demonstrating design testing interfaces.',
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
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>Disabled Group</Label>
        <ToggleGroup type="single" variant="outline" disabled>
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-muted-foreground">This entire group is disabled</p>
      </div>

      <div className="space-y-2">
        <Label>Individual Disabled Items</Label>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Available</ToggleGroupItem>
          <ToggleGroupItem value="option2" disabled>
            Disabled
          </ToggleGroupItem>
          <ToggleGroupItem value="option3">Available</ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-muted-foreground">Only the middle option is disabled</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Toggle group disabled states: fully disabled group and individual disabled items within an enabled group, demonstrating different disabled scenarios.',
      },
    },
  },
};

export const WeatherWidget: Story = {
  args: {},
  render: () => {
    const [location, setLocation] = useState('home');
    const [units, setUnits] = useState('celsius');
    const [display, setDisplay] = useState<string[]>(['temperature']);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Weather Widget Settings</CardTitle>
          <CardDescription>Customize your weather display preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Location Type</Label>
            <ToggleGroup
              type="single"
              value={location}
              onValueChange={setLocation}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="home">
                <Home className="mr-2 h-4 w-4" />
                Home
              </ToggleGroupItem>
              <ToggleGroupItem value="work">
                <Building className="mr-2 h-4 w-4" />
                Work
              </ToggleGroupItem>
              <ToggleGroupItem value="current">
                <Globe className="mr-2 h-4 w-4" />
                Current
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>Temperature Units</Label>
            <ToggleGroup
              type="single"
              value={units}
              onValueChange={setUnits}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="celsius">°C</ToggleGroupItem>
              <ToggleGroupItem value="fahrenheit">°F</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>Weather Conditions</Label>
            <ToggleGroup type="single" variant="outline" size="sm">
              <ToggleGroupItem value="sunny">
                <Sun className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="cloudy">
                <Cloud className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="rainy">
                <CloudRain className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="snowy">
                <Snowflake className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>Display Options</Label>
            <ToggleGroup
              type="multiple"
              value={display}
              onValueChange={setDisplay}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="temperature">Temp</ToggleGroupItem>
              <ToggleGroupItem value="humidity">Humidity</ToggleGroupItem>
              <ToggleGroupItem value="wind">Wind</ToggleGroupItem>
              <ToggleGroupItem value="pressure">Pressure</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Location: {location}</p>
            <p>Units: {units}</p>
            <p>Showing: {display.join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Weather widget settings with toggle groups for location selection (single), temperature units (single), weather conditions (single), and display options (multiple), demonstrating widget configuration interfaces.',
      },
    },
  },
};
