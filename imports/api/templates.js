
import _ from 'lodash'

function template_to_delta (exam) {
  const output = []

  output.push({ insert: exam.title + '\n', attributes: JSON.stringify({ bold: true, align: 'center' }) })

  if (exam.tecnique.trim() !== '') {
    output.push({ insert: '\nTécnica\n', attributes: JSON.stringify({ bold: true, align: 'justify' }) })
    output.push({ insert: exam.tecnique + '\n' })
  }

  output.push({ insert: '\nAnálise\n', attributes: JSON.stringify({ bold: true, align: 'justify' }) })
  output.push({ insert: exam.body + '\n\n', attributes: JSON.stringify({ align: 'justify' }) })

  if (exam.conc.trim() !== '') {
    output.push({ insert: 'Conclusão\n', attributes: JSON.stringify({ bold: true }) })
    output.push({ insert: exam.conc })
  }

  return output
}

function normalize_templates (templates) {
  const output_templates = []

  _.values(templates).forEach((m_data) => {
    _.values(m_data['specialties']).forEach((s_data) => {
      _.values(s_data['mascaras']).forEach((t_data) => {
        t_data = {
          specialty: s_data['metadata']['specialty_name'],
          modality: m_data['metadata']['modality_name'],
          nickname: t_data['nickname'],
          body: template_to_delta(t_data)
        }
        output_templates.push(t_data)
      })
    })
  })

  return output_templates
}

