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

  interface Data {
    drinkArray: Drink[];
    duplicateArray: Drink[];
    hasError: boolean;
  }

  interface DataElement {
    drinks: Drink[];
  }

  const getDrinks = useCallback(
    async (phrases: string, endPoints: string[]): Promise<Data> => {
      //Promise.all to fetch data from all posible urls
      let seen = new Set();
      let duplicateMap = new Map();

      let drinkArray: Drink[] = [];
      let errorArray: Object[] = [];
      let allUrls: string[][] = [];
      const phrasesArray = phrases.split(',');

      phrasesArray.forEach((phrase) => {
        const arrayOfUrls: string[] = endPoints.map(
          (endPoint) => endPoint + phrase
        );
        allUrls.push(arrayOfUrls);
      });

      const response = allUrls.map(async (urlList) => {
        let seenDuplicate = new Set();
        let filteredData: Drink[] = [];
        await Promise.all(urlList.map((url) => fetch(url)))
          .then((response) => {
            return Promise.all(
              response.map((response) => {
                return response.json().catch(() => {
                  return 0;
                });
              })
            );
          })
          .then((data: DataElement[]) => {
            data.forEach((element: DataElement) => {
              filteredData = [
                ...(filteredData || []),
                ...(element.drinks || []),
              ];
            });
            return filteredData;
          })
          .catch((err) => {
            errorArray.push(err);
          });

        filteredData = filteredData.filter((el: Drink) => {
          const duplicate = seenDuplicate.has(el.idDrink);
          seenDuplicate.add(el.idDrink);
          return !duplicate;
        });

        return filteredData;
      });

      for (let i = 0; i < response.length; i++) {
        drinkArray = drinkArray.concat(await response[i]);
      }

      // create array without duplicates
      drinkArray = drinkArray.filter((el) => {
        const duplicate = seen.has(el.idDrink);
        seen.add(el.idDrink);
        // create array of duplicates
        if (duplicate) duplicateMap.set(el.idDrink, el);
        return !duplicate;
      });

      const duplicateArray = Array.from(duplicateMap.values());

      const hasError =
        errorArray.length === phrasesArray.length * endPoints.length
          ? true
          : false;

      return { drinkArray, duplicateArray, hasError };
    },
    []
  );

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
