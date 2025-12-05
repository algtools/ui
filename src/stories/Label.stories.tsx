import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Mail,
  User,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Building,
  CreditCard,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Globe,
  Shield,
  Key,
} from 'lucide-react';

const meta = {
  title: 'Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The ID of the form control this label is associated with',
    },
    children: {
      control: 'text',
      description: 'The label text content',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Label',
    htmlFor: 'default-input',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <Input id="default-input" placeholder="Enter text..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default label component associated with an input field using the htmlFor attribute for proper accessibility.',
      },
    },
  },
};

export const BasicLabels: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text Input</Label>
        <Input id="text-input" type="text" placeholder="Enter your name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-input">Email Address</Label>
        <Input id="email-input" type="email" placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-input">Password</Label>
        <Input id="password-input" type="password" placeholder="Enter password" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="textarea-input">Message</Label>
        <Textarea id="textarea-input" placeholder="Type your message here..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic label examples for different input types (text, email, password, textarea), demonstrating standard form labeling patterns.',
      },
    },
  },
};

export const RequiredAndOptional: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="required-input">
          Full Name
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input id="required-input" type="text" placeholder="John Doe" required />
        <p className="text-xs text-muted-foreground">Required field</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="optional-input">
          Middle Name
          <Badge variant="secondary" className="ml-2 text-xs">
            Optional
          </Badge>
        </Label>
        <Input id="optional-input" type="text" placeholder="Optional middle name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-input">
          Phone Number
          <span className="text-muted-foreground text-xs ml-2">(optional)</span>
        </Label>
        <Input id="phone-input" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels indicating required fields (with asterisk) and optional fields (with badge or text), helping users understand form requirements.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="user-input">
          <User className="h-4 w-4" />
          Username
        </Label>
        <Input id="user-input" type="text" placeholder="johndoe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-icon-input">
          <Mail className="h-4 w-4" />
          Email Address
          <span className="text-destructive">*</span>
        </Label>
        <Input id="email-icon-input" type="email" placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-icon-input">
          <Phone className="h-4 w-4" />
          Phone Number
        </Label>
        <Input id="phone-icon-input" type="tel" placeholder="+1 (555) 123-4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location-input">
          <MapPin className="h-4 w-4" />
          Location
        </Label>
        <Input id="location-input" type="text" placeholder="New York, NY" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels with icons providing visual context for different input types, enhancing user understanding and form aesthetics.',
      },
    },
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="username-input">Username</Label>
        <Input id="username-input" type="text" placeholder="johndoe123" />
        <p className="text-xs text-muted-foreground">
          Choose a unique username. Only letters, numbers, and underscores allowed.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-strong">
          Password
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input id="password-strong" type="password" placeholder="Enter strong password" />
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters with uppercase, lowercase, numbers, and symbols.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website-input">Website URL</Label>
        <Input id="website-input" type="url" placeholder="https://example.com" />
        <p className="text-xs text-muted-foreground">
          Include the full URL starting with http:// or https://
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels with descriptive helper text below inputs, providing guidance on input requirements and format expectations.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="valid-input" className="text-green-700 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          Valid Email
        </Label>
        <Input
          id="valid-input"
          type="email"
          value="john@example.com"
          className="border-green-300 focus:border-green-500"
        />
        <p className="text-xs text-green-600 dark:text-green-400">✓ Valid email format</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="error-input" className="text-destructive">
          <AlertCircle className="h-4 w-4" />
          Invalid Email
        </Label>
        <Input
          id="error-input"
          type="email"
          value="invalid-email"
          aria-invalid="true"
          className="border-destructive focus:border-destructive"
        />
        <p className="text-xs text-destructive">⚠ Please enter a valid email address</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled-input" className="opacity-50">
          <Lock className="h-4 w-4" />
          Disabled Field
        </Label>
        <Input id="disabled-input" type="text" value="Cannot edit" disabled />
        <p className="text-xs text-muted-foreground">This field is currently disabled</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels styled to reflect validation states (valid, error, disabled), providing visual feedback on form field status.',
      },
    },
  },
};

export const FormControlTypes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div className="space-y-4">
        <h3 className="font-semibold">Checkbox</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Radio Group</h3>
        <RadioGroup defaultValue="option1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="option1" />
            <Label htmlFor="option1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="option2" />
            <Label htmlFor="option2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="option3" />
            <Label htmlFor="option3">Option 3</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Switch</h3>
        <div className="flex items-center space-x-2">
          <Switch id="notifications" />
          <Label htmlFor="notifications">Enable notifications</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country-select">Country</Label>
        <Select>
          <SelectTrigger id="country-select">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels used with different form control types (checkbox, radio group, switch, select), demonstrating proper labeling for various input components.',
      },
    },
  },
};

