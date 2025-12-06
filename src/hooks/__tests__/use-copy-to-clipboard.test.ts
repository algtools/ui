import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach, Mock } from 'vitest';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

describe('useCopyToClipboard', () => {
  // Store original clipboard and execCommand
  const originalClipboard = global.navigator.clipboard;
  const originalExecCommand = document.execCommand;

  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  afterAll(() => {
    // Restore original clipboard
    Object.defineProperty(global.navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
    document.execCommand = originalExecCommand;
  });

  describe('initialization', () => {
    test('should initialize with default values', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.copiedText).toBeNull();
      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.copy).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });
  });

  describe('copy with Clipboard API', () => {
    beforeEach(() => {
      // Mock modern Clipboard API
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn(),
        read: vi.fn(),
        write: vi.fn(),
      };

      Object.defineProperty(global.navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
    });

    test('should copy text using Clipboard API', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Hello World');
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World');
      expect(result.current.copiedText).toBe('Hello World');
      expect(result.current.isCopied).toBe(true);
      expect(result.current.error).toBeNull();
    });

    test('should handle multiple copy operations', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('First text');
      });

      expect(result.current.copiedText).toBe('First text');
      expect(result.current.isCopied).toBe(true);

      await act(async () => {
        await result.current.copy('Second text');
      });

      expect(result.current.copiedText).toBe('Second text');
      expect(result.current.isCopied).toBe(true);
    });

    test('should handle Clipboard API errors', async () => {
      const mockError = new Error('Permission denied');
      (navigator.clipboard.writeText as Mock).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.copiedText).toBeNull();
      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe('Permission denied');
    });
  });

  describe('copy with fallback (execCommand)', () => {
    beforeEach(() => {
      // Remove Clipboard API to trigger fallback
      Object.defineProperty(global.navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      // Mock document.execCommand
      document.execCommand = vi.fn().mockReturnValue(true);
    });

    test('should copy text using fallback method', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Fallback text');
      });

      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(result.current.copiedText).toBe('Fallback text');
      expect(result.current.isCopied).toBe(true);
      expect(result.current.error).toBeNull();
    });

    test('should handle fallback method errors', async () => {
      (document.execCommand as Mock).mockReturnValue(false);

      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.copiedText).toBeNull();
      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe('Copy command was unsuccessful');
    });

    test('should handle fallback method exceptions', async () => {
      (document.execCommand as Mock).mockImplementation(() => {
        throw new Error('execCommand failed');
      });

      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.copiedText).toBeNull();
      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe('execCommand failed');
    });

    test('should create and remove textarea element', async () => {
      const { result } = renderHook(() => useCopyToClipboard());
      const appendChildSpy = vi.spyOn(document.body, 'appendChild');
      const removeChildSpy = vi.spyOn(document.body, 'removeChild');

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();

      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn(),
        read: vi.fn(),
        write: vi.fn(),
      };

      Object.defineProperty(global.navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
    });

    test('should reset all state values', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.isCopied).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.copiedText).toBeNull();
      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBeNull();
    });

    test('should maintain same reference across renders', () => {
      const { result, rerender } = renderHook(() => useCopyToClipboard());
      const firstReset = result.current.reset;

      rerender();

      expect(result.current.reset).toBe(firstReset);
    });
  });

  describe('auto-reset with delay', () => {
    beforeEach(() => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn(),
        read: vi.fn(),
        write: vi.fn(),
      };

      Object.defineProperty(global.navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
    });

    test('should auto-reset after specified delay', async () => {
      const { result } = renderHook(() => useCopyToClipboard(2000));

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.isCopied).toBe(true);
      expect(result.current.copiedText).toBe('Test text');

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // After advancing timers, the state should be updated immediately
      expect(result.current.isCopied).toBe(false);
      expect(result.current.copiedText).toBeNull();
    });

    test('should not auto-reset without delay', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.isCopied).toBe(true);

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(result.current.isCopied).toBe(true);
      expect(result.current.copiedText).toBe('Test text');
    });

    test('should clear previous timeout when copying again', async () => {
      const { result } = renderHook(() => useCopyToClipboard(2000));

      await act(async () => {
        await result.current.copy('First text');
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      await act(async () => {
        await result.current.copy('Second text');
      });

      expect(result.current.copiedText).toBe('Second text');

      act(() => {
        vi.advanceTimersByTime(1500);
      });

      // Should still be copied (timeout was reset)
      expect(result.current.isCopied).toBe(true);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Now it should be reset (2000ms from second copy)
      expect(result.current.isCopied).toBe(false);
      });
    });

    test('should clear timeout on manual reset', async () => {
      const { result } = renderHook(() => useCopyToClipboard(2000));

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.isCopied).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isCopied).toBe(false);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should remain reset
      expect(result.current.isCopied).toBe(false);
    });
  });

  describe('integration', () => {
    beforeEach(() => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn(),
        read: vi.fn(),
        write: vi.fn(),
      };

      Object.defineProperty(global.navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
    });

    test('should expose all expected properties', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current).toHaveProperty('copiedText');
      expect(result.current).toHaveProperty('isCopied');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('copy');
      expect(result.current).toHaveProperty('reset');

      expect(typeof result.current.isCopied).toBe('boolean');
      expect(typeof result.current.copy).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });

    test('should work correctly with multiple operations in sequence', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.isCopied).toBe(false);

      await act(async () => {
        await result.current.copy('First');
      });
      expect(result.current.isCopied).toBe(true);
      expect(result.current.copiedText).toBe('First');

      act(() => {
        result.current.reset();
      });
      expect(result.current.isCopied).toBe(false);
      expect(result.current.copiedText).toBeNull();

      await act(async () => {
        await result.current.copy('Second');
      });
      expect(result.current.isCopied).toBe(true);
      expect(result.current.copiedText).toBe('Second');
    });

    test('should handle empty string', async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('');
      });

      expect(result.current.isCopied).toBe(true);
      expect(result.current.copiedText).toBe('');
    });

    test('should handle special characters', async () => {
      const { result } = renderHook(() => useCopyToClipboard());
      const specialText = 'Hello\nWorld\t💎\r\n🎉';

      await act(async () => {
        await result.current.copy(specialText);
      });

      expect(result.current.isCopied).toBe(true);
      expect(result.current.copiedText).toBe(specialText);
    });
  });

  describe('performance', () => {
    beforeEach(() => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn(),
        read: vi.fn(),
        write: vi.fn(),
      };

      Object.defineProperty(global.navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
    });

    test('should maintain stable function references', async () => {
      const { result, rerender } = renderHook(() => useCopyToClipboard());

      const firstRender = {
        copy: result.current.copy,
        reset: result.current.reset,
      };

      await act(async () => {
        await result.current.copy('Test');
      });

      rerender();

      // Function references should remain the same after state change
      expect(result.current.copy).toBe(firstRender.copy);
      expect(result.current.reset).toBe(firstRender.reset);
    });
  });

  describe('cleanup', () => {
    beforeEach(() => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn(),
        read: vi.fn(),
        write: vi.fn(),
      };

      Object.defineProperty(global.navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
    });

    test('should cleanup timeout on unmount', async () => {
      const { result, unmount } = renderHook(() => useCopyToClipboard(2000));

      await act(async () => {
        await result.current.copy('Test text');
      });

      expect(result.current.isCopied).toBe(true);

      unmount();

      // Should not throw or cause memory leaks
      act(() => {
        vi.advanceTimersByTime(3000);
      });
    });
  });
});
