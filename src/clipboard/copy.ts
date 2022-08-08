import {copySelection} from '../document'
import {type Instance} from '../setup'
import {writeDataTransferToClipboard,  getActiveElement,} from '../utils'

export async function copy(this: Instance) {
  const doc = this.config.document
  const target = getActiveElement(doc) ?? doc.activeElement ?? doc.body

  const clipboardData = copySelection(target)

  if (clipboardData.items.length === 0) {
    return
  }

  if (
    this.dispatchUIEvent(target, 'copy', {
      clipboardData,
    }) &&
    this.config.writeToClipboard
  ) {
    await writeDataTransferToClipboard(doc, clipboardData)
  }

  return clipboardData
}
