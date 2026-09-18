import clsx from 'clsx';
import style from './index.module.scss';

interface FooterProps {
  readonly moveCount: number;
  readonly par: number;
  readonly isLost: boolean;
}

function Footer({
  moveCount,
  par,
  isLost,
}: FooterProps) {
  return (
    <div className={style.footer}>
      <span className={clsx({
        [style.moveCount]: true,
        [style.lost]: isLost,
      })}>
        {moveCount}
      </span>
      <span className={style.par}>
        {'/ '}
        {par}
      </span>
    </div>
  );
}

export default Footer;
