<template>
  <div :class="$style.container">
    <div :class="$style.navigation">
      <button v-if="allowToCreateNode" @click="addNode">Add Node</button>
      <VueTreeList
        @click="onClick"
        @change-name="onChangeName"
        @delete-node="onDel"
        @add-node="onAddNode"
        :model="tree"
        :default-tree-node-name="defaultTreeNodeName"
        :default-leaf-node-name="defaultFileNodeName"
        :default-expanded="defaultExpanded"
      >
        <template v-slot:leafNameDisplay="slotProps">
          <span>
            {{ slotProps.model.name }} <span class="muted">#{{ slotProps.model.id }}</span>
          </span>
        </template>
        <span class="icon" slot="addTreeNodeIcon">📂</span>
        <span :class='["icon", {"icon__disable": (currentNumberOfFiles > maxNumberOfFiles)}]' slot="addLeafNodeIcon">＋</span>
        <span class="icon" slot="editNodeIcon">📃</span>
        <span class="icon" slot="delNodeIcon">✂️</span>
        <span class="icon" slot="leafNodeIcon">🍃</span>
        <span class="icon" slot="treeNodeIcon">🌲</span>
      </VueTreeList>
      <button @click="getNewTree(tree)">Get new tree</button>
      <pre>
        {{newTree}}
      </pre>
    </div>
    <div :class="$style.topMenuTabs">
      
      
      <VTabs :theme="theme" v-if="items.length" @close="onCloseFile">
        <VTab 
        v-for="item of items" 
        :key="item.id"
        :title="item.name" 
        :id="item.id"
        >
        <slot name="item" :item="item"/>
        </VTab>
      </VTabs>
      <LoadingBar v-else/>
    </div>
  </div>
</template>

<script>
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
import VTab from './TopTabsNavigation/VTab.vue'
import VTabs from './TopTabsNavigation/VTabs.vue'
import LoadingBar from './LoadingBar.vue'

export default {
  name: 'FileManager',
  components: {
    VueTreeList,
    VTab,
    VTabs,
    LoadingBar
  },
  props: {
    theme: String,
    currentNumberOfFiles: Number,
    root: {
      type: [Array, Object],
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    defaultTreeNodeName: {
      type: String,
      default: "new node"
    },
    defaultFileNodeName: {
      type: String,
      default: "new file"
    },
    defaultExpanded: {
      type: Boolean,
      default: false
    },
    allowToCreateNode: {
      type: Boolean,
      default: false
    },
    maxNumberOfFiles: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      newTree: {},
      changeFileId: null,
    }
  },
  computed: {
    tree() {
      return new Tree(this.root)
    },
  },
  methods: {
    onDel(node) {
      node.remove()
      const delFileId = []
      function del(delNode) {
        if(delNode.children && delNode.children.length > 0) {
          
          for (let i = 0, len = delNode.children.length; i < len; i++) {
            del(delNode.children[i])
          }
        }
        if(delNode.isLeaf) {
          delFileId.push(delNode.id)
        }
      }
      del(node)
      this.$emit('on-del', delFileId)
      this.getNewTree(this.tree)
      this.$emit('get-new-tree', this.newTree.children)
    },

    onChangeName(params) {
      console.log(params);

      if(!params.eventType && params.node.isLeaf) {
        this.changeFileId = params.id
      }
      
      if(params.eventType === 'blur') {
        if (this.changeFileId) {
          this.$emit('rename-file', {id: this.changeFileId, name: params.newName})
        }
        this.changeFileId = null
        this.getNewTree(this.tree)
        this.$emit('get-new-tree', this.newTree.children)
      }
    },

    onAddNode(params) {
      if(this.currentNumberOfFiles <= this.maxNumberOfFiles) {
        if(params.isLeaf) {
          const newFile = {  
            id: params.id,
            code: "",
            text: "",
            name: this.defaultFileNodeName,
            type: "java"
          }
          this.$emit('new-file', newFile)
        }
        this.getNewTree(this.tree)
        this.$emit('get-new-tree', this.newTree.children)
      } else {
        this.$emit('error', 'the maximum number of files has been reached')
      }
    },

    onClick(params) {
      if (params.isLeaf) {
        this.$emit('click', params)
      }
    },

    onCloseFile(id) {
      this.$emit('on-close-file', id)
    },

    addNode() {
      const node = new TreeNode({ name: 'new node', isLeaf: false })
      const tree = this.tree
      if (!tree.children) tree.children = []
      tree.addChildren(node)
      this.getNewTree(tree)
      this.$emit('get-new-tree', this.newTree.children)
    },

    getNewTree(tree) {
      function _dfs(oldNode) {
        const newNode = {}

        for (let k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (let i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        return newNode
      }

      this.newTree = _dfs(tree)
    }
  }
}
</script>

<style lang="scss" module>
.container {
  @apply w-screen h-screen grid ;
  grid-template-columns: 400px 1fr;
}

.navigation {
  @apply w-full h-full border-solid border-r-4 z-10 overflow-scroll p-10;
  box-sizing: border-box;
  background: rgb(182, 178, 178);
}

.topMenuTabs {
  width: 100%;
  min-height: 100vh;
  background-color: #a0a09b;
}
</style>

<style lang="scss">
.vtl-node-main {
  &:hover {
    background-color: inherit;
  }

  .vtl-input {
    border: none;
    max-width: 120px;
    color: white;
    border-bottom: 1px solid #c7c7c7;
    background: none;
    font-size: inherit;
  }
  .vtl-input:focus {
    outline: none;
  }

  .vtl-operation {
    margin-left: auto;
    letter-spacing: 8px;
  }
}

.vtl-disabled {
  color: dimgrey;
}

.vtl-icon:hover {
  color: darkgrey;
}

.vtl-tree-margin {
  margin-left: 1em;
}

.icon__disable {
  display: none;
}
</style> 
 
<style lang="scss" scoped>
  .icon {
    &:hover {
      cursor: pointer;
    }
  }
 
  .muted {
    color: gray;
    font-size: 80%;
  }
</style> 

