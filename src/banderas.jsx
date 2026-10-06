import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GameContext = createContext();
export const BanderasContext = GameContext;

export default function ListaBanderas({ children }) {
  const [paises, setPaises] = useState([]);
  const [paisActual, setPaisActual] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((response) => {
        const lista = response.data.data || response.data || [];
        setPaises(lista);

        if (lista.length > 0) {
          const index = Math.floor(Math.random() * lista.length);
          setPaisActual(lista[index]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const siguientePais = () => {
    if (!paises.length) return;

    let index = Math.floor(Math.random() * paises.length);

    if (paises.length > 1 && paisActual) {
      while (paises[index]?.name === paisActual.name) {
        index = Math.floor(Math.random() * paises.length);
      }
    }

    setPaisActual(paises[index]);
  };

  const sumarPuntos = (valor) => {
    setPuntos((prev) => prev + valor);
  };

  const handleAdivinar = (paisIngresado) => {
    if (!paisActual) return false;

    const normalizar = (texto) =>
      texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    const acerto = normalizar(paisIngresado) === normalizar(paisActual.name);

    if (acerto) {
      sumarPuntos(10);
    } else {
      sumarPuntos(-1);
    }

    siguientePais();
    return acerto;
  };

  return (
    <GameContext.Provider
      value={{
        paises,
        paisActual,
        setPaisActual,
        puntos,
        loading,
        siguientePais,
        sumarPuntos,
        handleAdivinar,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}