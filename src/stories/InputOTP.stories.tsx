import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Smartphone,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Lock,
  Key,
  MessageSquare,
} from 'lucide-react';

const meta = {
  title: 'Forms/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Maximum number of OTP digits',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto-focus the first input',
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  args: {
    maxLength: 6,
    autoFocus: true,
  },
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="otp">One-Time Password</Label>
      <InputOTP id="otp" maxLength={args.maxLength} autoFocus={args.autoFocus}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        Please enter the 6-digit code sent to your device.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default OTP input component with 6 digits and auto-focus, commonly used for verification codes and one-time passwords.',
      },
    },
  },
};

export const FourDigit: Story = {
  args: {},
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="otp-4">PIN Code</Label>
      <InputOTP id="otp-4" maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Enter your 4-digit PIN.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '4-digit PIN input, suitable for shorter verification codes or PIN entry scenarios.',
      },
    },
  },
};

export const WithSeparator: Story = {
  args: {},
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="otp-sep">Verification Code</Label>
      <InputOTP id="otp-sep" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Enter the 6-digit code in XXX-XXX format.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'OTP input with separator dividing the code into two groups (XXX-XXX format), improving readability for longer codes.',
      },
    },
  },
};

export const EightDigitWithGroups: Story = {
  args: {},
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="otp-8">Security Code</Label>
      <InputOTP id="otp-8" maxLength={8}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Enter the 8-digit security code.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '8-digit OTP input with separator, organized into two groups of four digits for better visual organization.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {},
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="otp-disabled">Verification Code</Label>
      <InputOTP id="otp-disabled" maxLength={6} disabled value="123456">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">This field is disabled.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled OTP input showing the inactive state when verification is not currently available or has been completed.',
      },
    },
  },
};

export const ControlledExample: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      setIsComplete(newValue.length === 6);
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp-controlled">Enter Verification Code</Label>
          <InputOTP id="otp-controlled" maxLength={6} value={value} onChange={handleChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Current value: <span className="font-mono">{value || 'Empty'}</span>
          </p>
        </div>
        {isComplete && (
          <Alert className="max-w-md">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Code complete! Ready to verify.</AlertDescription>
          </Alert>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled OTP input with React state management, demonstrating how to track input value and show completion feedback.',
      },
    },
  },
};

export const TwoFactorAuth: Story = {
  args: {},
  render: () => {
    const [step, setStep] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
    const [value, setValue] = useState('');

    const handleComplete = (code: string) => {
      if (code.length === 6) {
        setStep('verifying');
        // Simulate verification
        setTimeout(() => {
          if (code === '123456') {
            setStep('success');
          } else {
            setStep('error');
            setValue('');
          }
        }, 2000);
      }
    };

    const handleResend = () => {
      setStep('input');
      setValue('');
    };

    return (
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit verification code sent to your authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={setValue}
              onComplete={handleComplete}
              disabled={step === 'verifying' || step === 'success'}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {step === 'verifying' && (
            <Alert>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <AlertDescription>Verifying your code...</AlertDescription>
            </Alert>
          )}

          {step === 'success' && (
            <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Successfully authenticated! Welcome back.</AlertDescription>
            </Alert>
          )}

          {step === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Invalid code. Please try again.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full"
            disabled={value.length !== 6 || step === 'verifying' || step === 'success'}
            onClick={() => handleComplete(value)}
          >
            {step === 'verifying' ? 'Verifying...' : 'Verify Code'}
          </Button>
          {step !== 'success' && (
            <Button variant="ghost" size="sm" onClick={handleResend}>
              Didn&apos;t receive a code? Resend
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete two-factor authentication flow with OTP input, including verification states (input, verifying, success, error) and resend functionality.',
      },
    },
  },
};

export const SMSVerification: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);

    // Simulate countdown timer
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

    return (
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle>Verify Your Phone Number</CardTitle>
          <CardDescription>
            We sent a 6-digit code to <strong>+1 (555) 123-4567</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={value} onChange={setValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-muted-foreground">
                <Clock className="inline h-3 w-3 mr-1" />
                Resend code in {timeLeft}s
              </p>
            ) : (
              <Button variant="link" onClick={() => setTimeLeft(30)}>
                <MessageSquare className="mr-1 h-3 w-3" />
                Resend SMS Code
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={value.length !== 6}>
            Verify Phone Number
          </Button>
        </CardFooter>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'SMS verification flow with OTP input, countdown timer, and resend functionality for phone number verification.',
      },
    },
  },
};

export const EmailVerification: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            Enter the 6-digit verification code we sent to <strong>user@example.com</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={value} onChange={setValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Check your spam folder if you don&apos;t see the email in your inbox.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" disabled={value.length !== 6}>
            Verify Email
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-1 h-3 w-3" />
            Resend Email
          </Button>
        </CardFooter>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Email verification flow with OTP input and resend functionality, demonstrating email-based verification patterns.',
      },
    },
  },
};

export const BankingPIN: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');
    const [attempts, setAttempts] = useState(0);

    const handleSubmit = () => {
      if (value.length === 4) {
        setAttempts(attempts + 1);
        setValue('');
      }
    };

    return (
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
            <Lock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle>Enter Your PIN</CardTitle>
          <CardDescription>Please enter your 4-digit PIN to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={value} onChange={setValue} type="password">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="text-xs">
              <Shield className="mr-1 h-3 w-3" />
              Secure 256-bit encryption
            </Badge>
          </div>

          {attempts > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Incorrect PIN. {3 - attempts} attempts remaining.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={value.length !== 4} onClick={handleSubmit}>
            <Key className="mr-1 h-3 w-3" />
            Unlock Account
          </Button>
        </CardFooter>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Banking PIN entry with password-masked input, security badge, and attempt tracking for secure financial authentication.',
      },
    },
  },
};

export const MultipleInputs: Story = {
  args: {},
  render: () => {
    const [smsCode, setSmsCode] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [backupCode, setBackupCode] = useState('');

    return (
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="sms-otp">SMS Code</Label>
          <InputOTP id="sms-otp" maxLength={6} value={smsCode} onChange={setSmsCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">From SMS: +1 (555) 123-4567</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-otp">Email Code</Label>
          <InputOTP id="email-otp" maxLength={6} value={emailCode} onChange={setEmailCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">From email: user@example.com</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup-otp">Backup Code</Label>
          <InputOTP id="backup-otp" maxLength={8} value={backupCode} onChange={setBackupCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">Use a backup recovery code</p>
        </div>

        <Button className="w-full" disabled={!smsCode && !emailCode && !backupCode}>
          Verify with Available Code
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple OTP inputs for different verification methods (SMS, email, backup code), allowing users to choose their preferred verification method.',
      },
    },
  },
};

export const ValidationStates: Story = {
  args: {},
  render: () => {
    const [normalValue, setNormalValue] = useState('');
    const [errorValue, setErrorValue] = useState('12345');
    const [successValue, setSuccessValue] = useState('123456');

    return (
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="normal-otp">Normal State</Label>
          <InputOTP id="normal-otp" maxLength={6} value={normalValue} onChange={setNormalValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Enter your verification code</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="error-otp">Error State</Label>
          <InputOTP
            id="error-otp"
            maxLength={6}
            value={errorValue}
            onChange={setErrorValue}
            aria-invalid="true"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-destructive">Invalid code. Please try again.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="success-otp">Success State</Label>
          <InputOTP id="success-otp" maxLength={6} value={successValue} onChange={setSuccessValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            Code verified successfully
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'OTP input in different validation states: normal (empty), error (invalid code), and success (verified), demonstrating form validation feedback.',
      },
    },
  },
};
