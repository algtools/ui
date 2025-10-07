'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Search, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AddressData {
  street: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface AddressSuggestion {
  id: string;
  description: string;
  address: AddressData;
}

export interface SuggestionProvider {
  search: (query: string) => Promise<AddressSuggestion[]>;
  isLoading?: boolean;
}

export interface MexicanAddressEditorProps {
  onAddressChange?: (address: AddressData) => void;
  initialAddress?: Partial<AddressData>;
  title?: string;
  className?: string;
  suggestionProvider?: SuggestionProvider;
  enableSuggestions?: boolean;
}

// Mexican states data
const MEXICAN_STATES = [
  { code: 'AGU', name: 'Aguascalientes' },
  { code: 'BCN', name: 'Baja California' },
  { code: 'BCS', name: 'Baja California Sur' },
  { code: 'CAM', name: 'Campeche' },
  { code: 'CHP', name: 'Chiapas' },
  { code: 'CHH', name: 'Chihuahua' },
  { code: 'CMX', name: 'Ciudad de México' },
  { code: 'COA', name: 'Coahuila' },
  { code: 'COL', name: 'Colima' },
  { code: 'DUR', name: 'Durango' },
  { code: 'GUA', name: 'Guanajuato' },
  { code: 'GRO', name: 'Guerrero' },
  { code: 'HID', name: 'Hidalgo' },
  { code: 'JAL', name: 'Jalisco' },
  { code: 'MEX', name: 'México' },
  { code: 'MIC', name: 'Michoacán' },
  { code: 'MOR', name: 'Morelos' },
  { code: 'NAY', name: 'Nayarit' },
  { code: 'NLE', name: 'Nuevo León' },
  { code: 'OAX', name: 'Oaxaca' },
  { code: 'PUE', name: 'Puebla' },
  { code: 'QUE', name: 'Querétaro' },
  { code: 'ROO', name: 'Quintana Roo' },
  { code: 'SLP', name: 'San Luis Potosí' },
  { code: 'SIN', name: 'Sinaloa' },
  { code: 'SON', name: 'Sonora' },
  { code: 'TAB', name: 'Tabasco' },
  { code: 'TAM', name: 'Tamaulipas' },
  { code: 'TLA', name: 'Tlaxcala' },
  { code: 'VER', name: 'Veracruz' },
  { code: 'YUC', name: 'Yucatán' },
  { code: 'ZAC', name: 'Zacatecas' },
];

