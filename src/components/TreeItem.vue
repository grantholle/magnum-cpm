<template>
  <div>
    <div
      @click="itemClick"
      @contextmenu="folderContext"
      class="tree-item py-1 hover:bg-grey-darkest text-sm cursor-pointer"
      :style="leftPadding"
    >
      <font-awesome-icon
        v-if="isFile"
        :icon="['far', 'file-code']"
        class="mr-1 text-grey"
      />
      <font-awesome-icon
        v-else
        :icon="['far', expanded ? 'folder-open' : 'folder']"
        class="mr-1 text-grey"
      />
      {{ item.text }} {{ item.expanded }}
    </div>

    <div :class="{ 'hidden': !expanded }">
      <tree-item
        v-for="subFolder in item.subFolders"
        :key="subFolder.fullPath"
        :item="subFolder"
        :parent="`${parent}/${item.text}`"
        :level="level + 1"
      ></tree-item>

      <tree-item
        v-for="file in item.pages"
        :key="file.fullPath"
        :item="file"
        :parent="`${parent}/${item.text}`"
        :level="level + 1"
        :is-file="true"
      ></tree-item>
    </div>
  </div>
</template>

<script>
import TreeItem from './TreeItem'
import { mapMutations, mapState } from 'vuex'

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
    },
    forceExpand: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1
    },
    isFile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localExpanded: false
    }
  },
  methods: {
    ...mapMutations([
      'expandFolder'
    ]),
    folderContext (event) {
      this.$emit('folderClicked', this.item)
    },
    itemClick () {
      this.localExpanded = !this.localExpanded

      this.expandFolder({
        path: this.fullPath,
        expanded: this.localExpanded
      })
    }
  },
  computed: {
    ...mapState([
      'expandedDirs'
    ]),
    fullPath () {
      return `${this.parent}/${this.item.text}`
    },
    expanded () {
      // console.log(this.localExpanded, this.forceExpand, this.expandedDirs.indexOf(this.fullPath) !== -1)

      return this.localExpanded || this.forceExpand
    },
    leftPadding () {
      return { 'padding-left': `${this.level}rem` }
    }
  }
}
</script>

<style>
.tree-item {
  transition: all 250ms ease;
}
</style>

