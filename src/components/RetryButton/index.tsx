import { RevertIcon } from '@sanity/icons/Revert';
import clsx from 'clsx';
import style from './index.module.scss';

interface Props {
  readonly onClick: () => void;
  // Milliseconds to wait before fading in
  readonly delay?: number;
}

function RetryButton({
  onClick,
  delay,
}: Props) {
  return (
    <button
      aria-label="Retry"
      className={clsx({
        [style.button]: true,
        [style.delayed]: delay !== undefined,
      })}
      style={{ '--appear-delay': `${delay ?? 0}ms` }}
      type="button"
      onClick={onClick}>
      <RevertIcon />
    </button>
  );
}

export default RetryButton;
