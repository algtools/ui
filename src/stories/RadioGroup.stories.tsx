import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Smartphone,
  Monitor,
  Truck,
  Plane,
  Package,
  Shield,
  Zap,
  Star,
  User,
  Users,
  Building,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the radio group',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    value: 'option-two',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const PaymentMethods: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose how you&apos;d like to pay for your order</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="card" id="card" />
              <div className="flex items-center space-x-2 flex-1">
                <CreditCard className="h-5 w-5" />
                <div>
                  <Label htmlFor="card" className="font-medium">
                    Credit Card
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pay with Visa, Mastercard, or Amex
                  </p>
                </div>
              </div>
              {paymentMethod === 'card' && <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="paypal" id="paypal" />
              <div className="flex items-center space-x-2 flex-1">
                <div className="h-5 w-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                  P
                </div>
                <div>
                  <Label htmlFor="paypal" className="font-medium">
                    PayPal
                  </Label>
                  <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                </div>
              </div>
              {paymentMethod === 'paypal' && <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="apple" id="apple" />
              <div className="flex items-center space-x-2 flex-1">
                <Smartphone className="h-5 w-5" />
                <div>
                  <Label htmlFor="apple" className="font-medium">
                    Apple Pay
                  </Label>
                  <p className="text-sm text-muted-foreground">Pay with Touch ID or Face ID</p>
                </div>
              </div>
              {paymentMethod === 'apple' && <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    );
  },
};

export const ShippingOptions: Story = {
  render: () => {
    const [shipping, setShipping] = useState('standard');

    const shippingOptions = [
      {
        id: 'standard',
        name: 'Standard Shipping',
        description: '5-7 business days',
        price: 'Free',
        icon: Package,
      },
      {
        id: 'express',
        name: 'Express Shipping',
        description: '2-3 business days',
        price: '$9.99',
        icon: Truck,
      },
      {
        id: 'overnight',
        name: 'Overnight Delivery',
        description: 'Next business day',
        price: '$24.99',
        icon: Plane,
      },
    ];

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Shipping Options</CardTitle>
          <CardDescription>Select your preferred delivery method</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shipping} onValueChange={setShipping}>
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    shipping === option.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="font-medium">
                      {option.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{option.price}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    );
  },
};

