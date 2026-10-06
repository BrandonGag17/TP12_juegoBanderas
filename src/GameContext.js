export const GameContext = createContext();

export function GameProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(res => {
        const list = res.data.data || res.data || [];
        setCountries(list);
        if (list.length) {
          setCurrentCountry(list[Math.floor(Math.random() * list.length)]);
        }
      });
  }, []);

  const nextCountry = () => {
    if (!countries.length) return;
    const randomIndex = Math.floor(Math.random() * countries.length);
    setCurrentCountry(countries[randomIndex]);
  };

  const handleGuess = (countryName) => {
    if (!currentCountry) return;

    const isCorrect = countryName.toLowerCase().trim() === currentCountry.name.toLowerCase().trim();

    if (isCorrect) {
      setScore(prev => prev + 10);
    } else {
      setScore(prev => prev - 1);
    }

    nextCountry();
  };

  return (
    <GameContext.Provider value={{ countries, currentCountry, score, nextCountry, handleGuess }}>
      {children}
    </GameContext.Provider>
  );
}