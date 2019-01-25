<template>
  <div>
    <ul
      id="clickable_template_cards"
      ref="clickable_template_cards"
      class="collapsible popout"
    >
      <li
        v-for="card in cards"
        :key="card.id"
      >
        <div class="collapsible-header d-flex flex-row">
          <img
            :src="card.src"
            class="circle vignette"
          >
          <span
            class="headline white--text flex-grow-1"
            style="margin-top:20px;"
            v-html="card.title"
          />
        </div>
        <div
          class="collapsible-body white"
        >
          <span
            class="headline white--text"
            v-html="card.description"
          />
        <!-- HERE ENTERS THE CLICK FORM -->
        <!-- HERE ENTERS THE CLICK FORM -->
        <!-- HERE ENTERS THE CLICK FORM -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import _entries from 'lodash/entries'
import _keys from 'lodash/keys'
import _sortBy from 'lodash/sortBy'

import materialize_mixin from './mixins/materialize_mixin.js'
import form_templates from './form_templates.js'
import { submit_laudo, adhoc_handlers } from './click_templates.js'

import ultrasound_icon from '../assets/images/ultrasound_icon.png'

export default {
  mixins : [ materialize_mixin ],

  props : {
    modality : Object,
    specialty : Object,
    getQuill : {
      type : Function,
      default : function() {
        return () => (undefined)
      }
    }
  },

  data : function() {
    return {
      materialize_classes : [ 'collapsible', 'selector' ],
      materialize_recursive : true,
    }
  },

  computed : {
    cards : function() {
      const new_cards = []

      let templates = form_templates[this.modality.name]
      if (templates) templates = templates[this.specialty.name]
      if (templates) {
        // if there is a clickable form for this modality/specialty pair in the
        // form_templates.js file, render it on the cover of the expansible box
        // with a button to generate the report
        const names = _sortBy(_keys(templates))
        names.forEach((name) => {
          const content = templates[name]
          if (submit_laudo[name] === undefined) {
            console.log(`Form for template ${name} defined, but dispatcher not found.`)
            return
          }
          const id = (1e10 * Math.random()).toFixed(0)
          const card = {
            id: id,
            title: `
              <div class="fb-button form-group d-flex flex-row flex-nowrap justify-content-between">
                <div class='flex-grow'>
                  ${content.nickname}
                </div>
                <button type="button" class="btn btn-success" name="button-${id}" 
                  id="button-${id}" 
                    onclick="${this._click_template_dispatcher_name}('${name}'); event.stopPropagation();">
                  Laudo
                </button>
              </div>
            `,
            description: content.template,
            src: ultrasound_icon
          }
          new_cards.push(card)
        })
      }

      return new_cards
    }
  },

  watch : {
    cards : function() {
      this.schedule_reinit()
      this.$emit('cards_changed', this.cards)
    }
  },

  mounted : function() {
    const id = (1.0e10 * Math.random()).toFixed(0)
    this._click_template_dispatcher_name = `click_template_dispatcher_${id}`
    window[this._click_template_dispatcher_name] = (name) => {
      submit_laudo[name](this.getQuill())
    }

    // TODO: fix; this is fragile
    _entries(adhoc_handlers).forEach(([k, v]) => {
      window[k] = v
    })
  },

  beforeDestroy : function() {
    delete window[this._click_template_dispatcher_name]

    // TODO: fix; this is fragile
    _keys(adhoc_handlers).forEach((k) => {
      delete window[k]
    })
  }
}

</script>

<style scoped>

.vignette {
  max-width: 60px;
  max-height: 60px;
  margin-right: 4%;
}

#clickable_template_cards {
  margin-top: 0px
}

.collapsible-header {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 10px;
  padding-left: 10px;
}

.collapsible-body {
  padding-top: 2px;
  padding-bottom: 2px;
}

.form_sg {
  width: 30%;
}

#form_div {
  padding-top: 5px;
}

.idade-gestacional {
  border: 1px solid #f1a7ae;
  margin-bottom: 5px;
}

.fb-number-label {
  margin-bottom: 0px;
}

label {
  margin-bottom: 0px;
}

</style>