const base_templates = {
  'usg': {
    'metadata': {
      'modality_name': 'usg'
    },
    'specialties': {
      'abdome': {
        'metadata': {
          'specialty_nickname': 'Abdome',
          'specialty_id': 'dropdown_abdome_usg',
          'specialty_name': 'abdome'
        },
        'mascaras': {
          'abdome_superior': {
            'name': 'abdome_superior',
            'nickname': 'USG ABDOME SUPERIOR',
            'title': 'ULTRASSONOGRAFIA DE ABDOME SUPERIOR',
            'tecnique': '',
            'body': 'Fígado de dimensões normais, contornos regulares e bordos finos. Parênquima hepático com ecogenicidade e ecotextura preservadas, não se visualizando lesões focais.\nVeia porta com calibre e trajeto normais.\nVeias hepáticas com calibre e distribuição normais.\nVesícula biliar normodistendida, com paredes finas e regulares. Conteúdo vesicular anecogênico, sem cálculos.\nVias biliares sem dilatações.\nPâncreas de dimensões, ecotextura e ecogenicidade normais. Não há dilatação do ducto pancreático principal.\nBaço de dimensões, ecotextura e ecogenicidade normais. Veia esplênica com calibre normal e trajeto regular.\nAusência de líquido livre na cavidade abdominal.',
            'conc': 'Ultrassonografia de abdome superior dos padrões da normalidade.'
          },
          'abdome_total': {
            'name': 'abdome_total',
            'nickname': 'USG ABDOME TOTAL',
            'title': 'ULTRASSONOGRAFIA DE ABDOME TOTAL',
            'tecnique': '',
            'body': 'Fígado de dimensões normais, contornos regulares e bordos finos. Parênquima hepático com ecogenicidade e ecotextura preservadas, não se visualizando lesões focais.\nVeia porta com calibre e trajeto normais. Veias hepáticas com calibre e distribuição normais.\nVesícula biliar normodistendida, com paredes finas e regulares. Conteúdo vesicular anecogênico, sem cálculos.\nVias biliares sem dilatações.\nPâncreas de dimensões, ecotextura e ecogenicidade normais. Não há dilatação do ducto pancreático principal.\nBaço de dimensões, ecotextura e ecogenicidade normais. Veia esplênica com calibre normal e trajeto regular.\nRins tópicos, com dimensões normais e contornos regulares. Parênquima de espessura normal e ecogenicidade preservada, com boa diferenciação corticomedular. Não há evidências de imagens calculosas. Ausência de dilatação pielocalicinal.\nAorta abdominal com calibre normal e trajeto regular.\nVeia cava inferior com calibre normal.\nBexiga com repleção adequada e conteúdo líquido anecoico. Paredes vesicais regulares.\nAusência de líquido livre na cavidade abdominal.',
            'conc': 'Ultrassonografia abdominal dentro dos padrões da normalidade.'
          },
          'abdome_doppler': {
            'name': 'abdome_doppler',
            'nickname': 'USG ABDOMINAL COM DOPPLER',
            'title': 'ULTRASSONOGRAFIA ABDOMINAL COM DOPPLER',
            'tecnique': '',
            'body': 'Fígado de contornos irregulares, bordos rombos e dimensões aumentadas do caudado, com predomínio do\nlobo esquerdo sobre o direito. Parênquima hepático com ecotextura finamente heterogênea. Não se detectaram lesões focais.\nVeia porta, tronco e ramos direito e esquerdo, pérvios, com fluxo hepatopetal.\nTronco da veia porta mede [...] cm, velocidade média de [...] cm/s. Artéria hepática pérvia. Veias\nhepáticas pérvias, com calibre afilado, com fluxo hepatofugal. Veia mesentérica superior mede [...] cm,\npérvia, fluxo hepatopetal, velocidade média [...] cm/s.\nVesícula biliar normodistendida, com paredes finas e regulares. Conteúdo vesicular\nanecogênico, sem cálculos.\nVias biliares sem dilatações.\nPâncreas de dimensões, ecotextura e ecogenicidade normais. Não há dilatação do ducto\npancreático principal.\nBaço de dimensões aumentadas e ecotextura normal. Veia\nesplênica mede [...] cm na região retropancreática, pérvia, com fluxo hepatopetal.\nAusência de líquido livre na cavidade peritoneal.',
            'conc': 'Sinais de hepatopatia crônica com hipertensão portal.\nEsplenomegalia.'
          },
          'aparelho_e_prostata': {
            'name': 'aparelho_e_prostata',
            'nickname': 'USG APARELHO URINÁRIO E PRÓSTATA',
            'title': 'ULTRASSONOGRAFIA DO APARELHO URINÁRIO E DA PRÓSTATA',
            'tecnique': '',
            'body': 'Rins tópicos, com dimensões normais e contornos regulares. Parênquima de espessura normal e ecogenicidade preservada, com boa diferenciação corticomedular.\nRim direito mede [...] cm. Espessura do parênquima à direita: [...] cm.\nRim esquerdo mede [...] cm. Espessura do parênquima à esquerda: [...] cm.\nNão há evidências de imagens calculosas. Ausência de dilatação pielocalicinal.\nBexiga com repleção adequada ([...] ml) e conteúdo líquido anecoico.\nParedes vesicais regulares.\nPróstata com ecotextura característica, de contornos regulares.\nDimensões: [...] cm. Peso estimado em [...] g.\nVesículas seminais simétricas.\nÂngulos vésico-prostáticos preservados.\nResíduo vesical pós-miccional: [...] mL.',
            'conc': 'Próstata de dimensões [...].\nResíduo vesical pós-miccional [...].\n'
          },
          'prostata': {
            'name': 'prostata',
            'nickname': 'USG PRÓSTATA',
            'title': 'ULTRASSONOGRAFIA DA PRÓSTATA',
            'tecnique': '',
            'body': 'Bexiga com repleção adequada e conteúdo líquido anecoico.\nParedes vesicais regulares.\nPróstata com ecotextura característica, de contornos regulares.\nDimensões: [...] cm. Peso estimado em [...] g.\nVesículas seminais simétricas.\nÂngulos vésico-prostáticos preservados.\nResíduo vesical pós-miccional: [...] mL.',
            'conc': '–       \nPróstata de dimensões [...].\n–       \nResíduo vesical pós-miccional [...].'
          },
          'aparelho': {
            'name': 'aparelho',
            'nickname': 'USG APARELHO URINÁRIO',
            'title': 'ULTRASSONOGRAFIA DO APARELHO URINÁRIO',
            'tecnique': '',
            'body': 'Rins tópicos, com dimensões normais e contornos regulares.\nParênquima de espessura normal e ecogenicidade preservada, com boa diferenciação corticomedular.\nRim direito mede [...] cm. Espessura do parênquima à direita: [...] cm.\nRim esquerdo mede [...] cm. Espessura do parênquima à esquerda: [...] cm.\nNão há evidências de imagens calculosas. Ausência de dilatação pielocalicinal.\nBexiga com repleção adequada e conteúdo líquido anecoico.\nParedes vesicais regulares.\nMeatos ureterais livres.',
            'conc': 'Ultrassonografia do aparelho urinário dentro dos padrões da normalidade.'
          },
          'escrotal': {
            'name': 'escrotal',
            'nickname': 'USG ESCROTAL',
            'title': 'ULTRASSONOGRAFIA ESCROTAL',
            'tecnique': '',
            'body': 'Parede escrotal de espessura e ecogenicidade normais.\nAusência de líquido na bolsa escrotal.\nTestículos tópicos, com morfologia, contornos e ecotextura normais.\nEpidídimos tópicos, de morfologia, dimensões e ecotextura normais.\nBiometria:\n- Testículo direito: [...] cm. Volume = [...] cc.\n- Testículo esquerdo: [...] cm. Volume = [...] cc.\nFeito mapeamento com Doppler colorido, em ambos os testículos, que mostrou vascularização\nparenquimatosa [].\nA análise do plexo pampiniforme à manobra de Valsalva e em ortostase mostra calibre de [] mm, e [] de\ndilatação e refluxo do plexo pampiniforme à [].',
            'conc': 'Ultrassonografia escrotal dentro dos padrões da normalidade.'
          }
        }
      },
      'obstetrico': {
        'metadata': {
          'specialty_id': 'dropdown_obstetrico_usg',
          'specialty_nickname': 'OB/GYN',
          'specialty_name': 'obstetrico'
        },
        'mascaras': {
          'ob_inicial': {
            'name': 'ob_inicial',
            'nickname': 'OBSTÉTRICO 1º TRI',
            'title': 'ULTRASSONOGRAFIA OBSTÉTRICA (1º TRIMESTRE)',
            'tecnique': '',
            'body': 'Data da última menstruação: ***/***/*** IG (menstrual): *** semanas e *** dias\nÚtero aumentado de volume, contendo saco gestacional tópico, de contornos regulares,\nmedindo *** x *** x *** mm.\nDiâmetro médio de saco gestacional (DMSG) de *** mm.\nVesícula vitelínica caracterizada, de aspecto habitual.\nConcepto único, com batimentos cardíacos em torno de *** batimentos por minuto (bpm).\nComprimento cabeça- nádega (CCN) de *** mm.\nTrofoblasto de inserção predominantemente anterior / posterior/difusa.\nColo uterino de aspecto habitual, apresentando orifício interno fechado e comprimento de *** mm.\nOvários de aspecto habitual.\nCorpo lúteo em ovário direito / esquerdo.',
            'conc': 'Gestação única, tópica, de concepto vivo.\nBiometria compatível com *** semanas e *** dias (+/- 4 dias).'
          },
          'ob_tardio': {
            'name': 'ob_tardio',
            'nickname': 'OBSTÉTRICO 2º/3º TRI',
            'title': 'ULTRASSONOGRAFIA OBSTÉTRICA',
            'tecnique': '',
            'body': 'Feto único, em  apresentação ***, com dorso à ***.\nO feto apresenta sinais vitais presentes, representados por movimentação ativa e batimentos cardíacos.\nBCF: *** bpm.\nPlacenta de localização ***, com aspecto compatível com grau *** de Grannum. Espessura de *** mm.\n\nParâmetros biométricos:\nDiâmetro biparietal (DBP): *** mm.\nCircunferência cefálica (CC): *** mm.\nCircunferência abdominal (CA): *** mm.\nComprimento femoral (CF): *** mm.\nPeso fetal em torno de *** gramas (+/- 15%).\n\nLíquido amniótico:\nVolume de líquido amniótico subjetivamente normal. ILA= *** mm.\n',
            'conc': 'Gestação única, tópica, de concepto vivo.\nBiometria média compatível com *** semanas e *** dia (variação de até +/- 8 %).'
          },
          'transvaginal': {
            'name': 'transvaginal',
            'nickname': 'USG PÉLVICA VIA TRANSVAGINAL',
            'title': 'ULTRASSONOGRAFIA PÉLVICA VIA TRANSVAGINAL',
            'tecnique': '',
            'body': 'Útero em [XxXxX], de contornos regulares e dimensões normais. Ecotextura do parênquima preservada.\nDimensões do útero: [...] cm. Volume estimado em [...] cc.\nEndométrio centrado e homogêneo, com espessura de cm.\nCavidade uterina virtual.\nOvário direito tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima\ncaracterística.\nDimensões: [...] cm. Volume estimado em [...] cc.\nOvário esquerdo tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima\ncaracterística.\nDimensões: [...] cm. Volume estimado em [...] cc.\nAusência de líquido livre ou coleções.',
            'conc': 'Exame sem alterações significativas.'
          },
          'pelvico': {
            'name': 'pelvico',
            'nickname': 'USG PÉLVICA VIA SUPRA-PÚBICA',
            'title': 'ULTRASSONOGRAFIA PÉLVICA VIA SUPRA-PÚBICA',
            'tecnique': '',
            'body': 'Bexiga normodistensível, com paredes regulares e de espessura normal. Conteúdo\nanecogênico e homogêneo.\nÚtero em [XxXxX], de contornos regulares e dimensões normais. Ecotextura do\nparênquima preservada.\nDimensões do útero: % cm. Volume estimado em [...] cc.\nEndométrio centrado e homogêneo, com espessura de [...] cm.\nCavidade uterina virtual.\nOvário direito tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima\ncaracterística.\nDimensões: [...] cm. Volume estimado em [...] cc.\nOvário esquerdo tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima\ncaracterística.\nDimensões: [...] cm. Volume estimado em [...] cc.\nAusência de líquido livre ou coleções.',
            'conc': 'Exame sem alterações significativas.'
          },
          'mamas': {
            'name': 'mamas',
            'nickname': 'USG MAMAS',
            'title': 'ULTRASSONOGRAFIA MAMÁRIA',
            'tecnique': '',
            'body': 'Pele e tela subcutânea sem alterações.\nDuctos lactíferos retroareolares de trajeto e calibre normais.\nParênquima mamário de ecotextura característica. Não há evidências de imagens nodulares sólidas ou\ncísticas.\nFáscia e planos musculares retromamários anatômicos.\nRegiões paraesternais e axilares sem particularidades.\nLinfonodos axilares de aspecto habitual.',
            'conc': ''
          }
        }
      },
      'doppler': {
        'metadata': {
          'specialty_id': 'dropdown_doppler_usg',
          'specialty_nickname': 'Doppler',
          'specialty_name': 'doppler'
        },
        'mascaras': {
          'carotidas': {
            'name': 'carotidas',
            'nickname': 'DOPPLER CARÓTIDAS',
            'title': 'DUPLEX-DOPPLER COLORIDO DE CARÓTIDAS CERVICAIS E DE ARTÉRIAS VERTEBRAIS',
            'tecnique': '',
            'body': 'Carótidas comuns, externas e internas de trajeto e calibre normais.\nParedes regulares, sem placas ateromatosas.\nEspectrofluxometria conservada nos vários segmentos analisados.\nArtérias vertebrais com calibre preservado e fluxo anterógrado.\nEspectrofluxometria dentro dos parâmetros normais.\nMédia da espessura do complexo mediointimal à direita: [...].\nMédia da espessura do complexo mediointimal à esquerda: [...].\nVelocidades de pico sistólico:\nArtéria carótida comum direita: [...] cm/s.\nArtéria carótida interna direita: [...] cm/s.\nArtéria carótida comum esquerda: [...] cm/s.\nArtéria carótida interna esquerda: [...] cm/s.',
            'conc': 'Duplex-Doppler colorido normal das carótidas cervicais e das artérias vertebrais.'
          },
          'arterial_mmii': {
            'name': 'arterial_mmii',
            'nickname': 'DOPPLER ARTERIAL MMII',
            'title': 'ULTRASSONOGRAFIA COM DOPPLER DO SISTEMA ARTERIAL DOS MEMBROS INFERIORES',
            'tecnique': '',
            'body': 'Realizada avaliação das artérias dos membros inferiores desde a femoral comum até os ramos\ntibiofibulares.\nAs artérias femorais, poplíteas, tibiais e fibulares apresentam paredes regulares e calibre preservado, não\nse evidenciando dilatações ou placas ateromatosas.\nAo estudo com Doppler, o padrão espectral e velocidades estão conservados.',
            'conc': 'Artérias analisadas com aspecto ultrassonográfico e ao Doppler dentro dos limites da normalidade.'
          },
          'arterial_mide': {
            'name': 'arterial_mide',
            'nickname': 'DOPPLER ARTERIAL MI D/E',
            'title': 'ULTRASSONOGRAFIA COM DOPPLER DO SISTEMA ARTERIAL DO MEMBRO INFERIOR DIREITO / ESQUERDO ****',
            'tecnique': '',
            'body': 'Realizada avaliação das artérias do membro inferior desde a femoral comum até os ramos\ntibiofibulares.\nAs artérias femorais, poplíteas, tibiais e fibulares apresentam paredes regulares e calibre preservado, não\nse evidenciando dilatações ou placas ateromatosas.\nAo estudo com Doppler, o padrão espectral e velocidades estão conservados.',
            'conc': 'Artérias analisadas com aspecto ultrassonográfico e ao Doppler dentro dos limites da normalidade.'
          },
          'varizes': {
            'name': 'varizes',
            'nickname': 'DOPPLER VENOSO MMII VARIZES',
            'title': 'ULTRASSONOGRAFIA COM DOPPLER DO SISTEMA VENOSO SUPERFICIAL E\nPROFUNDO DOS MEMBROS INFERIORES',
            'tecnique': '',
            'body': 'Exame realizado em ortostatismo, em repouso e após manobras de Valsalva e compressão distal,\nevidenciando:\nSistema venoso profundo:\nRealizada avaliação das veias dos membros inferiores\n#desde a femoral comum até os ramos tibiofibulares.\n#nas veias femoral comum e poplítea\nAs veias avaliadas apresentam calibre, paredes e compressibilidade conservadas. Não há evidências de\ntrombos intraluminais.\nAo estudo com Doppler, os espectros e velocidades estão conservados e não há sinais de incompetência\nvalvar às manobras de Valsalva e compressão.\nSistema venoso superficial:\nVeias safenas magnas e parvas foram avaliadas em toda extensão, com paredes conservadas e sem sinais\nde incompetência valvar ou trombos intraluminais.\nNão se caracterizam veias perfurantes incompetentes.\nO calibre da veia safena magna direita mediu: [...] cm; [...] cm, [...] cm, nos níveis da crossa, terço inferior\nda coxa e terço inferior da perna, respectivamente.\nO calibre da veia safena magna esquerda mediu: [...] cm; [...] cm; [...] cm, nos níveis da crossa, terço\ninferior da coxa e terço inferior da perna, respectivamente.',
            'conc': 'Veias analisadas com aspecto ultrassonográfico e ao Doppler dentro dos limites da normalidade.'
          },
          'venoso_mmss': {
            'name': 'venoso_mmss',
            'nickname': 'DOPPLER VENOSO MMSS',
            'title': 'DOPPLER VENOSO DOS MEMBROS SUPERIORES',
            'tecnique': '',
            'body': 'Veias subclávias, axilares, braquiais, radiais e ulnares de trajeto, calibre e compressibilidade preservados.\nVeias cefálicas e basílicas de trajeto preservado e compressíveis até suas crossas.\nFluxo presente em todos os segmentos à análise com Doppler colorido e espectral, com curvas fásicas\ncom a respiração.\nVeia [...] apresentando-se calibrosa, de paredes ecogênicas e com material hipoecogênico no seu interior,\nassociado à redução de sua compressibilidade.\nAo Doppler, não se observa fluxo nesse segmento.\nTal aspecto estende-se até a veia [...] .\nDemais segmentos venosos pérvios e com fluxo preservado ao Doppler.',
            'conc': 'Ausência de sinais de trombose venosa profunda.\n----Sinais de trombose venosa profunda no segmento.'
          },
          'venoso_mmii': {
            'name': 'venoso_mmii',
            'nickname': 'DOPPLER VENOSO MMII',
            'title': 'DOPPLER VENOSO DOS MEMBROS INFERIORES',
            'tecnique': '',
            'body': 'Veias femorais comuns, femorais profundas (proximais), femorais, poplíteas, tibiais, fibulares e musculares das pernas com calibre e compressibilidade preservados.\nVeias safenas magna e parva de trajeto preservado e compressíveis até suas crossas.\nFluxo presente em todos os segmentos à análise com Doppler colorido e espectral, com curvas fásicas\ncom a respiração.\nVeia [...] apresentando-se calibrosa, de paredes ecogênicas e com material hipoecogênico no seu interior,\nassociado à redução de sua compressibilidade.\nAo Doppler, não se observa fluxo nesse segmento.\nTal aspecto estende-se até a veia [...] .\nDemais segmentos venosos pérvios e com fluxo preservado ao Doppler.',
            'conc': 'Ausência de sinais de trombose venosa profunda.\n----Sinais de trombose venosa profunda no segmento.'
          },
          'venoso_mide': {
            'name': 'venoso_mide',
            'nickname': 'DOPPLER VENOSO MI D/E',
            'title': 'DOPPLER VENOSO DO MEMBRO INFERIOR DIREITO / ESQUERDO *******',
            'tecnique': '',
            'body': 'Veias femoral comum, femoral profunda (proximal), femoral, poplítea, tibiais, fibulares e musculares da perna com calibre e compressibilidade preservados.\nVeias safenas magna e parva de trajeto preservado e compressíveis até suas crossas.\nFluxo presente em todos os segmentos à análise com Doppler colorido e espectral, com curvas fásicas\ncom a respiração.\nVeia [...] apresentando-se calibrosa, de paredes ecogênicas e com material hipoecogênico no seu interior,\nassociado à redução de sua compressibilidade.\nAo Doppler, não se observa fluxo nesse segmento.\nTal aspecto estende-se até a veia [...] .\nDemais segmentos venosos pérvios e com fluxo preservado ao Doppler.',
            'conc': 'Ausência de sinais de trombose venosa profunda.\n----Sinais de trombose venosa profunda no segmento.'
          },
          'aorta': {
            'name': 'aorta',
            'nickname': 'DOPPLER AORTA E ILIACAS',
            'title': 'DÚPLEX-DOPPLER COLORIDO DA AORTA ABDOMINAL E ARTÉRIAS ILÍACAS',
            'tecnique': '',
            'body': 'Aorta abdominal, artérias ilíacas comuns, segmentos proximais das internas, e ilíacas externas pérvias, de\ncalibre normal e trajeto regular.\n#Paredes regulares, sem placas ateromatosas.\n#Aorta abdominal e artérias ilíacas ateromatosas, com trajeto e calibre preservados.\n#Aorta abdominal e artérias ilíacas ateromatosas e tortuosas, com calibre preservado.\nDilatação (fusiforme sacular) da aorta abdominal, localizada a [...] cm da emergência (da artéria\nmesentérica superior / das artérias renais) , medindo [...] cm de comprimento e com diâmetro máximo de\n[...] cm. O colo tem calibre de [...] cm e mede [...] cm.\nDopplervelocimetria conservada nos vários segmentos analisados.\nMedidas:\nAorta abdominal – Dimensão de [...] e velocidade de pico sistólico de [...].\nIlíaca comum direita – Dimensão de [...] e velocidade de pico sistólico de [...].\nIlíaca externa direita – Dimensão de [...] e velocidade de pico sistólico de [...].\nIlíaca comum esquerda – Dimensão de [...] e velocidade de pico sistólico de [...].\nIlíaca externa esquerda – Dimensão de [...] e velocidade de pico sistólico de [...].',
            'conc': 'Dúplex-Doppler colorido normal da aorta e artérias ilíacas.'
          },
          'doppler_renal': {
            'name': 'doppler_renal',
            'nickname': 'DOPPLER ARTÉRIAS RENAIS',
            'title': 'DÚPLEX-DOPPLER COLORIDO RENAL E DE ARTÉRIAS RENAIS',
            'tecnique': '',
            'body': 'Rins tópicos, com dimensões normais e contornos regulares.\nParênquima de espessura normal e ecogenicidade preservada, com boa diferenciação corticomedular.\nRim direito mede [...] cm. Espessura do parênquima à direita: [...] cm.\nRim esquerdo mede [...] cm. Espessura do parênquima à esquerda: [...] cm.\nNão há evidências de imagens calculosas. Ausência de dilatação pielocalicinal.\nAorta abdominal com calibre normal e trajeto regular.\nO estudo hemodinâmico com Doppler colorido e pulsado revelou:\nMapeamento vascular renal anatômico.\nVelocidade de pico sistólico normal na emergência das artérias renais.\nArtéria renal direita: [...] cm/s.\nArtéria renal esquerda: [...] cm/s.\nAorta: [...] cm/s.\nArtérias segmentares intrarrenais com curva de aceleração e índices de resistividade preservados\nbilateralmente (aceleração > 3 m/s2).',
            'conc': 'Ausência de sinais diretos ou indiretos ao método para estenose das artérias renais.'
          }
        }
      },
      'msk': {
        'metadata': {
          'specialty_id': 'dropdown_msk_usg',
          'specialty_nickname': 'Msk',
          'specialty_name': 'msk'
        },
        'mascaras': {
          'xxx': {
            'name': '',
            'nickname': '',
            'title': '',
            'tecnique': '',
            'body': '',
            'conc': ''
          }
        }
      },
      'superficial': {
        'metadata': {
          'specialty_id': 'dropdown_superficial_usg',
          'specialty_nickname': 'Superficial',
          'specialty_name': 'superficial'
        },
        'mascaras': {
          'cervical': {
            'name': 'cervical',
            'nickname': 'USG CERVICAL',
            'title': 'ULTRASSONOGRAFIA CERVICAL',
            'tecnique': '',
            'body': 'Pele e tecido celular subcutâneo preservados.\nLobos tireoideanos tópicos, de morfologia e contornos regulares.\nParênquima com ecotextura e ecogenicidade normais.\nBiometria:\n- Lobo direito: [...] cm. Volume: [...] cc.\n- Lobo esquerdo: [...] cm. Volume: [...] cc.\n- Istmo: [...] cm. Volume: [...] cc.\n- Volume total da glândula: [...] cc.\nNão há evidências de nódulos na topografia das paratireoides.\nGlândulas parótidas e submandibulares com aspecto ecográfico preservado.\nAusência de linfonodomegalias, massas ou coleções cervicais.',
            'conc': 'Ultrassonografia cervical dentro dos padrões da normalidade.'
          },
          'tireoide': {
            'name': 'tireoide',
            'nickname': 'USG TIREOIDE',
            'title': 'ULTRASSONOGRAFIA DA TIREOIDE',
            'tecnique': '',
            'body': 'Lobos tireoideanos tópicos, de morfologia habitual e contornos regulares.\nParênquima com ecotextura e ecogenicidade normais.\nBiometria:\n- Lobo direito: [...] cm. Volume: [...] cc.\n- Lobo esquerdo: [...] cm. Volume: [...] cc.\n- Istmo: [...] cm. Volume: [...] cc.\n- Volume total da glândula: [...] cc.\nNão há evidências de nódulos na topografia das paratireoides.',
            'conc': 'Ultrassonografia da tireoide dentro dos padrões da normalidade.'
          },
          'doppler_tireoide': {
            'name': 'doppler_tireoide',
            'nickname': 'DOPPLER TIREOIDE',
            'title': 'DÚPLEX-DOPPLER COLORIDO DA TIREOIDE',
            'tecnique': '',
            'body': 'Lobos tireoideanos tópicos, de dimensões e contornos preservados.\nEcotextura homogênea, sem nódulos.\n- Nódulo [...], de contornos regulares no terço [...] do lobo [...], (sem / com) microcalcificações, medindo\n[...] cm.\nAo mapeamento com dúplex-Doppler colorido observa-se vascularização periférica e central.\nBiometria:\nLobo direito: [...] cm. Volume: [...] cm3.\nLobo esquerdo: [...] cm. Volume: [...] cm3.\nIstmo: [...] cm. Volume: [...] cm3.\nVolume total da glândula: [...] cm3 (normal = 6 a 15 cm3)',
            'conc': 'Tireoide de aspecto ultrassonográfico normal.'
          },
          'superficial': {
            'name': 'superficial',
            'nickname': 'USG PARTES MOLES',
            'title': 'ULTRASSONOGRAFIA DE REGIÃO SUPERFICIAL',
            'tecnique': 'Exame direcionado para a região [...].\nPele e tecido celular subcutâneo de espessura e ecogenicidade preservada.\n#Espessamento e densificação do tecido celular subcutâneo.\nAusência de coleções ou massas.\nPresença de coleção hipoecóica de cerca de [...] cm, localizada na região.\nPresença de linfonodos de até cm.\nPresença de linfonodomegalias de até [...] cm.',
            'body': 'Exame direcionado para a região [...].\nPele e tecido celular subcutâneo de espessura e ecogenicidade preservada.\n#Espessamento e densificação do tecido celular subcutâneo.\nAusência de coleções ou massas.\nPresença de coleção hipoecóica de cerca de [...] cm, localizada na região.\nPresença de linfonodos de até cm.\nPresença de linfonodomegalias de até [...] cm.',
            'conc': ''
          },
          'glandulas_salivares': {
            'name': 'glandulas_salivares',
            'nickname': 'USG GLÂNDULAS SALIVARES',
            'title': 'ULTRASSONOGRAFIA DAS GLÂNDULAS SALIVARES',
            'tecnique': '',
            'body': 'Glândulas parótidas, submandibulares e sublinguais de morfologia, contornos e dimensões normais.\nEcotexturas glandulares preservadas.\nAusência de dilatações ductais.\nEstruturas vasculares preservadas.\nNão se observam linfonodomegalias periglandulares.',
            'conc': 'Ultrassonografia das parótidas e submandibulares dentro dos padrões da\nnormalidade.'
          }
        }
      }
    }
  },
  'tc': {
    'metadata': {
      'modality_name': 'tc'
    },
    'specialties': {
      'abdome': {
        'metadata': {
          'specialty_nickname': 'Abdome',
          'specialty_id': 'dropdown_abdome_tc',
          'specialty_name': 'abdome'
        },
        'mascaras': {
          'abdome_e_pelve': {
            'name': 'abdome_e_pelve',
            'nickname': 'TC ABDOME E PELVE',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DE ABDOME E PELVE',
            'tecnique': 'Obtidas imagens axiais por metodologia multislice, -------------antes e após a injeçãointravenosa do meio de contraste. ---------------------------Administrado previamente contraste iodado diluído por via oral',
            'body': 'Fígado de dimensões normais, contornos regulares, com atenuação preservada, sem evidência de lesões focais. Veia porta pérvia. \nAusência de dilatação de vias biliares. \nPâncreas, baço e adrenais sem particularidades. \nRins tópicos de dimensões normais, contornos regulares, com espessura do parênquima sem alterações significativas. Concentração e eliminação satisfatória do contraste. Não há evidência de cálculos ou dilatação do sistema coletor. \nAusência de linfonodomegalias abdominais ou de líquido livre. \nAorta de trajeto e calibre preservados. \nBexiga com boa repleção, paredes regulares e conteúdo homogêneo.',
            'conc': ''
          },
          'abdome_e_pelve_litiase': {
            'name': 'abdome_e_pelve_litiase',
            'nickname': 'TC ABDOME E PELVE LITÍASE',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DE ABDOME E PELVE',
            'tecnique': 'Obtidas imagens axiais por metodologia multislice, sem a injeção intravenosa do meio de contraste. Protocolo direcionado para a pesquisa de litíase em vias rinárias.',
            'body': 'Cálculo obstrutivo no ureter #, medindo cm, com atenuação de UH, distando cerca de cm da # junção ureteropiélica #junção ureterovesical e determinando moderada dilatação ureteropielocalicinal a montante, com densificação da gordura periureteral e perirrenal.\nEstudo negativo para litíase ureteral.\nRim direito tópico, de dimensões normais, contornos regulares e com atenuação e espessura do parênquima sem alterações significativas. Ausência de cálculos ou hidronefrose. Gordura perirrenal preservada.\nRim esquerdo tópico, de dimensões normais, contornos regulares e com atenuação e espessura do parênquima sem alterações significativas. Ausência de cálculos ou hidronefrose. Gordura perirrenal preservada.\nBexiga com boa repleção e paredes regulares.\nAusência de líquido livre ou coleções.\nAs demais estruturas analisadas não apresentam alterações significativas, ressalvando-se as limitações do estudo sem contraste.',
            'conc': ''
          },
          'angio_aorta': {
            'name': 'angio_aorta',
            'nickname': 'TCANGIO AORTA',
            'title': 'ANGIOTOMOGRAFIA DE AORTA ',
            'tecnique': 'Imagens obtidas por tecnologia de múltiplos detectores, antes e após a administração do meio de contraste endovenoso. Estudo dirigido para a aorta. ',
            'body': 'Aorta e artérias ilíacas de trajeto tortuoso, com múltiplas placas calcificadas parietais e com calibre normal.\nAneurisma fusiforme com trombos murais irregulares do segmento #torácico #abdominal #tóraco-abdominal, iniciando-se a - cm da emergência da artéria #subclávia #renal esquerda, estendendo-se por aproximadamente - cm até a bifurcação aortoilíaca, sem envolvê-la.\nO seu diâmetro transverso máximo é de - cm. O colo do aneurisma mede - cm de calibre.\nBoa opacificação em todo o seu trajeto.\nAusência de hematomas parietais.\nNão há extravasamento do meio de contraste ou coleções periaórticas.\nOs demais órgãos analisados não apresentam alterações relevantes nas imagens obtidas.\nAorta e artérias ilíacas de trajeto habitual, com paredes preservadas e com calibre normal.\nAorta e artérias ilíacas de trajeto tortuoso, com calibre normal e apresentando placas parietais calcificadas.\nBoa opacificação em todo o seu trajeto.\nAusência de aneurismas, dissecções ou hematomas parietais.\nNão há coleções periaórticas ou extravasamento do meio de contraste.\nOs demais órgãos analisados não apresentam alterações relevantes nas imagens obtidas.\n\nDiâmetros máximos:\nSeio de Valsalva:\nAorta ascendente:\nCroça da aorta:\nAorta descendente:',
            'conc': ''
          },
          'angio_mmii': {
            'name': 'angio_mmii',
            'nickname': 'ANGIOTC MMII',
            'title': 'ANGIOTOMOGRAFIA COMPUTADORIZADA DE AORTA ABDOMINAL',
            'tecnique': 'Obtidos cortes por metodologia multislice, durante a administração do meio de contraste endovenoso. ',
            'body': '# Ateromatose difusa, caracterizada por placas parietais calcificadas, predominando ##############.\nAorta abdominal\nTronco celíaco\nMesentérica superior\nMesentérica inferior\nRenal direita\nRenal esquerda\nMembro Inferior Direito\nIlíaca comum\nIlíaca interna\nIlíaca externa\nFemoral comum\nFemoral profunda\nFemoral superficial\nPoplítea\nTibial anterior\nTronco tíbio-fibular\nTibial posterior\nFibular\nPediosa\nPlantares\nMembro Inferior Esquerdo\nIlíaca comum\nIlíaca interna\nIlíaca externa\nFemoral comum\nFemoral profunda\nFemoral superficial\nPoplítea\nTibial anterior\nTronco tíbio-fibular\nTibial posterior\nFibular\nPediosa\nPlantares\n\n# pérvia\n# afilada\n# ocluída\n# reenchida por colaterais\n# com irregularidades parietais\n# com estenose leve / moderada / grave\nAchados adicionais:',
            'conc': ''
          }
        }
      },
      'neuro': {
        'metadata': {
          'specialty_id': 'dropdown_neuro_tc',
          'specialty_nickname': 'Neuro',
          'specialty_name': 'neuro'
        },
        'mascaras': {
          'cranio': {
            'name': 'cranio',
            'nickname': 'TC CRÂNIO',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DO CRÂNIO',
            'tecnique': 'Obtidos cortes por técnica multislice, sem o uso de contraste endovenoso. ',
            'body': 'Sistema ventricular de morfologia e dimensões preservadas.\nNão há desvio de estruturas da linha mediana.\nCisternas basais, fissuras encefálicas e sulcos corticais de amplitude dentro dos limites normais.\nParênquima encefálico com coeficientes de atenuação habituais. \nAusência de coleções extra-axiais ou sinais de hemorragia aguda nos cortes obtidos.\nEstruturas ósseas sem sinais de fraturas.\n\nEspessamento do revestimento mucoso das cavidades paranasais, com velamento do  ## seio frontal direito.\n',
            'conc': ''
          },
          'cranio_idoso': {
            'name': 'cranio_idoso',
            'nickname': 'TC CRÂNIO IDOSO',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DO CRÂNIO',
            'tecnique': 'Obtidos cortes por técnica multislice, sem o uso de contraste endovenoso. ',
            'body': 'Ectasia de aspecto não hipertensivo do sistema ventricular supratentorial. IV ventrículo de morfologia e dimensões preservadas.\nProeminência / Alargamento difuso das cisternas, fissuras encefálicas e sulcos corticais.\nDiscreta hipoatenuação da substância branca periventricular, mais evidente ao redor dos cornos frontais e átrios ventriculares, achado comumente relacionado a microangiopatia / gliose.\nFocos hipoatenuantes nas regiões nucleocapsulares, podendo corresponder a alargamento do espaço perivascular ou infartos lacunares.\nRestante do parênquima encefálico com coeficientes de atenuação preservados.\nAteromatose nos segmentos intracranianos das artérias carótidas internas, basilar e vertebrais.\nAusência de coleções extra-axiais ou sinais de hemorragia aguda nos cortes obtidos.\nNão há desvio das estruturas da linha mediana.\nDiscreto espessamento do revestimento mucoso das cavidades paranasais. Mastoides normoaeradas nos segmentos avaliados pelo estudo.\nCristalinos não caracterizados.',
            'conc': ''
          },
          'angio_cranio': {
            'name': 'angio_cranio',
            'nickname': 'TCANGIO CRÂNIO',
            'title': 'ANGIOTOMOGRAFIA DE CRÂNIO',
            'tecnique': 'Obtidos cortes por metodologia multislice, durante a administração do meio de contraste endovenoso.',
            'body': 'Segmento intracraniano das artérias carótidas internas de trajeto habitual e calibre preservado.\nNão há placas. Não há evidência de estenoses.\nSegmento intracraniano das artérias vertebrais de trajeto e calibre preservado.\nArtéria basilar de trajeto e calibre preservado.\n#Padrão fetal na circulação posterior _ (hipoplasia/agenesia de P1 com calibre normal após a confluência da artéria comunicante posterior homolateral).\nPrincipais artérias intracranianas apresentando trajeto, calibre e contrastação conservados.\nNão há evidências de aneurismas detectáveis pelo método.\nBoa contrastação dos seios durais, das principais veias superficiais e profundas e do segmento superior das veias jugulares.\nNão se observam falhas de enchimento intraluminais venosas.\n\nEmergência dos demais segmentos arteriais da crossa da aorta sem placas ou estenoses significativas.\nArtérias carótidas de trajeto e calibre preservados.\nArtérias vertebrais de trajeto e calibre preservado.',
            'conc': ''
          }
        }
      },
      'torax': {
        'metadata': {
          'specialty_id': 'dropdown_torax_tc',
          'specialty_nickname': 'Tórax',
          'specialty_name': 'torax'
        },
        'mascaras': {
          'torax': {
            'name': 'torax',
            'nickname': 'TC TÓRAX',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DE TÓRAX',
            'tecnique': 'Imagens obtidas por tecnologia de múltiplos detectores, sem a administração do meio de contraste endovenoso.',
            'body': 'Estruturas vasculares do mediastino de calibre externo preservado.\nAusência de linfonodomegalias mediastinais\nDemais estruturas mediastinais sem anormalidades.\nParênquima pulmonar com atenuação normal.\nEspaços pleurais virtuais.',
            'conc': ''
          },
          'tep': {
            'name': 'tep',
            'nickname': 'ANGIOTC TEP',
            'title': 'ANGIOTOMOGRAFIA COMPUTADORIZADA DO TÓRAX PARA PESQUISA DE TROMBOEMBOLISMO PULMONAR',
            'tecnique': 'Imagens obtidas por tecnologia de múltiplos detectores, durante a administração de contraste endovenoso.',
            'body': 'Estudo negativo para tromboembolismo pulmonar\nEstruturas vasculares do mediastino de calibre externo preservado.\nAusência de linfonodomegalias mediastinais\nDemais estruturas mediastinais sem anormalidades.\nParênquima pulmonar com atenuação normal.\nEspaços pleurais virtuais.',
            'conc': ''
          }
        }
      },
      'msk': {
        'metadata': {
          'specialty_id': 'dropdown_msk_tc',
          'specialty_nickname': 'MSK',
          'specialty_name': 'msk'
        },
        'mascaras': {
          'col_cervical': {
            'name': 'col_cervical',
            'nickname': 'TC COLUNA CERVICAL',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DA COLUNA CERVICAL',
            'tecnique': 'Foram obtidas imagens por aquisição volumétrica, sem a administração endovenosa de contraste iodado, com reconstruções multiplanares nos planos sagital, coronal e axial',
            'body': 'Exame dirigido para avaliação de politraumatismo, sem sinais de fraturas ou desalinhamentos.\nAlterações degenerativas na coluna cervical caracterizadas por osteofitose marginal, redução da altura de espaços discais, artrose das articulações interapofisárias e uncoartrose, determinando redução do calibre de alguns forames de conjugação.\nCorpos vertebrais de altura e morfologia preservadas.\nEstruturas dos arcos posteriores preservadas.\nNão há herniações discais.\nCanal vertebral de calibres normais.\nSaco dural com atenuação característica nos segmentos acessíveis.\nForames de conjugação de amplitude normal.\nEstruturas paravertebrais sem anormalidades.\n\nTransição crânio-cervical sem alterações.\nProcesso odontóide centrado, com contornos regulares.\nCorpos vertebrais alinhados, de altura preservada, sem sinais de fraturas.\nPedículos e estruturas do arco posterior sem anormalidades.\nNão há lesões ósseas focais identificáveis pelo método.\nDiscos intervertebrais de altura preservada, sem abaulamentos ou protrusões significativas.\nArticulações interfacetárias e uncovertebrais de contornos regulares.\nDiâmetros normais do canal vertebral e forames de conjugação.\nMusculatura paravertebral sem alterações.\nNível C2-C3:\nNível C3-C4:\nNível C4-C5:\nNível C5-C6:\nNível C6-C7:\nNível C7:T1:\nRetificação da lordose fisiológica.\nCorpos vertebrais de altura preservada, sem fraturas, apresentando pequenos osteófitos marginais.\nAlterações degenerativas discais difusas, associadas a artroses facetarias e uncovertebrais. O conjunto dos achados determina',
            'conc': ''
          },
          'col_lombar': {
            'name': 'col_lombar',
            'nickname': 'TC COLUNA LOMBAR',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DA COLUNA LOMBAR',
            'tecnique': 'Foram obtidas imagens por aquisição volumétrica multislice, sem a administração endovenosa de contraste, com reformatações multiplanares.',
            'body': 'Corpos vertebrais alinhados no plano sagital e com altura preservada.\nPedículos e demais estruturas do arco posterior sem particularidades.\nDiscos intervertebrais de altura preservada, sem abaulamentos ou protrusões significativas.\nArticulações interapofisárias de contornos regulares.\nAusência de fraturas ou de lesões ósseas focais com características agressivas evidentes ao método.\nDiâmetros normais do canal vertebral e forames de conjugação.\nMusculatura paravertebral sem alterações.',
            'conc': ''
          },
          'col_toracica': {
            'name': 'col_toracica',
            'nickname': 'TC COLUNA TORÁCICA',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DA COLUNA TORÁCICA',
            'tecnique': 'Foram obtidas imagens por aquisição volumétrica multislice, sem a administração endovenosa de contraste, com reformatações multiplanares.',
            'body': 'Corpos vertebrais alinhados no plano sagital e com altura preservada.\nPedículos e demais estruturas do arco posterior sem particularidades.\nDiscos intervertebrais de altura preservada, sem abaulamentos ou protrusões discais significativas.\nArticulações interapofisárias de contornos regulares.\nAusência de fraturas ou de lesões ósseas focais com características agressivas evidentes ao método.\nDiâmetros normais do canal vertebral e forames de conjugação.\nMusculatura paravertebral sem alterações.',
            'conc': ''
          }
        }
      },
      'cep': {
        'metadata': {
          'specialty_id': 'dropdown_cep_tc',
          'specialty_nickname': 'CEP',
          'specialty_name': 'cep'
        },
        'mascaras': {
          'face_e_pescoco': {
            'name': 'face_e_pescoco',
            'nickname': 'TC FACE E PESCOÇO',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DA FACE E PESCOÇO',
            'tecnique': 'Imagens obtidas por aquisição volumétrica "multislice" ------após a administração intravenosa do meio de contraste iodado',
            'body': 'Estruturas da faringe e laringe apresentam atenuação preservada.\nNão se evidenciam linfonodomegalias.\nGlândulas parótidas e submandibulares sem alterações.\nGlândula tireoide sem particularidades.\nEstruturas ósseas preservadas.\nAspecto normal das estruturas intraorbitárias.\nCavidades paranasais normoaeradas.\nNão se observam realces anômalos.',
            'conc': ''
          },
          'face': {
            'name': 'face',
            'nickname': 'TC FACE',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DA FACE',
            'tecnique': 'Imagens obtidas por aquisição volumétrica "multislice" ------após a administração intravenosa do meio de contraste iodado',
            'body': 'Imagens obtidas por aquisição volumétrica "multislice" após a administração intravenosa do meio de contraste iodado.\nAnálise:\nAspecto normal das estruturas intraorbitárias.\nCavidades paranasais normoaeradas.\nEstruturas da rino e orofaringe com atenuação preservada.\nGlândulas parótidas e submandibulares sem alterações.\nNão se evidenciam linfonodomegalias.\nEstruturas ósseas preservadas.\nNão se observam realces anômalos.',
            'conc': ''
          },
          'pescoco': {
            'name': 'pescoco',
            'nickname': 'TC PESCOÇO',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DE PESCOÇO',
            'tecnique': 'Imagens obtidas por aquisição volumétrica "multislice" ------após a administração intravenosa do meio de contraste iodado',
            'body': 'Faringe apresenta atenuação preservada.\nEpiglote, pregas ariepiglóticas, bandas ventriculares e cordas vocais apresentam atenuação preservada.\nNão se evidenciam linfonodomegalias.\nGlândulas parótidas e submandibulares sem alterações.\nGlândula tireoide sem particularidades.\nEstruturas ósseas preservadas.\nNão se observam realces anômalos.',
            'conc': ''
          },
          'seios_face': {
            'name': 'seios_face',
            'nickname': 'TC SEIOS DA FACE',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DOS SEIOS PARANASAIS',
            'tecnique': 'Imagens obtidas por aquisição volumétrica "multislice" sem a administração intravenosa do meio de contraste iodado.',
            'body': 'Septo nasal centrado.\nFóveas etmoidais simétricas.\nCavidades paranasais normoaeradas.\nInfundíbulos, recessos frontais e esfenoetmoidais pérvios.\nRinofaringe sem alterações.\nAchados patológicos\nSepto nasal desviado para .......\nFóveas etmoidais assimétricas, mais baixa à .......\nEspessamento do revestimento mucoso nos seios maxilares, frontais, esfenoidais e etmoidais. #com aspeto por vezes lobulado, podendo corresponder a cistos de retenção / pólipos.\nDemais cavidades paranasais normoaeradas.\nObliteração do infundíbulo e recessos frontais e esfenoetmoidais.\nInfundíbulos, recessos frontais e esfenoetmoidais pérvios.\nRinofaringe sem alterações.',
            'conc': ''
          },
          'orbitas': {
            'name': 'orbitas',
            'nickname': 'TC ÓRBITAS',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DAS ÓRBITAS',
            'tecnique': 'Foram obtidas imagens por aquisição volumétrica multislice, sem a administração endovenosa de contraste, com reformatações multiplanares.',
            'body': 'Estruturas ósseas sem alterações.\nGlobos oculares apresentam atenuação preservada.\nMusculatura extrínseca, gordura orbitária intra e extraconal e nervos ópticos conservados.\nGlândulas lacrimais sem particularidades.\nNão se observam realces anômalos.',
            'conc': ''
          },
          'mastoide': {
            'name': 'mastoide',
            'nickname': 'TC OSSOS TEMPORAIS',
            'title': 'TOMOGRAFIA COMPUTADORIZADA DE OSSOS TEMPORAIS',
            'tecnique': 'Imagens obtidas por aquisição volumétrica "multislice" sem a administração intravenosa do meio de contraste iodado.',
            'body': 'Condutos auditivos externos de aspecto preservado.\nMastoides normopneumatizadas.\nCaixas timpânicas normoaeradas.\nCadeias ossiculares sem alterações.\nCócleas, vestíbulos, canais semicirculares e condutos auditivos internos\nde aspecto habitual.\nCanais dos nervos faciais preservados.',
            'conc': ''
          }
        }
      }
    }
  },
  'rm': {
    'metadata': {
      'modality_name': 'rm'
    },
    'specialties': {
      'abdome': {
        'metadata': {
          'specialty_nickname': 'Abdome',
          'specialty_id': 'dropdown_abdome_rm',
          'specialty_name': 'abdome'
        },
        'mascaras': {
          'abdome_e_pelve': {
            'name': '',
            'nickname': '',
            'title': '',
            'tecnique': '',
            'body': '',
            'conc': ''
          }
        }
      },
      'neuro': {
        'metadata': {
          'specialty_id': 'dropdown_neuro_rm',
          'specialty_nickname': 'Neuro',
          'specialty_name': 'neuro'
        },
        'mascaras': {
          'cranio': {
            'name': '',
            'nickname': '',
            'title': '',
            'tecnique': '',
            'body': '',
            'conc': ''
          }
        }
      }
    }
  }
}

const normalized_templates = normalize_templates(base_templates)

export { base_templates, normalized_templates }
