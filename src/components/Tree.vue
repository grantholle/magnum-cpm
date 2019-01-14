<template>
  <section>
    <tree-item :item="tree"></tree-item>
  </section>
</template>

<script>
import TreeItem from './TreeItem'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Tree',
  components: {
    TreeItem
  },
  data () {
    return {
    }
  },
  props: {
    tree: {
      type: Object,
      required: true
    }
  }
}
</script>
