import { useCallback } from 'react';
import Data from './interfaces/Data';
import DataElement from './interfaces/DataElement';
import Drink from './interfaces/DrinkInterface';

//fetching data from api

const useDrinks = () => {
  const getDrinks = useCallback(
    async (phrases: string, endPoints: string[]): Promise<Data> => {
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

        //Promise.all to fetch data from all posible urls
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
        // create map of duplicates
        if (duplicate) duplicateMap.set(el.idDrink, el);
        return !duplicate;
      });

      //creating array of duplicates or assigning drinkarray in case of no duplicates
      const duplicateArray = Array.from(duplicateMap.values()).length
        ? Array.from(duplicateMap.values())
        : drinkArray;

      const hasError =
        errorArray.length === phrasesArray.length * endPoints.length
          ? true
          : false;

      return { drinkArray, duplicateArray, hasError };
    },
    []
  );

  return getDrinks;
};

export default useDrinks;
