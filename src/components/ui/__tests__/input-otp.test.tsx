import React from 'react';
import { vi, Mock, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '../input-otp';

// Mock input-otp to a simple controlled text input with context describing slots
vi.mock('input-otp', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react') as typeof import('react');
  const Ctx = React.createContext<{
    slots: Array<{ char: string; hasFakeCaret: boolean; isActive: boolean }>;
  } | null>(null);
  function OTPInput({
    value,
    onChange,
    containerClassName,
    className,
    children,
    ...props
  }: {
    value?: string;
    onChange?: (value: string) => void;
    containerClassName?: string;
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }) {
    const str = String(value ?? '');
    const slots = Array.from({ length: 6 }).map((_, i) => ({
      char: str[i] ?? '',
      hasFakeCaret: false,
      isActive: false,
    }));
    return (
      <div data-testid="otp-root" className={containerClassName}>
        <input
          aria-label="otp-input"
          value={str}
          className={className}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
        <Ctx.Provider value={{ slots }}>{children}</Ctx.Provider>
      </div>
    );
  }
  return { __esModule: true, OTPInput, OTPInputContext: Ctx };
});

describe('InputOTP', () => {
  it('renders root, group, slots and separator with data-slots', async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const [code, setCode] = React.useState('');
      return (
        <InputOTP
          maxLength={3}
          value={code}
          onChange={setCode}
          containerClassName="container"
          className="inner"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSeparator />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
        </InputOTP>
      );
    };

    render(<Wrapper />);
    expect(document.querySelector('[data-slot="input-otp"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="input-otp-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="input-otp-separator"]')).not.toBeNull();

    // Type into mocked input and verify first two slots echo characters
    await user.type(screen.getByLabelText('otp-input'), 'A9');
    const slots = document.querySelectorAll('[data-slot="input-otp-slot"]');
    expect(slots[0].textContent).toBe('A');
    expect(slots[1].textContent).toBe('9');
  });
});
