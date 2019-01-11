import _sortBy from 'lodash/sortBy'
import _property from 'lodash/property'
import _filter from 'lodash/filter'

import base_metadata from '../../../api/base_metadata.js'

function valid_modality_for_specialty (modality, specialty) {
  if (specialty.modalities === 'all') return true
  return specialty.modalities.includes(modality.name)
}

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
      return _sortBy(Object.values(this.metadata.modalities), _property('nickname'))
    },

    specialties: function () {
      return this.get_valid_specialties()
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

    set_modality: function (new_modality_name) {
      this.current_modality = this.metadata.modalities[new_modality_name]
      this.$emit('modality-changed', this.current_modality)
      if (!valid_modality_for_specialty(this.current_modality, this.current_specialty)) {
        this.set_specialty(this.get_valid_specialties()[0].name)
      }
    },

    set_specialty: function (new_specialty_name) {
      this.current_specialty = this.metadata.specialties[new_specialty_name]
      this.$emit('specialty-changed', this.current_specialty)
    }
  }
}
