import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Mail,
  Lock,
  User,
  Phone,
  CreditCard,
  Calendar,
  Search,
  Eye,
  EyeOff,
  Check,
  Globe,
  Building,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';

const meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'file',
        'color',
        'range',
      ],
      description: 'HTML input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="default-input">Default Input</Label>
      <Input id="default-input" {...args} />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text</Label>
        <Input id="text-input" type="text" placeholder="Enter text..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-input">Email</Label>
        <Input id="email-input" type="email" placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-input">Password</Label>
        <Input id="password-input" type="password" placeholder="Enter password..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="number-input">Number</Label>
        <Input id="number-input" type="number" placeholder="123" min="0" max="100" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tel-input">Phone</Label>
        <Input id="tel-input" type="tel" placeholder="+1 (555) 123-4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url-input">URL</Label>
        <Input id="url-input" type="url" placeholder="https://example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="search-input">Search</Label>
        <Input id="search-input" type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="email-icon">Email with Icon</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email-icon" type="email" placeholder="john@example.com" className="pl-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search-icon">Search with Icon</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="search-icon" type="search" placeholder="Search..." className="pl-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-icon">Phone with Icon</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="phone-icon" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url-icon">Website with Icon</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="url-icon" type="url" placeholder="https://example.com" className="pl-10" />
        </div>
      </div>
    </div>
  ),
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2 w-80">
        <Label htmlFor="password-toggle">Password</Label>
        <div className="relative">
          <Input
            id="password-toggle"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password..."
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    );
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="normal-input">Normal State</Label>
        <Input id="normal-input" type="email" placeholder="john@example.com" />
        <p className="text-sm text-muted-foreground">Enter your email address</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="error-input">Error State</Label>
        <Input
          id="error-input"
          type="email"
          placeholder="john@example.com"
          value="invalid-email"
          aria-invalid="true"
        />
        <p className="text-sm text-destructive flex items-center">
          <AlertCircle className="mr-1 h-3 w-3" />
          Please enter a valid email address
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="success-input">Success State</Label>
        <div className="relative">
          <Input
            id="success-input"
            type="email"
            placeholder="john@example.com"
            value="john@example.com"
            className="pr-10"
          />
          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
        </div>
        <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
          <Check className="mr-1 h-3 w-3" />
          Email address is valid
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled-input">Disabled State</Label>
        <Input
          id="disabled-input"
          type="text"
          placeholder="Disabled input"
          value="Cannot edit this"
          disabled
        />
        <p className="text-sm text-muted-foreground">This field is disabled</p>
      </div>
    </div>
  ),
};

export const DateTimeInputs: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="date-input">Date</Label>
        <Input id="date-input" type="date" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time-input">Time</Label>
        <Input id="time-input" type="time" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="datetime-input">Date & Time</Label>
        <Input id="datetime-input" type="datetime-local" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="month-input">Month</Label>
        <Input id="month-input" type="month" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="week-input">Week</Label>
        <Input id="week-input" type="week" />
      </div>
    </div>
  ),
};

export const FileInput: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="file-input">Upload File</Label>
        <Input id="file-input" type="file" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-input">Upload Image</Label>
        <Input id="image-input" type="file" accept="image/*" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="multiple-input">Multiple Files</Label>
        <Input id="multiple-input" type="file" multiple />
      </div>

      <div className="space-y-2">
        <Label htmlFor="documents-input">Documents Only</Label>
        <Input id="documents-input" type="file" accept=".pdf,.doc,.docx,.txt" />
      </div>
    </div>
  ),
};

export const SpecialInputs: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="color-input">Color Picker</Label>
        <Input id="color-input" type="color" defaultValue="#3b82f6" className="h-12 w-20" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="range-input">Range Slider</Label>
        <Input id="range-input" type="range" min="0" max="100" defaultValue="50" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hidden-input">Hidden Input</Label>
        <Input id="hidden-input" type="hidden" value="hidden-value" />
        <p className="text-sm text-muted-foreground">Hidden input (not visible)</p>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      message: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Please fill out the form below to get in touch.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="pl-10"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10"
                value={formData.email}
                onChange={handleChange('email')}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="pl-10"
                value={formData.phone}
                onChange={handleChange('phone')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                type="text"
                placeholder="Acme Corp"
                className="pl-10"
                value={formData.company}
                onChange={handleChange('company')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                className="pl-10"
                value={formData.website}
                onChange={handleChange('website')}
              />
            </div>
          </div>

          <Button className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Submit Form
          </Button>
        </CardContent>
      </Card>
    );
  },
};

export const SearchExample: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results] = useState([
      'Apple iPhone 15 Pro',
      'Samsung Galaxy S24',
      'Google Pixel 8',
      'Apple MacBook Pro',
      'Dell XPS 13',
      'Microsoft Surface Pro',
    ]);

    const filteredResults = results.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="Search for products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {searchTerm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Search Results ({filteredResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-2 rounded hover:bg-accent cursor-pointer transition-colors"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No results found</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  },
};

export const PaymentForm: Story = {
  render: () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');

    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        return parts.join(' ');
      } else {
        return v;
      }
    };

    const formatExpiryDate = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
      }
      return v;
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Enter your payment information below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  className="pl-10"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  className="pl-10"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Your payment information is secure and encrypted.</AlertDescription>
          </Alert>

          <Button className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Pay ${amount || '0.00'}
          </Button>
        </CardContent>
      </Card>
    );
  },
};

export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = useState('Controlled');

    return (
      <div className="space-y-6 w-80">
        <div className="space-y-2">
          <Label htmlFor="controlled">Controlled Input</Label>
          <Input
            id="controlled"
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Controlled input..."
          />
          <p className="text-sm text-muted-foreground">
            Value: <span className="font-mono">{controlledValue}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="uncontrolled">Uncontrolled Input</Label>
          <Input
            id="uncontrolled"
            type="text"
            defaultValue="Uncontrolled"
            placeholder="Uncontrolled input..."
          />
          <p className="text-sm text-muted-foreground">
            Default value set, not controlled by React state
          </p>
        </div>
      </div>
    );
  },
};
