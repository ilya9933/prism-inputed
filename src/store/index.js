import Vue from 'vue'
import Vuex from 'vuex'
import mocks from '../mocks/Mocks'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    root: {},
    fileContent: [],
    isLoading: true
  },
  actions: {
    getRoot({commit}) {
      const root = mocks.root
      commit('mutateField', ['root', root])
    },
    getFileContent({commit}) {
      const fileContent = mocks.fileContent
      commit('mutateField', ['fileContent', fileContent])
    },
    treeUpdate({commit}, newTree) {
      commit('mutateField', ['root', newTree])
    },
    deletFile ({commit}, id) {
      const newFileContent = this.state.fileContent.filter(el => !id.includes(el.id))
      commit('mutateField', ['fileContent', newFileContent])
    },
  },
  mutations: {
    mutateField(state, [name, value]) {
      state[name] = value
    },
    addNewFile (state, file) {
      state.fileContent.push(file)
    },
    renameFile (state, file) {
      state.fileContent[state.fileContent.findIndex (el => el.id === file.id)].name = file.name
    },
    loading (state, conditin) {
      state.isLoading = conditin
    }
  },
})

export default store