import { RevertIcon } from '@sanity/icons/Revert';
import style from './index.module.scss';

interface Props {
  readonly onClick: () => void;
}

function RetryButton({ onClick }: Props) {
  return (
    <button
      aria-label="Retry"
      className={style.button}
      type="button"
      onClick={onClick}>
      <RevertIcon />
    </button>
  );
}

export default RetryButton;
