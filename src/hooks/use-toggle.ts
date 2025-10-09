'use client';

import * as React from 'react';

/**
 * Options for configuring the useToggle hook
 */
export interface UseToggleOptions {
  /** Optional callback function called when toggle changes to true */
  onToggleOn?: () => void;
  /** Optional callback function called when toggle changes to false */
  onToggleOff?: () => void;
  /** Optional callback function called on any toggle state change */
  onChange?: (value: boolean) => void;
}

/**
 * Return type for the useToggle hook
 */
export interface UseToggleReturn {
  /** The current toggle value */
  value: boolean;
  /** Set the value to true */
  setTrue: () => void;
  /** Set the value to false */
  setFalse: () => void;
  /** Toggle the current value */
  toggle: () => void;
  /** Set a specific boolean value */
  setValue: (value: boolean) => void;
}

/**
 * A custom hook for managing toggle state with advanced options including callbacks.
 * Similar to useBoolean but with additional callback support for state changes.
 *
 * @param initialValue - The initial boolean value (default: false)
 * @param options - Optional configuration including callbacks
 * @returns An object containing the current value and helper functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { value, toggle, setTrue, setFalse } = useToggle(false, {
 *     onToggleOn: () => console.log('Toggled on!'),
 *     onToggleOff: () => console.log('Toggled off!'),
 *     onChange: (newValue) => console.log('Changed to:', newValue),
 *   });
 *
 *   return (
 *     <div>
 *       <p>Toggle is: {value ? 'ON' : 'OFF'}</p>
 *       <button onClick={toggle}>Toggle</button>
 *       <button onClick={setTrue}>Turn On</button>
 *       <button onClick={setFalse}>Turn Off</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useToggle(
  initialValue: boolean = false,
  options: UseToggleOptions = {}
): UseToggleReturn {
  const { onToggleOn, onToggleOff, onChange } = options;

  const [value, setValueInternal] = React.useState<boolean>(initialValue);

  // Store callbacks in refs to avoid recreating functions when they change
  const onToggleOnRef = React.useRef(onToggleOn);
  const onToggleOffRef = React.useRef(onToggleOff);
  const onChangeRef = React.useRef(onChange);

  // Update refs when callbacks change
  React.useEffect(() => {
    onToggleOnRef.current = onToggleOn;
    onToggleOffRef.current = onToggleOff;
    onChangeRef.current = onChange;
  }, [onToggleOn, onToggleOff, onChange]);

  const setValue = React.useCallback((newValue: boolean) => {
    setValueInternal((prevValue) => {
      if (prevValue === newValue) return prevValue;

      // Call appropriate callbacks
      if (newValue) {
        onToggleOnRef.current?.();
      } else {
        onToggleOffRef.current?.();
      }
      onChangeRef.current?.(newValue);

      return newValue;
    });
  }, []);

  const setTrue = React.useCallback(() => setValue(true), [setValue]);
  const setFalse = React.useCallback(() => setValue(false), [setValue]);
  const toggle = React.useCallback(() => {
    setValueInternal((prev) => {
      const newValue = !prev;
      
      // Call appropriate callbacks
      if (newValue) {
        onToggleOnRef.current?.();
      } else {
        onToggleOffRef.current?.();
      }
      onChangeRef.current?.(newValue);

      return newValue;
    });
  }, []);

  return React.useMemo(
    () => ({
      value,
      setValue,
      setTrue,
      setFalse,
      toggle,
    }),
    [value, setValue, setTrue, setFalse, toggle]
  );
}
