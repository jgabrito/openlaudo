import _ from 'lodash'
import base_metadata from '../../base_metadata.js'

function valid_modality_for_specialty (modality, specialty) {
  if (specialty.modalities === 'all') return true
  else return specialty.modalities.includes(modality.name)
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
      return _.sortBy(Object.values(this.metadata.modalities), _.property('nickname'))
    },

    specialties: function () {
      return this.get_valid_specialties()
    }
  },

  methods: {
    get_valid_specialties: function () {
      let specialties = Object.values(this.metadata.specialties)
      specialties = _.filter(specialties, (s) => (valid_modality_for_specialty(this.current_modality, s)))
      specialties = _.sortBy(specialties, _.property('nickname'))
      return specialties
    },

    set_modality: function (new_modality_name) {
      this.current_modality = this.metadata.modalities[new_modality_name]
      if (!valid_modality_for_specialty(this.current_modality, this.current_specialty)) { this.set_specialty(this.get_valid_specialties()[0].name) }
      this.$emit('modality-changed', this.current_modality)
    },

    set_specialty: function (new_specialty_name) {
      this.current_specialty = this.metadata.specialties[new_specialty_name]
      this.$emit('specialty-changed', this.current_specialty)
    }
  }
}
