'use client';

import * as React from 'react';
import es from 'react-phone-number-input/locale/es.json';

import { PhoneInput } from '@/components/ui/phone-input';

export default function PhoneInputDemoPage() {
  const [basicValue, setBasicValue] = React.useState<string>('');
  const [turkeyDefaultValue, setTurkeyDefaultValue] = React.useState<string>('');
  const [i18nValue, setI18nValue] = React.useState<string>('');

  return (
    <div className="container mx-auto p-6 space-y-10">
      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
        <div className="rounded-lg border p-6">
          <div className="max-w-md">
            <PhoneInput
              placeholder="Enter a phone number"
              value={basicValue}
              onChange={(value) => setBasicValue(value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Setting default country</h2>
        <div className="rounded-lg border p-6">
          <div className="max-w-md">
            <PhoneInput
              defaultCountry="MX"
              placeholder="Enter a phone number"
              value={turkeyDefaultValue}
              onChange={(value) => setTurkeyDefaultValue(value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Internationalization</h2>
        <div className="rounded-lg border p-6">
          <div className="max-w-md">
            <PhoneInput
              labels={es}
              placeholder="Número de teléfono"
              value={i18nValue}
              onChange={(value) => setI18nValue(value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
