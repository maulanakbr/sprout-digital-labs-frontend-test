import pokemonList from '@/redux/services/pokemon-list-service';
import { pokemonListSlice } from './slices/pokemon-list-slice';

const rootServices = {
  reducers: {
    [pokemonList.reducerPath]: pokemonList.reducer,
  },
  middlewares: [pokemonList.middleware],
};

export default rootServices;
