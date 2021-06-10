import React, { useEffect, useMemo, useState } from 'react';
import List from './List';

const Home = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrases(e.target.value);
    setIsLoading(true);
  };

  useEffect(() => {
    console.log(isLoading);
  });

  useEffect(() => {
    const TimeOutID = setTimeout(() => getData(phrases, endPoints), 2000);
    return () => {
      clearTimeout(TimeOutID);
    };
  }, [phrases, endPoints]);

  const getData = (phrases: string, endPoints: string[]) => {
    phrases.split(',').forEach((phrase) => {
      endPoints.forEach((link) => {
        fetch(link + phrase)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(true));
      });
    });
  };

  return (
    <main className='home'>
      <input
        type='text'
        className='home-input'
        placeholder='vodka, Mojito'
        onChange={handleInputChange}
        value={phrases}
      />
      <List />
    </main>
  );
};

export default Home;
