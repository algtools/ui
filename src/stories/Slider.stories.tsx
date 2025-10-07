import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Volume2,
  VolumeX,
  SunDim,
  DollarSign,
  Clock,
  Thermometer,
  Gauge,
  Timer,
  Zap,
} from 'lucide-react';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An input where the user selects a value from within a given range. Supports single values and ranges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'object',
      description: 'The default value of the slider',
    },
    value: {
      control: 'object',
      description: 'The controlled value of the slider',
    },
    min: {
      control: 'number',
      description: 'The minimum value',
    },
    max: {
      control: 'number',
      description: 'The maximum value',
    },
    step: {
      control: 'number',
      description: 'The step amount',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the slider',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-2">
        <Label>Volume</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Slider defaultValue={[25, 75]} max={100} step={1} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <div className="w-[300px] space-y-6">
      <div className="space-y-2">
        <Label>Quality (Step: 25)</Label>
        <Slider defaultValue={[50]} max={100} step={25} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Rating (Step: 1)</Label>
        <Slider defaultValue={[3]} min={1} max={5} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>⭐</span>
          <span>⭐⭐</span>
          <span>⭐⭐⭐</span>
          <span>⭐⭐⭐⭐</span>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>
  ),
};

export const VerticalSlider: Story = {
  render: () => (
    <div className="flex space-x-8 items-center h-[300px]">
      <div className="space-y-2 text-center">
        <Label>Volume</Label>
        <Slider
          defaultValue={[75]}
          max={100}
          step={1}
          orientation="vertical"
          className="h-[200px]"
        />
        <div className="text-xs text-muted-foreground">75%</div>
      </div>
      <div className="space-y-2 text-center">
        <Label>Brightness</Label>
        <Slider
          defaultValue={[60]}
          max={100}
          step={5}
          orientation="vertical"
          className="h-[200px]"
        />
        <div className="text-xs text-muted-foreground">60%</div>
      </div>
      <div className="space-y-2 text-center">
        <Label>Temperature</Label>
        <Slider
          defaultValue={[22]}
          min={16}
          max={30}
          step={1}
          orientation="vertical"
          className="h-[200px]"
        />
        <div className="text-xs text-muted-foreground">22°C</div>
      </div>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="w-[300px] space-y-6">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Disabled Single</Label>
        <Slider defaultValue={[50]} max={100} step={1} disabled />
      </div>
      <div className="space-y-2">
        <Label className="text-muted-foreground">Disabled Range</Label>
        <Slider defaultValue={[25, 75]} max={100} step={1} disabled />
      </div>
    </div>
  ),
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState([75]);
    const [muted, setMuted] = useState(false);

    const effectiveVolume = muted ? 0 : volume[0];

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Volume Control
          </CardTitle>
          <CardDescription>Adjust the system volume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setMuted(!muted)}>
              {muted || effectiveVolume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1">
              <Slider
                value={muted ? [0] : volume}
                onValueChange={(value) => {
                  setVolume(value);
                  if (value[0] > 0) setMuted(false);
                }}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="text-sm font-medium w-12 text-right">{effectiveVolume}%</div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const PriceRangeFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([250, 750]);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Price Range Filter
          </CardTitle>
          <CardDescription>Set your budget range</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} />
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-muted-foreground">Min: </span>
                <span className="font-medium">${priceRange[0]}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Max: </span>
                <span className="font-medium">${priceRange[1]}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Selected Range:</span>
            <Badge variant="secondary">
              ${priceRange[0]} - ${priceRange[1]}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const TimeRangePicker: Story = {
  render: () => {
    const [timeRange, setTimeRange] = useState([9, 17]); // 9 AM to 5 PM

    const formatTime = (hour: number) => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:00 ${period}`;
    };

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Working Hours
          </CardTitle>
          <CardDescription>Set your available time range</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Slider value={timeRange} onValueChange={setTimeRange} max={23} min={0} step={1} />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">12 AM</span>
              <span className="text-muted-foreground">6 AM</span>
              <span className="text-muted-foreground">12 PM</span>
              <span className="text-muted-foreground">6 PM</span>
              <span className="text-muted-foreground">12 AM</span>
            </div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Available from</div>
            <div className="font-medium">
              {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([80]);
    const [volume, setVolume] = useState([65]);
    const [temperature, setTemperature] = useState([21]);
    const [performance, setPerformance] = useState([70]);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Adjust your device preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <SunDim className="h-4 w-4" />
                Brightness
              </Label>
              <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
            </div>
            <Slider value={brightness} onValueChange={setBrightness} max={100} step={5} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Volume
              </Label>
              <span className="text-sm text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Temperature
              </Label>
              <span className="text-sm text-muted-foreground">{temperature[0]}°C</span>
            </div>
            <Slider value={temperature} onValueChange={setTemperature} min={16} max={30} step={1} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Performance
              </Label>
              <span className="text-sm text-muted-foreground">{performance[0]}%</span>
            </div>
            <Slider value={performance} onValueChange={setPerformance} max={100} step={10} />
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const MediaPlayer: Story = {
  render: () => {
    const [progress, setProgress] = useState([45]);
    const [volume, setVolume] = useState([75]);
    const [playbackSpeed, setPlaybackSpeed] = useState([1]);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentTime = Math.floor((progress[0] / 100) * 180); // 3 minutes total
    const totalTime = 180;

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Media Player Controls
          </CardTitle>
          <CardDescription>Audio/Video playback controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(totalTime)}
              </span>
            </div>
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} />
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Volume
              </Label>
              <span className="text-sm text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider value={volume} onValueChange={setVolume} max={100} step={5} />
          </div>

          {/* Playback Speed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Playback Speed
              </Label>
              <span className="text-sm text-muted-foreground">{playbackSpeed[0]}x</span>
            </div>
            <Slider
              value={playbackSpeed}
              onValueChange={setPlaybackSpeed}
              min={0.5}
              max={2}
              step={0.1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5x</span>
              <span>1x</span>
              <span>1.5x</span>
              <span>2x</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const AgeRangeFilter: Story = {
  render: () => {
    const [ageRange, setAgeRange] = useState([25, 45]);

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Age Range Filter</CardTitle>
          <CardDescription>Filter users by age group</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Slider value={ageRange} onValueChange={setAgeRange} min={18} max={65} step={1} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>18</span>
              <span>30</span>
              <span>45</span>
              <span>65</span>
            </div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold">
              {ageRange[0]} - {ageRange[1]} years old
            </div>
            <div className="text-sm text-muted-foreground">Age range selected</div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const MultipleRanges: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([200, 800]);
    const [ratingRange, setRatingRange] = useState([3, 5]);
    const [yearRange, setYearRange] = useState([2020, 2024]);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Product Filters</CardTitle>
          <CardDescription>Refine your search results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={1000} step={50} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <Slider value={ratingRange} onValueChange={setRatingRange} min={1} max={5} step={0.5} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{ratingRange[0]} ⭐</span>
              <span>{ratingRange[1]} ⭐</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Year Released</Label>
            <Slider value={yearRange} onValueChange={setYearRange} min={2010} max={2024} step={1} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                ${priceRange[0]} - ${priceRange[1]}
              </Badge>
              <Badge variant="secondary">
                {ratingRange[0]}⭐ - {ratingRange[1]}⭐
              </Badge>
              <Badge variant="secondary">
                {yearRange[0]} - {yearRange[1]}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};
