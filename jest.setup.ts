import '@testing-library/jest-dom';

// Polyfill ResizeObserver for jsdom (used by cmdk)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error ResizeObserver not defined in global
if (typeof (global as GlobalThis).ResizeObserver === 'undefined') {
  // @ts-expect-error Assigning ResizeObserver to global
  (global as GlobalThis).ResizeObserver = ResizeObserver;
}

// Polyfill scrollIntoView used by cmdk in focus management
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
