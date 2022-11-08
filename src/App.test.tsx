import React from 'react';
import { render, screen, userEvent } from './utils/test-utils';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('Full app rendering/navigation', async () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('Should display the correct landing page', () => {
    expect(screen.getByText(/customize row labels/i)).toBeInTheDocument();
  });

  it('Should redirect to builder page after clicking corresponding nav button', async () => {
    await userEvent.click(screen.getByText(/use example template/i));

    expect(location.pathname).toBe('/builder');
    expect(screen.getByText(/copy as url/i)).toBeInTheDocument();
  });

  it('Should redirect back to landing page after clicking corresponding nav button', async () => {
    await userEvent.click(screen.getByText(/create new template/i));

    expect(location.pathname).toBe('/');
    expect(screen.getByText(/\d+ images/i)).toBeInTheDocument();
  });
});

describe('App handling invalid routes', () => {
  it('Should redirect to landing page on invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/notarealroute']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/add custom images/i)).toBeInTheDocument();
  });

  it('Should redirect to /builder on invalid /:encoded url', () => {
    render(
      <MemoryRouter initialEntries={['/builder/invalidencodedurl']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/save image/i)).toBeInTheDocument();
  });
});

test('Tierbuilder page structure', () => {
  it('Should contain the proper page elements for the Tierbuilder', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText(/use example template/i));

    const [container] = document.getElementsByClassName('container');
    if (!container) fail();

    expect(container.getElementsByTagName('button').length).toBe(3);
    expect(screen.getAllByRole('row').length).toBe(5);
    expect(screen.getAllByRole('item').length).toBe(15);
  });
});
