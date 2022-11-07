import React, { Children, ButtonHTMLAttributes } from 'react';
import { joinClassNames } from '../../utils/helpers';

interface Props extends ButtonHTMLAttributes<unknown> {
  isInput?: boolean;
}

export default function Button({ className, isInput, ...props }: Props) {
  props.children &&= Children.map(props.children, (child) =>
    typeof child === 'string' ? <span>{child}</span> : child
  );

  const baseStyles =
    'flex space-x-1 items-center justify-center rounded-sm bg-neutral-200 px-2 py-1 text-center font-semibold outline outline-1 outline-neutral-400 transition-all hover:bg-neutral-300 hover:outline-neutral-500 active:translate-y-[1px]';

  return isInput ? (
    <input
      role="button"
      className={joinClassNames(baseStyles, className)}
      {...props}
    />
  ) : (
    <button className={joinClassNames(baseStyles, className)} {...props} />
  );
}