export const PlanSelection: Story = {
  render: () => {
    const [plan, setPlan] = useState('pro');

    const plans = [
      {
        id: 'free',
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'Perfect for getting started',
        features: ['Up to 5 projects', 'Basic support', '1GB storage'],
        badge: null,
        icon: User,
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'Best for growing teams',
        features: ['Unlimited projects', 'Priority support', '100GB storage', 'Advanced analytics'],
        badge: 'Most Popular',
        icon: Users,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For large organizations',
        features: [
          'Everything in Pro',
          'Custom integrations',
          'Unlimited storage',
          'Dedicated support',
        ],
        badge: null,
        icon: Building,
      },
    ];

    return (
      <div className="w-[600px] space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Choose Your Plan</h3>
          <p className="text-muted-foreground">Select the plan that best fits your needs</p>
        </div>
        <RadioGroup value={plan} onValueChange={setPlan}>
          <div className="grid gap-4">
            {plans.map((planOption) => {
              const Icon = planOption.icon;
              return (
                <div
                  key={planOption.id}
                  className={`relative rounded-lg border p-6 transition-all ${
                    plan === planOption.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  {planOption.badge && (
                    <Badge className="absolute -top-2 left-4 bg-primary">{planOption.badge}</Badge>
                  )}
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value={planOption.id} id={planOption.id} className="mt-1" />
                    <Icon className="h-6 w-6 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={planOption.id} className="text-lg font-semibold">
                          {planOption.name}
                        </Label>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold">{planOption.price}</span>
                          <span className="text-muted-foreground">{planOption.period}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-1">{planOption.description}</p>
                      <ul className="mt-3 space-y-1">
                        {planOption.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </RadioGroup>
        <Button className="w-full">
          Continue with {plans.find((p) => p.id === plan)?.name} Plan
        </Button>
      </div>
    );
  },
};

export const Theme: Story = {
  render: () => {
    const [theme, setTheme] = useState('system');

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Theme Preference</CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    );
  },
};

export const DevicePreference: Story = {
  render: () => {
    const [device, setDevice] = useState('desktop');

    const devices = [
      { id: 'mobile', name: 'Mobile', icon: Smartphone, description: 'Optimized for phones' },
      { id: 'tablet', name: 'Tablet', icon: Smartphone, description: 'Optimized for tablets' },
      { id: 'desktop', name: 'Desktop', icon: Monitor, description: 'Full desktop experience' },
    ];

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Device Preference</CardTitle>
          <CardDescription>How do you primarily use our app?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={device} onValueChange={setDevice}>
            {devices.map((deviceOption) => {
              const Icon = deviceOption.icon;
              return (
                <div key={deviceOption.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={deviceOption.id} id={deviceOption.id} />
                  <Icon className="h-5 w-5" />
                  <div>
                    <Label htmlFor={deviceOption.id} className="font-medium">
                      {deviceOption.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{deviceOption.description}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    );
  },
};

export const Notification: Story = {
  render: () => {
    const [frequency, setFrequency] = useState('weekly');

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
          <CardDescription>How often would you like to receive updates?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="never" id="never" />
              <Label htmlFor="never">Never</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    );
  },
};

export const SecurityLevel: Story = {
  render: () => {
    const [security, setSecurity] = useState('balanced');

    const securityOptions = [
      {
        id: 'basic',
        name: 'Basic',
        description: 'Standard security features',
        icon: Shield,
        color: 'text-yellow-600',
      },
      {
        id: 'balanced',
        name: 'Balanced',
        description: 'Good balance of security and convenience',
        icon: Zap,
        color: 'text-blue-600',
      },
      {
        id: 'high',
        name: 'High Security',
        description: 'Maximum protection with additional verification',
        icon: Shield,
        color: 'text-green-600',
      },
    ];

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Security Level</CardTitle>
          <CardDescription>Choose your preferred security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={security} onValueChange={setSecurity}>
            {securityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 rounded-lg border p-4 ${
                    security === option.id ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Icon className={`h-5 w-5 ${option.color}`} />
                  <div>
                    <Label htmlFor={option.id} className="font-medium">
                      {option.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    );
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Normal State</h4>
        <RadioGroup defaultValue="option-two">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="normal-one" />
            <Label htmlFor="normal-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="normal-two" />
            <Label htmlFor="normal-two">Option Two (Selected)</Label>
          </div>
        </RadioGroup>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium mb-3">Disabled State</h4>
        <RadioGroup defaultValue="disabled-two" disabled>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled-one" id="disabled-one" />
            <Label htmlFor="disabled-one">Option One (Disabled)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled-two" id="disabled-two" />
            <Label htmlFor="disabled-two">Option Two (Disabled & Selected)</Label>
          </div>
        </RadioGroup>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium mb-3">Individual Disabled Items</h4>
        <RadioGroup defaultValue="mixed-two">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed-one" id="mixed-one" disabled />
            <Label htmlFor="mixed-one">Option One (Disabled)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed-two" id="mixed-two" />
            <Label htmlFor="mixed-two">Option Two (Enabled)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed-three" id="mixed-three" />
            <Label htmlFor="mixed-three">Option Three (Enabled)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = () => {
      if (!selectedOption) {
        setShowError(true);
      } else {
        setShowError(false);
        alert(`Selected: ${selectedOption}`);
      }
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Survey Question</CardTitle>
          <CardDescription>How satisfied are you with our service?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={showError ? 'border border-destructive rounded-lg p-3' : ''}>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                <Label htmlFor="very-satisfied" className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Very Satisfied</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <Label htmlFor="satisfied">Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                <Label htmlFor="dissatisfied">Dissatisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" />
                <Label htmlFor="very-dissatisfied" className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Very Dissatisfied</span>
                </Label>
              </div>
            </RadioGroup>
            {showError && (
              <p className="text-sm text-destructive mt-2 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>Please select an option</span>
              </p>
            )}
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Submit Response
          </Button>
        </CardContent>
      </Card>
    );
  },
};
