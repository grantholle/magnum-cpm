<template>
  <section>
    <tree-item
      :item="tree"
      @folderClicked="folderContext"
    ></tree-item>

    <vue-simple-context-menu
      elementId="folder-context-menu"
      :options="contextOptions"
      ref="folderContextMenu"
      @optionClicked="folderOptionClicked"
    ></vue-simple-context-menu>
  </section>
</template>

<script>
import TreeItem from './TreeItem'
import { mapActions, mapState } from 'vuex'
import VueSimpleContextMenu from 'vue-simple-context-menu'

export default {
  name: 'Tree',
  components: {
    TreeItem,
    VueSimpleContextMenu
  },
  data () {
    return {
      contextOptions: [
        {
          name: 'Delete'
        },
        {
          name: 'Duplicate'
        }
      ]
    }
  },
  props: {
    tree: {
      type: Object,
      required: true
    }
  },
  methods: {
    folderOptionClicked (event) {
      console.log(event)
    },
    folderContext (event, item) {
      this.$refs.folderContextMenu.showMenu(event, item)
    }
  }
}
</script>
