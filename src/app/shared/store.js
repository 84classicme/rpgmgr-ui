import { createStore } from 'redux'
import { CharacterReducer } from '../dndpcgen/character.reducer';

const store = createStore(
    CharacterReducer, /* preloadedState, */
 +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store