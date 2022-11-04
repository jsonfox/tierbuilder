import { IconBaseProps, IconType } from 'react-icons/lib';

interface Props extends IconBaseProps {
  Icon: IconType;
  hoverClassNames?: string;
  activeClassNames?: string;
}

export default function IconButton(props: Props) {
  const addSelectors = (classes: string, selector: string) => {
    if (!classes) return '';
    return classes
      .split(' ')
      .map((c) => `${selector}:${c}`)
      .join(' ');
  };
  const { Icon, hoverClassNames, activeClassNames, ...iconProps } = props;

  return (
    <Icon
      {...iconProps}
      size={props.size || 20}
      className={[
        'cursor-pointer transition-all',
        props.className ?? '',
        addSelectors(hoverClassNames ?? '', 'hover'),
        addSelectors(activeClassNames ?? '', 'active')
      ]
        .filter((c) => c)
        .join(' ')}
    />
  );
}
