import React from 'react';
import { render, screen, userEvent } from './test/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { IMAGE_LIST } from './utils/constants';
import App from './App';

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
    const [label] = screen.getAllByTestId('row');
    const [container] = document.getElementsByClassName('container');
    expect(container).not.toBeNull();
    if (!container) return;

    expect(container.getElementsByTagName('button')).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(5);
    expect(screen.getAllByTestId('item')).toHaveLength(15);

    expect(label.textContent).toBe('S');
  });

  it('Opens a modal with a rendered image of the Tierbuilder', async () => {
    const btn = screen
      .getByText(/save image/i)
      .closest('button') as HTMLButtonElement;

    await userEvent.click(btn);
    const canvas = document.querySelector('canvas');
    expect(screen.getByText(/download/i)).toBeInTheDocument();
    expect(canvas).not.toBeNull();
  });

  describe('Row customization modal', async () => {
    let row, btn;

    beforeEach(async () => {
      [row] = screen.getAllByTestId('row');
      [btn] = row.getElementsByTagName('svg');

      await userEvent.click(btn);
      expect(screen.getByText(/edit label text/i)).toBeInTheDocument();
    });

    it('Changes the label color', async () => {
      const picker = document.querySelector('.picker') as HTMLElement;
      const color = (
        Array.from(picker.getElementsByTagName('span')).at(-1) as HTMLElement
      ).firstChild as HTMLElement;
      const initial = color.title;
      const [input] = document.getElementsByTagName('input');

      await userEvent.dblClick(input);
      await userEvent.keyboard('FFFFFF');

      expect(color.title).not.toEqual(initial);
    });

    it('Changes the label text', async () => {
      const [input] = document.getElementsByTagName('textarea');

      await userEvent.dblClick(input);
      await userEvent.keyboard('Row');

      expect(input).toHaveValue('Row');
    });
  });
});
