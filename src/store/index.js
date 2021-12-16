import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: []
  },
  getters: {
    characters: state => state.characters
  },
  mutations: {
    setCharacters (state, characters) {
      state.characters = characters
    }
  },
  actions: {
    async fetchRickAndMortyCharacters({ commit }) {
      const res = await fetch('https://rickandmortyapi.com/api/character/')
      const data = await res.json()
      commit('setCharacters', data.results)
    },
    async fetchCharactersByName({ commit }, name) {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      const data = await res.json()
      console.log(data.results)
      this.state.characters.push(data.results)
    }
  },
  modules: {
  }
})
