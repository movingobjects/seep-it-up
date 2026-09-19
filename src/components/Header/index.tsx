import style from './index.module.scss';

interface Props {
  readonly streak: number;
}

function Header({ streak }: Props) {
  return (
    <div className={style.wrap}>
      <h1>
        Seep It Up!
      </h1>
      {streak > 0 && (
        <span className={style.streak}>
          {'Streak: '}
          <span
            key={streak}
            className={style.streakCount}>
            {streak}
          </span>
        </span>
      )}
    </div>
  );
}

export default Header;
