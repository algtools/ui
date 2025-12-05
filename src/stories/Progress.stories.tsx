import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Image,
  Video,
  Music,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A visual indicator showing the completion progress of a task or operation, built on Radix UI Progress.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    indicatorColor: {
      control: 'text',
      description:
        'Custom Tailwind CSS class for the progress indicator color (e.g., "bg-red-500")',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    indicatorColor: undefined,
  },
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <Progress {...args} />
      <p className="text-sm text-muted-foreground text-center">{args.value}% complete</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A default progress bar showing completion percentage, demonstrating basic progress indicator functionality.',
      },
    },
  },
};

export const ProgressStates: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Empty (0%)</h4>
        <Progress value={0} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Quarter (25%)</h4>
        <Progress value={25} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Half (50%)</h4>
        <Progress value={50} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Three Quarters (75%)</h4>
        <Progress value={75} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Complete (100%)</h4>
        <Progress value={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars in different states (0%, 25%, 50%, 75%, 100%), demonstrating various completion levels.',
      },
    },
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default (Primary)</h4>
        <Progress value={65} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Success (Green)</h4>
        <Progress value={65} indicatorColor="bg-green-500" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Warning (Yellow)</h4>
        <Progress value={65} indicatorColor="bg-yellow-500" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Danger (Red)</h4>
        <Progress value={65} indicatorColor="bg-red-500" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Info (Blue)</h4>
        <Progress value={65} indicatorColor="bg-blue-500" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Purple</h4>
        <Progress value={65} indicatorColor="bg-purple-500" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Gradient</h4>
        <Progress value={65} indicatorColor="bg-gradient-to-r from-blue-500 to-purple-600" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with custom colors, demonstrating how to customize progress bar appearance with different color schemes.',
      },
    },
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small (h-1)</h4>
        <Progress value={65} className="h-1" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default (h-2)</h4>
        <Progress value={65} />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Medium (h-3)</h4>
        <Progress value={65} className="h-3" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large (h-4)</h4>
        <Progress value={65} className="h-4" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Extra Large (h-6)</h4>
        <Progress value={65} className="h-6" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars in different sizes (small, medium, large), demonstrating size variations.',
      },
    },
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      if (!isRunning) return;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => {
      setIsRunning(true);
    };

    const handleStop = () => {
      setIsRunning(false);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Animated Progress</h4>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleStart} disabled={isRunning || progress === 100} size="sm">
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
          <Button onClick={handleStop} disabled={!isRunning} variant="outline" size="sm">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An animated progress bar that updates dynamically, demonstrating smooth progress animations and transitions.',
      },
    },
  },
};

