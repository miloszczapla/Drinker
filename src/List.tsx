// import Drink from './drink';

interface Props {
  drinks: Object[];
}

const List = ({ drinks }: Props) => {
  if (!drinks) console.log(drinks);

  return (
    <>
      {/* {drinks.map((drink) => (
        <Drink key={drink.idDrink} drink={drink} />
      ))} */}
    </>
  );
};

export default List;
