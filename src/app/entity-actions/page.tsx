'use client';

import * as React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type SectionKey = 'organization' | 'client' | 'transaction';

type Section = {
  key: SectionKey;
  title: string;
  actions: string[];
};

const SECTIONS: Section[] = [
  {
    key: 'organization',
    title: 'Organization',
    actions: [
      'Create organization',
      'Update profile',
      'Invite member',
      'Remove member',
      'Manage roles',
      'View audit logs',
    ],
  },
  {
    key: 'client',
    title: 'Client',
    actions: [
      'Onboard client',
      'Verify KYC',
      'Suspend account',
      'Reinstate account',
      'Reset credentials',
    ],
  },
  {
    key: 'transaction',
    title: 'Transaction',
    actions: ['Review transaction', 'Approve', 'Decline', 'Refund', 'Flag for investigation'],
  },
];

function createEmptySelection(): Record<SectionKey, Set<string>> {
  return {
    organization: new Set<string>(),
    client: new Set<string>(),
    transaction: new Set<string>(),
  };
}

export default function EntityActionsDemoPage() {
  const [selectedBySection, setSelectedBySection] =
    React.useState<Record<SectionKey, Set<string>>>(createEmptySelection());

  function toggleAction(section: SectionKey, action: string, checked: boolean | string) {
    setSelectedBySection((prev) => {
      const next = { ...prev };
      const current = new Set(next[section]);
      const isChecked = checked === true || checked === 'indeterminate';
      if (isChecked) {
        current.add(action);
      } else {
        current.delete(action);
      }
      next[section] = current;
      return next;
    });
  }

  function clearSection(section: SectionKey) {
    setSelectedBySection((prev) => ({ ...prev, [section]: new Set<string>() }));
  }

  function clearAll() {
    setSelectedBySection(createEmptySelection());
  }

  const totalSelected =
    selectedBySection.organization.size +
    selectedBySection.client.size +
    selectedBySection.transaction.size;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Entity actions</h1>
          <p className="text-sm text-muted-foreground">
            Select actions per entity. Use Clear to reset selections.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {totalSelected > 0 ? <Badge variant="secondary">{totalSelected} selected</Badge> : null}
          <Button variant="outline" onClick={clearAll} disabled={totalSelected === 0}>
            Clear all
          </Button>
        </div>
      </div>

      <Accordion type="multiple" className="w-full rounded-lg border bg-background">
        {SECTIONS.map((section) => {
          const count = selectedBySection[section.key].size;
          return (
            <AccordionItem key={section.key} value={section.key}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span>{section.title}</span>
                  {count > 0 ? (
                    <Badge variant="secondary" className="ml-1">
                      {count}
                    </Badge>
                  ) : null}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm text-muted-foreground">Available actions</p>
                  <Button
                    variant="ghost"
                    onClick={() => clearSection(section.key)}
                    disabled={count === 0}
                  >
                    Clear section
                  </Button>
                </div>
                <ul className="space-y-2">
                  {section.actions.map((action) => {
                    const actionId = `${section.key}-${action}`.toLowerCase().replace(/\s+/g, '-');
                    const isChecked = selectedBySection[section.key].has(action);
                    return (
                      <li key={action} className="flex items-center gap-3">
                        <Checkbox
                          id={actionId}
                          checked={isChecked}
                          onCheckedChange={(checked) => toggleAction(section.key, action, checked)}
                        />
                        <label htmlFor={actionId} className="text-sm leading-none cursor-pointer">
                          {action}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
