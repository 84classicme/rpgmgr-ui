import { combineReducers } from 'redux'

import CharacterReducer from '../dndpcgen/character.reducer'

const rootReducer = combineReducers({
  dndchar: CharacterReducer
})

export default rootReducer