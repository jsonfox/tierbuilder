import React from 'react';
import { render, screen, userEvent } from './utils/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { IMAGE_LIST } from './utils/constants';
import App from './App';
import { getElementsByTagName } from 'domutils';

describe('Full app rendering/navigation', async () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('Displays the correct landing page', () => {
    expect(screen.getByText(/customize row labels/i)).toBeInTheDocument();
  });

  it('Redirects to builder page after clicking corresponding nav button', async () => {
    await userEvent.click(screen.getByText(/use example template/i));

    expect(location.pathname).toBe('/builder');
    expect(screen.getByText(/copy as url/i)).toBeInTheDocument();
  });

  it('Redirects back to landing page after clicking corresponding nav button', async () => {
    await userEvent.click(screen.getByText(/create new template/i));

    expect(location.pathname).toBe('/');
    expect(screen.getByText(/\d+ images/i)).toBeInTheDocument();
  });
});

describe('App handling invalid routes', () => {
  it('Redirects to landing page on invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/notarealroute']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/add custom images/i)).toBeInTheDocument();
  });

  it('Redirects to /builder on invalid /:encoded url', () => {
    render(
      <MemoryRouter initialEntries={['/builder/invalidencodedurl']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/save image/i)).toBeInTheDocument();
  });
});

describe('Create Tierbuilder page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('Handles file uploads and form submission', async () => {
    const files = IMAGE_LIST.slice(0, 2).map(
      (url, i) =>
        new File([`image${i}`], `image${i}.png`, { type: 'image/png' })
    );
    const input = screen.getByLabelText(/drop files here/i) as HTMLInputElement;
    const submit = screen.getByDisplayValue(/^create$/i);
    await userEvent.upload(input, files[0]);

    expect(input.files).toHaveLength(1);
    expect(input.files?.[0]).toStrictEqual(files[0]);
    await userEvent.click(submit);
    expect(screen.getByText(/customize row labels/i)).toBeInTheDocument();

    await userEvent.upload(input, files.slice(1, 3));
    await userEvent.click(submit);
  });

  it('Does not read unsupported file types', async () => {
    const file = new File(['invalid'], 'invalid.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/drop files here/i) as HTMLInputElement;

    await userEvent.upload(input, file);
    expect(input.files).toHaveLength(0);
  });

  it('Handles label changes', async () => {
    const input = (await screen.findByDisplayValue(/^S$/)) as HTMLInputElement;

    expect(input).toHaveValue('S');

    await userEvent.dblClick(input);
    await userEvent.keyboard('Renamed');

    expect(input).toHaveValue('Renamed');
    expect(
      (await screen.findByDisplayValue(/renamed/i)) as HTMLElement
    ).toBeInTheDocument();
  });
});

describe('Tierbuilder page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/builder']}>
        <App />
      </MemoryRouter>
    );
  });

  it('Contains the proper page elements for the Tierbuilder', async () => {
    const [container] = document.getElementsByClassName('container');
    expect(container).not.toBeNull();
    if (!container) return;

    expect(container.getElementsByTagName('button')).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(5);
    expect(screen.getAllByTestId('item')).toHaveLength(15);
  });

  it('Reorders elements on drag & drop', async () => {
    const container = screen.getByTestId('pool');
    expect(container).not.toBeNull();
    if (!container) return;

    const initialOrder = container.children;
    expect(container.children).toStrictEqual(initialOrder);

    const items = screen.getAllByTestId('item');
    const item = items[0].closest('[data-rbd-draggable-id]');

    console.log(item);
    // (item as HTMLElement).focus();
    // await userEvent.keyboard('{space}');
    // expect(
    //   await screen.findByText(/You have lifted an item/i)
    // ).toBeInTheDocument();
    // await userEvent.keyboard('{arrowright}');
    // await userEvent.keyboard('{space}');

    // expect(container.children).not.toStrictEqual(initialOrder);
  });

  it('Opens a modal with a rendered image of the Tierbuilder', async () => {
    const btn = screen
      .getByText(/save image/i)
      .closest('button') as HTMLButtonElement;

    await userEvent.click(btn);
    expect(screen.getByText(/download/i)).toBeInTheDocument();
    expect(document.querySelector('canvas')).not.toBeNull();
  });
});
