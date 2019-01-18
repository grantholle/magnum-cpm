import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Test data -- TODO: DELETE
import tree from '../../responses/tree.json'

Vue.use(Vuex)

const state = {
  tree: {},
  expandedDirs: window.localStorage.getItem('expandedDirs')
}

const mutations = {
  setTree (state, tree) {
    state.tree = tree.folder
  },
  expandFolder (state, { path, expanded }) {
    if (!state.expandedDirs) {
      state.expandDirs = []
    }

    const index = state.expandDirs.indexOf(path)

    if (expanded && index === -1) {
      state.expandDirs.push(path)
    } else if (!expanded && index !== -1) {
      Vue.delete(state.expandDirs, index)
    }

    window.localStorage.setItem('expandedDirs', state.expandDirs)
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
    const buildFullPath = (dir, parent = '') => {
      dir.fullPath = `${parent}/${dir.text}`
      dir.expanded = parent === ''

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

    // Already nest inside of web_root
    // return first(buildFullPath(state.tree))
    return state.tree
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
