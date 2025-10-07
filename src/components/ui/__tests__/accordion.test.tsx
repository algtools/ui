import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

describe('Accordion', () => {
  it('renders root with data-slot', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const root = document.querySelector('[data-slot="accordion"]');
    expect(root).not.toBeNull();
  });

  it('renders item, trigger, and content with data-slots and classes', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="custom-item">
          <AccordionTrigger className="custom-trigger">Trigger</AccordionTrigger>
          <AccordionContent className="custom-content">Body</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const item = document.querySelector('[data-slot="accordion-item"]');
    expect(item).toHaveClass('border-b');
    expect(item).toHaveClass('custom-item');

    const trigger = document.querySelector('[data-slot="accordion-trigger"]');
    expect(trigger).toBeTruthy();
    expect(trigger).toHaveClass('font-medium');
    expect(trigger).toHaveClass('custom-trigger');

    const content = document.querySelector('[data-slot="accordion-content"]');
    expect(content).toBeTruthy();
  });

  it('toggles open/closed state when clicking trigger (single mode)', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Details</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole('button', { name: /section/i });
    const content = document.querySelector('[data-slot="accordion-content"]') as HTMLElement;

    // Initially closed
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content.getAttribute('data-state')).toBe('closed');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content.getAttribute('data-state')).toBe('open');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content.getAttribute('data-state')).toBe('closed');
  });
});
