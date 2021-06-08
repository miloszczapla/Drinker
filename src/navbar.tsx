import { Link } from 'react-router-dom';
import icon from './assets/img/drinkericon-large.svg';

const alt = 'Drinker icon';

const NavBar = () => {
  return (
    <nav className='nav'>
      <Link className='nav-link' to='/'>
        <img className='nav-link-img' src={icon} alt={alt} />
        <h2>Home</h2>
      </Link>
      <Link className='nav-link' to='/about'>
        <h2>About</h2>
      </Link>
    </nav>
  );
};

export default NavBar;
