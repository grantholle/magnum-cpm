import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import tree from '../../responses/tree.json'

Vue.use(Vuex)

const state = {
  tree: {}
}

const mutations = {
  setTree (state, tree) {
    state.tree = tree.folder
  }
}

const actions = {
  async fetchTree ({ commit }, path = '/') {
    commit('setTree', tree)
    // const depth = path === '/' ? 99 : 1
    // const rnd = Math.random() * 1E16
    // const params = {
    //   params: {
    //     path,
    //     depth,
    //     rnd
    //   }
    // }

    // const { data } = axios.get('/ws/cpm/tree', params)
    // commit('setTree', data)
  }
}

const getters = {
  tree: state => {
    const buildFullPath = (dir, parent = '/') => {
      dir.fullPath = `${parent}/${dir.text}`

      if (dir.pages) {
        dir.pages.forEach(page => {
          page.fullPath = `${parent}/${page.text}`
        })
      }

      if (dir.subFolders) {
        dir.subFolders.forEach(sub => {
          buildFullPath(sub, `${parent}/${dir.text}`)
        })
      }

      return dir
    }

    return buildFullPath(state.tree.folder)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
