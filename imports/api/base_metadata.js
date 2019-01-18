
const base_metadata = {
  'modalities': {
    'tc': {
      'name': 'tc',
      'nickname': 'TC'
    },
    'usg': {
      'name': 'usg',
      'nickname': 'USG'
    },
    'rm': {
      'name': 'rm',
      'nickname': 'RM'
    },
    'rx': {
      'name': 'rx',
      'nickname': 'RX'
    }
  },

  'specialties': {
    'abdome': {
      'name': 'abdome',
      'nickname': 'Abdome',
      'modalities': 'all'
    },
    'obstetrico': {
      'name': 'obstetrico',
      'nickname': 'OB/GYN',
      'modalities': 'all'
    },
    'doppler': {
      'name': 'doppler',
      'nickname': 'Doppler',
      'modalities': [ 'usg' ]
    },
    'msk': {
      'name': 'msk',
      'nickname': 'MSK',
      'modalities': 'all'
    },
    'superficial': {
      'name': 'superficial',
      'nickname': 'Superficial',
      'modalities': [ 'usg' ]
    },
    'neuro': {
      'name': 'neuro',
      'nickname': 'Neuro',
      'modalities': 'all'
    },
    'torax': {
      'name': 'torax',
      'nickname': 'Tórax',
      'modalities': 'all'
    },
    'cep': {
      'name': 'cep',
      'nickname': 'CEP',
      'modalities': 'all'
    },
    'mama': {
      'name': 'mama',
      'nickname': 'Mama',
      'modalities': 'all'
    }
  }
}

export default base_metadata

function get_default_specialty_modality_pair(as_object = false) {
  const default_pair = {
    specialty: 'abdome',
    modality: 'tc'
  }
  if (!as_object) {
    return default_pair
  }

  return {
    specialty: base_metadata.specialties[default_pair.specialty],
    modality: base_metadata.modalities[default_pair.modality]
  }
}

export { get_default_specialty_modality_pair }
