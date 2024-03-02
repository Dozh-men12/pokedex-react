import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { CardsPokemons } from "./CardsPokemons";
import { Loader } from "./Loader";

export const PokemonList = () => {
  const { allPokemons, loading, filteredPokemons } = useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list-pokemon container">
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map((pokemon) => (
                <CardsPokemons pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          ) : (
            <>
              {allPokemons.map((pokemon) => (
                <CardsPokemons pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
