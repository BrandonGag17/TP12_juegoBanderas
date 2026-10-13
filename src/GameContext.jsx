import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((response) => {
        const list = response.data.data || response.data || [];
        setCountries(list);
        if (list.length > 0) {
          const randomIndex = Math.floor(Math.random() * list.length);
          setCurrentCountry(list[randomIndex]);
        }
      })
      .catch((error) => console.error('No se pudieron cargar los países:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!currentCountry || !countries.length) return;

    setTimeLeft(15);

    const interval = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(interval);
          setScore((previousScore) => previousScore - 1);

          setCurrentCountry((previousCountry) => {
            let randomIndex = Math.floor(Math.random() * countries.length);

            if (countries.length > 1) {
              while (countries[randomIndex]?.name === previousCountry?.name) {
                randomIndex = Math.floor(Math.random() * countries.length);
              }
            }

            return countries[randomIndex];
          });
          return 15;
        }
        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentCountry, countries]);

  const nextCountry = () => {
    if (!countries.length) return;
    let randomIndex = Math.floor(Math.random() * countries.length);
    if (countries.length > 1 && currentCountry) {
      while (countries[randomIndex]?.name === currentCountry.name) {
        randomIndex = Math.floor(Math.random() * countries.length);
      }
    }
    setCurrentCountry(countries[randomIndex]);
  };

  const addPoints = (amount) => setScore((previousScore) => previousScore + amount);

  const handleGuess = (countryName) => {
    if (!currentCountry) return false;

    const normalize = (text) =>
      text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    const isCorrect =
      normalize(countryName) === normalize(currentCountry.name);

    if (isCorrect) {
      addPoints(10 + timeLeft);
    } else {
      addPoints(-1);
    }

    nextCountry();
    return isCorrect;
  };

  return (
    <GameContext.Provider
      value={{
        countries,
        currentCountry,
        score,
        loading,
        timeLeft,
        nextCountry,
        addPoints,
        handleGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
