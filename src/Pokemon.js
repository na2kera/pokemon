// src/Pokedex.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pokemon.css";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = response.data.results;
        setPokemonList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPokemon();
  }, []);

  async function fetchPokemonDetails(url) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  }

  return (
    <div className="pokedex">
      <h1>Pokemon Dex</h1>
      <div className="pokemon-list">
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>
              <button onClick={() => fetchPokemonDetails(pokemon.url)}>
                {pokemon.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="pokemon-details">
        {loading && <p>Loading...</p>}
        {selectedPokemon && (
          <div>
            <h2>{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <p>
              Type:{" "}
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokedex;
