import { cn } from '@/lib/utils';
import { LucideProps, ArrowLeftIcon, MenuIcon } from 'lucide-react';

const iconVariants = {
  'arrow-left': ArrowLeftIcon,
  menu: MenuIcon,
};

export type IconVariant = keyof typeof iconVariants;

interface IconProps extends LucideProps {
  variants: IconVariant;
}

function BaseIcon({ variants, size, ...props }: IconProps) {
  const Icon = iconVariants[variants];
  return <Icon size={size} {...props} />;
}

function Icon({ ...props }: IconProps) {
  return (
    <BaseIcon
      {...props}
      className={cn('text-gray-final-800 dark:text-gray-final-300', props.className)}
    />
  );
}

export default Icon;
