import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        {/* <h1>ReactMeals</h1> */}
        <img height="200" width="200" className={classes['logo-image']} src="./White Black Monogram M Business Logo .png" alt="logo" />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src="./pexels-brett-sayles-1264937.jpg" alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
