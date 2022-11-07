import React from 'react';
import {
  getAllByRole,
  getByRole,
  render,
  screen,
  userEvent
} from './utils/test-utils';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

test('Full app rendering/navigation', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/customize row labels/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/use example template/i));
  expect(location.pathname).toBe('/builder');
  expect(screen.getByText(/copy as url/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/create new template/i));
  expect(location.pathname).toBe('/');
  expect(screen.getByText(/\d+ images/i)).toBeInTheDocument();
});

test('Invalid routes automatically redirect to homepage', async () => {
  render(
    <MemoryRouter initialEntries={['/notarealroute']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/add custom images/i)).toBeInTheDocument();
});

test('Invalid encoded url automatically redirects to /builder', async () => {
  render(
    <MemoryRouter initialEntries={['/builder/invalidencodedurl']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/save image/i)).toBeInTheDocument();
});

test('Tierbuilder page structure', async () => {
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

test('Tierbuilder interactions', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await userEvent.click(screen.getByText(/use example template/i));
  const rows = screen.getAllByRole('row');
  const pool = screen.getByRole('pool');
  const items = getAllByRole(pool, 'button');

  expect(
    rows.every((r) => getByRole(r, 'item-container').childElementCount === 0)
  ).toBe(true);

  items[0].focus();
  userEvent.keyboard('{Space}');
  userEvent.keyboard('{ArrowUp}');
  userEvent.keyboard('{Space}');

  expect(
    screen.getAllByRole('item-container').some((e) => e.childElementCount === 1)
  ).toBe(true);
});
