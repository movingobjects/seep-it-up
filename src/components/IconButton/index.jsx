import style from './index.module.scss';

// A labelled icon-only button; `filled` sits on a round backing,
// `plain` is just the icon
function IconButton({
  icon: Icon,
  label,
  onClick,
  iconSize = 20,
  variant = 'filled',
  className = '',
}) {
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
