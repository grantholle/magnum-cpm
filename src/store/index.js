import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { sortBy } from 'lodash'

// Test data -- TODO: DELETE
import tree from '../../responses/tree.json'

const expandedDirs = JSON.parse(window.localStorage.getItem('expandedDirs'))

Vue.use(Vuex)

const state = {
  tree: {},
  expandedDirs: expandedDirs === null ? [] : expandedDirs,
  loading: true
}

const mutations = {
  setTree (state, tree) {
    const sort = dir => {
      if (dir.pages) {
        dir.pages = sortBy(dir.pages, 'text')
      }

      if (dir.subFolders) {
        dir.subFolders = sortBy(dir.subFolders, 'text').map(sort)
      }

      return dir
    }
    // Need to sort sub dirs and folders
    state.tree = sort(tree.folder)
  },
  expandFolder (state, { path, expanded }) {
    if (!state.expandedDirs) {
      state.expandedDirs = []
    }

    const index = state.expandedDirs.indexOf(path)

    if (expanded && index === -1) {
      state.expandedDirs.push(path)
    } else if (!expanded && index !== -1) {
      Vue.delete(state.expandedDirs, index)
    }

    window.localStorage.setItem('expandedDirs', JSON.stringify(state.expandedDirs))
  },
  toggleLoading (state, loading) {
    const isLoading = typeof loading === 'boolean' ? loading : !state.loading

    state.loading = isLoading
    console.log(state.loading)
  }
}

const actions = {
  async fetchTree ({ commit }, path = '/') {
    commit('toggleLoading', true)

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
    setTimeout(() => {
      commit('setTree', tree)
    }, 0)
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
