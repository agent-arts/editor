export interface LibraryBlockCallbacks {
  onShow: (pos: number, style: { top: string, left: string }) => void;
  onHide: () => void;
}

export class LibraryBlockPlugin {
  public plugins = [
    { id: 'plugin-1', name: 'LinkReaderPlugin', type: 'plugin' as const },
  ];
  public workflows = [
    { id: 'workflow-1', name: 'condition_1_872', type: 'workflow' as const },
  ];

  private triggerPos: number = 0;

  constructor(private callbacks: LibraryBlockCallbacks) {}

  public show(pos: number, coords: { bottom: number, left: number }, editorRect: DOMRect) {
    this.triggerPos = pos;
    const style = {
      top: `${coords.bottom - editorRect.top + 10}px`,
      left: `${coords.left - editorRect.left}px`
    };
    this.callbacks.onShow(pos, style);
  }

  public hide() {
    this.callbacks.onHide();
  }

  public getTriggerPos() {
    return this.triggerPos;
  }
}
