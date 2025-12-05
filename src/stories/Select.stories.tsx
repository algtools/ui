import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Globe,
  Clock,
  Users,
  Shield,
  Flag,
  Building,
  Palette,
  Monitor,
  Smartphone,
  CreditCard,
  Truck,
  Package,
  Plane,
  Settings,
  CheckCircle,
  AlertCircle,
  Info,
  Heart,
  ThumbsUp,
  MessageSquare,
  Share,
  Bookmark,
  Eye,
  Download,
  Edit,
  Trash2,
} from 'lucide-react';

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a list of options for the user to pick from—triggered by a button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default select component with a simple list of options, allowing users to choose from a dropdown menu.',
      },
    },
  },
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Grains</SelectLabel>
          <SelectItem value="rice">Rice</SelectItem>
          <SelectItem value="wheat">Wheat</SelectItem>
          <SelectItem value="oats">Oats</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Select with grouped options and separators, organizing items into categories (Fruits, Vegetables, Grains) for better navigation.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="success">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Success
          </div>
        </SelectItem>
        <SelectItem value="warning">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
            Warning
          </div>
        </SelectItem>
        <SelectItem value="error">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            Error
          </div>
        </SelectItem>
        <SelectItem value="info">
          <div className="flex items-center">
            <Info className="mr-2 h-4 w-4 text-blue-500" />
            Information
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Select with color-coded icons for status options (success, warning, error, info), providing visual context for each choice.',
      },
    },
  },
};

export const Countries: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Location Settings</CardTitle>
        <CardDescription>Select your country and timezone</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  United States
                </div>
              </SelectItem>
              <SelectItem value="uk">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  United Kingdom
                </div>
              </SelectItem>
              <SelectItem value="ca">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  Canada
                </div>
              </SelectItem>
              <SelectItem value="au">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  Australia
                </div>
              </SelectItem>
              <SelectItem value="de">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  Germany
                </div>
              </SelectItem>
              <SelectItem value="fr">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  France
                </div>
              </SelectItem>
              <SelectItem value="jp">
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  Japan
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="cst">Central Time (CST)</SelectItem>
                <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Location settings form with country and timezone selects, demonstrating grouped timezone options organized by region.',
      },
    },
  },
};

export const TeamMember: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Assign Task</CardTitle>
        <CardDescription>Choose a team member to assign this task</CardDescription>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sarah">
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">Frontend Developer</div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="mike">
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Mike Chen</div>
                  <div className="text-xs text-muted-foreground">Backend Developer</div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="emily">
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Emily Rodriguez</div>
                  <div className="text-xs text-muted-foreground">UI/UX Designer</div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="david">
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">David Kim</div>
                  <div className="text-xs text-muted-foreground">DevOps Engineer</div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="lisa">
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback>LP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Lisa Park</div>
                  <div className="text-xs text-muted-foreground">Product Manager</div>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Team member selection with avatars and role descriptions, demonstrating rich content in select options for user assignment scenarios.',
      },
    },
  },
};

export const ProjectSettings: Story = {
  render: () => {
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [visibility, setVisibility] = useState('');

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Project Configuration</CardTitle>
          <CardDescription>Configure your project settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Set priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    Low Priority
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                    Medium Priority
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-orange-500"></div>
                    High Priority
                  </div>
                </SelectItem>
                <SelectItem value="critical">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                    Critical Priority
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Development</SelectLabel>
                  <SelectItem value="frontend">
                    <Monitor className="mr-2 h-4 w-4" />
                    Frontend
                  </SelectItem>
                  <SelectItem value="backend">
                    <Building className="mr-2 h-4 w-4" />
                    Backend
                  </SelectItem>
                  <SelectItem value="mobile">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Design</SelectLabel>
                  <SelectItem value="ui">
                    <Palette className="mr-2 h-4 w-4" />
                    UI Design
                  </SelectItem>
                  <SelectItem value="ux">
                    <Users className="mr-2 h-4 w-4" />
                    UX Research
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Operations</SelectLabel>
                  <SelectItem value="devops">
                    <Settings className="mr-2 h-4 w-4" />
                    DevOps
                  </SelectItem>
                  <SelectItem value="qa">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Quality Assurance
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger>
                <SelectValue placeholder="Set visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <div>
                      <div>Public</div>
                      <div className="text-xs text-muted-foreground">Visible to everyone</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="internal">
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    <div>
                      <div>Internal</div>
                      <div className="text-xs text-muted-foreground">Visible to organization</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <div>
                      <div>Private</div>
                      <div className="text-xs text-muted-foreground">Visible to team only</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button className="w-full">Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Project configuration form with multiple selects for priority (color indicators), category (grouped with icons), and visibility (with descriptions), demonstrating complex form scenarios.',
      },
    },
  },
};

