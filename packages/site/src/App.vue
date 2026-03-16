<script setup lang="ts">
import Editor from './components/Editor.vue'
import { onMounted, ref } from 'vue'

const editorRef = ref()

const addBlock = () => {
  console.log('editorRef.value.editor', editorRef.value, editorRef.value.editor);
  
  editorRef.value.editor.addBlock();
}
</script>

<template>
  <div class="w-[560px]">
    <div class="flex justify-between mb-4">
      <div>提示词</div>
      <div>
        <i class="ci-task font-size-5" @click="addBlock"></i>
      </div>
    </div>
    <Editor ref="editorRef" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
