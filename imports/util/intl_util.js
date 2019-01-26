
function collate (s) {
  return s.toLocaleUpperCase().replace(/[ÁÀÂÃÄÉÈÊẼËÍÌÎĨÏÓÒÔÕÖÚÙÛŨÜÇ]/g, function (m) {
    return {
      'Á': 'A',
      'À': 'A',
      'Â': 'A',
      'Ã': 'A',
      'Ä': 'A',
      'É': 'E',
      'È': 'E',
      'Ê': 'E',
      'Ẽ': 'E',
      'Ë': 'E',
      'Í': 'I',
      'Ì': 'I',
      'Î': 'I',
      'Ĩ': 'I',
      'Ï': 'I',
      'Ó': 'O',
      'Ò': 'O',
      'Ô': 'O',
      'Õ': 'O',
      'Ö': 'O',
      'Ú': 'U',
      'Ù': 'U',
      'Û': 'U',
      'Ũ': 'U',
      'Ü': 'U',
      'Ç': 'C'
    }[m]
  })
}

export { collate }
