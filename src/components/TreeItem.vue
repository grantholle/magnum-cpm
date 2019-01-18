<template>
  <div class="pl-4">
    <div
      @click="folderClick"
      @contextmenu="folderContext"
    >
      {{ item.text }} {{ item.expanded }}
    </div>

    <div :class="{ 'hidden': !expanded }">
      <tree-item
        v-for="subFolder in item.subFolders"
        :key="subFolder.fullPath"
        :item="subFolder"
        :parent="`${parent}/${item.text}`"
      ></tree-item>

      <tree-item
        v-for="file in item.pages"
        :key="file.fullPath"
        :item="file"
        :parent="`${parent}/${item.text}`"
      ></tree-item>
    </div>
  </div>
</template>

<script>
import TreeItem from './TreeItem'
import { mapMutations } from 'vuex'

export default {
  name: 'TreeItem',
  components: {
    TreeItem
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    parent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    ...mapMutations([
      'expandFolder'
    ]),
    folderContext (event) {
      this.$emit('folderClicked', this.item)
    },
    folderClick () {
      this.expanded = !this.expanded

      console.log(this.fullPath, this.expanded)
      this.expandFolder({
        path: this.fullPath,
        expanded: this.expanded
      })
    }
  },
  computed: {
    fullPath () {
      return `${this.parent}/${this.item.text}`
    }
  }
}
</script>
