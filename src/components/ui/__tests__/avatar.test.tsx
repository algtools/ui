/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render } from '@testing-library/react';
// Mock Radix Avatar primitives to avoid image loading behavior in tests
jest.mock('@radix-ui/react-avatar', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    Root: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    Image: ({ ...props }: React.ComponentProps<'img'>) => <img {...props} />,
    Fallback: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  };
});
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

describe('Avatar', () => {
  it('renders root with data-slot and merges className', () => {
    render(<Avatar className="extra" />);
    const root = document.querySelector('[data-slot="avatar"]');
    expect(root).not.toBeNull();
    expect(root).toHaveClass('rounded-full');
    expect(root).toHaveClass('extra');
  });

  it('renders AvatarImage with correct data-slot and classes', () => {
    render(
      <Avatar>
        <AvatarImage alt="profile" src="/x.png" className="img" />
      </Avatar>
    );
    const img = document.querySelector('[data-slot="avatar-image"]');
    expect(img).not.toBeNull();
    expect(img).toHaveClass('aspect-square');
    expect(img).toHaveClass('img');
  });

  it('renders AvatarFallback when image not provided', () => {
    render(
      <Avatar>
        <AvatarFallback className="fb">AB</AvatarFallback>
      </Avatar>
    );
    const fb = document.querySelector('[data-slot="avatar-fallback"]');
    expect(fb).not.toBeNull();
    expect(fb).toHaveClass('bg-muted');
    expect(fb).toHaveClass('rounded-full');
    expect(fb).toHaveClass('fb');
  });
});
