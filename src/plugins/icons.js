import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faFolder, faFolderOpen, faFile } from '@fortawesome/free-solid-svg-icons'
import { faFolder, faFolderOpen, faFile, faFileCode } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder)
library.add(faFolderOpen)
library.add(faFile)
library.add(faFileCode)

Vue.component('font-awesome-icon', FontAwesomeIcon)
