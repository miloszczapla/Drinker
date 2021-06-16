import { useEffect, useState } from 'react';
import Details from './interfaces/Details';

interface Props {
  idDrink: string;
}

interface DrinkData {
  drinks: Details[];
}

const DrinkDetails = ({ idDrink }: Props) => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const [details, setDetails] = useState<any>({});
  const [mainInfo, setMainInfo] = useState([]);
  const [ingridients, setIngridients] = useState([]);
  const [mesure, setMesure] = useState([]);

  useEffect(() => {
    fetch(endPoint + idDrink)
      .then((res) => res.json())
      .then((data: DrinkData) => {
        setDetails(Object.entries(data.drinks[0]).values());
      })
      .then(() => {
        console.log(details);

        setMainInfo(details.slice(7, 10));
        setIngridients(details.slice(17, 32));
        setMesure(details.slice(32, 47));
      })
      .catch((err) => console.log(err));
  }, [idDrink]);
  console.log(Object.entries(details));

  return (
    <div>
      {ingridients[0][1]},{mesure[0][1]},{mainInfo[0][1]},
    </div>
  );
};

export default DrinkDetails;
