import pokemonList from '@/redux/services/pokemon-list-service';
import pokemonDetails from '@/redux/services/pokemon-details.service';

const rootServices = {
  reducers: {
    [pokemonList.reducerPath]: pokemonList.reducer,
    [pokemonDetails.reducerPath]: pokemonDetails.reducer,
  },
  middlewares: [pokemonList.middleware, pokemonDetails.middleware],
};

export default rootServices;
