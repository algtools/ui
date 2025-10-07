/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AspectRatio } from '../aspect-ratio';

describe('AspectRatio', () => {
  it('renders root with data-slot and displays children', () => {
    render(
      <AspectRatio>
        <img alt="thumb" src="/test.png" />
      </AspectRatio>
    );
    const root = document.querySelector('[data-slot="aspect-ratio"]');
    expect(root).not.toBeNull();
    expect(screen.getByAltText('thumb')).toBeInTheDocument();
  });
});
