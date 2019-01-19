<template>
  <main>
    <loader :show="loading"></loader>

    <tree :tree="tree"></tree>
  </main>
</template>

<script>
import Loader from './Loader'
import Tree from './Tree'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Editor',
  components: {
    Loader,
    Tree
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'fetchTree'
    ])
  },
  computed: {
    ...mapGetters([
    ]),
    ...mapState([
      'tree',
      'loading'
    ])
  },
  async created () {
    await this.fetchTree()
    this.showLoader = false
  }
}
</script>
