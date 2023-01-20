<template>
  <div id="app">
    <FileManager
      :theme="theme"
      :root="root"
      :items="openFile"
      :allowToCreateNode="true"
      :currentNumberOfFiles="fileContent.length"
      @click="onOpenFile"
      @get-new-tree="getNewTree"
      @new-file="newFile"
      @on-del="onDel"
      @rename-file="renameFile"
      @on-close-file="onCloseFile"
      @error="error"
    >
      <template #item="{item}">
        <div>{{item.text}}</div>
        <PrismInput
        :codeText="item.code"
        :languagesType="item.type"
        />
      </template>
    </FileManager>
    <button @click='changeStyle()'>Change Style</button>
  </div>
</template>

<script>
import PrismInput from './components/PrismInput.vue';
import FileManager from './components/FileManager/FileManager.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    PrismInput,
    FileManager
  },
  data () {
    return {
      theme: 'light',
      openFileId: [2, 10],
    }
  },
  computed: {
    ...mapState(['root', 'fileContent']),
    openFile() {
      return this.fileContent.filter(el => this.openFileId.includes(el.id))
    }
  },
  async mounted() {
    this.$store.dispatch('getRoot')
    this.$store.dispatch('getFileContent')
    // this.checked = JSON.parse(localStorage.getItem("openFile")) || []
  },
  methods: {
    changeStyle () {
      if (this.theme === 'dark') {
        this.theme = 'light'
      } else {
        this.theme = 'dark'
      }
    },
    getNewTree(newTree) {
      this.$store.dispatch('treeUpdate', newTree)
    },
    newFile(params) {
      this.$store.commit('addNewFile', params)
    },
    onDel(id) {
      this.$store.dispatch('deletFile', id)
    },
    renameFile(params) {
      this.$store.commit('renameFile', params)
    },
    onOpenFile(params) {
      this.openFileId.push(params.id)
    },
    onCloseFile(id) {
      this.openFileId = this.openFileId.filter(el => el !== id)
    },
    error(text) {
      console.log(text);
    },
  },
  // watch: {
  // checked(newValue) {
  //   localStorage.setItem("checked", JSON.stringify(newValue));
  // }
}

</script>

<style lang="scss">
body {
  @apply m-0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
</style>
