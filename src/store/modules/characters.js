export const characters = {
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
          if(localStorage.getItem('characters')){
            // IF CHARACTERS ALREADY EXIST IN LOCAL STORAGE GET THEM
            commit('setCharacters', JSON.parse(localStorage.getItem('characters')));
          }
          else {
            // WERID WAY TO GET ALL CHARACTERS FROM API
            const res = await fetch('https://rickandmortyapi.com/api/character/'+Array.from(Array(827).keys()).toString());
            const data = await res.json();
            //MAP CHARACTERS TO ONLY HAVE ID, NAME AND IMAGE
            let characters = data.map(item => {
              let lightCharacter = {
                id: item.id,
                name: item.name,
                image: item.image,
              }
              return lightCharacter;
            });
            // SET CHARACTERS IN LOCAL STORAGE FOR MINIMALIZE NUMBER OF REQUESTS
            localStorage.setItem('characters', JSON.stringify(characters));
            // SET CHARACTERS IN STATE
            commit('setCharacters', characters);
          }
          
        }
      },
}