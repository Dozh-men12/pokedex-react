import React, { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hooks/useForm";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  //Utilizando custom hooks - useForm

  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  //Estados simples para la aplicacion
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  /* Llamada a 50 POKEMONS de la API */
  const getAllPokemons = async (limit = 50) => {
    try {
      const baseURL = "https://pokeapi.co/api/v2/";
      const res = await fetch(
        `${baseURL}pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();
      const promise = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
      });

      const results = await Promise.all(promise);

      setAllPokemons([...allPokemons, ...results]);
      setLoading(false);
    } catch (error) {
      console.log("Error en la solicitud", error);
    }
  };

  // Llamando a todos los pokemones
  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promise = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });

    const results = await Promise.all(promise);

    setGlobalPokemons(results);
    setLoading(false);
  };

  //Obteniendo los pokemones por ID

  const getPokemonsById = async (id) => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  //BTN CARGAR MÁS
  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  //Filter function
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });
  const [filteredPokemons, setfilteredPokemons] = useState([]);

  const handleCheckbox = (e) => {
    setTypeSelected({ ...typeSelected, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setfilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setfilteredPokemons([...filteredResults]);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonsById,
        onClickLoadMore,
        filteredPokemons,
        loading,
        active,
        handleCheckbox,
        setActive,
        setLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
