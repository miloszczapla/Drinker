import { Link } from 'react-router-dom';
import icon from './assets/img/drinkericon-large.svg';

const NavBar = () => {
  const alt = 'Drinker icon';
  return (
    <nav className='nav'>
      <section className='nav-section'>
        <Link className='nav-link' to='/'>
          <img className='nav-link-img' src={icon} alt={alt} />
          <h2>Home</h2>
        </Link>
        <Link className='nav-link' to='/about'>
          <h2>About</h2>
        </Link>
      </section>
    </nav>
  );
};

export default NavBar;
