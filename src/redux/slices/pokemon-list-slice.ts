import type { PokemonListWithDetails } from '@/lib/schemas/pokemon-list-schema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonListState {
  pokemons: PokemonListWithDetails[];
}

const initialState: PokemonListState = {
  pokemons: [],
};

export const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    appendPokemons: (state, action: PayloadAction<PokemonListWithDetails[]>) => {
      const newOnes = action.payload.filter(
        (newPoke) => !state.pokemons.some((p) => p.id === newPoke.id)
      );
      state.pokemons.push(...newOnes);
    },
    resetPokemons: (state) => {
      state.pokemons = [];
    },
  },
});

export const { appendPokemons, resetPokemons } = pokemonListSlice.actions;

export default pokemonListSlice.reducer;