const createMockSuggestionProvider = (): SuggestionProvider => {
  const mockSuggestions: AddressSuggestion[] = [
    {
      id: '1',
      description: 'Av. Paseo de la Reforma 123, Cuauhtémoc, Ciudad de México',
      address: {
        street: 'Av. Paseo de la Reforma',
        exteriorNumber: '123',
        interiorNumber: '',
        neighborhood: 'Cuauhtémoc',
        city: 'Ciudad de México',
        state: 'CMX',
        postalCode: '06500',
        country: 'México',
      },
    },
    {
      id: '2',
      description: 'Calle Francisco I. Madero 456, Centro Histórico, Ciudad de México',
      address: {
        street: 'Calle Francisco I. Madero',
        exteriorNumber: '456',
        interiorNumber: '2',
        neighborhood: 'Centro Histórico',
        city: 'Ciudad de México',
        state: 'CMX',
        postalCode: '06000',
        country: 'México',
      },
    },
    {
      id: '3',
      description: 'Av. Insurgentes Sur 789, Roma Norte, Ciudad de México',
      address: {
        street: 'Av. Insurgentes Sur',
        exteriorNumber: '789',
        interiorNumber: '',
        neighborhood: 'Roma Norte',
        city: 'Ciudad de México',
        state: 'CMX',
        postalCode: '06700',
        country: 'México',
      },
    },
    {
      id: '4',
      description: 'Av. Constituyentes 1001, Lomas Altas, Guadalajara, Jalisco',
      address: {
        street: 'Av. Constituyentes',
        exteriorNumber: '1001',
        interiorNumber: '',
        neighborhood: 'Lomas Altas',
        city: 'Guadalajara',
        state: 'JAL',
        postalCode: '44150',
        country: 'México',
      },
    },
    {
      id: '5',
      description: 'Calle Hidalgo 234, Centro, Monterrey, Nuevo León',
      address: {
        street: 'Calle Hidalgo',
        exteriorNumber: '234',
        interiorNumber: 'B',
        neighborhood: 'Centro',
        city: 'Monterrey',
        state: 'NLE',
        postalCode: '64000',
        country: 'México',
      },
    },
    {
      id: '6',
      description: 'Av. Universidad 567, Del Valle, San Pedro Garza García, Nuevo León',
      address: {
        street: 'Av. Universidad',
        exteriorNumber: '567',
        interiorNumber: '',
        neighborhood: 'Del Valle',
        city: 'San Pedro Garza García',
        state: 'NLE',
        postalCode: '66220',
        country: 'México',
      },
    },
    {
      id: '7',
      description: 'Calle 60 No. 890, Centro, Mérida, Yucatán',
      address: {
        street: 'Calle 60',
        exteriorNumber: '890',
        interiorNumber: '',
        neighborhood: 'Centro',
        city: 'Mérida',
        state: 'YUC',
        postalCode: '97000',
        country: 'México',
      },
    },
    {
      id: '8',
      description: 'Blvd. Agua Caliente 1234, Zona Río, Tijuana, Baja California',
      address: {
        street: 'Blvd. Agua Caliente',
        exteriorNumber: '1234',
        interiorNumber: 'Suite 5',
        neighborhood: 'Zona Río',
        city: 'Tijuana',
        state: 'BCN',
        postalCode: '22010',
        country: 'México',
      },
    },
    {
      id: '9',
      description: 'Av. Juárez 345, Centro, Puebla, Puebla',
      address: {
        street: 'Av. Juárez',
        exteriorNumber: '345',
        interiorNumber: '',
        neighborhood: 'Centro',
        city: 'Puebla',
        state: 'PUE',
        postalCode: '72000',
        country: 'México',
      },
    },
    {
      id: '10',
      description: 'Calle Morelos 678, Centro, Oaxaca de Juárez, Oaxaca',
      address: {
        street: 'Calle Morelos',
        exteriorNumber: '678',
        interiorNumber: '1',
        neighborhood: 'Centro',
        city: 'Oaxaca de Juárez',
        state: 'OAX',
        postalCode: '68000',
        country: 'México',
      },
    },
    {
      id: '11',
      description: 'Av. Revolución 912, Zona Centro, Cancún, Quintana Roo',
      address: {
        street: 'Av. Revolución',
        exteriorNumber: '912',
        interiorNumber: '',
        neighborhood: 'Zona Centro',
        city: 'Cancún',
        state: 'ROO',
        postalCode: '77500',
        country: 'México',
      },
    },
    {
      id: '12',
      description: 'Calle Allende 135, Centro, Querétaro, Querétaro',
      address: {
        street: 'Calle Allende',
        exteriorNumber: '135',
        interiorNumber: '3',
        neighborhood: 'Centro',
        city: 'Querétaro',
        state: 'QUE',
        postalCode: '76000',
        country: 'México',
      },
    },
  ];

  return {
    search: async (query: string): Promise<AddressSuggestion[]> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockSuggestions.filter((suggestion) =>
        suggestion.description.toLowerCase().includes(query.toLowerCase())
      );
    },
  };
};

