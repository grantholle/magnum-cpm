<template>
  <main>
    <loader :show="showLoader"></loader>

    <tree></tree>
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
      showLoader: false
    }
  },
  methods: {
    ...mapActions([
      'fetchTree'
    ]),
  },
  computed: {
    ...mapGetters([
      'tree'
    ]),
    ...mapState([])
  },
  created () {
    this.fetchTree()
  }
}
</script>
