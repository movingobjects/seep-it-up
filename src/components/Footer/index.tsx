import style from './index.module.scss';

interface FooterProps {
  readonly moveCount: number;
  readonly par: number;
}

function Footer({
  moveCount,
  par,
}: FooterProps) {
  return (
    <div className={style.footer}>
      <span className={style.moveCount}>{moveCount}</span>
      <span className={style.par}>
        {'/ '}
        {par}
      </span>
    </div>
  );
}

export default Footer;
