import React from 'react';
import { IconBaseProps, IconType } from 'react-icons/lib';
import { classNames, addSelectors } from '../../utils/helpers';

interface Props extends IconBaseProps {
  Icon: IconType;
  hoverClass?: string;
  activeClass?: string;
}

export default function IconButton({
  Icon,
  size,
  className,
  hoverClass,
  activeClass,
  ...props
}: Props) {
  return (
    <Icon
      role="button"
      size={size ?? 20}
      className={classNames(
        'cursor-pointer transition-all',
        className,
        addSelectors({ hover: hoverClass, active: activeClass })
      )}
      {...props}
    />
  );
}
