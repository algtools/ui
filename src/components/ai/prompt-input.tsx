'use client';

import * as React from 'react';
import { Send, Loader2, Paperclip } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import type { AIComponentProps } from './ai-types';

/**
 * Props for the PromptInput component
 */
export interface PromptInputProps extends AIComponentProps {
  /** The current value of the input */
  value?: string;
  /** Callback when the value changes */
  onChange?: (value: string) => void;
  /** Callback when the user submits the prompt */
  onSubmit?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is in loading state */
  loading?: boolean;
  /** Whether to show character count */
  showCharacterCount?: boolean;
  /** Maximum character limit */
  maxLength?: number;
  /** Whether to show attachment button */
  showAttachmentButton?: boolean;
  /** Callback when attachment button is clicked */
  onAttachmentClick?: () => void;
  /** Minimum height of the textarea in pixels */
  minHeight?: number;
  /** Maximum height of the textarea in pixels */
  maxHeight?: number;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ID for the textarea element */
  id?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Name attribute for the textarea */
  name?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
}

/**
 * PromptInput - ChatGPT-style input with auto-resize, submit handling, and optional features
 *
 * @example
 * ```tsx
 * <PromptInput
 *   value={prompt}
 *   onChange={setPrompt}
 *   onSubmit={handleSubmit}
 *   placeholder="Ask me anything..."
 *   showCharacterCount
 *   maxLength={2000}
 * />
 * ```
 */
export const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Type your message here...',
      disabled = false,
      loading = false,
      showCharacterCount = false,
      maxLength,
      showAttachmentButton = false,
      onAttachmentClick,
      minHeight = 56,
      maxHeight = 200,
      className,
      'aria-label': ariaLabel,
      id,
      required = false,
      name,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = React.useState('');

    // Merge refs
    React.useImperativeHandle(ref, () => textareaRef.current!);

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue;
    const isControlled = value !== undefined;

    // Auto-resize textarea
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to recalculate
      textarea.style.height = 'auto';

      // Calculate new height
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }, [minHeight, maxHeight]);

    // Adjust height when value changes
    React.useEffect(() => {
      adjustHeight();
    }, [currentValue, adjustHeight]);

    // Handle textarea change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
      adjustHeight();
    };

    // Handle form submission
    const handleSubmit = () => {
      if (!currentValue.trim() || disabled || loading) return;

      onSubmit?.(currentValue.trim());

      // Clear input after submit if uncontrolled
      if (!isControlled) {
        setInternalValue('');
        // Reset height after clearing
        setTimeout(() => adjustHeight(), 0);
      }
    };

    // Handle key down for submit behavior
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Submit on Enter (without Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const isDisabled = disabled || loading;
    const canSubmit = currentValue.trim().length > 0 && !isDisabled;
    const characterCount = currentValue.length;
    const isOverLimit = maxLength !== undefined && characterCount > maxLength;

    return (
      <div className={cn('relative flex flex-col gap-2', className)} {...props}>
        <div className="relative flex items-end gap-2 rounded-lg border border-input bg-background p-2 shadow-sm transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/50">
          {/* Attachment Button */}
          {showAttachmentButton && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={onAttachmentClick}
              disabled={isDisabled}
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            id={id}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            required={required}
            autoFocus={autoFocus}
            rows={1}
            className={cn(
              'flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
              'overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent'
            )}
            style={{
              minHeight: `${minHeight}px`,
              maxHeight: `${maxHeight}px`,
            }}
            aria-label={ariaLabel || 'Prompt input'}
            aria-invalid={isOverLimit}
          />

          {/* Submit Button */}
          <Button
            type="button"
            size="icon"
            className="shrink-0"
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label="Submit prompt"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>

        {/* Character Count */}
        {showCharacterCount && (
          <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
            <span className="sr-only">Character count</span>
            <div className="flex-1" />
            <span
              className={cn('transition-colors', isOverLimit && 'font-medium text-destructive')}
              aria-live="polite"
              aria-atomic="true"
            >
              {characterCount}
              {maxLength !== undefined && ` / ${maxLength}`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

PromptInput.displayName = 'PromptInput';
