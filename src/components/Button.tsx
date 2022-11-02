import { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonHTMLAttributes<unknown>) {
  const propsClass = props.className ? props.className + ' ' : '';
  return (
    <button
      {...props}
      className={
        propsClass +
        'flex items-center justify-center rounded-sm bg-neutral-200 px-2 py-1 text-center font-semibold outline outline-1 outline-neutral-400 transition-all hover:bg-neutral-300 hover:outline-neutral-500 active:translate-y-[1px]'
      }
    />
  );
}
