import React, { FC, ReactNode, ReactElement } from 'react';
import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';
import store, { ReduxProvider } from '../redux/store';

afterEach(() => {
  cleanup();
});

const Providers: FC<{ children: ReactNode }> = ({
  children
}: {
  children: ReactNode;
}) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
