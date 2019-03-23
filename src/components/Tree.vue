<template>
  <section class="font-light py-4 overflow-scroll h-full">
    <tree-item
      :item="tree"
      :force-expand="true"
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
import { mapActions, mapState, mapMutations } from 'vuex'
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
    ...mapMutations([
      'toggleLoading'
    ]),
    folderOptionClicked (event) {
      console.log(event)
    },
    folderContext (event, item) {
      this.$refs.folderContextMenu.showMenu(event, item)
    }
  },
  updated () {
    this.$nextTick(() => {
      this.toggleLoading(false)
    })
  }
}
</script>
