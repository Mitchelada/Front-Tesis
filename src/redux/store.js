import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import projectsReducer from './projects/duck'
import requirementsReducer from './requirements/duck'
import aspectsReducer from './aspects/duck'
import elementsReducer from './elements/duck'
import toolsReducer from './tools/duck'

const rootReducer = combineReducers({
  projects: projectsReducer,
  requirements: requirementsReducer,
  aspects: aspectsReducer,
  elements: elementsReducer,
  tools: toolsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const generateStore = () => {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store
}

export default generateStore