export const LabelSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="small-input" className="text-xs">
          Small Label
        </Label>
        <Input id="small-input" type="text" placeholder="Small label input" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="default-size-input">Default Label</Label>
        <Input id="default-size-input" type="text" placeholder="Default label input" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="large-input" className="text-base font-semibold">
          Large Label
        </Label>
        <Input id="large-input" type="text" placeholder="Large label input" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="extra-large-input" className="text-lg font-bold">
          Extra Large Label
        </Label>
        <Input id="extra-large-input" type="text" placeholder="Extra large label input" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels in different sizes (small, default, large, extra large) with varying font weights, demonstrating typography options for different design needs.',
      },
    },
  },
};

export const ComplexForm: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              <User className="h-4 w-4" />
              First Name
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input id="firstName" type="text" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input id="lastName" type="text" placeholder="Doe" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="h-4 w-4" />
            Email Address
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input id="email" type="email" placeholder="john@example.com" required />
          <p className="text-xs text-muted-foreground">We&apos;ll never share your email address</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            <Phone className="h-4 w-4" />
            Phone Number
            <Badge variant="secondary" className="ml-2 text-xs">
              Optional
            </Badge>
          </Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">
            <Building className="h-4 w-4" />
            Company
          </Label>
          <Input id="company" type="text" placeholder="Acme Corporation" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            <Lock className="h-4 w-4" />
            Password
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input id="password" type="password" placeholder="Create strong password" required />
          <p className="text-xs text-muted-foreground">
            Must contain at least 8 characters with numbers and symbols
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-primary underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary underline">
                Privacy Policy
              </a>
              <span className="text-destructive ml-1">*</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="text-sm">
              Subscribe to our newsletter for updates and promotions
            </Label>
          </div>
        </div>

        <Button className="w-full">Create Account</Button>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete registration form example demonstrating labels with icons, required indicators, optional badges, descriptions, and checkbox labels in a real-world scenario.',
      },
    },
  },
};

export const PaymentLabels: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Enter your payment details securely</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">
            <CreditCard className="h-4 w-4" />
            Card Number
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input id="card-number" type="text" placeholder="1234 5678 9012 3456" maxLength={19} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">
              <Calendar className="h-4 w-4" />
              Expiry Date
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input id="expiry" type="text" placeholder="MM/YY" maxLength={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">
              <Shield className="h-4 w-4" />
              CVV
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input id="cvv" type="password" placeholder="123" maxLength={4} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardholder">
            <User className="h-4 w-4" />
            Cardholder Name
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input id="cardholder" type="text" placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billing-address">
            <MapPin className="h-4 w-4" />
            Billing Address
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input id="billing-address" type="text" placeholder="123 Main St, City, State 12345" />
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>Your payment information is encrypted and secure.</AlertDescription>
        </Alert>

        <Button className="w-full">
          <Lock className="mr-2 h-4 w-4" />
          Complete Payment
        </Button>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Payment form with labels featuring security-focused icons and required indicators, demonstrating labels in a financial transaction context.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="accessible-input">
          Search Query
          <span className="sr-only">(required)</span>
          <span className="text-destructive ml-1" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="accessible-input"
          type="search"
          placeholder="Enter search terms..."
          aria-describedby="search-help"
          required
        />
        <p id="search-help" className="text-xs text-muted-foreground">
          Use keywords to find relevant content. Press Enter to search.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-accessible">
          New Password
          <span className="sr-only">(required, minimum 8 characters)</span>
          <span className="text-destructive ml-1" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="password-accessible"
          type="password"
          placeholder="Create password..."
          aria-describedby="password-requirements"
          minLength={8}
          required
        />
        <p id="password-requirements" className="text-xs text-muted-foreground">
          Password must be at least 8 characters long and include uppercase letters, lowercase
          letters, numbers, and special characters.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-accessible">
          Phone Number
          <span className="text-muted-foreground text-xs ml-2">(optional)</span>
        </Label>
        <Input
          id="phone-accessible"
          type="tel"
          placeholder="+1 (555) 123-4567"
          aria-describedby="phone-format"
        />
        <p id="phone-format" className="text-xs text-muted-foreground">
          Format: +1 (555) 123-4567
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessible labels with screen reader support using sr-only text, aria-describedby attributes, and proper semantic HTML for assistive technologies.',
      },
    },
  },
};

export const LabelWithTooltip: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="api-key" className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Key
            <span className="text-destructive">*</span>
          </span>
          <HelpCircle className="h-3 w-3 text-muted-foreground" />
        </Label>
        <Input id="api-key" type="password" placeholder="sk-..." />
        <p className="text-xs text-muted-foreground">
          Your API key is used to authenticate requests. Keep it secure and never share it publicly.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="webhook-url">
          <Globe className="h-4 w-4" />
          Webhook URL
          <Badge variant="secondary" className="ml-2 text-xs">
            Advanced
          </Badge>
        </Label>
        <Input id="webhook-url" type="url" placeholder="https://api.example.com/webhook" />
        <p className="text-xs text-muted-foreground">
          Optional webhook endpoint for receiving real-time updates.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels with help icons and advanced badges, providing additional context and indicating complex or optional features in technical forms.',
      },
    },
  },
};
