import Button from './Button';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';

interface Props extends ButtonHTMLAttributes<unknown> {
  Icon: IconType;
}

export default function ButtonWithIcon(props: Props) {
  const { Icon, children, ...buttonProps } = props;
  return (
    <Button {...buttonProps}>
      {children}
      <Icon size={22} className="ml-1" />
    </Button>
  );
}
