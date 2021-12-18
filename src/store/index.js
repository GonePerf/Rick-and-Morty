import { createStore } from 'vuex'
import { messages } from './modules/messages'
import { characters } from './modules/characters'

export default createStore({
  modules: {
    messages,
    characters
  }
})
