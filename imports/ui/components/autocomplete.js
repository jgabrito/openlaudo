
import { List as ImList, fromJS, OrderedMap, Set as ImSet } from 'immutable'

import { getEditDistance } from '../../util/levenshtein.js'
import { collate } from '../../util/intl_util.js'
import * as db from '../../api/db'

const _max_cache_size = 100

class AutoCompleteEngine {
  constructor() {
    this._cache = new OrderedMap()
    this.weights = {
      hotkey : 100.0,
      modality : 1.0,
      specialty : 1.0,
      owner_id : 5.0,
      content : 10.0
    }
  }

  score_candidate(item, selector, search_term) {
    let score = 0.0

    // Hot key contribution
    const distance = getEditDistance(search_term, collate(item.get('hotkey')))

    score += this.weights.hotkey * (search_term.length + 1.0 - distance)
      / (search_term.length + 1.0)

    // Selector contributions
    if (item.get('modality') === selector.get('modality')) {
      score += this.weights.modality
    }
    if (item.get('specialty') === selector.get('specialty')) {
      score += this.weights.specialty
    }
    const owner_id = selector.get('owner_id')
    if (owner_id && (owner_id === item.get('owner_id'))) {
      score += this.weights.owner_id
    }

    // Word match contributions
    const wordmatch = db.descriptor_find_word(item, search_term)
    wordmatch.forEach((m) => {
      // Matches close to the beginning of a short field count the most
      // Matches close to the end of a long field cound the least
      const text_size = item.get(m.fieldname).length
      score += this.weights.content * (text_size + 1.0 - m.idx) / (text_size + 1.0)
    })

    return fromJS({
      score,
      wordmatch,
      item
    })
  }

  generate_candidates(items, selector, search_term, max_candidates) {
    search_term = collate(search_term.trim())
    selector = fromJS(selector)
    const cache_key = fromJS({ items, selector, search_term })

    let valuation = this._cache.get(cache_key)
    if (!valuation) {
      valuation = new ImList()
      items.forEach((i) => {
        valuation = valuation.push(this.score_candidate(i, selector, search_term))
      })
      valuation = valuation.sort((a, b) => (a.get('score') - b.get('score')))
    } else {
      this._cache = this._cache.delete(cache_key)
    }

    this._cache = this._cache.set(cache_key, valuation)
    if (this._cache.size > _max_cache_size) {
      this._cache = this._cache.skip(this._cache.size - this._max_cache_size)
    }

    let candidates = new ImList()
    let titles = new ImSet()

    while ((valuation.size > 0) && (candidates.size < max_candidates)) {
      const candidate = valuation.last()
      valuation = valuation.pop()

      const title = collate(candidate.getIn(['item', 'title']).trim())
      if (!titles.has(title)) {
        titles = titles.add(title)
        candidates = candidates.push(candidate)
      }
    }

    return candidates.toJS()
  }
}

export { AutoCompleteEngine }