export function MexicanAddressEditor({
  onAddressChange,
  initialAddress = {},
  className = '',
  suggestionProvider,
  enableSuggestions = true,
}: MexicanAddressEditorProps) {
  const [address, setAddress] = useState<AddressData>({
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    neighborhood: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'México',
    ...initialAddress,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [manuallyEditedFields, setManuallyEditedFields] = useState<Set<string>>(new Set());
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null);
  const [postalCodeError, setPostalCodeError] = useState('');
  const [hasSuggestionBeenSelected, setHasSuggestionBeenSelected] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchInputNameRef = useRef<string>(
    `search-address-${Math.random().toString(36).slice(2)}`
  );

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const activeSuggestionProvider = suggestionProvider || createMockSuggestionProvider();

  // Handle postal code change with validation
  const handlePostalCodeChange = (value: string) => {
    // Only allow digits and limit to 5 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 5);

    updateAddressField('postalCode', numericValue);

    if (numericValue.length > 0 && numericValue.length < 5) {
      setPostalCodeError('El código postal debe tener exactamente 5 dígitos');
    } else if (numericValue.length === 5) {
      setPostalCodeError('');
    } else {
      setPostalCodeError('');
    }
  };

  const updateAddressField = (field: keyof AddressData, value: string) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    onAddressChange?.(newAddress);

    // If user has selected a suggestion and now manually edits any field
    if (hasSuggestionBeenSelected && selectedSuggestionId) {
      // Mark field as manually edited
      setManuallyEditedFields(new Set([...manuallyEditedFields, field]));

      // Clear all suggestion-related state
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionId(null);
      setHasSuggestionBeenSelected(false);

      // Clear the search query to show the suggestions are no longer active
      setSearchQuery('');
    }
  };

  const handleStateChange = (value: string) => {
    updateAddressField('state', value);
  };

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value);
    setHighlightedIndex(-1);

    if (hasSuggestionBeenSelected) {
      setHasSuggestionBeenSelected(false);
      setSelectedSuggestionId(null);
      setManuallyEditedFields(new Set());
    }

    if (value.length > 2 && enableSuggestions) {
      setIsSearching(true);
      try {
        const results = await activeSuggestionProvider.search(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
    setAddress(suggestion.address);
    setSearchQuery(suggestion.description);
    setShowSuggestions(false);
    setSelectedSuggestionId(suggestion.id);
    setManuallyEditedFields(new Set()); // Reset manual edits
    setHasSuggestionBeenSelected(true); // Mark that user has selected a suggestion
    onAddressChange?.(suggestion.address);
  };

  // Clear search and suggestions
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestionId(null);
    setHasSuggestionBeenSelected(false);
    setManuallyEditedFields(new Set());
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ensure highlighted item stays in view when navigating with keyboard
  useEffect(() => {
    if (!suggestionsRef.current || highlightedIndex < 0) return;
    const currentId = suggestions[highlightedIndex]?.id;
    if (!currentId) return;
    const el = suggestionsRef.current.querySelector(
      `#address-suggestion-${CSS.escape(currentId)}`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, suggestions]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const next = prev < suggestions.length - 1 ? prev + 1 : 0;
        return next < 0 ? 0 : next;
      });
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === -1) return suggestions.length - 1;
        return prev > 0 ? prev - 1 : suggestions.length - 1;
      });
      return;
    }
    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSuggestionSelect(suggestions[highlightedIndex]);
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      return;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {enableSuggestions && (
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
            Buscar dirección
          </Label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                id="search"
                type="text"
                placeholder="Escribe una dirección para buscar sugerencias..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onKeyDownCapture={handleSearchKeyDown}
                aria-expanded={showSuggestions}
                aria-controls="address-suggestions"
                aria-autocomplete="list"
                aria-activedescendant={
                  highlightedIndex >= 0 && suggestions[highlightedIndex]
                    ? `address-suggestion-${suggestions[highlightedIndex].id}`
                    : undefined
                }
                autoComplete="off"
                name={searchInputNameRef.current}
                inputMode="search"
                enterKeyHint="search"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className="pl-10 pr-10"
              />
              {(searchQuery || isSearching) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                  onClick={clearSearch}
                >
                  {isSearching ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                id="address-suggestions"
                role="listbox"
                className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    id={`address-suggestion-${suggestion.id}`}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    className={cn(
                      'flex w-full items-start gap-2 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
                      index === highlightedIndex && 'bg-accent text-accent-foreground'
                    )}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span>{suggestion.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Address Fields */}
      <div className="space-y-3">
        {/* Street and Numbers Row - Responsive layout */}
        <div className="space-y-3">
          {/* Street field - full width on all screens */}
          <div className="space-y-1.5">
            <Label htmlFor="street" className="text-sm font-medium">
              Calle *
              {manuallyEditedFields.has('street') && (
                <Badge variant="outline" className="ml-1.5 text-xs">
                  Editado
                </Badge>
              )}
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Nombre de la calle"
              value={address.street}
              onChange={(e) => updateAddressField('street', e.target.value)}
              autoComplete="address-line1"
            />
          </div>

          {/* Numbers row - 50/50 split on XS, inline with street on larger screens */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="exteriorNumber" className="text-sm font-medium">
                No. Ext. *
              </Label>
              <Input
                id="exteriorNumber"
                type="text"
                placeholder="123"
                value={address.exteriorNumber}
                onChange={(e) => updateAddressField('exteriorNumber', e.target.value)}
                autoComplete="address-line2"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="interiorNumber" className="text-sm font-medium">
                No. Int.
              </Label>
              <Input
                id="interiorNumber"
                type="text"
                placeholder="A"
                value={address.interiorNumber}
                onChange={(e) => updateAddressField('interiorNumber', e.target.value)}
                autoComplete="address-line3"
              />
            </div>
          </div>
        </div>

        {/* Neighborhood and City Row */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="neighborhood" className="text-sm font-medium">
              Colonia *
              {manuallyEditedFields.has('neighborhood') && (
                <Badge variant="outline" className="ml-1.5 text-xs">
                  Editado
                </Badge>
              )}
            </Label>
            <Input
              id="neighborhood"
              type="text"
              placeholder="Nombre de la colonia"
              value={address.neighborhood}
              onChange={(e) => updateAddressField('neighborhood', e.target.value)}
              autoComplete="address-level3"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city" className="text-sm font-medium">
              Ciudad *
              {manuallyEditedFields.has('city') && (
                <Badge variant="outline" className="ml-1.5 text-xs">
                  Editado
                </Badge>
              )}
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Nombre de la ciudad"
              value={address.city}
              onChange={(e) => updateAddressField('city', e.target.value)}
              autoComplete="address-level2"
            />
          </div>
        </div>

        {/* State and Postal Code Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="state" className="text-sm font-medium">
              Estado *
              {manuallyEditedFields.has('state') && (
                <Badge variant="outline" className="ml-1.5 text-xs">
                  Editado
                </Badge>
              )}
            </Label>
            <Select value={address.state} onValueChange={handleStateChange}>
              <SelectTrigger aria-autocomplete="none" autoCorrect="off" autoCapitalize="none">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {MEXICAN_STATES.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="postalCode" className="text-sm font-medium">
              C.P. *
              {manuallyEditedFields.has('postalCode') && (
                <Badge variant="outline" className="ml-1.5 text-xs">
                  Editado
                </Badge>
              )}
            </Label>
            <div className="relative">
              <Input
                id="postalCode"
                type="text"
                placeholder="12345"
                value={address.postalCode}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                className={cn(
                  postalCodeError && 'border-destructive focus-visible:ring-destructive'
                )}
                maxLength={5}
                autoComplete="postal-code"
              />
              {postalCodeError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
              )}
            </div>
            {postalCodeError && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {postalCodeError}
              </p>
            )}
          </div>
        </div>

        {/* Country (Read-only) - More compact */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="country" className="text-sm font-medium">
              País
            </Label>
            <Input
              id="country"
              type="text"
              value={address.country}
              readOnly
              className="bg-muted text-sm"
              autoComplete="country"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
