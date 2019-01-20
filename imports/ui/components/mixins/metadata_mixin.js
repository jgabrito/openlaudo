import _values from 'lodash/values'
import _sortBy from 'lodash/sortBy'
import _property from 'lodash/property'
import _filter from 'lodash/filter'
import _isString from 'lodash/isString'

import base_metadata from '../../../api/base_metadata.js'

function valid_modality_for_specialty (modality, specialty) {
  if (! specialty) return false
  if (! modality) return false
  if (specialty.modalities === 'all') return true
  return specialty.modalities.includes(modality.name)
}

/*
  This mixin adds metadata navigation functionality to a component. 
  It adds a current_modality and current_specialty to the data object and methods
  to manipulate these, making sure the pair is always valid. It also computes 
  emits changed events for these data items and computes modality and specialty lists
  including in the latter only the valid specialties for the current modality.
*/

export default {
  data: function () {
    return {
      current_modality: this.initialModality,
      current_specialty: this.initialSpecialty,
      metadata: base_metadata
    }
  },

  props: {
    initialModality: Object,
    initialSpecialty: Object
  },

  computed: {
    modalities: function () {
      return _sortBy(_values(this.metadata.modalities), _property('nickname'))
    },

    specialties: function () {
      return this.get_valid_specialties()
    }
  },

  watch : {
    current_modality : function() {
      this.$emit('modality-changed', this.current_modality)
    },

    current_specialty : function() {
      this.$emit('specialty-changed', this.current_specialty)
    }
  },

  methods: {
    get_valid_specialties: function () {
      let specialties = Object.values(this.metadata.specialties)
      specialties = _filter(specialties,
        s => (valid_modality_for_specialty(this.current_modality, s)))
      specialties = _sortBy(specialties, _property('nickname'))
      return specialties
    },

    set_modality: function (new_modality) {
      let new_modality_name = new_modality
      if (! _isString(new_modality_name)) {
        new_modality_name = new_modality_name.name
      }
      this.current_modality = this.metadata.modalities[new_modality_name]
      if (!valid_modality_for_specialty(this.current_modality, this.current_specialty)) {
        this.set_specialty(this.get_valid_specialties()[0].name)
      }
    },

    set_specialty: function (new_specialty) {
      let new_specialty_name = new_specialty
      if (! _isString(new_specialty_name)) {
        new_specialty_name = new_specialty_name.name
      }
      this.current_specialty = this.metadata.specialties[new_specialty_name]
    }
  }
}
