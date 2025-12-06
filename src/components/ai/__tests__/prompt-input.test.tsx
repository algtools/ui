import React from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromptInput } from '../prompt-input';

describe('PromptInput', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<PromptInput />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', 'Type your message here...');
    });

    it('renders with custom placeholder', () => {
      render(<PromptInput placeholder="Ask me anything..." />);
      const textarea = screen.getByPlaceholderText('Ask me anything...');
      expect(textarea).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<PromptInput />);
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      expect(submitButton).toBeInTheDocument();
    });

    it('renders attachment button when showAttachmentButton is true', () => {
      render(<PromptInput showAttachmentButton />);
      const attachmentButton = screen.getByRole('button', { name: /attach file/i });
      expect(attachmentButton).toBeInTheDocument();
    });

    it('does not render attachment button by default', () => {
      render(<PromptInput />);
      const attachmentButton = screen.queryByRole('button', { name: /attach file/i });
      expect(attachmentButton).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<PromptInput className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies custom id to textarea', () => {
      render(<PromptInput id="prompt-textarea" />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveAttribute('id', 'prompt-textarea');
    });

    it('applies custom aria-label', () => {
      render(<PromptInput aria-label="Custom prompt" />);
      const textarea = screen.getByRole('textbox', { name: /custom prompt/i });
      expect(textarea).toBeInTheDocument();
    });

    it('applies name attribute', () => {
      render(<PromptInput name="prompt-field" />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveAttribute('name', 'prompt-field');
    });

    it('applies required attribute', () => {
      render(<PromptInput required />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toBeRequired();
    });

    it('auto-focuses when autoFocus is true', () => {
      render(<PromptInput autoFocus />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveFocus();
    });
  });

  describe('Character Count', () => {
    it('shows character count when showCharacterCount is true', () => {
      render(<PromptInput showCharacterCount />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('does not show character count by default', () => {
      render(<PromptInput />);
      expect(screen.queryByText(/character count/i)).not.toBeInTheDocument();
    });

    it('updates character count as user types', async () => {
      const user = userEvent.setup();
      render(<PromptInput showCharacterCount />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows max length when provided', () => {
      render(<PromptInput showCharacterCount maxLength={100} />);
      expect(screen.getByText('0 / 100')).toBeInTheDocument();
    });

    it('highlights character count in red when over limit', async () => {
      const user = userEvent.setup();
      render(<PromptInput showCharacterCount maxLength={5} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Hello World');

      const charCount = screen.getByText(/11 \/ 5/);
      expect(charCount).toHaveClass('text-destructive');
    });

    it('sets aria-invalid when over character limit', async () => {
      const user = userEvent.setup();
      render(<PromptInput maxLength={5} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Hello World');

      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Controlled Mode', () => {
    it('works in controlled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput value="Test" onChange={handleChange} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveValue('Test');

      await user.type(textarea, ' more');
      expect(handleChange).toHaveBeenCalled();
    });

    it('updates when value prop changes', () => {
      const { rerender } = render(<PromptInput value="Initial" />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveValue('Initial');

      rerender(<PromptInput value="Updated" />);
      expect(textarea).toHaveValue('Updated');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('works in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<PromptInput />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Test message');

      expect(textarea).toHaveValue('Test message');
    });

    it('calls onChange in uncontrolled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onChange={handleChange} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Test');

      expect(handleChange).toHaveBeenCalledWith('Test');
    });
  });

  describe('Submit Behavior', () => {
    it('calls onSubmit when Enter is pressed', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onSubmit={handleSubmit} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Test message');
      await user.keyboard('{Enter}');

      expect(handleSubmit).toHaveBeenCalledWith('Test message');
    });

    it('does not submit on Shift+Enter', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onSubmit={handleSubmit} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Line 1');
      await user.keyboard('{Shift>}{Enter}{/Shift}');
      await user.type(textarea, 'Line 2');

      expect(handleSubmit).not.toHaveBeenCalled();
      expect(textarea).toHaveValue('Line 1\nLine 2');
    });

    it('calls onSubmit when submit button is clicked', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onSubmit={handleSubmit} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Test message');

      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledWith('Test message');
    });

    it('trims whitespace before submitting', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onSubmit={handleSubmit} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, '  Test message  ');
      await user.keyboard('{Enter}');

      expect(handleSubmit).toHaveBeenCalledWith('Test message');
    });

    it('does not submit empty or whitespace-only messages', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onSubmit={handleSubmit} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });

      // Try submitting empty
      await user.keyboard('{Enter}');
      expect(handleSubmit).not.toHaveBeenCalled();

      // Try submitting whitespace only
      await user.type(textarea, '   ');
      await user.keyboard('{Enter}');
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('clears input after submit in uncontrolled mode', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput onSubmit={handleSubmit} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Test message');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(textarea).toHaveValue('');
      });
    });

    it('does not clear input after submit in controlled mode', async () => {
      const handleSubmit = vi.fn();
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput value="Test message" onChange={handleChange} onSubmit={handleSubmit} />);

      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledWith('Test message');

      // Value should remain the same (parent component controls this)
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveValue('Test message');
    });
  });

  describe('Disabled State', () => {
    it('disables textarea when disabled is true', () => {
      render(<PromptInput disabled />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toBeDisabled();
    });

    it('disables submit button when disabled', () => {
      render(<PromptInput disabled />);
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      expect(submitButton).toBeDisabled();
    });

    it('disables attachment button when disabled', () => {
      render(<PromptInput disabled showAttachmentButton />);
      const attachmentButton = screen.getByRole('button', { name: /attach file/i });
      expect(attachmentButton).toBeDisabled();
    });

    it('does not submit when disabled', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput disabled onSubmit={handleSubmit} />);

      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      await user.click(submitButton);

      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('disables textarea when loading', () => {
      render(<PromptInput loading />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toBeDisabled();
    });

    it('shows loading spinner in submit button', () => {
      render(<PromptInput loading />);
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      expect(submitButton.querySelector('svg')).toHaveClass('animate-spin');
    });

    it('disables submit button when loading', () => {
      render(<PromptInput loading />);
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      expect(submitButton).toBeDisabled();
    });

    it('does not submit when loading', async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput loading onSubmit={handleSubmit} />);

      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      await user.click(submitButton);

      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Submit Button State', () => {
    it('disables submit button when input is empty', () => {
      render(<PromptInput />);
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });
      expect(submitButton).toBeDisabled();
    });

    it('enables submit button when input has text', async () => {
      const user = userEvent.setup();
      render(<PromptInput />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });

      expect(submitButton).toBeDisabled();

      await user.type(textarea, 'Test');
      expect(submitButton).not.toBeDisabled();
    });

    it('keeps submit button disabled with only whitespace', async () => {
      const user = userEvent.setup();
      render(<PromptInput />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      const submitButton = screen.getByRole('button', { name: /submit prompt/i });

      await user.type(textarea, '   ');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Attachment Button', () => {
    it('calls onAttachmentClick when clicked', async () => {
      const handleAttachmentClick = vi.fn();
      const user = userEvent.setup();

      render(<PromptInput showAttachmentButton onAttachmentClick={handleAttachmentClick} />);

      const attachmentButton = screen.getByRole('button', { name: /attach file/i });
      await user.click(attachmentButton);

      expect(handleAttachmentClick).toHaveBeenCalled();
    });
  });

  describe('Auto-resize', () => {
    it('sets minimum height', () => {
      render(<PromptInput minHeight={80} />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveStyle({ minHeight: '80px' });
    });

    it('sets maximum height', () => {
      render(<PromptInput maxHeight={300} />);
      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      expect(textarea).toHaveStyle({ maxHeight: '300px' });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<PromptInput />);

      expect(screen.getByRole('textbox', { name: /prompt input/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit prompt/i })).toBeInTheDocument();
    });

    it('marks character count with aria-live', () => {
      const { container } = render(<PromptInput showCharacterCount />);
      const charCountElement = container.querySelector('[aria-live="polite"]');
      expect(charCountElement).toBeInTheDocument();
      expect(charCountElement).toHaveAttribute('aria-atomic', 'true');
    });

    it('announces character count changes for screen readers', () => {
      const { container } = render(<PromptInput showCharacterCount />);
      const srOnly = container.querySelector('.sr-only');
      expect(srOnly).toHaveTextContent('Character count');
    });

    it('sets aria-invalid when over limit', async () => {
      const user = userEvent.setup();
      render(<PromptInput maxLength={5} />);

      const textarea = screen.getByRole('textbox', { name: /prompt input/i });
      await user.type(textarea, 'Too long');

      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<PromptInput ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.tagName).toBe('TEXTAREA');
    });

    it('can focus textarea via ref', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<PromptInput ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });
});
