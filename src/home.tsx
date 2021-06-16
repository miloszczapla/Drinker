import React, { useEffect, useMemo, useState } from 'react';
import List from './List';
import Loading from './Loading';
import HomeError from './homeError';
import useDrinks from './getData';
import Drink from './interfaces/DrinkInterface';

//
const Home = () => {
  //endpoint of the API
  const endPoints = useMemo(
    () => [
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=',
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    ],
    []
  );

  // const ingridient = 'www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';
  // const details = www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

  const [phrases, setPhrases] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const getDrinks = useDrinks();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrases(e.target.value);
    setIsLoading(true);
  };

  //fetching data after user stops typing
  useEffect(() => {
    const TimeOutID = setTimeout(() => {
      getDrinks(phrases.replace(/\s+/g, ''), endPoints).then((res) => {
        setDrinks(res.duplicateArray);
        setIsError(res.hasError);
        setIsLoading(false);
      });
    }, 1000);

    return () => {
      clearTimeout(TimeOutID);
    };
  }, [phrases, endPoints, getDrinks]);

  return (
    <main className='home'>
      <>
        <input
          type='text'
          className='home-input'
          placeholder='vodka, Mojito'
          onChange={handleInputChange}
          value={phrases}
        />
        <div className='home-input-line'></div>
      </>
      {!isError && isLoading && <Loading />}
      {!isError && drinks && !isLoading && <List drinks={drinks} />}
      {isError && <HomeError />}
    </main>
  );
};

export default Home;
