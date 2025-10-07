import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../carousel';

// Mock embla-carousel-react hook
const scrollPrev = jest.fn();
const scrollNext = jest.fn();
const canScrollPrev = jest.fn().mockReturnValue(false);
const canScrollNext = jest.fn().mockReturnValue(true);
const on = jest.fn();
const off = jest.fn();

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn(() => [
    jest.fn(),
    { scrollPrev, scrollNext, canScrollPrev, canScrollNext, on, off },
  ]),
}));

describe('Carousel', () => {
  beforeEach(() => {
    scrollPrev.mockClear();
    scrollNext.mockClear();
    canScrollPrev.mockClear().mockReturnValue(false);
    canScrollNext.mockClear().mockReturnValue(true);
    on.mockClear();
    off.mockClear();
  });

  it('renders root with correct roles, data-slot, and children structure', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
    const root = screen.getByRole('region');
    expect(root).toHaveAttribute('data-slot', 'carousel');
    // content and item
    const content = document.querySelector('[data-slot="carousel-content"]');
    expect(content).not.toBeNull();
    const item = document.querySelector('[data-slot="carousel-item"]');
    expect(item).not.toBeNull();
  });

  it('disables/enables nav buttons based on canScroll flags', () => {
    render(
      <Carousel>
        <CarouselContent />
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
    const prev = document.querySelector('[data-slot="carousel-previous"]') as HTMLButtonElement;
    const next = document.querySelector('[data-slot="carousel-next"]') as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    expect(next.disabled).toBe(false);
  });

  it('invokes scroll handlers on button click and keyboard arrows', async () => {
    // Ensure buttons are enabled once effect runs
    canScrollPrev.mockReturnValue(true);
    canScrollNext.mockReturnValue(true);
    render(
      <Carousel>
        <CarouselContent />
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
    const prev = document.querySelector('[data-slot="carousel-previous"]') as HTMLButtonElement;
    const next = document.querySelector('[data-slot="carousel-next"]') as HTMLButtonElement;
    await waitFor(() => expect(prev.disabled).toBe(false));
    await waitFor(() => expect(next.disabled).toBe(false));

    fireEvent.click(next);
    expect(scrollNext).toHaveBeenCalledTimes(1);

    fireEvent.click(prev);
    expect(scrollPrev).toHaveBeenCalledTimes(1);

    const root = screen.getByRole('region');
    fireEvent.keyDown(root, { key: 'ArrowRight' });
    expect(scrollNext).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(root, { key: 'ArrowLeft' });
    expect(scrollPrev).toHaveBeenCalledTimes(2);
  });

  it('respects vertical orientation for content and item layout classes', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
      </Carousel>
    );
    const inner = document.querySelector('[data-slot="carousel-content"] > div') as HTMLElement;
    expect(inner).toHaveClass('flex');
    expect(inner).toHaveClass('flex-col');
    const item = document.querySelector('[data-slot="carousel-item"]') as HTMLElement;
    expect(item).toHaveClass('pt-4');
  });
});
