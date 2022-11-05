import Button from './Button';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';

interface Props extends ButtonHTMLAttributes<unknown> {
  Icon: IconType;
}

export default function ButtonWithIcon({ Icon, children, ...props }: Props) {
  return (
    <Button {...props}>
      {children}
      <Icon size={22} className="ml-1" />
    </Button>
  );
}
