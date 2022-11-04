import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<unknown> {
  isInput?: boolean;
}

export default function Button(props: Props) {
  const propsClass = props.className ? props.className + ' ' : '';
  const baseStyles =
    'flex items-center justify-center rounded-sm bg-neutral-200 px-2 py-1 text-center font-semibold outline outline-1 outline-neutral-400 transition-all hover:bg-neutral-300 hover:outline-neutral-500 active:translate-y-[1px]';
  return props.isInput ? (
    <input {...props} className={propsClass + baseStyles} />
  ) : (
    <button {...props} className={propsClass + baseStyles} />
  );
}
