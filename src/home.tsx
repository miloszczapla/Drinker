import React, { useEffect, useMemo, useState } from 'react';
import List from './List';
import Loading from './Loading';
import Error from './error';
import useDrinks from './getData';

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
  const [drinks, setDrinks] = useState<Object[]>([]);
  const getDrinks = useDrinks();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrases(e.target.value);
    setIsLoading(true);
  };

  //fetching data after user stops typing
  useEffect(() => {
    const TimeOutID = setTimeout(() => {
      getDrinks(phrases, endPoints).then((res) => {
        setDrinks(res.duplicateArray);
        setIsError(res.hasError);
        setIsLoading(false);
      });
    }, 2000);

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
      {isError && <Error />}
    </main>
  );
};

export default Home;
