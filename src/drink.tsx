import { useState } from 'react';
import DrinkDetails from './drinkDetails';
import DrinkInterface from './interfaces/DrinkInterface';
import arrow from './assets/img/arrowicon.svg';

interface Props {
  drink: DrinkInterface;
}

const Drink = ({ drink }: Props) => {
  const [details, setDetails] = useState(false);
  const [arrowClass, setArrowClass] = useState('drink-arrow');
  const [drinkClass, setDrinkClass] = useState('drink drink-hover');

  const handleClick = () => {
    setDetails(!details);

    setDrinkClass(() => {
      if (!details) return 'drink drink-expanded';
      return 'drink drink-hover';
    });
    setArrowClass(() => {
      if (!details) return 'drink-arrow rotated';
      return 'drink-arrow';
    });
  };

  return (
    <section className={drinkClass} onClick={handleClick}>
      <div className='drink-head'>
        <div className='drink-info'>
          <img
            className='drink-image'
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
          />
          <h2>{drink.strDrink}</h2>
        </div>
        <img src={arrow} alt='arrow' className={arrowClass} />
      </div>
      {details && <DrinkDetails idDrink={drink.idDrink} />}
    </section>
  );
};

export default Drink;
