import type { LucideIcon } from 'lucide-react';
import style from './index.module.scss';

interface IconButtonProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly onClick: () => void;
  readonly iconSize?: number;
  readonly variant?: 'filled' | 'plain';
  readonly className?: string;
}

// A labelled icon-only button; `filled` sits on a round backing,
// `plain` is just the icon
function IconButton({
  icon: Icon,
  label,
  onClick,
  iconSize = 20,
  variant = 'filled',
  className = '',
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`${style[variant]} ${className}`}
      title={label}
      type="button"
      onClick={onClick}>
      <Icon size={iconSize} />
    </button>
  );
}

export default IconButton;
