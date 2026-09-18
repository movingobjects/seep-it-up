import style from './index.module.scss';

function Header() {
  return (
    <div className={style.wrap}>
      <h1 className={style.title}>Seep It Up!</h1>
    </div>
  );
}

export default Header;
