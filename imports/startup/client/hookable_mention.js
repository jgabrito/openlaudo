
import Quill from 'quill';
import Mention from './quill-mention/src/quill.mention.js';

class HookableMention extends Mention {
  constructor(quill,options) {
    super(quill, options);
  }

  selectItem() {
    if (this.options.customSelectItem) {
      const data = this.getItemData();
      this.quill.deleteText(this.mentionCharPos, 
          this.cursorPos - this.mentionCharPos, Quill.sources.API);
      this.options.customSelectItem(data);
      this.hideMentionList();
    }
    else {
      super.selectItem();
    }
  }
}

export default HookableMention;