export const EcommerceForms: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Shipping Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select shipping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      Standard Shipping
                    </div>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="express">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      Express Delivery
                    </div>
                    <Badge variant="outline">$9.99</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="overnight">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Plane className="mr-2 h-4 w-4" />
                      Overnight Express
                    </div>
                    <Badge variant="outline">$24.99</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Delivery Time</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">
                  <Clock className="mr-2 h-4 w-4" />
                  Morning (9 AM - 12 PM)
                </SelectItem>
                <SelectItem value="afternoon">
                  <Clock className="mr-2 h-4 w-4" />
                  Afternoon (12 PM - 6 PM)
                </SelectItem>
                <SelectItem value="evening">
                  <Clock className="mr-2 h-4 w-4" />
                  Evening (6 PM - 9 PM)
                </SelectItem>
                <SelectItem value="anytime">
                  <Clock className="mr-2 h-4 w-4" />
                  Anytime
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card
                </SelectItem>
                <SelectItem value="paypal">
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      P
                    </div>
                    PayPal
                  </div>
                </SelectItem>
                <SelectItem value="apple">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Apple Pay
                </SelectItem>
                <SelectItem value="google">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Google Pay
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar</SelectItem>
                <SelectItem value="eur">EUR - Euro</SelectItem>
                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'E-commerce form with shipping and payment selects, featuring pricing badges, icons, and time slot options for checkout scenarios.',
      },
    },
  },
};

export const SocialActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Post Actions</CardTitle>
        <CardDescription>Choose an action for this post</CardDescription>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Interactions</SelectLabel>
              <SelectItem value="like">
                <Heart className="mr-2 h-4 w-4 text-red-500" />
                Like Post
              </SelectItem>
              <SelectItem value="thumbs-up">
                <ThumbsUp className="mr-2 h-4 w-4 text-blue-500" />
                Thumbs Up
              </SelectItem>
              <SelectItem value="comment">
                <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                Add Comment
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Sharing</SelectLabel>
              <SelectItem value="share">
                <Share className="mr-2 h-4 w-4" />
                Share Post
              </SelectItem>
              <SelectItem value="bookmark">
                <Bookmark className="mr-2 h-4 w-4" />
                Save to Bookmarks
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Content Actions</SelectLabel>
              <SelectItem value="view">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </SelectItem>
              <SelectItem value="download">
                <Download className="mr-2 h-4 w-4" />
                Download Content
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Management</SelectLabel>
              <SelectItem value="edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit Post
              </SelectItem>
              <SelectItem value="delete">
                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                Delete Post
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Social media action menu with grouped options (Interactions, Sharing, Content Actions, Management), demonstrating organized action menus with color-coded icons.',
      },
    },
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Normal State</h4>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Disabled State</h4>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">With Disabled Items</h4>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Available Option</SelectItem>
            <SelectItem value="option2" disabled>
              Disabled Option
            </SelectItem>
            <SelectItem value="option3">Another Available</SelectItem>
            <SelectItem value="option4" disabled>
              Another Disabled
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Select disabled states: fully disabled component, and individual disabled items within an enabled select, demonstrating different disabled scenarios.',
      },
    },
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small Size</h4>
        <Select>
          <SelectTrigger size="sm" className="w-[200px]">
            <SelectValue placeholder="Small select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm1">Small Option 1</SelectItem>
            <SelectItem value="sm2">Small Option 2</SelectItem>
            <SelectItem value="sm3">Small Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Default Size</h4>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Default select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="def1">Default Option 1</SelectItem>
            <SelectItem value="def2">Default Option 2</SelectItem>
            <SelectItem value="def3">Default Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Select size variants (small and default), demonstrating how to adjust the component size for different layout contexts.',
      },
    },
  },
};
