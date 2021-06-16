import Drink from './drink';

import DrinkInterface from './interfaces/DrinkInterface';

interface Props {
  drinks: DrinkInterface[];
}

const List = ({ drinks }: Props) => {
  if (!drinks) console.log(drinks);

  return (
    <article className='drink-list'>
      {drinks.map((drink) => (
        <Drink key={drink.idDrink} drink={drink} />
      ))}
    </article>
  );
};

export default List;
