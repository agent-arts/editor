<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  EditorBlock,
  CustomEditor,
  CustomEditorOptions
} from '@agent-arts/editor';

let editor
const editorHostRef = ref()

// 弹窗状态
let showPopup = false;
let popupStyle = { top: '0px', left: '0px' };
let editingBlock: EditorBlock = { id: '', placeholder: '', presetText: '' };

const openPopup = (id: string, rect: DOMRect) => {
  const block = editor.getBlock(id);
  if (block) {
    editingBlock = { ...block };
    showPopup = true;
    // 计算弹窗位置（简单逻辑：在 block 下方）
    const editorRect = editorHostRef.value.getBoundingClientRect();
    popupStyle = {
      top: `${rect.bottom - editorRect.top + 10}px`,
      left: `${rect.left - editorRect.left}px`
    };
  }
}

onMounted(() => {
  const initialBlocks = [
    {
      pos: 11,
      block: {
        id: 'init-block-1',
        placeholder: '请输入...',
        presetText: '智能助手'
      }
    }
  ];

  const options: CustomEditorOptions = {
    parent: editorHostRef.value,
    initialDoc: '# 角色\n\n你是一个  ',
    initialBlocks,
    onOpenPopup: (id, rect) => openPopup(id, rect),
    onBlockUpdated: (id, text) => {
      if (showPopup && editingBlock.id === id) {
        editingBlock.presetText = text;
      }
    }
  };

  editor = new CustomEditor(options);
})
</script>

<template>
  <div ref="editorHostRef" class="editor-host"></div>
</template>

<style scoped lang="less">
.editor-host {
  border-radius: 8px;
  background: rgba(250, 250, 250, 1);
}
</style>
