'use client';

import * as React from 'react';

import { MexicanAddressEditor } from '@/components/ui/address-editor-mx';

type AddressData = {
  street: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  city: string;
  state: string; // 3-letter code expected by component
  postalCode: string;
  country: string;
};

type AddressSuggestion = {
  id: string;
  description: string;
  address: AddressData;
};

// Minimal mapping from Google admin_area_level_1 names to the 3-letter codes used by the component
const STATE_NAME_TO_CODE: Record<string, string> = {
  aguascalientes: 'AGU',
  'baja california': 'BCN',
  'baja california sur': 'BCS',
  campeche: 'CAM',
  chiapas: 'CHP',
  chihuahua: 'CHH',
  'ciudad de méxico': 'CMX',
  'ciudad de mexico': 'CMX',
  coahuila: 'COA',
  colima: 'COL',
  durango: 'DUR',
  guanajuato: 'GUA',
  guerrero: 'GRO',
  hidalgo: 'HID',
  jalisco: 'JAL',
  méxico: 'MEX',
  mexico: 'MEX',
  michoacán: 'MIC',
  michoacan: 'MIC',
  morelos: 'MOR',
  nayarit: 'NAY',
  'nuevo león': 'NLE',
  'nuevo leon': 'NLE',
  oaxaca: 'OAX',
  puebla: 'PUE',
  querétaro: 'QUE',
  queretaro: 'QUE',
  'quintana roo': 'ROO',
  'san luis potosí': 'SLP',
  'san luis potosi': 'SLP',
  sinaloa: 'SIN',
  sonora: 'SON',
  tabasco: 'TAB',
  tamaulipas: 'TAM',
  tlaxcala: 'TLA',
  veracruz: 'VER',
  yucatán: 'YUC',
  yucatan: 'YUC',
  zacatecas: 'ZAC',
};

interface AddressComponent {
  types: string[];
  long_name?: string;
  longText?: string;
  shortText?: string;
}

function mapAddressComponentsToAddressData(components: AddressComponent[]): AddressData {
  const get = (type: string) =>
    components.find((c) => Array.isArray(c.types) && c.types.includes(type));

  const getText = (comp: AddressComponent | undefined) =>
    comp?.long_name ?? comp?.longText ?? comp?.shortText ?? '';

  const route = getText(get('route'));
  const streetNumber = getText(get('street_number'));
  const subpremise = getText(get('subpremise'));
  const neighborhood =
    getText(get('neighborhood')) ||
    getText(get('sublocality_level_1')) ||
    getText(get('sublocality')) ||
    '';
  const locality = getText(get('locality'));
  const adminLevel1 = getText(get('administrative_area_level_1'));
  const postalCode = getText(get('postal_code'));

  const stateCode = STATE_NAME_TO_CODE[(adminLevel1 || '').toLowerCase()] ?? '';

  return {
    street: route,
    exteriorNumber: streetNumber,
    interiorNumber: subpremise,
    neighborhood,
    city: locality,
    state: stateCode,
    postalCode,
    country: 'México',
  };
}

function usePlacesV1SuggestionProvider(apiKey: string | undefined) {
  const provider = React.useMemo(() => {
    return {
      search: async (query: string): Promise<AddressSuggestion[]> => {
        if (!apiKey || !query || query.length < 3) return [];

        // Autocomplete (v1)
        const acRes = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            // Return full suggestions to avoid empty bodies from overly strict masks
            'X-Goog-FieldMask': 'suggestions',
          },
          body: JSON.stringify({
            input: query,
            languageCode: 'es',
            // Prefer Mexico suggestions broadly
            includedRegionCodes: ['MX'],
          }),
        });

        if (!acRes.ok) return [];
        const acData: { suggestions?: unknown[] } = await acRes.json();
        const placeSuggestions: Array<{
          placePrediction: { placeId: string; text?: { text?: string } };
        }> = (acData?.suggestions ?? []).filter(
          (s: unknown): s is { placePrediction: { placeId: string; text?: { text?: string } } } =>
            typeof s === 'object' && s !== null && 'placePrediction' in s
        );

        const limited = placeSuggestions.slice(0, 3);

        // Fetch details for each place to get address components
        const details = await Promise.all(
          limited.map(async (s) => {
            const placeId = s.placePrediction.placeId;
            const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es&regionCode=MX`;
            const res = await fetch(url, {
              headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'formattedAddress,addressComponents',
              },
            });
            if (!res.ok) return null;
            const data = await res.json();
            return { data, s };
          })
        );

        const suggestions: AddressSuggestion[] = details
          .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
          .map((entry, idx: number) => {
            const place = entry.data;
            const s = entry.s;
            const address = mapAddressComponentsToAddressData(place?.addressComponents ?? []);
            const description = place?.formattedAddress ?? s?.placePrediction?.text?.text ?? '';
            return {
              id: (s?.placePrediction?.placeId as string) ?? String(idx),
              description,
              address,
            };
          });

        return suggestions;
      },
    };
  }, [apiKey]);

  return provider;
}

export default function AddressEditorMxDemoPage() {
  const [selectedAddress, setSelectedAddress] = React.useState<AddressData | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const suggestionProvider = usePlacesV1SuggestionProvider(apiKey);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Mexican Address Editor Demo</h1>
        <p className="text-sm text-muted-foreground">
          Type a Mexican address to see Google Places suggestions. Selecting a suggestion will
          auto-fill the fields.
        </p>
      </div>

      {!apiKey && (
        <div className="rounded-md border border-destructive p-4 text-destructive">
          Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment to enable Google Places
          suggestions.
        </div>
      )}

      <div className="max-w-2xl">
        <MexicanAddressEditor
          initialAddress={{}}
          enableSuggestions={true}
          suggestionProvider={suggestionProvider}
          onAddressChange={(addr) => setSelectedAddress(addr)}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Selected address (live)</h2>
        <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">
          {JSON.stringify(selectedAddress, null, 2)}
        </pre>
      </div>
    </div>
  );
}
