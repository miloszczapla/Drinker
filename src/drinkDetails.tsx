import { useEffect, useState } from 'react';
import Ingridients from './drinkDetailsLibrary/Ingridients';
import Details from './interfaces/Details';
import Step from './drinkDetailsLibrary/Step';

interface Props {
  idDrink: string;
}

interface DrinkData {
  drinks: Details[];
}

const DrinkDetails = ({ idDrink }: Props) => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  // const [details, setDetails] = useState<string[][]>([]);
  const [mainInfo, setMainInfo] = useState<string[]>([]);
  const [ingridients, setIngridients] = useState<string[]>([]);
  const [mesure, setMesure] = useState<string[]>([]);

  useEffect(() => {
    fetch(endPoint + idDrink)
      .then((res) => res.json())
      .then((data: DrinkData) => {
        const details = Object.entries(data.drinks[0]);
        // console.log(details);

        setMainInfo(
          details.slice(7, 10).map((el) => {
            return el[1];
          })
        );
        setIngridients(
          details.slice(17, 32).map((el) => {
            return el[1];
          })
        );
        setMesure(
          details.slice(32, 47).map((el) => {
            return el[1];
          })
        );
        // setDetails(Object.entries(data.drinks[0]));
        // console.log(details);
      })
      .catch((err) => console.log(err));
  }, [idDrink]);

  const isUndefined = (value: any) => {
    return undefined === value;
  };

  console.log(isUndefined(mainInfo[2]) ? '' : mainInfo[2].split(/[,.]/g));

  return (
    <div className='details'>
      <div className='details-border'></div>
      <div className='details-part'>
        <div className='details-part-circle'></div>
        <Ingridients ingridients={ingridients} mesure={mesure} />
      </div>
      {isUndefined(mainInfo[2])
        ? ''
        : mainInfo[2].split(/[,.]/g).map((step, index) => {
            if (!step) return;
            return (
              <div className='details-part'>
                <div className='details-part-circle'></div>
                <Step key={index} stepContent={step} />
              </div>
            );
          })}
    </div>
  );
};

export default DrinkDetails;
