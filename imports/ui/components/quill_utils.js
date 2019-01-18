import _assign from 'lodash/assign'
import _isString from 'lodash/isString'

function fix_attributes(deltas) {
  return deltas.map((x) => {
    x = _assign({}, x)
    if (_isString(x.attributes)) {
      x.attributes = JSON.parse(x.attributes)
    }
    return x
  })
}

function editor_insert_stuff (quill, deltas, clear = false) {
  if (clear) {
    // TODO: setup undo mechanism for destructive changes
    quill.setContents(fix_attributes(deltas))
    return
  }

  const selection = quill.getSelection(true)
  const update = {
    ops: []
  }

  if (selection.index > 0) {
    update.ops.push({ retain: selection.index })
  }
  if (selection.length > 0) {
    update.ops.push({ delete: selection.length })
  }
  update.ops = update.ops.concat(fix_attributes(deltas))

  quill.updateContents(update)
}

export { editor_insert_stuff }
