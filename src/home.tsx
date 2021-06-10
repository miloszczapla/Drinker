import React, { useEffect, useMemo, useState } from 'react';
import List from './List';
// import axios from 'axios';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrases(e.target.value);
    getData(phrases, endPoints);
  };

  useEffect(() => {
    const TimeOutID = setTimeout(() => getData(phrases, endPoints), 5000);
    console.log('timeout started');
    return () => {
      clearTimeout(TimeOutID);
    };
  }, [phrases, endPoints]);

  const getData = (phrases: string, endPoints: string[]) => {
    // let drink;
    phrases.split(',').forEach((phrase) => {
      endPoints.forEach((link) => {
        fetch(link + phrase)
          .then((response) => response.json())
          .then((data) => console.log(data));

        //   response.json()})
        // .then((data) => console.log(data));

        // axios
        //   .get(link + phrase)
        //   .then((response) => console.log(response))
        //   .catch((err) => err.preventDefault);
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
