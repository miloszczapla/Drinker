import React, { useCallback, useEffect, useMemo, useState } from 'react';
import List from './List';
import Loading from './Loading';
import Error from './error';

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
  const [isError, setIsError] = useState(false);
  const [drinks, setDrinks] = useState<Object[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrases(e.target.value);
    setIsLoading(true);
  };

  interface Drink {
    idDrink: number;
    strDrink: string;
    strDrinkThumb: string;
  }

  const getDrinks = useCallback(
    //Promise.all to fetch data from all posible urls
    (phrases: string, endPoints: string[]): Data => {
      let drinkArray: Drink[] = [];
      let errorArray: Object[] = [];
      let allUlrs: string[];
      const phrasesArray = phrases.split(',');

      phrasesArray.forEach((phrase) => {
        // let filtredData: Drink[] = [];
        endPoints.forEach((link) => {
          allUlrs.push(link + phrase);
        }); // delete in case of backing
      }); // delete in case of backing

      //     fetch(link + phrase)
      //       .then((response) => response.json())
      //       .then((data: any) => {
      //         const seen = new Set();

      //         filtredData = [...filtredData, ...data.drinks];
      //         filtredData = filtredData.filter((el) => {
      //           const duplicate = seen.has(el.idDrink);
      //           seen.add(el.idDrink);
      //           return !duplicate;
      //         });
      //         // console.log('after duplicate delete', filtredData);
      //       })
      //       .catch((err) => errorArray.push(err));
      //   });
      //   console.log('filteredData', filtredData);
      //   console.log('drinkArray', drinkArray);

      //   drinkArray = [...drinkArray, ...filtredData];
      // });
      // console.log('Drink Array', drinkArray);

      drinkArray = choseDuplicates(drinkArray);

      const hasError =
        errorArray.length === phrasesArray.length * endPoints.length
          ? true
          : false;
      return { drinkArray, hasError };
    },
    []
  );

  const choseDuplicates = (duplicateArray: Drink[]): Drink[] => {
    let counts: any = {};
    let drinks: Drink[] = [];
    console.log('duplicates?', duplicateArray);

    duplicateArray.forEach((duplicateObject) => {
      // if (counts[duplicateObject.idDrink]) {
      counts[duplicateObject.idDrink] += 1;
      console.log('counts contains:', counts);

      // } else {
      // counts[duplicateObject.idDrink] = 1;
      // }
      if (
        counts[duplicateObject.idDrink] >= 2 &&
        drinks.some((drink) => drink.idDrink !== duplicateObject.idDrink)
      ) {
        drinks.push(duplicateObject);
      }
    });
    return drinks;
  };

  interface Data {
    drinkArray: Object[];
    hasError: boolean;
  }

  useEffect(() => {
    const TimeOutID = setTimeout(() => {
      const data = getDrinks(phrases, endPoints);

      setDrinks(data.drinkArray);
      setIsError(data.hasError);
      setIsLoading(!data);
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