export const FileUpload: Story = {
  render: () => {
    const [uploads] = useState([
      { id: 1, name: 'document.pdf', progress: 100, status: 'completed' },
      { id: 2, name: 'presentation.pptx', progress: 75, status: 'uploading' },
      { id: 3, name: 'image.jpg', progress: 45, status: 'uploading' },
      { id: 4, name: 'video.mp4', progress: 0, status: 'failed' },
    ]);

    const getIcon = (filename: string) => {
      if (filename.endsWith('.pdf') || filename.endsWith('.doc')) return FileText;
      if (filename.endsWith('.jpg') || filename.endsWith('.png')) return Image;
      if (filename.endsWith('.mp4') || filename.endsWith('.avi')) return Video;
      if (filename.endsWith('.mp3') || filename.endsWith('.wav')) return Music;
      return FileText;
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed':
          return 'text-green-600';
        case 'uploading':
          return 'text-blue-600';
        case 'failed':
          return 'text-red-600';
        default:
          return 'text-muted-foreground';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'completed':
          return CheckCircle;
        case 'uploading':
          return Upload;
        case 'failed':
          return AlertCircle;
        default:
          return Clock;
      }
    };

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            File Uploads
          </CardTitle>
          <CardDescription>Upload progress for multiple files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploads.map((upload) => {
            const Icon = getIcon(upload.name);
            const StatusIcon = getStatusIcon(upload.status);
            return (
              <div key={upload.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{upload.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(upload.status)}`} />
                    <span className="text-xs text-muted-foreground">
                      {upload.status === 'completed'
                        ? 'Complete'
                        : upload.status === 'failed'
                          ? 'Failed'
                          : `${upload.progress}%`}
                    </span>
                  </div>
                </div>
                <Progress
                  value={upload.progress}
                  indicatorColor={
                    upload.status === 'failed'
                      ? 'bg-red-500'
                      : upload.status === 'completed'
                        ? 'bg-green-500'
                        : undefined
                  }
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A file upload progress indicator showing upload status, file name, and completion percentage.',
      },
    },
  },
};

export const DownloadProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
      if (!isDownloading) return;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsDownloading(false);
            return 100;
          }
          return prev + Math.random() * 3; // Simulate variable download speed
        });
      }, 100);

      return () => clearInterval(timer);
    }, [isDownloading]);

    const startDownload = () => {
      setProgress(0);
      setIsDownloading(true);
    };

    const formatSize = (progress: number) => {
      const totalSize = 250; // MB
      const downloaded = (totalSize * progress) / 100;
      return `${downloaded.toFixed(1)} MB / ${totalSize} MB`;
    };

    const formatSpeed = () => {
      if (!isDownloading) return '0 KB/s';
      const speed = Math.random() * 2000 + 500; // KB/s
      return `${speed.toFixed(0)} KB/s`;
    };

    const formatTimeLeft = (progress: number) => {
      if (progress === 0 || progress === 100) return '--';
      const remaining = ((100 - progress) / progress) * 10; // Rough estimate
      return `${Math.ceil(remaining)}s left`;
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Software Update
          </CardTitle>
          <CardDescription>macOS Sonoma 14.2.1</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Download Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Downloaded</p>
              <p className="font-medium">{formatSize(progress)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Speed</p>
              <p className="font-medium">{formatSpeed()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Time left</p>
              <p className="font-medium">{formatTimeLeft(progress)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">
                {progress === 100 ? 'Complete' : isDownloading ? 'Downloading' : 'Paused'}
              </p>
            </div>
          </div>
          <Button
            onClick={startDownload}
            disabled={isDownloading}
            className="w-full"
            variant={progress === 100 ? 'default' : 'outline'}
          >
            {progress === 100 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Install Now
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Downloading...' : 'Start Download'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A download progress indicator showing download status, file size, and transfer speed.',
      },
    },
  },
};

export const FormCompletion: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const steps = [
      { number: 1, title: 'Personal Info', description: 'Name, email, phone' },
      { number: 2, title: 'Address', description: 'Billing and shipping' },
      { number: 3, title: 'Payment', description: 'Payment method' },
      { number: 4, title: 'Review', description: 'Confirm details' },
    ];

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Account Setup</CardTitle>
          <CardDescription>Complete your profile to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  step.number === currentStep
                    ? 'border-primary bg-primary/5'
                    : step.number < currentStep
                      ? 'border-green-200 bg-green-50'
                      : 'border-muted'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step.number < currentStep
                      ? 'bg-green-500 text-white'
                      : step.number === currentStep
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.number < currentStep ? <CheckCircle className="w-4 h-4" /> : step.number}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {step.number === currentStep && <Badge variant="secondary">Current</Badge>}
                {step.number < currentStep && (
                  <Badge variant="default" className="bg-green-500">
                    Complete
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              disabled={currentStep === totalSteps}
              className="flex-1"
            >
              {currentStep === totalSteps ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A form completion progress indicator showing how many form steps have been completed.',
      },
    },
  },
};

export const SkillLevels: Story = {
  render: () => {
    const skills = [
      { name: 'React', level: 90, color: 'bg-blue-500' },
      { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
      { name: 'Node.js', level: 75, color: 'bg-green-500' },
      { name: 'Python', level: 70, color: 'bg-yellow-500' },
      { name: 'GraphQL', level: 60, color: 'bg-pink-500' },
      { name: 'Docker', level: 50, color: 'bg-cyan-500' },
    ];

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>My proficiency levels in various technologies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} indicatorColor={skill.color} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Skill level progress bars showing proficiency levels for different skills, demonstrating skill assessment displays.',
      },
    },
  },
};

export const StorageUsage: Story = {
  render: () => {
    const storageData = {
      total: 1000, // GB
      used: 650, // GB
      breakdown: [
        { type: 'Documents', size: 250, color: 'bg-blue-500' },
        { type: 'Photos', size: 200, color: 'bg-green-500' },
        { type: 'Videos', size: 150, color: 'bg-red-500' },
        { type: 'Music', size: 50, color: 'bg-purple-500' },
      ],
    };

    const usagePercentage = (storageData.used / storageData.total) * 100;

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>
            {storageData.used} GB of {storageData.total} GB used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Usage</span>
              <span className="text-sm text-muted-foreground">{Math.round(usagePercentage)}%</span>
            </div>
            <Progress value={usagePercentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {storageData.total - storageData.used} GB available
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Breakdown by type</h4>
            {storageData.breakdown.map((item) => {
              const percentage = (item.size / storageData.total) * 100;
              return (
                <div key={item.type} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.type}</span>
                    <span className="text-xs text-muted-foreground">{item.size} GB</span>
                  </div>
                  <Progress value={percentage} indicatorColor={item.color} className="h-1" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Storage usage progress indicators showing disk space usage, demonstrating system resource monitoring.',
      },
    },
  },
};
