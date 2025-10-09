import { renderHook } from '@testing-library/react';

import { useDocumentTitle } from '@/hooks/use-document-title';

describe('useDocumentTitle', () => {
  const originalTitle = 'Original Title';

  beforeEach(() => {
    // Reset document title before each test
    document.title = originalTitle;
  });

  afterEach(() => {
    // Restore original title after each test
    document.title = originalTitle;
  });

  describe('initialization and basic functionality', () => {
    test('should set document title', () => {
      renderHook(() => useDocumentTitle('New Title'));

      expect(document.title).toBe('New Title');
    });

    test('should update document title when title prop changes', () => {
      const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
        initialProps: { title: 'First Title' },
      });

      expect(document.title).toBe('First Title');

      rerender({ title: 'Second Title' });

      expect(document.title).toBe('Second Title');
    });

    test('should handle empty string title', () => {
      renderHook(() => useDocumentTitle(''));

      expect(document.title).toBe('');
    });

    test('should handle special characters in title', () => {
      const specialTitle = 'Title with émojis 🎉 & symbols <>';
      renderHook(() => useDocumentTitle(specialTitle));

      expect(document.title).toBe(specialTitle);
    });
  });

  describe('prefix and suffix options', () => {
    test('should apply prefix to title', () => {
      renderHook(() => useDocumentTitle('Page', { prefix: 'MySite - ' }));

      expect(document.title).toBe('MySite - Page');
    });

    test('should apply suffix to title', () => {
      renderHook(() => useDocumentTitle('Page', { suffix: ' | MySite' }));

      expect(document.title).toBe('Page | MySite');
    });

    test('should apply both prefix and suffix', () => {
      renderHook(() =>
        useDocumentTitle('Page', {
          prefix: 'MySite - ',
          suffix: ' | v1.0',
        })
      );

      expect(document.title).toBe('MySite - Page | v1.0');
    });

    test('should update prefix dynamically', () => {
      const { rerender } = renderHook(({ prefix }) => useDocumentTitle('Page', { prefix }), {
        initialProps: { prefix: 'Old - ' },
      });

      expect(document.title).toBe('Old - Page');

      rerender({ prefix: 'New - ' });

      expect(document.title).toBe('New - Page');
    });

    test('should update suffix dynamically', () => {
      const { rerender } = renderHook(({ suffix }) => useDocumentTitle('Page', { suffix }), {
        initialProps: { suffix: ' | Old' },
      });

      expect(document.title).toBe('Page | Old');

      rerender({ suffix: ' | New' });

      expect(document.title).toBe('Page | New');
    });

    test('should handle empty prefix and suffix', () => {
      renderHook(() => useDocumentTitle('Page', { prefix: '', suffix: '' }));

      expect(document.title).toBe('Page');
    });
  });

  describe('restoreOnUnmount option', () => {
    test('should restore previous title on unmount when restoreOnUnmount is true', () => {
      const { unmount } = renderHook(() =>
        useDocumentTitle('New Title', { restoreOnUnmount: true })
      );

      expect(document.title).toBe('New Title');

      unmount();

      expect(document.title).toBe(originalTitle);
    });

    test('should not restore previous title on unmount when restoreOnUnmount is false', () => {
      const { unmount } = renderHook(() =>
        useDocumentTitle('New Title', { restoreOnUnmount: false })
      );

      expect(document.title).toBe('New Title');

      unmount();

      expect(document.title).toBe('New Title');
    });

    test('should not restore previous title on unmount by default', () => {
      const { unmount } = renderHook(() => useDocumentTitle('New Title'));

      expect(document.title).toBe('New Title');

      unmount();

      expect(document.title).toBe('New Title');
    });

    test('should restore original title even after multiple updates', () => {
      const { rerender, unmount } = renderHook(
        ({ title }) => useDocumentTitle(title, { restoreOnUnmount: true }),
        {
          initialProps: { title: 'First' },
        }
      );

      expect(document.title).toBe('First');

      rerender({ title: 'Second' });
      expect(document.title).toBe('Second');

      rerender({ title: 'Third' });
      expect(document.title).toBe('Third');

      unmount();

      expect(document.title).toBe(originalTitle);
    });

    test('should restore title with prefix and suffix', () => {
      const { unmount } = renderHook(() =>
        useDocumentTitle('Page', {
          prefix: 'MySite - ',
          suffix: ' | v1.0',
          restoreOnUnmount: true,
        })
      );

      expect(document.title).toBe('MySite - Page | v1.0');

      unmount();

      expect(document.title).toBe(originalTitle);
    });
  });

  describe('multiple instances', () => {
    test('should handle multiple hook instances', () => {
      renderHook(() => useDocumentTitle('First'));
      renderHook(() => useDocumentTitle('Second'));

      // Last one wins
      expect(document.title).toBe('Second');
    });

    test('should restore to original title when last instance with restoreOnUnmount unmounts', () => {
      const { unmount: unmount1 } = renderHook(() => useDocumentTitle('First'));
      const { unmount: unmount2 } = renderHook(() =>
        useDocumentTitle('Second', { restoreOnUnmount: true })
      );

      expect(document.title).toBe('Second');

      unmount2();

      // Should restore to the title that was set before this hook mounted
      // In this case, it's the title from the first hook
      expect(document.title).toBe('First');

      unmount1();
    });
  });

  describe('edge cases', () => {
    test('should handle very long titles', () => {
      const longTitle = 'A'.repeat(1000);
      renderHook(() => useDocumentTitle(longTitle));

      expect(document.title).toBe(longTitle);
    });

    test('should handle title with newlines', () => {
      const titleWithNewlines = 'Title\nWith\nNewlines';
      renderHook(() => useDocumentTitle(titleWithNewlines));

      // Browsers normalize newlines in document.title to spaces
      expect(document.title).toBe('Title With Newlines');
    });

    test('should handle title with tabs', () => {
      const titleWithTabs = 'Title\tWith\tTabs';
      renderHook(() => useDocumentTitle(titleWithTabs));

      // Browsers normalize tabs in document.title to spaces
      expect(document.title).toBe('Title With Tabs');
    });

    test('should handle undefined in options', () => {
      renderHook(() =>
        useDocumentTitle('Title', {
          prefix: undefined,
          suffix: undefined,
          restoreOnUnmount: undefined,
        })
      );

      expect(document.title).toBe('Title');
    });
  });

  describe('integration', () => {
    test('should work correctly with rapid rerenders', () => {
      const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
        initialProps: { title: 'Title 1' },
      });

      expect(document.title).toBe('Title 1');

      rerender({ title: 'Title 2' });
      rerender({ title: 'Title 3' });
      rerender({ title: 'Title 4' });
      rerender({ title: 'Title 5' });

      expect(document.title).toBe('Title 5');
    });

    test('should handle mount/unmount cycles', () => {
      const { unmount: unmount1 } = renderHook(() =>
        useDocumentTitle('First', { restoreOnUnmount: true })
      );

      expect(document.title).toBe('First');

      unmount1();

      expect(document.title).toBe(originalTitle);

      const { unmount: unmount2 } = renderHook(() =>
        useDocumentTitle('Second', { restoreOnUnmount: true })
      );

      expect(document.title).toBe('Second');

      unmount2();

      expect(document.title).toBe(originalTitle);
    });

    test('should handle all options together', () => {
      const { rerender, unmount } = renderHook(
        ({ title, prefix, suffix }) =>
          useDocumentTitle(title, { prefix, suffix, restoreOnUnmount: true }),
        {
          initialProps: {
            title: 'Page',
            prefix: 'Site - ',
            suffix: ' | App',
          },
        }
      );

      expect(document.title).toBe('Site - Page | App');

      rerender({ title: 'New Page', prefix: 'New Site - ', suffix: ' | New App' });

      expect(document.title).toBe('New Site - New Page | New App');

      unmount();

      expect(document.title).toBe(originalTitle);
    });
  });
});
