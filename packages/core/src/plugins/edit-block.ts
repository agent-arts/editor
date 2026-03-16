import { EditorBlock } from '../core';

export interface EditBlockCallbacks {
  onShow: (block: EditorBlock, style: { top: string, left: string }) => void;
  onHide: () => void;
}

export class EditBlockPlugin {
  public editingBlock: EditorBlock = { id: '', placeholder: '', presetText: '' };

  constructor(private callbacks: EditBlockCallbacks) {}

  public show(block: EditorBlock, rect: DOMRect, editorRect: DOMRect) {
    this.editingBlock = { ...block };
    const style = {
      top: `${rect.bottom - editorRect.top + 10}px`,
      left: `${rect.left - editorRect.left}px`
    };
    this.callbacks.onShow(this.editingBlock, style);
  }

  public hide() {
    this.callbacks.onHide();
  }

  public updateEditingBlock(block: Partial<EditorBlock>) {
    this.editingBlock = { ...this.editingBlock, ...block };
  }
}
