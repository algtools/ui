import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../form';

type Inputs = {
  name: string;
};

function Input(props: React.ComponentProps<'input'>) {
  return <input {...props} />;
}

function TestForm({ onSubmit }: { onSubmit?: SubmitHandler<Inputs> }) {
  const methods = useForm<Inputs>({ defaultValues: { name: '' } });
  const submit = methods.handleSubmit(onSubmit ?? (() => {}));

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>
        <FormField
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>Tell us who you are</FormDescription>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
          rules={{ required: 'Name is required' }}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

describe('Form', () => {
  it('wires aria attributes and data-slots correctly', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const item = document.querySelector('[data-slot="form-item"]');
    expect(item).not.toBeNull();

    const label = document.querySelector('[data-slot="form-label"]') as HTMLLabelElement;
    const control = document.querySelector('[data-slot="form-control"]') as HTMLElement;
    const description = document.querySelector('[data-slot="form-description"]') as HTMLElement;

    expect(label).not.toBeNull();
    expect(control).not.toBeNull();
    expect(description).not.toBeNull();

    // aria connections
    expect(label.getAttribute('for')).toBe(control.getAttribute('id'));
    const descId = description.getAttribute('id');
    expect(control.getAttribute('aria-describedby')).toContain(descId!);

    // submit without filling triggers error
    await user.click(screen.getByRole('button', { name: /submit/i }));
    const message = document.querySelector('[data-slot="form-message"]');
    expect(message).not.toBeNull();
    expect(control.getAttribute('aria-invalid')).toBe('true');

    // fill input and submit clears error
    await user.type(screen.getByPlaceholderText('Your name'), 'Ada');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(document.querySelector('[data-slot="form-message"]')).toBeNull();
    expect(control.getAttribute('aria-invalid')).toBe('false');
  });
});
