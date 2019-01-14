<template>
  <div class="pl-4">
    <div @click="item.expanded = !item.expanded">
      {{ item.text }} {{ item.expanded }}
    </div>

    <tree-item
      v-for="(subFolder, index) in item.subFolders"
      :key="`${index}_${subFolder.text}`"
      :item="subFolder"
    ></tree-item>

    <tree-item
      v-for="(file, index) in item.pages"
      :key="`${index}_${file.text}`"
      :item="file"
    ></tree-item>
  </div>
</template>

<script>
import TreeItem from './TreeItem'

export default {
  name: 'TreeItem',
  components: {
    TreeItem
  },
  props: {
    item: Object,
    required: true
  }
}
</script>
