<template>
  <main>
    <loader :show="showLoader"></loader>

    <tree :tree="tree"></tree>
  </main>
</template>

<script>
import Loader from './Loader'
import Tree from './Tree'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Editor',
  components: {
    Loader,
    Tree
  },
  data () {
    return {
      showLoader: true
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
      'tree'
    ])
  },
  async created () {
    await this.fetchTree()
    this.showLoader = false
  }
}
</script>
