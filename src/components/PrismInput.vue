<template>
  <div>
    <button class="prism-button" :disabled="languages === 'css'" @click="languages = 'css'">CSS</button>
    <button class="prism-button" :disabled="languages === 'js'" @click="languages = 'js'">JS</button>
    <button class="prism-button" :disabled="languages === 'http'" @click="languages = 'http'">HTTP</button>
    <button class="prism-button" :disabled="languages === 'markup'" @click="languages = 'markup'">Markup</button>
    <button class="prism-button" :disabled="languages === 'java'" @click="languages = 'java'">JAVA</button>
    <PrismEditor 
    class="my-editor" 
    v-model="code"
    :readonly="readonly"
    :highlight="highlighter" >
    </PrismEditor>
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

export default {
  name: 'PrismInput',
  components: {
    PrismEditor,
  },
  props: {
    readonly: {
      type: Boolean,
      default: true,
    },
    codeText: {
      type: String,
      default: `function hello(){ 
      console.log('Hello World')
      } `,
    },
    languagesType: {
      type: String,
      default: 'java',
    }
  },
  data: () => ({ 
    code: '',
    languages: ''
  }),
  mounted () {
    this.code = this.codeText
    this.languages = this.languagesType
  },
  methods: {
    highlighter(code) {
      if (this.languages === 'css') {
        return highlight(code, languages.css);
      } else if (this.languages === 'http'){
        return highlight(code, languages.http);
      }
      else if (this.languages === 'markup'){
        return highlight(code, languages.markup);
      }
      else if (this.languages === 'js'){
        return highlight(code, languages.js);
      }
      return highlight(code, languages.java);
    },
  },
}
</script>

<style scoped>
.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px 20px;
  border-radius: 10px;
  border: gray solid 2px;
}

.prism-editor-wrapper {
  width: unset;
}

.prism-editor__textarea:focus {
  outline: none;
}

.prism-button {
  margin: 20px;
}
</style>
