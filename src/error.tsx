import { Link } from 'react-router-dom';
import icon from './assets/img/drinkericon-large.svg';

const Error = () => {
  const alt = 'Drinker icon';
  return (
    <main className='error'>
      <h1 className='error-title'>Error Ocured</h1>
      <article className='error-mess'>
        Something went wrong and you end up with error. Click the button below
        to come back to Drinker home site
      </article>
      <Link className='error-link nav-link' to='/'>
        <img className='nav-link-img' src={icon} alt={alt} />
        <h2>Home</h2>
      </Link>
    </main>
  );
};

export default Error;
