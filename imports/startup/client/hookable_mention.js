
import Quill from 'quill';
import Mention from './quill-mention/src/quill.mention.js';

class HookableMention extends Mention {
  constructor(quill, options) {
    super(quill, options);
  }

  selectItem() {
    if (this.options.customSelectItem) {
      const data = this.getItemData();
      this.quill.deleteText(this.mentionCharPos,
        this.cursorPos - this.mentionCharPos, Quill.sources.API);
      this.options.customSelectItem(data);
      this.hideMentionList();
    } else {
      super.selectItem();
    }
  }

  containerAttemptAlignTop() {
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos);
    const containerHeight = this.mentionContainer.offsetHeight;

    let topPos = this.options.offsetTop;

    // Attempt to align the mention container with the top of the quill editor
    if (this.options.fixMentionsToQuill) {
      topPos = -1 * (containerHeight + this.options.offsetTop);
    } else {
      topPos = mentionCharPos.top - (containerHeight + this.options.offsetTop);
    }

    const overshoot = Math.abs(Math.min(topPos, 0))

    return {
      topPos,
      goodFit : (overshoot === 0),
      overshoot
    }
  }

  containerAttemptAlignBottom() {
    const containerPos = this.quill.container.getBoundingClientRect();
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos);

    let topPos = this.options.offsetTop;

    // Attempt to align the mention container with the bottom of the quill editor
    if (this.options.fixMentionsToQuill) {
      topPos += containerPos.height;
    } else {
      topPos += mentionCharPos.bottom;
    }

    const mentionContainerBottom = topPos + this.mentionContainer.offsetHeight + containerPos.top;
    const overshoot = Math.max(mentionContainerBottom - window.pageYOffset - window.innerHeight, 0)
    return {
      topPos,
      goodFit : (overshoot === 0),
      overshoot
    }
  }

  setMentionContainerPosition() {
    const containerPos = this.quill.container.getBoundingClientRect();
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos);

    let leftPos = this.options.offsetLeft;

    // handle horizontal positioning
    if (this.options.fixMentionsToQuill) {
      const rightPos = 0;
      this.mentionContainer.style.right = `${rightPos}px`;
    } else {
      leftPos += mentionCharPos.left;
    }

    if (this.containerRightIsNotVisible(leftPos, containerPos)) {
      const containerWidth = this.mentionContainer.offsetWidth + this.options.offsetLeft;
      const quillWidth = containerPos.width;
      leftPos = quillWidth - containerWidth;
    }

    // handle vertical positioning
    // Place the mention container where it overshoots the window the least, trying
    // to respect options.defaultMenuOrientation.
    const topAlignParams = this.containerAttemptAlignTop()
    const bottomAlignParams = this.containerAttemptAlignBottom()
    let alignParams = topAlignParams

    if (this.options.defaultMenuOrientation === 'top') {
      if (topAlignParams.goodFit || (topAlignParams.overshoot <= bottomAlignParams.overshoot)) {
        alignParams = topAlignParams
      } else {
        alignParams = bottomAlignParams
      }
    } else if (bottomAlignParams.goodFit
        || (bottomAlignParams.overshoot <= topAlignParams.overshoot)) {
      alignParams = bottomAlignParams
    } else {
      alignParams = topAlignParams
    }

    this.mentionContainer.style.top = `${alignParams.topPos}px`;
    this.mentionContainer.style.left = `${leftPos}px`;

    this.mentionContainer.style.visibility = 'visible';
  }
}

export default HookableMention;
