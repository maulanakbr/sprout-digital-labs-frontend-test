import { pokemonListSlice } from './slices/pokemon-list-slice';

const rootSlices = {
  reducers: {
    pokemonList: pokemonListSlice.reducer,
  },
  middlewares: [],
};

export default rootSlices;
