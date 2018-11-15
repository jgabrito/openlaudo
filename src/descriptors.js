const descriptors = {
  'neuro': {
    'metadata': {
      'specialty_name': 'neuro'
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'microangiopatia': {
            'title': 'Microangiopatia / rarefação de mielina / gliose',
            'body': 'Hipoatenuação da substância branca periventricular compatível com áreas de microangiopatia / rarefação mielínica. \n'
          },
          'adenoma_hipofise': {
            'title': 'MACROADENOMA DE HIPÓFISE',
            'body': 'Sela túrcica alargada e infradesnivelada contendo lesão selar / suprasselar de contornos lobulados, com foco de calcificação de permeio, de limites imprecisos, com realce pelo meio de contraste iodado. Tal lesão deslocando superiormente o quiasma óptico, que, juntamente com os nervos ópticos, encontra-se afilado e indistinto em meio a lesão. Lateralmente, a lesão invade os seios cavernosos e mantém contato com o segmento supraclinoide da artéria carótida interna esquerda, os quais se encontram com sinais de perviedade. \n'
          },
          'sturge_weber': {
            'title': 'STURGE WEBER:',
            'body': 'Atrofia do parênquima e calcificações em trilho de trem delineando o córtex da região têmporo parieto occiptal direita. Aumento das dimensões do plexo coróide do átrio do ventrículo lateral direito. Estes achado são compatíveis com a síndrome de Sturge Weber. '
          },
          'cisto_aracnoide': {
            'title': 'CISTO ARACNOIDE',
            'body': 'Formação cística na fossa craniana média direita, medindo cerca de 3,5 cm no seu maior eixo, que determina leve retificação dos giros corticais do pólo temporal, compatível com cisto de aracnoide. '
          },
          'chiari_ii': {
            'title': 'CHIARI II',
            'body': 'Acentuada dilatação do sistema ventricular supratentorial, sem sinais de edema subependimário. Fossa posterior de dimensões reduzidas, com insinuação inferior do tronco encefálico através do forame magno, bem como herniação das tonsilas cerebelares através do forame magno por cerca de 1,0 cm. Há, ainda, insinuação anterior dos hemisférios cerebelares ao redor do tronco encefálico, com obliteração das cisternas pericerebelares. Sinais de hipoplasia/fenestrações da foice cerebral, com discreta interdigitação do giro do cingulo anterior. O conjunto de achados é comumente encontrado dentro do espectro de malformação de Chiari do tipo II.'
          },
          'e_tuberosa': {
            'title': 'HAMARTOMAS SUBEPNDIMÁRIOS - ESCLEROSE TUBEROSA',
            'body': 'Múltiplos focos de calcificação subependimária adjacente aos ventrículos laterais, o maior junto ao forame de Monro direito medindo 0,5 cm, podendo corresponder à hamartomas subependimários.'
          },
          'avci_h': {
            'title': 'ACIDENTE VASCULAR ISQUÊMICO MALIGNO DE CEREBRAL MÉDIA COM TRANSFORMAÇÃO HEMORRÁGICA',
            'body': 'Extensa hemorragia intraparenquimatosa de provável origem da artéria cerebral média (M1) esquerda, acometendo difusamente o lobos temporal, frontal e parietal desse lado, além da ínsula e núcleos da base. Promove compressão do ventrículo lateral esquerdo.Há edema associado do parênquima cerebral à esquerda, notando-se apagamento sulcos principalmente na alta convexidade.  Hemoventrículo difuso. Hemorragia subaracnoide. O conjunto de achados acima determina desvio das estruturas da linha mediana em 1,5 cm para a direita. Nota-se ainda áreas de hipoatenuação parenquimatosa à esquerda, provavelmente relacionadas ao evento isquêmico recente, cuja avaliação da extensão total é limitada pela hemorragia e pelo edema.'
          },
          'avci_maligno': {
            'title': 'ACIDENTE VASCULAR ISQUÊMICO MALIGNO DE CEREBRAL MÉDIA',
            'body': 'Extensa zona hipoatenuante com perda da diferenciação córtico-subcortical na região frontotemporoparietal e nucleocapsular esquerda, determinando leve efeito de massa local com apagamento dos sulcos corticais regionais. Hiperdensidade da artéria cerebral média à esquerda (segmento M1/M2). O conjunto destes achados é compatível com insulto isquêmico agudo no território da artéria cerebral média esquerda.\nTornou-se mais evidente a zona hipoatenuante corticossubcortical na região frontotemporoparietal e nucleocapsular esquerda, bem como se tornou mais significativo o efeito expansivo local, com apagamento dos sulcos corticais regionais, compressão sobre o corno anterior e o corpo do ventrículo lateral esquerdo e desvio da linha mediana para a direita em cerca de 0,5 cm.'
          },
          'subsural_bilat': {
            'title': 'HEMATOMA SUBDURAL BILATERAL',
            'body': 'Coleções extra-axiais subdurais frontoparietais bilaterais, com conteúdo com atenuação semelhante ao líquor e espessura máxima de 0,8 cm à direita e 1,4 cm à esquerda (aferidas no plano coronal). Determinam leve efeito de massa com aplanamento do parênquima subjacente e apagamento dos sulcos corticais regionais.'
          },
          'hpn': {
            'title': 'HPN - Hidrocefalia de Pressão Normal',
            'body': 'Moderada ectasia do sistema ventricular supratentorial, com morfologia discretamente globosa, acompanhada de relativo apagamento dos sulcos corticais na alta convexidade. Ângulo calosal reduzido, medindo 70º. Fissuras sylvianas amplas. Estes achados podem estar relacionados a hidrocefalia de pressão normal, dentro de um contexto clínico apropriado.'
          },
          'hematom_tumor': {
            'title': 'HEMATOMA INTRAPARENQUIMATOSO + TUMOR',
            'body': 'Hematoma intraparenquimatoso na região frontal esquerda / núcleo caudado esqeurdo, que mede aproximadamente 5,0 x 3,2 x 3,0 cm, com volume estimado em 24 cm³, com grande edema perilesional, áreas heterogêneas e pequenos outros focos de sangramento e calcificações de permeio adjacentes. O hematoma disseca para o interior do sistema ventricular, notando-se hemoventrículo acometendo de maneira mais significativa o ventrículo lateral esquerdo, terceiro ventrículo, quarto ventrículo e se comunicando com o espaço subaracnoideo da cisterna magna. O conjunto dos achados determina efeito de massa com apagamento das cisternas e sulcos corticais e compressão do corno frontal e corpo do ventrículo lateral deste lado e pequeno desvio de estruturas da linha mediana para a direita, não se podendo excluir lesão encefálica associada.'
          },
          'vasoespasmo': {
            'title': 'HEMORRAGIA SUBARACNOIDE ANEURISMÁTICA E VASOESPASMO',
            'body': 'Sinais de hemorragia subaracnóidea (HSA) que preenche e distende as fissuras sylvianas, em maior volume à direita. Também se caracteriza HSA em menor volume em alguns sulcos corticais sobretudo frontoparietais à direita e no aspecto basal e posterior da fissura interhemisférica anterior. Associa-se apagamento difuso dos sulcos corticais e fissuras encefálicas, assim como discreta redução das cisternas da base do crânio. Dilatação moderada do sistema ventricular supratentorial com discreto edema transependimário. Não há desvio de estruturas da linha mediana.\n\n\nAcentuada redução de calibre com aspecto difusamente irregular dos contornos do segmento M1 da artéria cerebral média direita, sobretudo nos terços médio / distal, assim como afilamento e relativa pobreza de ramos distais pós-bifurcação. Alteração similar é observada nos segmentos A2 das artérias cerebrais anteriores. No presente contexto, tais alterações são compatíveis com vasoespasmo. Demais grandes troncos arteriais intracranianos de trajeto habitual e calibre preservado.  Boa contrastação dos seios durais, das principais veias superficiais e profundas e do segmento superior das veias jugulares.Não se observam falhas de enchimento intraluminais venosas.'
          },
          'pos_op_hsa': {
            'title': 'PÓS-OPERATÓRIO DE HSA ANEURISMÁTICA ',
            'body': 'Sinais de manipulação cirúrgica recente caracterizados por craniotomia pterional direita associado a densificação dos tecidos superficiais adjacentes e fina coleção extra-axial hemática com focos gasosos de permeio. Pneumocrânio.\nClipe metálico em topografia de comunicante posterior direita, determinando artefatos de endurecimento de feixe que limitam a avaliação das estruturas adjacentes. Discreta hemorragia subaracnóidea residual notadamente na fissura sylviana direita.\nPersiste o apagamento de sulcos corticais e fissuras encefálicas, sobretudo frontoparietal à direita, ao estudo atual com compressão do ventrículo lateral direito, sem desvios de estruturas centromedianas.\nHouve redução global da dilatação do sistema ventricular supratentorial.\nDestacamos surgimento de área hipoatenuante corticossubcortical perirrolândica direita, comprometendo sobretudo o giro pós-central à direita com extensão ao centro semioval e alcançando a região periventricular, com maior apagamento de espaços liquóricos regionais, que devem representar insulto isquêmico recente. \nRestante do sistema ventricular de morfologia e dimensões preservadas.\nRestante do parênquima encefálico com coeficientes de atenuação habituais. \nAchados adicionais: Espessamento do revestimento mucoso das cavidades dos seios maxilares e células etmoidais de contornos por vezes lobulados, possíveis cistos de retenção/ pólipos. '
          },
          'subdural_cron': {
            'title': 'HEMATOMA SUBDURAL CRÔNICO E CRANIOTOMIA',
            'body': 'Redução da espessura da coleção subdural frontoparietal esquerda, hipoatenuante e com espessura máxima de 2,0 cm. Nota-se área periférica de maior atenuação que deve corresponder mais provavelmente a hematoma subagudo.\nO aspecto frontal da coleção permanece densa, devendo corresponder mais provavelmente a loculação do hematoma. \nRedução do efeito expansivo associado à coleção supracitada, caracterizado por re-expansão parcial dos sulcos corticais regionais e menor desvio das estruturas da linha mediana, agora de 0,2 cm ao nível do septo pelúcido.\nResolução do pneumocrânio e do enfisema / densificação das partes moles superficiais à craniotomia.\nDemais achados sem alterações evolutivas significativas, a saber:\nSinais de manipulação cirúrgica caracterizada por craniotomia parietal esquerda, com discreto desalinhamento do retalho ósseo.\nAlargamento dos sulcos corticais, fissuras inter-hemisférica e sylvianas, assim como aumento do sistema ventricular supratentorial.\nHipoatenuação da substância branca periventricular, mais evidente ao redor dos cornos frontais e átrios ventriculares, inespecífica, mais frequentemente associado à gliose decorrente de microangiopatia.\nAteromatose nos segmentos intracranianos das artérias carótidas internas.\nFoco de calcificação de aspecto residual próximo ao vérmis cerebelar à esquerda.\nDiscreto espessamento do revestimento mucoso das cavidades paranasais. Mastoides normoaeradas nos segmentos avaliados pelo estudo.'
          },
          'web': {
            'title': 'WEB CAROTÍDEO',
            'body': 'Irregularidade parietal no contorno posterior do segmento proximal da artéria carótida interna direita, com morfologia triangular, iniciando-se pouco acima do bulbo e se estendendo superiormente por cerca de 0,8 cm. O controle evolutivo deste achado favorece a hipótese de um web carotídeo. '
          },
          'hematoma_intra': {
            'title': 'Hematoma Intraparenquimatoso',
            'body': 'Hematoma intraparenquimatoso recente centrado no aspecto posterior do núcleo lentiforme esquerdo, que se estende para a na substância branca temporal à esquerda, acometendo também ramo posterior da cápsula interna e a região subinsular, medindo 4,2 cm no maior eixo (redução em relação estudo anterior de 04/08/2018) , com edema adjacente, determinando compressão do corno posterior do ventrículo lateral esquerdo e apagamento dos sulcos regionais. Há também leve apagamento dos sulcos da alta convexidade. \nHematoma intraparenquimatoso centrado na substância branca occiptoparietal à esquerda, acometendo  também o lobo temporal, medindo 5,5 cm no maior eixo, com discreta halo hipoatenuante por provável edema vasogênico, determinando compressçao do corno posterior e temporal do ventrículo lateral esquerdo e apagamento dos sulcos e espaços liquóricos regionais. Há também apagamento dos sulcos da alta convexidade e desvio das estruturas centromedianas em aproximadamente 0,5 cm para a direita. Hipotatuanção  corticossubcortical da região occiptoparitotemporal direita, com marcada hipoatenuação da substância branca subcortical e alargamento dos sulcos e espaços liquóricos regionais e discreto alargamento do corno temporal do ventrículo lateral direito. Hipoatenuação da substância branca periventricular e do centro semioval de aspecto inespespecífico, mas que pode estar associado a microangiopatia/rarefação mielínica. Discreto alargamento difuso das cisternas, fissuras e sulcos corticais, sem padrão regional preferêncial.'
          },
          'avci_acm_hiper': {
            'title': 'Acidente Vascular Encefálico Isquêmico de Artéria Cerebral Média com sinal da artéria cerebral hiperdensa e oclusão de M1 na Angio',
            'body': 'Hipoatenuação corticossubcortical nas regiões da ínsula e núcleo lentiforme à direita, associado a hiperdendidade do segmento pós-bifurcação de M1 e segmento proximal de M2 da artéria cerebral média direita.\nLeve proeminência difusa dos sulcos corticais, fissuras encefálicas e cisternas basais, bem como dos ventrículos laterais e terceiro ventrículo. Hipodensiades tênues da substância branca cerebral periventricular, simétrica, mais evidente em regiões periatriais. Não há desvio de estruturas da linha mediana. Ausência de coleções intra ou extra-axiais nos cortes obtidos.\nAngiotomografia:\nSegmentos avaliados do arco aórtico, tronco braquiocefálico e porções proximais das artérias subclávias com trajeto e calibre preservados, com placas ateromatosas calcificadas no arco aórtico e emergência dos ramos supra-aórtico, sem estenoses significativas. Placas ateromatosas calcificadas nos bulbos e emergências das artérias carótidas internas bilateralmente, sem determinar estenoses significativas. Acentuada ateromatose dos segmentos intracranianos das artérias carótidas internas, sem determinar estenoses significativas.\nOclusão de  M1 e segmento proximal de M2 direitos, com paucidade de redes colaterais a jusante deste lado. \nArtérias cerebrais anteriores, cerebral média esquerda e posteriores e artéria basilar de calibre, trajeto e contornos preservados. Placas ateromatosas calcificada da artéria basilar, sem determinar estenoses significativas. Artéria basilar é continuação da artéria vertebral esquerda. Não caracterizado preenchimento da artéria vertebral direita pelo meio de contraste. Artéria vertebral esquerda dominante, com calibre e contornos preservados.Ausência de aneurismas detectáveis ao método.\nOPINIÃO:Hipoatenuação insular e do núcleo lentiforme à direita, associado a artéria cerebral média com obstrução parcial do fluxo no nível pós-bifurcação de M1 e porção proximal de M2, com escassa rede de colaterais a jusante, compatível com evento isquêmico na circulação anterior no território da artéria cerebral média direita.Ausência de preenchimento da artéria vertebral direita pelo meio de contraste, que pode corresponder a oclusão ou suboclusão. Ateromatose dos bulbos e sifões carotídeos e artéria vertebral esquerda.'
          },
          'dddd': {
            'title': 'Displasia Fibromuscular Carótidas Internas e Vertebrais, Web carotídeo e Fístula Artério-Venosa na a. vertebral',
            'body': 'Emergências dos grandes vasos da base sem estenoses. Como variações anatômicas observam-se emergência da artéria vertebral esquerda juntamente com a artéria subclávia desse lado, diretamente do arco aórtico, bem como emergência da artéria carótida comum esquerda do tronco braquiocefálico. Irregularidades parietais nos bulbos carotídeos, mais evidente à direita, sem estenoses relevantes. Destaca-se imagem linear que se projeta na luz do segmento proximal da artéria carótida interna esquerda na região do bulbo carotídeo, que pode representar membrana ("web"). Ectasia com irregularidades parietais dos segmentos cervicais distais das artérias carótidas internas, notando-se áreas de estenoses segmentares leves intercaladas com dilatações. O aspecto de imagem sugere displasia fibromuscular.  Alongamento e tortuosidade difusos das artérias vertebrais. Destacam-se irregularidades parietais com dilatações alongadas no segmento V1 da artéria vertebral direita e V2 de ambas as artérias vertebrais, de aspecto displásico. Há proeminência difusa do plexo venoso no canal vertebral à esquerda, com a artéria vertebral desse lado apresentando-se ectasiada e tortuosa até o segmento V2 distal, onde reduz de calibre. Segmento intracraniano das artérias carótidas internas de trajeto habitual e calibre preservado.  Segmento intracraniano das artérias vertebrais de trajeto e calibre preservado.  Artéria basilar de trajeto e calibre levemente reduzido devido à persistência do padrão fetal da circulação posterior bilateral.  Demais artérias intracranianas apresentando trajeto, calibre e contrastação conservados.  Padrão fetal da artéria cerebral posterior esquerda, variante anatômica. Não há evidências de aneurismas detectáveis pelo método. \nOPINIÃO:\nNão houve alterações evolutivas significativas em relação ao estudo anterior de 23/08/2018. Aspecto displásico dos segmentos cervicais distais das artérias carótidas internas, bem como das artérias vertebrais, notando-se imagem sugestiva de "web" carotídeo à esquerda. Proeminência de plexo venoso no canal vertebral esquerdo, associado a ectasia e tortuosidade do segmento V2 da artéria vertebral desse lado. A definição exata de área de fístula arteriovenosa, conforme descrito em estudo ultrassonográfico prévio, não foi possível neste estudo.'
          },
          'neo_primaria': {
            'title': 'NEOPLASIA PRIMÁRIO DO SNC, COM EFEITO DE MASSA E HIPERTENSÃO INTRACRANIANA',
            'body': 'Lesão expansiva intra-axial na alta convexidade do lobo parietal direito, com centro hipoatenuante (sugestivo de necrose/liquefação) e realce parietal periférico espesso e irregular, circundada por extensa hipoatenuação da substância branca adjacente, frontotemporoparietoccipital direita, podendo corresponder à edema e/ou extensão lesional. Mede cerca de 3,5 x 3,5 x 2,5 cm e determina efeito de massa, com apagamento dos sulcos corticais regionais, compressão sobre o ventrículo lateral direito (principalmente porção atrial e corno occipital) e desvio das estruturas da linha mediana no nível do septo pelúcido para a esquerda em cerca de 1,0 cm. Dentre os diferenciais, a hipótese de lesão primária deve ser considerada. A critério clínico, um estudo de ressonância magnética poderá trazer maiores informações.\nDilatação de aspecto globoso do corno temporal direito do ventrículo lateral deste lado. \nInsinuação uncal direita através da tenda livre cerebelar deste lado, obliterando parcialmente as cisternas da base perimesencefálica. \nHerniação subfalcina do giro do cíngulo direito para o lado contralateral. \nEctasia do complexo bainha-nervos ópticos bilaterais, achado que pode estar relacionado a algum grau de hipertensão intracraniana.'
          },
          'avc_agudo': {
            'title': 'AVC agudo',
            'body': 'Assimetria dos sulcos corticais e fissuras encefálicas frontotemporoparietais à direita, associado a tênues hipodensidades acometendo a cabeça e corpo do núcleo caudado e o putamen, assim como a região subinsular posterior, compatíveis com insulto isquêmico recente em território de artéria cerebral média de cronologia hiperaguda / aguda, acometendo inclusive seus ramos lenticuloestriados. Associa-se hiperdensidade do segmento M1 da artéria cerebral média, compatível com trombo intraluminal. Tais achados determinam leve compressão do ventrículo lateral direito.\n'
          },
          'tronco_variacao': {
            'title': 'Origem comum carótida esquerda variação',
            'body': 'Artéria carótida comum esquerda tem origem junto à origem do tronco braquiocefálico (variação anatômica).'
          },
          'ateromatose_carotid': {
            'title': 'Ateromatose carótidas sem estenoses',
            'body': 'Ateromatose nas bifurcações carotídeas, mais evidente à esquerda. Ateromatose nos segmentos intracranianos das artérias carótidas internas, basilar e vertebrais, sem caracterizar estenoses significativas. '
          },
          'alargamento_espacos': {
            'title': 'Alargamento espaços - idoso',
            'body': 'Alargamento dos sulcos corticais, fissuras inter-hemisférica e sylvianas, assim como aumento dos ventrículos laterais e III ventrículo. Cisternas da base amplas.'
          },
          'padrao_fetal': {
            'title': 'Padrão fetal',
            'body': 'Padrão fetal na circulação posterior _ (hipoplasia/agenesia de P1 com calibre normal após a confluência da artéria comunicante posterior homolateral).'
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'esclerose_multipla': {
            'title': 'Esclerose Múltipla',
            'body': 'Múltiplas lesões ovaladas de hipersinal em T2 e FLAIR na substância branca periventricular e subcortical e principalmente junto ao corpo caloso, algumas apresentando o seu maior diâmetro perpendicular à linha ependimária dos ventrículos laterais, com irregularidade e alteração de sinal na interface calososseptal. Há também lesões com o mesmo aspecto no esplênio do corpo caloso, nucleocapsulares, no tálamo esquerdo, no tronco, no cerebelo esquerdo e pedúnculos cerebelares. Algumas lesões apresentam hipossinal em T1 e FLAIR (podendo corresponder a "black holes"), supratentoriais à esquerda e pequenas nos centros semiovais. Tais lesões não apresentam realce evidente ao meio de contraste.Múltiplas lesões ovóides com hipersinal em T2 / FLAIR, várias delas com trajeto linear e perpendicular à superfície ependimária (distribuição perivenular), difusamente distribuídas pela substância branca periventricular, justacortical, mesencéfalo, ponte, bulbo, pedúnculos cerebelares bilaterais e hemisférios cerebelares, sem realce pelo meio de contraste ou efeito expansivo significativo, algumas delas com cavitações. Destaca-se ainda, entre as lesões do tronco encefálico, lesões no trajeto intraparenquimatoso dos nervos trigêmeos, com extensão aos respectivos segmentos cisternais. Aumento dos espaços liquóricos em detrimento do parênquima encéfalico. Após a administração do contraste paramagnético, não se observam impregnações anômalas. A sequência de difusão não demonstra áreas de restrição à movimentação das moléculas de água. OPINIÃO: Múltiplas lesões com hipersinal em T2/FLAR na substância branca subcortical, periventricular e infratentorial, sugestivas de doença de substrato desmielinizante. Redução volumétrica do parênquima encefálico.Múltiplas lesões ovóides com hipersinal em T2 / FLAIR, várias delas com trajeto linear, perpendiculares à superfície ependimária (distribuição perivenular) e confluentes, difusamente distribuídas pela substância branca periventricular, justacortical,ponte, pedúnculo cerebelar direito e hemisférios cerebelares, sem realce pelo meio de contraste ou efeito expansivo significativo. Algumas lesões apresentam sinal baixo em T1 ("black holes").Ectasia e alargamento sem sinais hipertensivos dos ventrículos laterais, cisternas basais, fissuras encefálicas e sulcos corticais, relacionados à atrofia do parênquima encefálico. Destaca-se acentuada atrofia do corpo caloso\nIMPRESSÃO: \nControle evolutivo de doença desmielinizante, com evidência de discreta atividade radiológica em relação ao exame anterior, sem evidência de lesões com realce ao contraste paramagnético.\n'
          },
          'meningioma_placa': {
            'title': 'MENINGIOMA EM PLACA',
            'body': 'Lesão expansiva sólida extra-axial na fossa craniana média, com ampla base de implantação dural na asa menor do esfenoide esquerdo, com sinal heterogêneo predominando isossinal em T1 e hipersinal em T2 / FLAIR, apresentando intenso realce pelo meio de contraste, delimitando pequena área de menor contrastação central. Apresenta diminutos focos de susceptibilidade magnética em correspondência as calcificações identificadas no estudo tomográfico. Mede cerca de 3,0 x 2,5 x 2,5 cm (CC x LL x AP). Determina compressão e edema vasogênico do parênquima do polo temporal esquerdo adjacente, com apagamento dos espaços liquóricos regionais. Sua base tem contato o folheto dural do seio cavernoso esquerdo, e sua porção superior desloca discretamente o segmento supraclinoideo da artéria carótida interna esquerda, que se mantém pérvia e com calibre habitual. Lesão sólida extra-axial na fossa média à esquerda, mais provavelmente representando meningioma'
          },
          'neurotoxoplasmose': {
            'title': 'NEUROTOXOPLASMOSE',
            'body': 'Múltiplas lesões com sinal heterogêneo em T1/T2, hipersinal adjcente em FLAIR,sem restrição à difusão, algumas com discreto realce periférico pelo meio de contraste, localizadas na região córtico-subcortical dos lobos frontais, parietais, occipitais e temporal direito além dos núcleos da base e dos hemisférios cerebelares. Há hipersinal periférico das lesões em T1, com marcado hipossinal nas sequencias de susceptibilidade magnética, achados que sugerem produtos da degradação da hemoglobina. Múltiplas lesões localizadas na região córtico-subcortical dos lobos frontais, parietais, occipitais e temporal direito além dos núcleos da base e dos hemisférios cerebelares, que adimitem o diagnóstico diferencial com infecções oportunísticas do sistema nervoso central(neurotoxoplasmose), não se excluindo a possibilidade de doença linfoproliferativa'
          },
          'esclerose_tuberosa': {
            'title': 'ESCLEROSE TUBEROSA',
            'body': 'Várias áreas de espessamento cortical, borramento da interface entre a substância branca e cinzenta e hipersinal em FLAIR subcortical, localizadas predominantemente nos lobos parietais, compatíveis com túberes.  Lesão nodular com isossinal em T1 e T2 e impregnação heterogênea pelo gadolionio em região subependimária junto ao forame de Monro direito, medindo 0,5 x 0,4 cm.Nódulos subependimários bilaterais nâo cacificados'
          },
          'avc_suba': {
            'title': 'ACIDENTE VASCULAR ISQUÊMICO SUBAGUDO',
            'body': 'Zona de perda tecidual com alto sinal em T2/FLAIR de sinal corticossubcortical frontotemporoparietoinsular à esquerda, com extensão para o aspecto posterior do putame e cápsula interna deste lado. Apresentam focos de hemossiderina de permeio, com realce cortical esparsos. O conjunto de achados é sugestivo de evento isquêmico subagudo e determina alargamento compensatório dos sulcos corticais regionais e da fissura sylviana esquerda. Restrição à difusão, com isossinal em T2/FLAIR e sem realce pós-contraste é observada na cabeça do núcleo caudado e aspecto anterior do putame esquerdos, sugerindo degeneração neuronal secundária. Zona de restrição à difusão, com isossinal em T2/FLAIR e sem realce pós-contraste no trato corticoespinhal esquerdo, mais provavelmente correspondente à degeneração walleriana aguda.\nControle de craniectomia esquerda, com sinais de evento isquêmico subagudo em território da artéria cerebral média esquerda, com transformação hemorrágica. Sinais de degeneração walleriana aguda, caracterizada pela restrição à difusão no trato corticoespinhal esquerdo e degeneração neuronal secundária estriatal à esquerda.\n\n'
          },
          'tu_glial': {
            'title': 'TUMOR PRIMÁRIO INTRA-AXIAL (GLIAIS)',
            'body': 'Lesão sólida expansiva no parênquima frontal direito, junto aos giros frontais médio e inferior, associada a realce paqui e leptomeníngeo, medindo cerca de 4,0 x 2,5 x 1,5 cm (CC x AP x LL). A lesão apresenta isossinal em T1 e FLAIR, predominantemente hipossinal em T2, focos de marcado hipossinal em T2* (prováveis depósitos hemáticos na correlação com a TC do dia 05/05/2013) e realce heterogêneo pós-contraste, com algumas possíveis áreas liquefeitas / necróticas de permeio, sem restrição difusional. Não há áreas de hemorragias recentes ou calcificações. Observa-se tênue e mal definida área de realce pós-contraste periférica à lesão. Destaca-se componente cístico ovalado na substância branca profunda frontal, com sinal semelhante ao do líquor e tênue realce periférico pós-contraste, medindo cerca de 1,0 cm. Ao estudo perfusional, observa-se aumento do rCBV no interior da lesão, de cerca de 2,8 vezes, sugerindo aumento da neovascularização. Associa-se edema vasogênico circunjacente frontoparietal, determinando apagamento dos sulcos corticais e fissuras encefálicas adjacentes, bem como compressão do ventrículo lateral direito e desvio contralateral das estruturas da linha mediana, de cerca de 0,3 cm ao nível do septo pelúcido.\nLesão expansiva frontal direita associada a realce paqui e leptomeníngeo, que apresenta realce heterogêneo e aumento da microvascularização periférica. Pode-se considerar as possibilidades de processo neoplásico primário intra-axial (como tumores gliais) ou processo inflamatório / infeccioso.\n'
          },
          'estenose_aqueduto': {
            'title': 'ESTENOSE AQUEDUTO CEREBRAL',
            'body': 'Aqueduto encefálico não caracterizado nos seus terços médio e inferior. IV ventrículo reduzido. Secundariamente, há alargamento do terço superior aquedutal e dilatação do sistema ventricular supratentorial, mais acentuada nos ventrículos laterais e regiões posteriores. Destaca-se assimetria, com maior volume à esquerda, onde se caracteriza herniação transemisférica e transtentorial descendente. Determina deslocamento transtentorial ascendente do mesencéfalo, que exibe sinal preservado; ântero-inferior da ponte, bulbo e cerebelo com herniação da tonsila cerebelar esquerda pelo forame magno, em 0,8 cm. Associa-se obliteração das cisternas da base e redução do ângulo clivocanal (121°; nl>150°), sem alteração de sinal. Não há edema subependimário, mas sim sinais de compressão de longa data, com acentuado afilamento do córtex e rarefação da substância branca, não sendo caracterizado parênquima nas regiões parietal mediana direita e mais extensa parieto-occipital esquerda. Na região parietal paramediana esquerda, há remodelamento da calotacraniana, com acentuado afilamento ósseo (no limite de resolução do método, a TC poderá caracterizar de forma mais adequada). Na região mediana, há pequenas veias, transósseas, indicando a possibilidade de sinus pericranii. Na região, também se caracteriza coleção nos planos superficiais, com 0,5cm de espessura, sem enchimento na fase venosa, indicando tratar-se de coleção líquida galeal.\nEstenose de aqueduto encefálico, determinando volumosa hidrocefalia, com maior volume posterior esquerdo, onde determina encefalomalácia compressiva, herniações trasnstentorial e transhemisférica e platibasia. Coleção galeal parietal paramediana esquerda (correlacionar com possível bossa), lateral a sinus pericranii.\n'
          },
          'epilepsia_negativo': {
            'title': 'AVALIAÇÃO DE EPILEPSIA - NEGAR ALTERAÇÕES',
            'body': 'Hipocampos, fórnices, corpos mamilares e amigdaloides simétricos, de morfologia e sinal conservados.'
          },
          'parry_romberg': {
            'title': 'SINDROME DE PARRY-ROMBERG',
            'body': 'A região periorbitária, supra-orbitária e frontal esquerda apresentam hipotrofia do tecido subcutâneo, associada a afilamento da calota frontal e enoftalmia homolateral. Hemiatrofia cerebral esquerda, mais evidente dos lobos frontal e temporal, bem como dos núcleos da base homolaterais. Há aumento volumétrico compensatório dos sulcos e fissuras corticais e do ventrículo lateral deste lado. O hipocampo esquerdo apresenta também dimensões reduzidas e hipersinal em FLAIR. De maneira associada nota-se também borramento da interface entre a substância branca e cinzenta do polo temporal deste lado. Focos de hipersinal em T2 e FLAIR na substância branca dos hemisférios cerebrais, mais evidentes à esquerda, inespecíficos. Hipotrofia do tecido subcutâneo da região periorbitária, supra-orbitária e frontal e afilamento da calota frontal e enoftalmia à esquerda, compatível com síndrome de Parry-Romberg. Hemiatrofia cerebral esquerda, incluindo o hipocampo.'
          },
          'chiari_i': {
            'title': 'CHIARI I ',
            'body': 'Sinais de invaginação vertebrobasilar associado à redução da amplitude da cisterna magna e compressão sobre a transição pontobulbar. Há ainda platibasia, hipoplasia do clivus e assimilação atlanto-occipital bilateral.\nRedução volumétrica do vérmis e dos hemisférios cerebelares, com insinuação anterior das tonsilas cerebelares e aumento dos espaços liquóricos da fossa posterior de aspecto compensatório.\nAlterações morfológicas da transição craniocervical, notando-se sinais de platibasia, hipoplasia do clivus e invaginação vertebrobasilar, com o processo odontoide ultrapassando a linha de Chamberlain em cerca de 2,3 cm. Determina compressão sobre a transição pontobulbar. Fossa posterior de dimensões reduzidas, notando-se insinuação das tonsilas cerebelares pelo forame magno em cerca de 1,0 cm. Determina redução do espaço liquóricos regionais, notando-se cavidade hidrossiringomiélica na transição bulbocervical e na medula cervical, descrita em detalhes no estudo de RM da coluna cervical. Alargamento focal de espaço liquórico retrocerebelar à esquerda, determinando leve impressão sobre o verme cerebelar e sobre a calota craniana adjacente, podendo representar cisto de aracnoide.'
          },
          'heterotopia': {
            'title': 'HETEROTOPIA ',
            'body': 'Focos nodulares periventriculares com isossinal à substância cinzenta, sem realce pós-contraste, representando heterotopia periventricular, com predomínio posterior bilateral, exceto pelo maior deles, que é frontal esquerdo e determina distorção da morfologia periependimária, com compressão do corno anterior deste lado.'
          },
          'cisto_aracnoide': {
            'title': 'CISTO DE ARACNÓIDE',
            'body': 'Alargamento do espaço liquórico na fossa craniana média esquerda com discreto efeito compressivo sobre pólo temporal ipsilateral, sem alteração do sinal do parênquima, medindo 3,4 x 2,3 x 2,6 cm (LL x AP x CC), com aspecto de cisto aracnóide.\nFormação expansiva extra-axial com sinal semelhante ao liquórico localizada no aspecto anterior da fossa craniana média esquerda, sem impregnação pelo meio de contraste ou restrição à difusão das moléculas hídricas, medindo cerca de 3,9 x 3,8 cm no plano axial, determinando leve retificação dos giros corticais do pólo temporal e discreta remodelação óssea, compatível com cisto de aracnoide. '
          },
          'ulegiria': {
            'title': 'ULEGIRIA (alteração sequelar cortical de insulto neonatal não prematuro)',
            'body': 'Áreas bilaterais de afilamento dos giros perirrolândicos, de forma mais acentuada á esquerda, com perda tecidual corticossubcortical, com predomínio do fundo dos sulcos e alargamento dos espaços liquóricos adjacentes, de aspecto sequelar (ulegiria). Associa-se hipersinal em T2/FLAIR da substância branca subcortical e periventricular subjacente, sem efeito expansivo, sugestivas de gliose.\nÁreas semelhantes com aspecto de ulegiria são caracterizadas nos lóbulos paracentrais, giros do cíngulo, ínsula posterior, lobos occipitais e naa porção posterior dos giros temporais superiores, acometendo os giros temporais transversos (Heschl).'
          },
          'adenoma_hipofise': {
            'title': 'ADENOMA DE HIPÓFISE',
            'body': 'Adeno-hipófise apresentando nódulo caracterizado por baixo sinal em T1 e T2 e hipocontrastação pelo meio de contraste paramagnético, localizado à esquerda, medindo 1,1 x 0,9 x 0,6 cm (AP x LL x CC). '
          },
          'hipot_liquor': {
            'title': 'ESPESSAMENTO PAQUIMENÍNGEO (por hipotensão liquórica)',
            'body': 'Permanece estável o acentuado espessamento e realce difuso da paquimeninge, inespecífico, que pode representar redução da pressão liquórica.'
          },
          'dnet': {
            'title': 'DNET/TUMOR NEURONAL VACUOLAR MULTINODULAR',
            'body': 'Lesão cortical/subcortical de aspecto multicístico nos giros frontais superior e médio à direita, com sinal predominantemente alto em T2/FLAIR, sem realce ou efeito expansivo, preservando a arquitetura do parênquima. Destaca-se  componente com trajeto linear até a superfície ependimária.'
          },
          'meta_ponte': {
            'title': 'METÁSTASE NA PONTE DE TUMOR',
            'body': 'Surgiu lesão expansiva na porção anterolateral direita da ponte com extensão ao pedúnculo cerebral direito, com isossinal em T2/FLAIR e baixo sinal em T1, intenso realce heterogêneo pelo meio de contraste, com alguns focos de restrição a difusão das moléculas de água e produtos de deradação da hemoglobina, suspeita para acometimento secundário da doença de base. Apresenta extenso edema perilesional que se estende aos pedúnculos cerebelares, ao hemisférios cerebelares, ao mesencéfalo, ao tálamo e a região núcleo-capsular direitos, bem como se estende inferiormente ao longo do trato piramidal direito até o nível da pirâmide bulbar deste lado. Mede 2,2 x 1,9 x 1,7 cm. Esses achados determinam obliteração da cisterna pré-pontina à direita.\nSurgiram outras duas lesões também suspeitas para acometimento secundário da doença de base, apresentando realce periférico pelo meio de contraste, sem edema perilesional significativo, nos giros pós-centrais, medindo 1,2 x 1,1 x 0,9 cm à esquerda e 0,8 x 0,4 x 0,6 cm à direita. Nota-se outra lesão de menores dimensões na transição corticossubcortical do giro frontal superior esquerdo, com cerca de 0,7 cm no seu maior eixo axial.'
          },
          'realce_cortical': {
            'title': 'REALCE CORTICAL - CEREBRITE OU DISSEMINAÇÃO DA DOENÇA DE BASE (CA DE MAMA)',
            'body': 'Surgiu pequena área de hipersinal em T1 e T2 / FLAIR no córtex do polo occipital direito que apresenta tênue impregnação pelo meio de contraste e aparente restrição a difusão, sem efeito expansivo local significativo, associada à área de alteração de sinal em T2/FLAIR no parênquima adjacente podendo representar edema vasogênico. Nota-se o surgimento de outro pequeno com característica semelhantes, porém de menores dimensões, insular justacortical à esquerda, de provável mesma etiologia. Entre os diagnósticos diferenciais, deve-se incluir a possibilidade de disseminação da doença de base e processo inflamatório / infeccioso (cerebrite). Correlacionar com dados de análise laboratorial liquórica. '
          },
          'avc_subagudo_lam': {
            'title': 'ÁREA DE AVC SUBAGUDO TARDIO/ CRÔNICO COM SINAIS DE NECROSE CORTICAL LAMINAR',
            'body': 'Permanece praticamente inalterada a extensão da área de alteração de sinal corticossubcortical na região frontoparietotemporoinsular direita caracterizada por hipersinal em T2/FLAIR, que se estende ao centro semioval e à região nucleocapsular deste lado (território vascular da artéria cerebral média). Houve acentuada redução da restrição à difusão deste área, bem como o aparecimento dos sinais de necrose cortical laminar e da impregnação cortical pelo meio de contraste. Esta área exerce discreto efeito atrófico neste estudo caracterizado por acentuação dos sulcos e fissuras regionais, bem como por tênue ectasia compensatória do ventrículo lateral direito. Esses achados são compatíveis com evolução habitualmente esperada de insulto isquêmico na fase subaguda tardia / crônica no território da a. cerebral média direita.'
          },
          'meningioma_seio_cav': {
            'title': 'Meningioma de parede lateral do seio cavernoso E.',
            'body': 'Lesão expansiva, extra-axial, que apresenta realce pelo meio de contraste paramagnético, com base de implantação dural junto ao seio cavernoso esquerdo, com extensão à tenda cerebelar adjacente, e que mede de cerca de 2,6 x 1,9 cm em seus maiores eixos transversos. Esta lesão determina efeito compressivo sobre o hipocampo e pólo temporal adjacentes, com discreto hipersinal na ponderação T2/FLAIR.'
          },
          'ependimona_quarto': {
            'title': 'Ependimoma do IV ventrículo',
            'body': 'Lesão expansiva predominantemente sólida múltiplas áreas císticas e pontos de deposição hemática de permeio localizada na parede do IV ventrículo. Mede cerca de 4,7 x 4,2 x 5,8 cm ( T x AP x L). a lesão se protui através dos forames de Luscha e Magendie. Seu limite inferior ultrapassa o forame magno, estando aproximadamente cerca de 0,9 cm abaixo do arco posterior de C1. Lateralmente ocupa a cisterna cerebelo pontina, aparentemente envolve a artéria cerebelar posterior inferior esquerda, e seus limites são indistindos do trajeto cisternal do IX, XI, XII e VI, tangenciando o limite inferior do V par deste lado. Adentra o conduto auditivo interno esquerdo e o canal do hipoglosso, e abaula o limite medial do bulbo jugular deste lado. Ao estudo de perfusão observam-se áreas de discreto aumento da perfusão ( aumento de até 1,7 o valor do parâmetro relativo à volume sanguíneo regional em relação à área homóloga contralateral). \nTal lesão determina dilatação de aspecto hipertensivo do sistema ventricular a montante, com sinais de transudação liquórica na substância branca periventricular. '
          },
          'neurocisticercose': {
            'title': 'Neurocisticercose',
            'body': 'Lesão expansiva intra-axial corticossubcortical no giro frontal superior esquerdo. Apresenta realce fino e periférico pelo meio de contraste, com tênue restrição à difusão nesta topografia. Apresenta componente cístico/liquefeito, com facilitação da difusão das moléculas de água. Mede 3,2 x 2,1 x 2,2 cm (AP x LL x CC). Há extenso hipersinal em T2/FLAIR circunjacente, podendo representar edema ou infiltração. Apresenta pequeno foco de susceptibilidade magnética e hipersinal em T1 de permeio, que pode corresponder a calcificação / deposição de resíduos hemáticos. O conjunto dos achados determina apagamento dos demais sulcos corticais regionais, compressão e deslocamento inferior e posterior do corno anterior do ventrículo lateral esquerdo, com apagamento da fissura cerebral e discreta insinuação contralateral do cíngulo esquerdo.\nOpinião: Formação expansiva cística e com realce periférico no giro frontal superior esquerdo, com com edema circunjacente associado a outro foco justacortical de possível calcificação. Entre os diferenciais, considerar a possibilidade de neurocisticercose em diferentes fases de evolução. Outras possibilidades como neoplasias glioneurais (ganglioglioma, tumor glioneural papilar), DNET e menos provavelmente astrocitoma pilocítico participam dos diagnósticos diferenciais.'
          },
          'chiari_hidroseringo': {
            'title': 'Chiari I e Hidroseringomielina',
            'body': 'Alterações morfológicas da transição craniocervical, notando-se sinais de platibasia, hipoplasia do clivus e invaginação vertebrobasilar, com o processo odontoide ultrapassando a linha de Chamberlain em cerca de 2,3 cm. Determina compressão sobre a transição pontobulbar. Fossa posterior de dimensões reduzidas, notando-se insinuação das tonsilas cerebelares pelo forame magno em cerca de 1,0 cm. Determina redução do espaço liquóricos regionais, notando-se cavidade hidrossiringomiélica na transição bulbocervical e na medula cervical, descrita em detalhes no estudo de RM da coluna cervical.Alargamento focal de espaço liquórico retrocerebelar à esquerda, determinando leve impressão sobre o verme cerebelar e sobre a calota craniana adjacente, podendo representar cisto de aracnoide.\n'
          },
          'pos_op': {
            'title': 'LAUDO PÓS OPERATÓRIO NEOPLASIA ENCÉFALO - NEUROCIRURGIA ',
            'body': 'Exame controle. A análise comparativa com o estudo tomográfico de 03/05/2018 evidencia: \nSimilar a cavidade cirúrgica corticossubcortical têmporo-occipital direita, em contiguidade com o átrio ventricular, preenchida por conteúdo com sinal similar ao do líquor, sem realce significativo das suas bordas. Destacam-se alguns focos puntiformes de calcificações e depósitos de hemossiderina em suas bordas. \nPermanecem as áreas de encefalomalácia / gliose corticossubcorticais no remanescente do lobo occipital direito, compatível com evolução esperada de insulto isquêmico, de aspecto sequelar, com redução da restrição à difusão. Entretanto, o estudo atual permitiu identificar com maior conspicuidade o realce anormal leptomeníngeo preenchendo os sulcos do remanescente do lobo occipital direito, que pode resultar de processo inflamatório/infeccioso ou de disseminação liquórica da lesão de base, no contexto clínico apropriado.\nAmpliação dos espaços liquóricos intracranianos, com moderada dilatação das demais porções dos ventrículos supratentoriais, persistindo a acentuada redução volumétrica das estruturas da fossa posterior infratentorial. \nCraniectomia parietal direita, com interposição de material de cranioplastia e alterações fibrocicatriciais nas partes moles extracranianas sobrejacentes. Novamente observa-se espessamento e realce dural adjacente à craniotomia, de aspecto reparativo. \nFocos de hipersinal em T2 e FLAIR na substância branca dos centros semiovais e coroas radiadas, bem como no esplênio do corpo caloso, inespecíficos, podendo corresponder a leucoencefalopatia actínica ou mesmo edema vasogênico / infiltração. Alterações de sinal semelhantes são também vistas no segmento medial do lobo temporal direito, com mínimo efeito tumefativo, podendo resultar de edema vasogênico / infiltração lesional.  \nÁreas de encefalomalácia / gliose corticossubcorticais paravermianas e nas periferias dos hemisférios cerebelares. Alteração de sinal das escamas ósseas da calota craniana. \nSinais de degeneração walleriana do tracto corticospinal direito caracterizada por afilamento do pedúnculo cerebral homolateral. \nNão foram observadas alterações evolutivas relevantes em comparação com o estudo tomográfico de referência respeitando-se as diferenças técnicas e de sensibilidade entre os dois métodos. \nObs.: Material sugestivo de secreção residual preenchendo algumas células da mastoide direita. '
          },
          'hpn': {
            'title': 'Possível HPN',
            'body': 'Proeminência das cisternas basais, fissuras encefálicas e dos sulcos entre os giros corticais e as folia cerebelares. Destaca-se menor evidência do espaço liquórico na alta convexidade e aprisionamento liquórico na profundidade de alguns sulcos corticais. \n\nDesproporção entre os espaços liquóricos da convexidade e a dilatação ventricular, com ângulo calosal limítrofe. Em contexto clínico adequado pode estar relacionada à hidrocefalia crônica intermitente do adulto, anteriormente denominada hidrocefalia de pressão normal (HPN).\n\n'
          },
          'meningioma': {
            'title': 'Meningioma',
            'body': 'Lesão expansiva sólida extra-axial na fossa craniana média, com ampla base de implantação dural inferior, com sinal heterogêneo predominando isossinal em T1 e iso / hipossinal em T2 / FLAIR, com rima liquórica nítida em aquisição coronal T2, apresentando intenso realce predominantemente homogêneo pelo meio de contraste, delimitando pequena área de menor contrastação central, com hipersinal em T2 / FLAIR. Mede cerca de  3,4 x 4,0 x 2,8 cm (LL x AP x CC). Determina compressão e edema vasogênico do parênquima do polo temporal esquerdo adjacente, com apagamento dos espaços liquóricos regionais. Sua base tem contato com o folheto dural da fossa craniana média. Desloca superomedialmente o lobo temporal, determinando herniação transtentorial descendente mesial / uncal. Abaula o ventrículo lateral esquerdo, com desvio das estruturas da linha mediana para a direita em cerca de 0,4 cm ao nível so septo pelúcido.\n\nLesão sólida extra-axial na fossa média à esquerda, mais provavelmente representando meningioma, com efeito expansivo e sinais de herniação uncal. \n\n'
          },
          'sequelares': {
            'title': 'SEQUELARES',
            'body': 'Áreas focais corticossubcortical de hipersinal em T2/FLAIR nas porções mediais dos polos occipitais bilateralmente, de aspecto sequelar.\nLacunas nos tálamos, bilateralmente, e na ponte.\nÁrea de hipersinal em T2/FLAIR na periferia / região cortical do hemisfério cerebelar direito, observando-se realce giriforme ao contraste paramagnético, podendo representar foco de isquemia subaguda.\nFoco puntiforme de restrição difusional no centro semioval direito, sugestivo de isquemia lacunar aguda.\nFocos de hipersinal em T2 esparosos no cerebelo, que podem corresponder a áreas de gliose sequelar.\nFocos de hipersinal em T2/FLAIR na substância branca periventricular, dos centros semiovais e subcortical, inespecíficos, mais frequentemente associados a gliose/microangiopatia.\nAlargamento difuso dos sulcos corticais e fissuras encefálicas.\nAlargamento do sistema ventricular supratentorial, que pode ser compensatório, não sendo possível descartar a hipótese de dilatação crônica por distúrbios da dinâmica liquórica. '
          },
          'siderose': {
            'title': 'SIDEROSE / HSA',
            'body': 'Extensas áreas de baixo sinal em SWAN recobrindo a superfície do cerebelo, tronco encefálico e os sulcos corticais supratentoriais, difusamente, devendo-se considerar a hipótese de hemorragia subaracnoidea e/ou siderose superficial.'
          },
          'aneurisma': {
            'title': 'ANEURISMA',
            'body': 'Dilatação aneurismática sacular na topografia da artéria cerebelar anteroinferior esquerda, na cisterna prepontina à esquerda, com orientação superior e anterior, medindo 1,3 x 0,6 x 0,6, com colo estreito. '
          },
          'schw_acustico': {
            'title': 'SCHWANNOMA DO ACÚSTICO',
            'body': 'Formação expansiva extra-axial localizada no ângulo pontocerebelar direito, na topografia do nervo vestibulococlear, com componente no interior do canal auditivo interno, cócela e vestíbulo deste lado. Mede cerca de 2,2 x 1,0 cm. Exibe iso/hipossinal em T1, hipersinal em T2/FLAIR, realce heterogêneo intenso ao meio de contraste e sem restrição à difusão. Além disso exibe focos de hipossinal na sequência de susceptibilidade magnética compatíveis com resíduos hemáticos (hemossiderina). Tal formação promove obliteração da cisterna pontocerebelar direita e leve impressão sobre o pedúnculo cerebelar médio direito, sem edema do parênquima cerebelar adjacente. Faz contato com o nervo trigêmio direito junto a sua entrada na ponte.'
          },
          'esclerose_mesial': {
            'title': 'Esclerose Mesial Temporal',
            'body': 'Redução volumétrica e alteração de sinal na formação hipocampal direita, que pode representar esclerose mesial temporal, devendo ser correlacionado com dados clínicos e eletroencefalográficos.  '
          },
          'placas_angio': {
            'title': 'Placas - Angio RM',
            'body': 'Múltiplas irregularidades nos contornos dos segmentos cavernosos e supraclinoideos das artérias carótidas internas, por presumíveis placas ateromatosas, determinando estenoses moderadas e acentuadas, notadamente à esquerda. '
          },
          'avc_fronteira': {
            'title': 'AVC - Territórios de Fronteira',
            'body': 'Áreas corticossubcorticais de restrição à difusão occipital lateral à esquerda e na substância branca profunda da coroa radiada frontal deste lado, apresentando hipersinal em T2/FLAIR,  compatíveis com insultos isquêmicos recentes em territórios de fronteiras vasculares cortical posterior e interna, respectivamente. Associa-se discreto efeito tumefativo, notando-se leve apagamento dos sulcos corticais locorregionais. Outros pequenos focos de alto sinal na difusão periventricular junto ao corpo do ventrículo lateral direito e na cabeça da formação hipocampal esquerda, sem nítida representação no mapa ADC, prováveis insultos isquêmicos recentes em território de artérias lenticuloestriadas à direita. Considerar a possibilidade de mecanismo emboligênico e/ou hipoperfusão cerebral.'
          },
          'papiloma': {
            'title': 'Papiloma de Plexo Coroide',
            'body': ' Lesão expansiva intraventricular centrada no assoalho do IV ventrículo, amoldando-se aos seus contornos, medindo 3,0 x 2,9 x 2,1 cm. Tem margens lobulados e sinal heterogêneo, com aparentes microcistos, tênues focos de hipossinal na sequência de suscetibilidade magnética, relacionados a presença de calcificações e intenso realce pelo meio de contraste, sem restrição à difusão das moléculas de água. '
          },
          'chiari_ii': {
            'title': 'Chiari II ',
            'body': ' Fossa craniana posterior de dimensões reduzidas, com rebaixamento da tórcula, discreta anteriorização dos hemisférios cerebelares e insinuação inferior do óbex e das tonsilas cerebelares através do forame magno em 0,7 cm.  Corpo caloso difusamente afilado, não sendo caracterizado o esplênio, compatível com disgenesia. Proeminência da aderência inter-talâmica. Áreas de alteração de sinal na substância branca periventricular frontal bilateral, com focos de marcado hipossinal em SWAN, podendo representar resíduos hemáticos ou calcificações. Moderada dilatação do sistema ventricular supratentorial, de aspecto colpocefálico, sem sinais hipertensivos. Aqueduto mesenefálico pérvio, com calibre reduzido.'
          },
          'wallenberg': {
            'title': 'Wallenberg - AVCi',
            'body': 'Zona de alteração de sinal no aspecto dorsolateral direito do bulbo, caracterizada por hipersinal em T2/FLAIR e restrição à difusão, compatível com evento isquêmico agudo no território da artéria cerebelar posteroinferior direita.'
          },
          'cavernoma': {
            'title': 'Cavernoma',
            'body': 'Lesão com sinal heterogêneo em T1 e T2, com de halo de hipossinal na sequência de susceptibilidade, sem realce significativo pós contraste nos giro temporal inferior/médio à direita. Não há realce pós contraste e efeito expansivo local significativo. Mede 0,6 x 0,5 cm nos maiores diâmetros axiais. O aspecto de imagem é compatível com malformação cavernomatosa (cavernoma)'
          },
          'siringohidromielia': {
            'title': 'Siringohidromielia',
            'body': ' Houve acentuado aumento das dimensões e extensão da siringomielia, bem como do edema medular que estende-se até a transição cérvico-torárica. Surgimento de realce nas margens das cavidades seringomiélicas da região torácica alta, que pode ser apenas reacional ao sangramento ou representar disseminação tumoral. Há material com hipossinal em T2 no canal ependimário central entre D6-D7, D9-D10 e D11-D12 devendo representar derivados hemáticos. A alteração de sinal no cone medular persiste de aspecto semelhante'
          }
        }
      },
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      }
    }
  },
  'cep': {
    'metadata': {
      'specialty_name': 'cep'
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'artefatos': {
            'title': 'ARTEFATOS',
            'body': 'Material metálico dentário determina artefatos que limitam a avaliação de algumas imagens.\nArtefatos de movimentação prejudicam a avaliação de algumas imagens.'
          },
          'preenchimento': {
            'title': 'Preenchimento estético',
            'body': 'Material hiperatenuante nas regiões nasogenianas e infrazigomáticas, com padrão de distribuição simétrico, sugestivo de material de preenchimento.  '
          },
          'degenera': {
            'title': 'Alterações degenerativas',
            'body': 'Alterações degenerativas da coluna cervical.Alterações degenerativas das articulações temporomandibulares.\nAlterações degenerativas osteoarticulares, inclusive das articulações temporomandibulares.\nOssificação dos ligamentos estilo-hióideos. '
          },
          'fratura_face': {
            'title': 'FRATURAS DE FACE',
            'body': 'Fratura cominutiva da lâmina papirácea direita, com extensão ao trabeculado etmoidal e posteriormente às paredes dos seios esfenoidais. Há avulsão de alguns fragmentos ósseos para a gordura extra-conal deste lado, um deles mantendo contato/proximidade com o músculo reto medial. Fratura do osso nasal e do septo nasal, sem desalinhamento significativo. Hemossinus. \n\nFratura transversal no osso frontal na linha média com orientação superior e lateral para esquerda, com extensão para a parede posterior do seio frontal esquerdo, onde se observa pneumoencéfalo. Associa-se ainda hematoma subgaleal e enfisema de partes moles suprajacente à fratura, gás na gordura extra-conal da órbita direita e hemossinus nos seios frontais, células etmoidais e seio maxilar esquerdo. \n\nDensificação dos planos mioadiposos da região frontal esquerda associado à focos de enfisema de partes moles, com extensão para a pálpebra superior deste lado. Nota-se pequeno hematoma subgaleal na região parietal direita. '
          },
          'fratura_temp': {
            'title': 'FRATURA OSSO TEMPORAL:',
            'body': 'Fratura transversa da mastoide direita que compromete as seguintes estruturas: forame jugular, canal carotídeo, canais semicirculares superior e posterior, vestíbulo, canal do nevo facial (porção timpânica), espira basal coclear, janelas oval e redonda, canal petromastoideo e aqueduto vestibular.'
          },
          'tumor_marrom': {
            'title': 'TUMOR MARROM',
            'body': 'Lesão expansiva osteolítica com importante componente de partes moles e intenso realce pelo meio de contraste acometendo a maxila anterior à esquerda, com pequena extensão mediana. Envolve predominantemente o processo alveolar, com erosão das suas corticais palatina e vestibular, e com envolvimento do canal incisivo e dos dentes incisivos centrais e laterais de ambos os lados, canino, segundo pré-molar e primeiro molar esquerdos; o primeiro pré-molar superior esquerdo não é caracterizado. Há extensão da lesão para o processo palatino da maxila, com focos de erosão óssea nos assoalhos da fossa nasal e do seio maxilar à esquerda e pequenos componentes que se insinuam para o interior dessas estruturas. Observa-se também espessamento e densificação dos planos de partes moles regionais. A lesão mede cerca de 4,1 x 3,4 x 3,5 cm (LL x AP x CC). O contexto clínico favorece a hipótese de tumor marrom entre os diferenciais.'
          },
          'periapicopatia': {
            'title': 'Periapicopatia - DENTES',
            'body': '\nPeriapicopatia de alguns elementos dentários da arcada (inferior/superior).\nPeriodontopatia de alguns elementos dentários da arcada (inferior/superior).'
          },
          'cavita': {
            'title': 'Cavitações - DENTES',
            'body': 'Cavitações em alguns elementos dentários'
          },
          'edentulismo': {
            'title': 'Edentulismo - DENTES',
            'body': 'Edentulismo e afilamento difuso do processo alveolar da maxila\n\nEdentulismo parcial com áreas de afilamento do processo alveolar da maxila e mandíbula e sinais de periapicopatia de alguns elementos dentários remanescentes.\n\n'
          },
          'insinuacao_raiz': {
            'title': 'Insinuação raiz - DENTES',
            'body': 'Insinuação das raízes dos molares superiores no assoalho dos seios maxilares.'
          },
          'cisto_dente': {
            'title': 'Cisto periapical - DENTES',
            'body': 'Cisto periapical relacionado à raiz vestibular do I molar superior direito com descontinuidade do assoalho do antro maxilar adjacente, que exibe espessamento do revestimento mucoso, não sendo possível afastar a possibilidade de sinusopatia maxilar direita de natureza odontogênica neste contexto.'
          },
          'cemento_dente': {
            'title': 'LESÃO CEMENTO-ÓSSEA',
            'body': 'Lesão hiperatenuante de margens circunscritas e contornos lobulados, envolto por halo hipoatenuante, localizada no corpo mandibular à direita, anteriormente ao molar remanescente, medindo 1,4 x 1,2 x 1,2 cm (volume estimado de 1 cc), com abaulamento das corticais lingual e vestibular, podendo corresponder à lesão de natureza cemento-óssea, com baixa agressividade radiológica.'
          },
          'septo_nasal': {
            'title': 'SEPTO NASAL',
            'body': 'Septo nasal desviado para a (esquerda/direita), com esporão ósseo para (o mesmo lado/o lado oposto), que (toca/remodela) a concha nasal (média/inferior) deste lado.Septo nasal sinuoso, com sua porção posterior desviada para a (esquerda/direita) e sua porção anterior desviada para a (esquerda/direita).Perfuração do septo cartilaginoso por uma extensão de.'
          },
          'variacoes1': {
            'title': 'Fóveas etmoidais - VARIAÇÕES ANATÔMICAS',
            'body': 'Fóveas etmoidais assimétricas, mais baixa à (direita/esquerda).'
          },
          'variacoes2': {
            'title': 'Onodi - VARIAÇÕES ANATÔMICAS',
            'body': 'Célula de Onodi (bilateral/à direita/à esquerda).'
          },
          'variacoes3': {
            'title': 'Haller - VARIAÇÕES ANATÔMICAS',
            'body': 'Célula de Haller (bilateral/à direita/à esquerda).'
          },
          'variacoes4': {
            'title': 'Etmoidomaxilar - VARIAÇÕES ANATÔMICAS',
            'body': 'Célula etmoidomaxilar (bilateral/à direita/à esquerda).'
          },
          'variacoes5': {
            'title': 'intersinus frontal - VARIAÇÕES ANATÔMICAS',
            'body': 'Célula intersinus frontal com drenagem à (direita/esquerda).'
          },
          'variacoes6': {
            'title': 'Agger nasi - VARIAÇÕES ANATÔMICAS',
            'body': 'Célula agger nasi com drenagem à (direita/esquerda).'
          },
          'variacoes7': {
            'title': 'Ostioo acessorio - VARIAÇÕES ANATÔMICAS',
            'body': 'Óstio de drenagem acessório do seio maxilar (direito/esquerdo).'
          },
          'variacoes8': {
            'title': 'Bual etmoidal globosa - VARIAÇÕES ANATÔMICAS',
            'body': 'Bula etmoidal globosa à (direita/esquerda).'
          },
          'variacoes9': {
            'title': 'Pneumatização parcial - VARIAÇÕES ANATÔMICAS',
            'body': 'Pneumatização (parcial) do processo uncinado (direito/esquerdo).'
          },
          'variacoes10': {
            'title': 'Pneumatização lamela vertical - VARIAÇÕES ANATÔMICAS',
            'body': 'Pneumatização da lamela vertical da concha nasal média (direita/esquerda).'
          },
          'variacoes11': {
            'title': 'Concha media bolhosa - VARIAÇÕES ANATÔMICAS',
            'body': 'Concha nasal média (direita/esquerda) bolhosa.'
          },
          'variacoes12': {
            'title': 'Curvatura paradoxal - VARIAÇÕES ANATÔMICAS',
            'body': 'Curvatura paradoxal das conchas nasais médias.'
          },
          'variacoes13': {
            'title': 'Pneumatização recessos laterais - VARIAÇÕES ANATÔMICAS',
            'body': 'Pneumatização dos recessos laterais do seio esfenoidal.'
          },
          'variacoes14': {
            'title': 'Pneumatização processo alveolar- VARIAÇÕES ANATÔMICAS',
            'body': 'Extensão da pneumatização dos seios maxilares para o processo alveolar da maxila.'
          },
          'variacoes15': {
            'title': 'Pneumatização forame etmoidal - VARIAÇÕES ANATÔMICAS',
            'body': 'Extensão da pneumatização das células etmoidais superiormente ao forame etmoidal anterior (direito/esquerdo)'
          },
          'variacoes17': {
            'title': 'Pneumatização clinoides - VARIAÇÕES ANATÔMICAS',
            'body': 'Pneumatização dos processos clinóides (anterior/posterior) (direito/esquerdo).'
          },
          'variacoes18': {
            'title': 'Pneumatização crista galli- VARIAÇÕES ANATÔMICAS',
            'body': 'Crista galli parcialmente pneumatizada. '
          },
          'variacoes19': {
            'title': 'Hipopneumatização - VARIAÇÕES ANATÔMICAS',
            'body': 'Hipopneumatização do seio .... (direito/esquerdo).'
          },
          'variacoes20': {
            'title': 'Inserção septo esfenoidal - VARIAÇÕES ANATÔMICAS',
            'body': 'Inserção do septo esfenoidal anteriormente ao canal carotídeo (direito/esquerdo).'
          },
          'variacoes21': {
            'title': 'Deiscência canal óptico - VARIAÇÕES ANATÔMICAS',
            'body': 'Deiscência  do canal óptico (direito/esquerdo).'
          },
          'variacoes22': {
            'title': 'Deiscência canal carotídeo - VARIAÇÕES ANATÔMICAS',
            'body': 'Deiscência do canal carotídeo (direito/esquerdo).'
          },
          'osteoma': {
            'title': 'Osteoma',
            'body': 'Pequeno osteoma em célula etmoidal (anterior/posterior) à (direita/esquerda), (não) obstrutivo, com ... cm.'
          },
          'espessamento': {
            'title': 'Espessamento do revestimento mucoso',
            'body': 'Acentuação/proeminência do componente mucoso das cavidades nasais.\n\nAcentuação/proeminência do componente mucoso dos cornetos nasais (inferiores/médios/superiores.\n\nEspessamento do revestimento mucoso do seio .... (direito/esquerdo).\n\nEspessamento do revestimento mucoso do seio .... (direito/esquerdo), associado a secreção bolhosa que forma nível líquido, achados que, em contexto clínico compatível, podem representar componente inflamatório agudo/agudizado. \n\nEspessamento do revestimento mucoso do seio .... (direito/esquerdo), associado a esclerose difusa de suas paredes ósseas, achados sugestivos de sinusopatia inflamatória crônica.\n\nPreenchimento de algumas células do trabeculado etmoidal por material com atenuação de partes moles.\n\nEspessamento do revestimento mucoso dos seios paranasais.\n\nEspessamento do revestimento mucoso de todas as cavidades paranasais, com cistos de retenção/pólipos esparsos, mais proeminentes nos seios ... \n\nEspessamento do revestimento mucoso do seio .... (direito/esquerdo) que adquire, por vezes, contornos arredondados, podendo corresponder a pólipo/cisto de retenção.\n\nEspessamento do revestimento mucoso das cavidades nasais, com aspecto lobulado no meato nasal (superior/médio/inferior) (direito/esquerdo), admitindo diferencial com formação polipoide. \n\nEspessamento e esclerose das paredes ósseas com calcificações de permeio ao espessamento do revestimento mucoso no seio maxilar esquerdo, denotando processo inflamatório crônico. \n\nObliteração dos (infundíbulos/recessos frontais/esfenoetmoidais) por componente mucoso/muco.'
          },
          'polipose': {
            'title': 'POLIPOSE NASOSSINUSAL',
            'body': 'Preenchimento total dos seios (esfenoidais, frontais e das células etmoidais e dos seios maxilares), por material hipoatenuante que apresenta contornos lobulados e preenche também as cavidades nasais. Determina remodelamento e adelgaçamento do trabeculado etmoidal, bem como obliteração e alargamento das respectivas vias de drenagem. O conjunto dos achados é sugestivo de polipose nasossinusal. Seios frontais e etmoidais preenchidos por material hipoatenuante com focos hiperatenuantes de permeio, que representam secreção hiperproteica, que oblitera e alarga as  respectivas vias de drenagem, estendendo-se às fossas nasais, compatível com polipose rinossinusal.Espessamento difuso do revestimento mucoso das cavidades paranasais, com contornos por vezes lobulados. Material com atenuação de partes moles preenche parcialmente os seios frontal e esfenoidal esquerdo e células etmoidais, com aparente abaulamento das lâminas papiráceas. Material de aspecto semelhante oblitera e alarga as vias de drenagem sinusal e insinua-se para as fossas nasais, obliterando principalmente os meatos superiores e médios. O conjunto de achados pode corresponder a polipose nasossinusal.'
          },
          'polipo_antro': {
            'title': 'PÓLIPO ANTROCOANAL',
            'body': 'Conteúdo com atenuação de partes moles preenche os seios ......, oblitera e alarga as respectivas vias de drenagem e o conteúdo no seio maxilar esquerdo também se estende para a fossa nasal do mesmo lado, obliterando-a parcialmente, não se podendo descartar a possibilidade de pólipo antrocoanal. Nota-se material hiperatenuante de permeio nos seios maxilares, possível secreção desidratada.'
          },
          'sinusite_odonto': {
            'title': 'SINUSITE ODONTOGÊNICA',
            'body': 'Edentulismo parcial superior e inferior, com afilamento variável do processo alveolar da maxila e foco de  descontinuidade do assoalho do recesso alveolar do seio maxilar direito, medindo 0,55 cm, revestida por material com atenuação de partes moles, que exibe espessamento do revestimento mucoso e secreção aerada no seu interior, não sendo possível afastar a possibilidade de sinusopatia maxilar direita odontogênica.\n\nCisto periapical relacionado à raiz vestibular do I molar superior direito com descontinuidade do assoalho do antro maxilar adjacente, que exibe espessamento do revestimento mucoso, não sendo possível afastar a possibilidade de sinusopatia maxilar direita de natureza odontogênica neste contexto.'
          },
          'seio_silencioso': {
            'title': 'SÍNDROME DO SEIO SILENCIOSO',
            'body': 'Seio maxilar esquerdo hipoplásico, com esclerose e afilamento das suas paredes ósseas, sendo completamente preenchido por secreção com atenuação de partes moles e com atelectasia do infundíbulo, além de enoftalmia à esquerda, achados compatíveis com síndrome do seio silencioso.'
          },
          'papiloma_invertido': {
            'title': 'PAPILOMA INVERTIDO',
            'body': 'Formação expansiva hipoatenuante, pouco heterogênea, com contornos lobulados, localizada no aspecto .... do seio (maxilar) (direito/esquerdo), com calcificações espiculadas em seu aspecto ...., as quais mantêm contato à ....; mede .... cm (CC x AP x T). Admite a possibilidade de lesão sólida, devendo-se considerar inicialmente o papiloma invertido dentre os diagnósticos diferenciais. A critério clínico, é conveniente a complementação por ressonância magnética da face com difusão e contraste.'
          },
          'nasoangiofibroma': {
            'title': 'NASOANGIOFIBROMA JUVENIL',
            'body': 'Formação expansiva heterogênea centrada na nasofaringe, de contornos lobulados e com intensa impregnação:\n- Superiormente a lesão determina erosão das paredes anterior e inferior do seio esfenoidal, com extensão para o interior desta cavidade paranasal. Há erosão do canal do vidiano esquerdo.\n-Anteriormente, há extensão para as coanas com comprometimento da porção posterior das fossas nasais, sem planos de clivagem com as conchas nasais médias e inferiores, bem como há erosão do septo nasal.\n- Inferiormente, apresenta-se restrita na fossa nasal e rinofaringe, promovendo redução da coluna aérea da nasofaringe.\n- Lateralmente para esquerda apresenta extensão ao forame esfenopalatino, com alargamento do mesmo, e erosão do processo pterigóide e as lâminas pterigoides ipsilaterais.\n-Posteriormente, a lesão não tem planos de clivagem com a parede posterior da rinofaringe.\nMede 4,0 x 3,8 x 3,0 cm (CCxAPxLL).\nOs achados descritos são compatíveis com lesão hipervascularizada, favorecendo a possibilidade de nasoangiofibroma.'
          },
          'pos_op': {
            'title': 'Pós-operatório (PO) nasal',
            'body': 'Turbinectomia parcial inferior e média à esquerda, ressecção de parte das paredes medial e posterior do seio maxilar e ressecção do assoalho do seio esfenoidal e de parte do septo interesfenoidal e do processo pterigoide à esquerda'
          },
          'alteracoes_pos_act': {
            'title': 'ALTERAÇÕES PÓS ACTÍNICAS',
            'body': 'Seios ... com discreto espessamento do revestimento mucoso, associado a deiscência e rarefação óssea difusa regional, com algumas descontinuidades focais (que também devem estar relacionadas, pelo menos em parte, a alterações actínicas).'
          },
          'cae_espe': {
            'title': 'Conduto auditivo externo (CAE)',
            'body': 'Espessamento do revestimento epitelial do conduto auditivo externo.'
          },
          'cae_material': {
            'title': 'Conduto auditivo externo (CAE)',
            'body': 'Material hiperatenuante no conduto auditivo externo, compatível com cerúmen'
          },
          'cae_colob': {
            'title': 'COLOBOMA AURIS - Conduto auditivo externo (CAE)',
            'body': 'Retração e densificação da pele e subcutâneo anteriormente ao ramo ascendente da hélix, destacando-se uma pequena imagem nodular hipoatenuante de 0,8 cm, profundamente a essa alteração e superiormente ao conduto auditivo externo, compatível com o diagnóstico clínico de coloboma auris.'
          },
          'membrana1': {
            'title': 'MEMBRANA TIMPÂNICA',
            'body': 'Membrana timpânica espessada à (direita/esquerda).'
          },
          'membrana2': {
            'title': 'MEMBRANA TIMPÂNICA',
            'body': 'Membrana timpânica espessada, sem focos de descontinuidade aparentes.'
          },
          'membrana3': {
            'title': 'MEMBRANA TIMPÂNICA',
            'body': ' Membrana timpânica espessada, com focos de descontinuidade.'
          },
          'membrana4': {
            'title': 'MEMBRANA TIMPÂNICA',
            'body': 'Membrana timpânica espessada e com focos hiperatenuantes de permeio, que podem representar timpanoesclerose. '
          },
          'duvidoso_colesteatoma': {
            'title': 'DUVIDOSO COLESTEATOMA',
            'body': 'Sinais de otomastoidopatia crônica bilateral, com maior envolvimento à (direita/esquerda), sem sinais tomográficos definitivos de colesteatoma associado; a critério clínico um estudo de ressonância magnética dos ossos temporais poderá trazer informações adicionais.'
          },
          'duvidoso_colesteatoma2': {
            'title': 'DUVIDOSO COLESTEATOMA/ALTERAÇÕES PÓS-OPERATORIAS',
            'body': 'Espessamento epitelial do conduto auditivo externo que se continua ao espessamento da membrana timpânica, que está retraída. Mastoide hipopneumatizada, com preenchimento do antro e de suas células remanescentes por material com atenuação de partes moles. Esclerose óssea difusa de suas paredes. A cavidade timpânica encontra-se preenchida por material com as mesmas características, ocupando o seio do tímpano, janela oval e redonda e todo o epi e hipotímpano. O ramo longo da bigorna e cabo do martelo não foram caracterizados. Ausência do esporão. Cóclea, vestíbulo, canais semicirculares e conduto auditivo interno de aspecto habitual. Discreta deiscência da proeminência do canal do nervo facial. Bulbo jugular e canal carotídeo sem alterações'
          },
          'colesteatoma': {
            'title': 'COLESTEATOMA DE PARS FLÁCIDA',
            'body': 'Material com densidade de partes moles na caixa timpânica (direita/esquerda), preenchendo o espaço de Prussak, associada a erosão do esporão de Chaussé e deslocamento medial da cadeia ossicular (com/sem) erosão da mesma.'
          },
          'paganglioma_timpanico': {
            'title': 'PARAGANGLIOMA TIMPÂNICO',
            'body': 'Formação arredondada com atenuação de partes moles e intenso e realce pelo meio de contraste no hipotímpano à esquerda, compatível com paraganglioma timpânico, medindo cerca de ... cm em seu maior eixo axial. Em seu aspecto posteromedial mantém contato com a margem anterior do forame jugular, onde se observa pequena erosão óssea focal. Mantém contato com a membrana timpânica e com a porção inferior do martelo, sem alterações associadas.'
          },
          'paganglioma_jugulotimpanico': {
            'title': 'PARAGANGLIOMA JUGULOTIMPÂNICO',
            'body': 'Lesão expansiva de limites bem definidos e intenso realce ao meio de contraste com epicentro no forame jugular direito medindo 2,0 cm no maior diâmetro axial. Tal lesão promove erosões ósseas das porções petrosa e mastóidea do osso temporal deste lado, parte da porção occipital do clívus, envolve o segmento petroso da artéria carótida interna ipsilateral, que se encontra pérvia, bem como alargamento do forame jugular e íntimo contato com a porção estilóide do osso temporal. Superiormente, mantém contato com o hemisfério cerebelar direito, sem sinais inequívocos de invasão, ocupando o poro acústico interno. Medialmente, ocupa o ângulo pontocerebelar, mantendo contato com o pedúnculo cerebelar médio. Inferiormente estende-se pelo forame jugular para o espaço carotídeo ipsilateral até o plano de C2, promovendo afilamento da artéria carótida interna, destacando-se proeminência de ramos nutridores da artéria carótida externa; ocupa o canal do hipoglosso. Lateralmente possui extensão para a orelha média, com irregularidades da articulação incudoestapediana, notando-se componente protruindo no conduto auditivo externo. Canal auditivo interno preservado. O conjunto de achados é sugestivo de glomus jugulo-timpânico. Superiormente à lesão nota-se vaso de provável etiologia venosa que se estende à tenda cerebelar. Associa-se obliteração da mastóide e da caixa timpânica por material com atenuação de partes moles. Aspecto normal das estruturas intraorbitárias.'
          },
          'fenda_coclear': {
            'title': 'FENDA COCLEAR (otospongiose)',
            'body': 'Pequenos focos hipoatenuantes junto ao contorno lateral das cócleas, mais evidentes à esquerda, com características sugestivas de fenda coclear; em contexto clínico compatível admitem diferencial com otospongiose.'
          },
          'implante_coclear': {
            'title': 'IMPLANTE COCCLEAR',
            'body': 'Sinais de manipulação cirúrgica caracterizados por mastoidectomia parcial direita com posicionamento receptor subcutâneo de implante coclear, situado no segmento posterior da região temporal direita, notando-se insinuação eletrodos através da janela redonda, para as espiras basal, média, atingindo a espira apical da cóclea.'
          },
          'labirintite_ossificante': {
            'title': 'LABIRINTITE OSSIFICANTE',
            'body': 'Focos calcificados à esquerda envolvendo o vestíbulo e as porções ampulares dos canais semicirculares. Notam-se também focos calcificados no canal semicircular à direita. Há também mínimos focos cálcicos na espira média e apical da cóclea à esquerda e da espira apical à direita. Os achados são compatíveis com labirintite ossificante.'
          },
          'mamilo': {
            'title': 'SINAL DO MAMILO (otospongiose)',
            'body': 'Pequena lobulação no contorno anteroinferior medial do conduto auditivo interno bilateral, mais evidente à esquerda, sugestivo de divertículo (sinal do mamilo), achado que pode estar relacionada a perda auditiva neurossensorial. Correlacionar com dados clínicos e audiométricos.'
          },
          'mastoide': {
            'title': 'MASTOIDES',
            'body': 'Mastoides hipopneumatizadas.\nMastoide hipopneumatizada (à direita/esquerda),  com algumas células remanescentes veladas.\nMastoides hipopneumatizadas com velamento de algumas células remanescentes da mastoide por material com atenuação de partes moles associado a esclerose óssea de suas paredes, conferindo aspecto ebúrneo. '
          },
          'bulbo_jugular': {
            'title': 'BULBO JUGULAR',
            'body': 'Bulbo jugular alto à (direita/esquerda), (não) deiscente (para a cavidade timpânica/para o aqueduto vestibular/canalículo semicircular.../).\nBulbo jugular alto à (direita/esquerda) com divertículo (s) em seu(s) aspecto (anterior/medial/posterior/lateral).'
          },
          'fistula_carot_caverno': {
            'title': 'FÍSTULA CAROTÍDEO-CAVERNOSA',
            'body': 'Dilatação da veia oftálmica superior direita, associada a aumento da espessura de toda a musculatura extrínseca orbitária e leve dilatação do seio cavernoso desta lado. O conjunto dos achados permite considerar a possibilidade de fístula carotídeo-cavernosa direita no contexto clínico apropriado.'
          },
          'ecchordosis': {
            'title': 'ECCHORDOSIS PHYSALIFORA',
            'body': 'Pequena falha óssea na cortical posterior do clivus com pequena espícula associada, sugestiva de ecchordosis physalifora. Anteriormente o defeito ósseo se comunica ao interior do seio esfenoidal esquerdo preenchido.'
          },
          'teratoma_base': {
            'title': 'TERATOMA IMATURO DA BASE DO CRÂNIO',
            'body': 'Lesão transespacial com componentes de gordura, cistos, tênues calcificações e material com atenuação de partes moles apresentando discreto realce ao meio de contraste. Apresenta epicentro no espaço mastigatório à esquerda. Posteriormente, a lesão estende-se até o espaço carotídeo, mantendo contato menor que 180º com a arteria carótida interna esquerda, que apresenta calibre discretamente menor que o contralateral. O componente posterior também mantem contato com a musculatura pré-vertebral, porém sem sinais definitivos de invasão desta estrutura. Medialmente, a lesão compromete o espaço bucal, mantendo contato com o processo alveolar da maxila, sem erosão óssea. Há também componente na parede lateral da orofaringe. O conjunto determina redução da coluna aérea. Lateralmente, há extensão para o espaço parotídeo esquerdo. Inferiormente, há extensão para o espaço submandibular, sem planos de clivagem com a base da lingua e o assoalho bucal. Tal lesão promove alargamento do forame oval e do forame mandibular do nervo alveolar inferior, bem como abaulamento lateral do arco zigomático. Superiormente, a lesão apresenta componente sólido junto ao cavo de Mechel, que se localiza no espaço mastigador, bem como há outro componente mais cístico junto à grande asa do esfenoide. Sinais de lipossubstituição da muscultura do espaço mastigador esquerdo.'
          },
          'graves': {
            'title': 'OFTALMOPATIA DE GRAVES',
            'body': 'Espessamento dos ventres musculares, principalmente dos músculos retos inferiores, reto mediais e grupamento muscular superior / levantador da pálpebra  bilateralmente, sem comprometimento das inserções tendíneas. Aumento da gordura orbitária bilateralmente com focos de densificação de permeio. Globos oculares apresentam atenuação preservada com proptose grau II bilateral. O conjunto de achados é compatível com oftalmopatia de Graves.'
          },
          'linfoma_intraorb': {
            'title': 'LINFOMA INTRAORBITÁRIO',
            'body': 'Lesão sólida e expansiva intra-orbitária extraconal de contornos lobulados e realce ao meio de contraste no aspecto superior da órbita esquerda, determinando proptose grau III, estiramento do complexo bainha-nervo óptico e deslocamento inferior e afilamento do músculo reto superior ipsilateral. Não apresenta erosão óssea e extensão intracraniana. Não há contato com a fissura orbitária superior e com o complexo bainha-nervo óptico deste lado. Mede 2,7 x 3,6 x 1,6 cm (LL x AP x CC). O conjunto de achados admite como hipótese diagnóstica doença linfoproliferativa, não sendo possível descartar doença relacionada ao IgG4. Um estudo de ressonância magnética com sequência de difusão pode trazer informações adicionais. '
          },
          'descompressao_orbita': {
            'title': 'CIRURGIA DE DESCOMPRESSÃO DE ÓRBITA',
            'body': 'Manipulação cirurgia das órbitas caracterizada por descontinuidade das paredes laterais e mediais bilateralmente e descontinuidade do assoalho ósseo da orbita direita no seu aspecto lateral, bem como tênues focos de descontinuidade do assoalho da órbita esquerda. Há herniação da gordura orbitária para o seio maxilar direito pela falha óssea que mede aproximadamente  1 cm. Herniação da gordura orbitária e dos músculos reto mediais pela descontinuidade das lâminas papiráceas.'
          },
          'nodulo_parot': {
            'title': 'NÓDULO PRIMÁRIO/LINFONODO DA PARÓTIDA',
            'body': 'Nódulo com atenuação de partes moles, limites bem definidos e contornos regulares, localizado no lobo superficial da glândula parótida esquerda, medindo 1,0 x 1,0 x 0,8 cm, de aspecto inespecífico, mas que pode representar nódulo primário da glândula parótida ou linfonodo de dimensões aumentadas e sem seu hilo gorduroso.'
          },
          'adenoma_pleo': {
            'title': 'ADENOMA PLEOMÓRFICO (parótida)',
            'body': 'Lesão nodular expansiva isoatenuante à musculatura e com raros pequenos focos de calcificação de permeio, localizada na glândula parótida direita, com contornos regulares e bem delimitados e realce heterogêneo ao meio de contraste, ocupando os lobos superficial e profunda, deslocando anteriormente a veia retromandibular. Mede 3,2 x 2,8 x 3,5 cm (LL x AP x CC). Tal lesão foi puncionada em 19/02/2018 e possui diagnóstico citopatológico de adenoma pleomórfico.'
          },
          'fenda_palatina': {
            'title': 'FENDA PALATINA',
            'body': 'Fenda óssea no processo alveolar da maxila, paramediana à esquerda lateralmente ao incisivo central (projeção do incisivo lateral ausente), com extensão posterior para o palato duro deste lado, medindo até cerca de 0,6 cm anteriormente e 0,9 cm posteriormente, e recoberta por mucosa em toda a sua extensão. Observam-se tênues pontes ósseas entre as margens da fenda.  Distúrbio de rotação do incisivo central superior esquerdo e do canino desse lado.  Falha de fusão paramediana direita na porção alveolar da maxila no nível do incisivo lateral direito (ausente), com extensão posterior por todo o palato duro, coberta por material com atenuação de partes moles'
          },
          'osteorradionecrose': {
            'title': 'OSTEORRADIONECROSE',
            'body': 'Múltiplas alterações líticas distribuídas pela mandíbula, comprometendo a cortical e medular, com envolvimento bilateral do canal do nervo alveolar inferior, alguns focos de reação periosteal e descontinuidades ósseas. O comprometimento é mais acentuado no corpo e ramo da hemimandíbula esquerda, onde há descontinuidade segmentar, observando-se intervalo de cerca de 3,0 cm entre as extremidades ósseas remanescentes; associa-se solução de continuidade das partes moles regionais (configurando fístula orocutânea). Há tecido com atenuação de partes moles e realce discreto ao meio de contraste junto às alterações mandibulares, mais proeminente junto ao remanescente do ramo à esquerda, nesta topografia obliterando os espaços mastigatório e bucal. O conjunto dos achados é compatível com a história clínica de osteorradionecrose'
          },
          'ameloblastoma': {
            'title': 'AMELOBLASTOMA',
            'body': 'Lesão lítica localizada na porção posterior do corpo da mandíbula esquerda, que se associa a componente de partes moles em seu revestimento anterior e superior e nível hidroaéreo. Anteriormente, a lesão estende-se até o primeiro molar com erosão de sua raiz. Posteriormente, apresenta extensão até o ângulo da mandíbula e o seu limite posterior dista 4,6 cm do contorno superior do côndilo mandibular. A lesão determina remodelamento ósseo e afilamento cortical, bem como descontinuidade da cortical da face lingual da mandíbula. A lesão determina desvio inferior e lateral do segundo molar. O terceiro molar está incluso com alargamento pericoronário e localizado na margem posterior da lesão lítica. A lesão determina desvio lateral e erosão óssea do canal do nervo alveolar inferior. Forames mandibular e mentual preservados. Mede 4,4 x 2,6 x 3,7 cm (AP x LL x CC).'
          },
          'osteossarcoma_radio': {
            'title': 'OSTEOSSARCOMA RADIOINDUZIDO/ TRANSFORMAÇÃO SARCOMATOSA DE OSTEOCONDROMA DE MANDÍBULA (POS CX E RT PARA CEC DE NASOFARINGE)',
            'body': 'Lesão expansiva com intensa reação periosteal espiculada na hemimandíbula direita, maior no corpo mandibular, com erosões das corticais lingual e vestibular e extensão para o ramo da mandíbula deste lado, atingindo a incisura mandibular e o colo do processo condilar. Tem componente periférico com atenuação de partes moles, focos gasosos e captação heterogênea pelo meio de contraste. Estende-se a base da língua deste lado, com invasão e abaulamento superomedial de toda a superfície do assoalho bucal bilateral e deslocamento lateral da língua deste lado. Há envolvimento da mandíbula à esquerda, estendendo-se até o ângulo. Há intensa periapicopatia e periodontopatia dos elementos dentários à direita. Há invasão do forame mandibular e mentoniano bem como do canal do nervo alveolar inferior e canal incisivo à direita, com provável comprometimento do nervo mandibular direito pela lesão, estando as estruturas contralaterais preservadas. Há comprometimento da musculatura mastigatória à direita, livre à esquerda. Atenuação difusamente heterogênea dos ossos da base do crânio e do terço médio da face, bem como da mandíbula, com predomínio de esclerose, compatível com alterações pós-terapêuticas. Associam-se falhas ósseas extensas do trabeculado etmoidal bilateral, do assoalho dos seios esfenoidais, de todas as paredes dos seios maxilares (inclusive dos assoalhos orbitários) e do palato duro, descontinuidade do septo nasal e ausência dos cornetos nasais, formando ampla cavidade que se encontra revestida por material com atenuação de partes moles, sem formação expansiva detectável pelo método. Destaca-se ampla comunicação desta cavidade com a cavidade oral à direita, caracterizando trajeto fistuloso através do processo alveolar da maxila deste lado'
          },
          'cirurg_ortognatica': {
            'title': 'CIRURGIA ORTOGNÁTICA:',
            'body': '1 - Osteotomias transversas na base dos seios maxilares e do vômer, com descontinuidades ósseas e fixação anterior por parafusos e placas metálicas.Descontinuidades ósseas dos processos e lâminas pterigoideas. Sinais de septoplastia e turbinectomia inferior parcial direita.\n2-  Osteotomias sagitais nos ângulos, corpos e ramos mandibulares, tangenciando os canais mandibulares e fixadas por parafusos e placas metálicas. O parafuso mais superior no ramo mandibular esquerdo se projeta no interior do canal mandibular ipsilateral.\n3- Sinais de manipulação cirúrgica com colocação de placas metálicas nas paredes anteriores dos seios maxilares, associado ainda à ressecção das paredes inferolaterais, posteriores e inferomediais destas cavidades paranasais. Notam-se ainda parafusos metálicos na região da sínfise e parassínfise da mandíbula. Irregularidades das lâminas dos processos pterigoides'
          },
          'glomus_carot': {
            'title': 'GLOMUS CAROTÍDEO',
            'body': 'Lesão expansiva e hipervascularizada no espaço carotídeo direito. Afasta as artérias carótidas interna e externa e desloca lateralmente a veia jugular interna direita e anteriormente a glândula submandibular do mesmo lado. Apresenta limites definidos, contornos lobulados e é circundada por pequenas estruturas vasculares tortuosas. Mede 5,4 x 4,4 x 3,4 cm (CC x AP x LL). Não há sinais de lesões semelhantes nos demais segmentos cervicais.  Lesão expansiva e hipervascularizada no espaço carotídeo direito, que afasta as artérias carótidas interna e externa, compatível com paraganglioma do corpo carotídeo. '
          },
          'pos_glomus_carot': {
            'title': 'PÓS-OPERATÓRIO DE GLOMUS CAROTÍDEO',
            'body': 'Sinais de manipulação cirúrgica, caracterizados por ressecção da lesão expansiva heterogênea, hipervascularizada, que envolvia circunferencialmente e comprimia a porção cranial da artéria carótida comum direita, o bulbo e as porções proximais das artérias carótidas interna e externa. Enxerto da artéria carótida interna direita pérvia, com irregularidades e afilado em relação ao contralateral. Artéria carótida externa à direita não caracterizada. Artérias carótidas esquerdas pérvias, sem particularidades. Ectasia da veia jugular externa esquerda. Veias jugulares internas pérvias. Retração do subcutâneo da região cervical lateral direita, com discretas alterações fibrocicatriciais envolvendo os espaços submandibular, carotídeo e periparotídeo à direita.'
          },
          'linfoma': {
            'title': 'LINFOMA (PROVÁVEL NÃO-HODKING) COM ACOMETIMENTO DA PARÓTIDA, LINFONODOS E CRÂNIO',
            'body': 'Volumosa formação expansiva com atenuação de partes moles, contornos lobulados e realce discretamente heterogêneo ao meio de contraste infiltra todo o componente suprazigomático do músculo temporal direito. Anteriormente mantém intimo contato com a parede lateral da órbita, lateralmente com a artéria temporal superficial e medialmente com a calota craniana, observando-se discreta esclerose e reação periosteal das estruturas ósseas adjacentes. Há extensão intracraniana da lesão para as regiões temporal e frontal, associada a importante hipoatenuação da substância branca regional, nucleocapsular e parietal, podendo corresponder a edema vasogênico; esse conjunto de achados determina apagamento dos sulcos e espaços liquóricos hemisféricos à direita, inclusive do ventrículo lateral, com desvio das estruturas da linha média.\nHá pequena extensão da lesão ao quadrante superotemporal da órbita, extraconcal, com espessura de até 0,4 cm, e discreta proptose ocular relativa associada à direita. Há múltiplos nódulos à direita com aspecto semelhante ao da lesão sugestivos de linfonodomegalias junto aos lobos superficial e profundo da glândula parótida (cadeia parotídea), no espaço bucal (em contato com o ducto de Stenon) e nos níveis II a V; o maior mede cerca de 2,6 cm no maior eixo axial. Pequenos linfonodos com maior realce que o habitual nos níveis I de ambos os lados e à esquerda nos níveis IIA e VB, nesta topografia com aspecto globoso, inespecíficos, mas que podem ser suspeitos para envolvimento secundário.'
          },
          'fasciite': {
            'title': 'FASCIITE NECROSANTE CERVICAL',
            'body': 'Extensa coleção cervical transespacial à direita, associada a densificação e espessamento das partes moles superficiais e da fáscia cervical superficial, acometendo os espaços mucosofaríngeo, na topografia da tonsila palatina, parafaríngeo, mastigatório, bucal, com pequena extensão para o espaço parotídeo e o espaço retrofarígeo/ danger. Focos gasosos de permeio no espaço parafaríngeo. Na tonsila palatina direita, a coleção fica melhor delimitada, apresenta conteúdo central liquefeito/ necrótico e tênue realce periférico pelo meio de contraste, medindo aproximadamente 2,5 x 2,0 x 1,5 cm (vol: 4,0 cc), e promovendo abaulamento na parede lateral direita da orofaringe. Coleção de característica semelhante é evidenciada no espaço retrofaríngeo/ danger, medindo aproximadamente 6,0 x 1,5 x 1,0 cm (vol:4,6 cc), com extensão longitudinal até o nível de C5, bem como extensão para o mediastino anterossuperior. Outras coleções submentonianas com centro liquefeito/ necrótico são observadas, de permeio entre os músculos genio-hióideo e milo-hióideo, medindo até 3,0 x 2,5 x 1,0 cm (vol: 4,0 cc). Glândulas submandibular, sublingual e parótida direitas de dimensões aumentadas e heterogêneas, envolvidas pelo processo inflamatório/ infeccioso local. Linfonodomegalias nos níveis II e VA, a maior medindo 1,6 x 1,2 cm no plano axial, de aspecto reacional. Densificação da musculatura infra-hióidea.'
          },
          'neo_esofago': {
            'title': 'NEOPLASIA PRIMÁRIA DO ESÔFAGO',
            'body': ' Formação expansiva estenosante cirunferencial do esôfago na transição toracocervical, no plano intervertebral de T1-T2, com atenuação de partes moles e captação heterogênea discreta do meio de contraste, medindo 2,4 cm no seu maior diâmetro axial e com extensão craniocaudal  aproximada de 3,5 cm. Nota-se ectasia do esôfago a jusante da lesão.  A lesão ocupa o recesso traqueoesofágico à esquerda; possui intimo contato anterior com a parede posterior da traquéia e o lobo esquerdo da tireóde; contato posterior com os corpos vertebrais de T1 e T2; contato lateral com a artéria carótida comum e subclávia esquerdas. Tal achado, em correlação com dados clínicos, pode corresponder a neoplasia primária do esôfago.'
          },
          'meta_ln': {
            'title': 'METÁSTASE LINFONODAL',
            'body': 'Linfonodos globosos, de dimensões aumentadas e com atenuação heterogênea nos níveis II, III e IV à direita, no nível VI (na linha média e região paratraqueal direita) e nas cadeias retrofaríngeas de ambos os lados, de aspecto secundário. Apresentam focos hipoatenuantes sugestivos de necrose / liquefação, e a maior lesão está localizada no nível IIB direito, medindo 3,4 cm no plano axial. \nLinfonodomegalia heterogênea no nível IIA esquerdo, medindo 1,8 cm, também suspeita para envolvimento secundário. \nExtensas linfonodomegalias/conglomerados linfonodais necróticos nos níveis II de ambos os lados e III esquerdo, com sinais de extravasamento extracapsular, destacando-se envolvimento das veias jugulares internas, comprimida e com a parede infiltrada à direita, e trombosada/com infiltração luminal à esquerda. Há também amplo contato dessas lesões com os músculos esternocleidomastóideos, provavelmente  comprometidos, e extensão das mesmas aos espaços parafaríngeos, onde confluem com o componente lesional da orofaringe. \n'
          },
          'neurofibromas': {
            'title': 'NEUROFIBROMAS',
            'body': 'Múltiplas lesões hipoatenuantes de contornos bem definidos nos espaços carotídeos com extensão inferior para o mediastino superior, outras nos espaços cervicais anteriores e posteriores. Destaca-se lesão sólida infrahióide fusiforme expansiva, discretamente hipoatenuante, com realce heterogêneo ao meio de contraste, apresentando epicentro no espaço carotídeo direito, de contornos bem definidos e circunscritos, com continuidade superior e inferior com as lesões hipoatenuantes citadas anteriormente. A lesão desloca anteriormente o músculo esternocleidomastóideo e a veia jugular interna direita, que se encontra afilada e com redução do fluxo (maior concentração de contraste no limite superior da lesão), porém pérvia. Desloca para a esquerda o lobo tireoidiano direito, a laringe e a artéria carótida comum. Posteriormente, mantém contato com a artéria braquiocefálica, comprimindo secundariamente a traqueia na transição cervicotorácica, com discreta redução de seu diâmetro. Lateralmente abaula a junção das veias jugular interna direita e subclávia direita, mantendo contato com as veias braquiocefálicas e veia cava superior, sem afilamento significativo das estruturas citadas. Inferiormente mantém contato com a traquéia e a veia ázigos. O maior componente sólido da lesão mede 8,0 x 4,3 x 4,2 cm (CC x LL x AP). \nMúltiplas lesões de caráter semelhante às descritas anteriormente promovendo remodelamento ósseo e alargamento dos forames de conjugação bilaterais, de C1-C2 à C7-T1 sugestivos de neurofibromas das raízes nervosas emergentes correspondentes. \n'
          },
          'cec_faringe': {
            'title': 'CEC FARINGE',
            'body': 'Lesão expansiva e infiltrativa na parede lateral direita da orofaringe, com discreto realce ao meio de contraste e com aparentes áreas de ulceração em seu aspecto inferior, medindo cerca de 2,6 cm no seu maior eixo axial. Inferiormente infiltra a prega faringoepiglótica, com possível envolvimento da margem direita da epiglote (que pode ser mais bem avaliado clinicamente), e se estende à hipofaringe onde aparentemente apresenta componente posterior bilateral. Tal lesão já foi biopsiada em 08/03/2018, com resultado de carcinoma epidermoide bem diferenciado invasivo.'
          },
          'cec_faringe2': {
            'title': 'CEC FARINGE',
            'body': 'Formação sólida infiltrativa, mal delimitada e com realce heterogêneo centrada na orofaringe, com acometimento circunferencial desta e envolvendo cranialmente o palato mole, determinando importante redução da coluna aérea. A lesão: - Caudalmente se estende até o plano do osso hioide, envolvendo toda extensão da epiglote, a gordura pré epiglótica, as valéculas, as pregas glossoepiglótica e faringoepiglóticas, as pregas ariepiglóticas e a hipofaringe, com obliteração dos seios piriformes. - Lateralmente apresenta insinuação aos espaços parafaríngeos, notadamente à esquerda, e de ambos os lados mantém proximidade aos músculos pterigoides mediais sem sinais de infiltração dos mesmos. - Anteriormente se estende ao assoalho bucal, com aparente ulceração na base da língua e sinais de envolvimento dos músculos extrínsecos linguais. Extensas linfonodomegalias/conglomerados linfonodais necróticos nos níveis II de ambos os lados e III esquerdo, com sinais de extravasamento extracapsular, destacando-se envolvimento das veias jugulares internas, comprimida e com a parede infiltrada à direita, e trombosada/com infiltração luminal à esquerda. Há também amplo contato dessas lesões com os músculos esternocleidomastóideos, provavelmente comprometidos, e extensão das mesmas aos espaços parafaríngeos, onde confluem com o componente lesional da orofaringe.'
          },
          'cec_orofaringe': {
            'title': 'CEC OROFARINGE',
            'body': 'Espessamento tecidual envolvendo o aspecto lateral direito da mucosa do palato duro, com pequena extensão ao rebordo palatino da mucosa gengival, determinando afilamento ósseo da cortical palatina do recesso alveolar do assoalho maxilar deste lado, assim como afilamento do assoalho da fossa nasal direita. Mede cerca de 3,3 x 1,9 cm (AP x T), com pequena extensão contralateral para a esquerda.'
          },
          'cec_orofaringe2': {
            'title': 'CEC OROFARINGE',
            'body': 'Há outra lesão expansiva de contornos bem delimitados e com realce ao meio de contraste localizada na base da língua à esquerda, medindo 1,6 x 1,8 x 1,4 cm (CC x AP x LL). Superior, medial  e posteriormente reduz a coluna aérea local. Inferiormente determina obliteração parcial da valécula ipsilateral. Anteriormente mantém íntimo contato com a hemilíngua esquerda, com aparente pequena infiltração da musculatura extrínseca. Lateralmente mantém íntimo contato com a glândula submandibular deste lado, que se apresenta de dimensões aumentadas e com maior realce ao meio de contraste em relação a glândula submandibular contralateral, notando-se também infiltração do musculo milohioide esquerdo. '
          },
          'plexiforme': {
            'title': 'NEUROFIBROMA PLEXIFORME',
            'body': 'Lesão transespacial infiltrativa / expansiva de aspecto plexiforme com atenuação e realce heterogêneo acometendo a hemiface direita, com epicentro no espaço mastigatório, obliterando a gordura retromaxilar. Desloca posteriormente o espaço parotídeo, anteriormente o espaço bucal e inferiormente o pavilhão auricular ipsilaterais. '
          },
          'cec_laringe': {
            'title': 'CEC LARINGE - TUMOR GLÓTICO',
            'body': 'Formação expansiva e infiltrativa sólida com realce heterogêneo pelo meio de contraste envolvendo as pregas vocais, a comissura anterior e as bandas ventriculares, com maior componente à esquerda. Se estende de ambos os lados à gordura paraglótica, com maior extensão à esquerda, onde se insinua discretamente ao espaço tireoaritenoideo, acomete a porção profunda da prega ariepiglótica e determina obliteração do seio piriforme (com possível infiltração da sua parede anterior). Nota-se ainda pequena extensão inferior à laringe subglótica do lado esquerdo, junto ao aspecto anterior da cartilagem cricoide, sem sinais de envolvimento desta. O conjunto dos achados determina redução da amplitude da coluna aérea local. Há sinais de invasão do aspecto anterior/paramediano direito da cartilagem tireoide, e afilamento da sua lâmina esquerda também sugestivo de infiltração local; suas porções inferiores apresentam esclerose. Esclerose assimétrica das cartilagens aritenoides, maior à direita, inespecífica.  Linfonodos aumentados em número e com dimensões normais no nível III esquerdo, medindo até 0,7 cm, inespecíficos, não se podendo descartar a possibilidade de acometimento secundário em contexto neoplásico. '
          },
          'cec_laringe2': {
            'title': 'CEC LARINGE - TUMOR TRANSGLÓTICO',
            'body': 'Lesão expansiva e infiltrativa, com realce heterogêneo pelo meio de contraste delimitando áreas hipoatenuantes de permeio (necrose/liquefação), acomete a laringe bilateralmente com extensão transglótica. Invade ambas as pregas vocais e os espaços paraglóticos. Mede cerca de 5,1 x 3,8 x 3,2 cm (LL x CC x AP).\n- Lateralmente, erode as lâminas da cartilagem tireoide e se estende aos planos musculoadiposos extralaríngeos. \n- Posteriormente, alarga os espaços tireoaritenóideos (mais à direita) e apresenta íntimo contato com as aritenoides que se apresentam escleróticas. Não se observa extensão evidente ao espaço pré-vertebral. \n- Inferiormente, apresenta íntimo contato com a margem superior do lobo tireoidiano direito e erode parcialmente a cartilagem cricoide (mais à esquerda), que também se apresenta esclerótica.\n- Superiormente à direita, infiltra a prega vestibular e a porção inferior da prega ariepiglótica. \n- Medialmente, a lesão determina acentuada redução da coluna aérea laríngea. '
          },
          'paralisia_vocal': {
            'title': 'PARALISIA PREGA VOCAL ',
            'body': 'Há sinais de paralisia corda vocal esquerda, caracterizados por lipossubstituição do músculo vocal deste lado, medianização da prega e alargamento do ventrículo ipsilateral.'
          },
          'cec_cutaneo': {
            'title': 'CEC CUTÂNEO NA REGIÃO PRÉ-AURICULAR/PAROTÍDEO COM EXTENSÃO PROFUNDA',
            'body': 'Volumosa lesão sólida expansiva e infiltrativa, de margens irregulares e captação heterogênea do meio de contraste endovenoso, centrada nos planos cutâneos superficiais da região temporoparotídea esquerda, com acometimento dos planos superficiais e profundos adjacentes, a saber:\n- Medialmente infiltra a glândula parótida e os tecidos moles adjacentes a articulação temporomandibular, sem determinar erosão da cortical óssea do côndilo mandibular. Acomete predominantemente a porção superficial da glândula parótida, com limites mal definidos, porém atingindo o plano da veia retromandibular, com trombose segmentar desta; e envolvendo a porção intraparotídea da artéria carótida externa esquerda. O ducto parotídeo está dilatado e com realce periférico. Há realce acentuado do parênquima parotídeo, devido a sobreposição das alterações infiltrativas relacionadas ao tumor e alterações inflamatórias relacionadas a provável obstrução do ducto parotídeo. Não se observam cálculos radiopacos.\n- Anteriormente infiltra a margem posterior do músculo masseter e a inserção mandibular do músculo temporal, alem de determinar intimo contato com o ramo esquerdo da mandíbula sem determinar erosões de sua cortical óssea. Parece haver uma extensão superficial da lesão à pele anterior ao seio maxilar esquerdo, até a transição com a pirâmide nasal, sem limites bem definidos.\n- Lateralmente infiltra a pele e o tecido subcutâneo adjacente, com extensão desde o plano do corpo da mandíbula até a fosse temporal, inclusive com acometimento da margem lateral da órbita deste lado. O conjunto dos achados determina extensa ulceração cutânea de aproximadamente 4,6 cm.\n- Posteriormente  infiltra a pele e o tecido subcutâneo periauricular, com extensão para o trágus, ramo ascendente da hélix, conduto auditivo externo deste lado, tanto no seu aspecto posterior quanto anterior, e espessamento da membrana timpânica. A lesão tem amplo contato com a cortical lateral do muro da mastoide e a porção timpânica do osso temporal, porém não há sinais tomográficos evidentes de infiltração óssea.\nNota-se assimetria e retração do contorno parotídeo direito, sem interposição de tecido gorduroso entre a pele e o músculo masseter, bem como ausência da porção superficial glândula parótida direita, compatível com alterações sequelares pós cirúrgicas. Lipossubstituição acentuada do remanescente da parótida direita.'
          },
          'cec_lingua': {
            'title': 'CEC LÍNGUA',
            'body': 'Lesão expansiva acometendo língua oral à esquerda, com realce heterogêneo, contornos lobulados e limites parcialmente delimitados, apresentando extensão para o lado contralateral no seu aspecto anterior e extensa área de ulceração na sua margem superolateral. Posteriormente acomete o aspecto mais anterior da base da língua. Há espessamento e realce ao meio de contraste do pilar amigdaliana anterior à esquerda, podendo representar extensão da lesão através do palato mole deste lado. Inferiormente se estende para o assoalho bucal e espaço sublingual homolateral, com sinais de invasão do músculos genioglosso e milohioide. Mede aproximadamente x cm (L x T x AP). '
          },
          'cec_lingua2': {
            'title': 'CEC LÍNGUA',
            'body': 'Lesão expansiva e infiltrativa com realce heterogêneo e áreas hipoatenuantes de necrose / liquefação no rebordo alveolar da mandíbula à direita.  Anteriormente se estende ao nível dos incisivos centrais, promovendo abaulamento da mucosa na jugal vestibular. Posteriormente invade o assoalho bucal, principalmente à direita, com invasão também da glândula sublingual homolateral. Compromete o segmento mais anteriores dos ventres dos músculos genioglossos e geniohioides, também mais evidente à direita. Inferiormente invade grande parte do corpo mandibular, com comprometimento desde o nível do canino inferior esquerdo até o nível dos molares inferiores direitos, com sinais de comprometimento do forame mentoniano direito de grande parte do canal do nervo alveolar inferior deste lado, o que denota disseminação perineural, e não compromete o canal do nervo alveolar inferior esquerdo. A lesão mede aproximadamente X cm nos maiores eixos no plano axial'
          },
          'cec_lingua_posop': {
            'title': 'CEC LÍNGUA PÓS-OPERATÓRIO',
            'body': 'Surgimento/aumento de múltiplas lesões sólidas heterogêneas com áreas necróticas/liquefeitas de aspecto secundário acometendo a musculatura paravertebral posterior (a maior delas na transição cervicotorácica paramediana esquerda, medindo cerca de 3,8 x 3,3 x 9,0 cm - AP x LL x CC); o aspecto lateral do músculo serrátil anterior direito, medindo cerca de 2,0 x 1,6 x 1,7 cm (AP x LL x CC) e as partes moles da região bucal/mandibular direita, infiltrando os músculos zigomáticos e mantendo íntimo contato com o bucinador, além de acometer a pele anteriormente e o espaço bucal posteriormente, medindo cerca de 3,5 x 3,3 x 3,3 cm (LL x AP x CC).\nPersistem os sinais de manipulação cirúrgica caracterizados por pelveglossectomia esquerda e mandibulectomia marginal anterior, bem como esvaziamento cervical radical modificado bilateral, com interposição de enxerto miocutâneo na topografia da língua, com pedículos vasculares pérvios. \nInalterada a área de perda óssea alveolar da maxila no ângulo/ramo direito, no local de exodontia pregressa. A cavidade está preenchida por material com atenuação de partes moles. \nPersistem as alterações actínicas caracterizadas por realce heterogêneo das glândulas parótidas, espessamento das demais estruturas da faringe e laringe e densificação dos demais planos gordurosos superficiais e profundos do pescoço.\nEstá menos evidente a área heterogênea de realce pelo meio de contraste iodado junto ao contorno ântero lateral direito do pescoço, subjacente ao leito cirúrgico. \nEstá semelhante a área de realce focal aumentado na parede lateral direita da orofaringe, que apresenta espessura de cerca de 1,0 cm, que pode representar mais provavelmente alteração secundária ao tratamento.\n'
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'ameloblastoma': {
            'title': 'AMELOBLASTOMA',
            'body': 'Lesão expansiva e predominantemente cística, uniloculada, no hemicorpo esquerdo da mandíbula. Apresenta contornos lobulados, hipersinal em T2 e áreas de realce periférico ao meio de contraste. Mantém contato com as superfícies vestibular e lingual da mandíbula, sem sinais de invasão dos planos mioadiposos locais. Há extensão da lesão para o trajeto do nervo alveolar inferior e forame mentoniano deste lado. Mede 4,3 x 2,2 x 2,4 cm (AP x LL x CC). O conjunto de achados, em conjunto com as alterações observadas na tomografia computadorizada de 06/02/2018, pode corresponder a possibilidade diagnóstica de ameloblastoma. '
          },
          'schwannoma_geniculado': {
            'title': 'Schwannoma de gânglio geniculado',
            'body': 'Lesão expansiva com sinal homogêneo intermediário em T2 e alto em T1, com realce ao meio de contraste em topografia do gânglio geniculado e pequena extensão para o segmento timpânico do nervo facial deste lado. Mede 0,6 x 0,6 x 0,4 cm (CC x AP x T). Estável em relação ao estudo de 10/11/2017.'
          },
          'paraganglioma_timpanico': {
            'title': 'Paraganglioma timpânico',
            'body': 'Massa lobulada  ocupando o hipo e mesotímpano à esquerda, em contato com o promotório coclear, com hiperssinal em T2, realce homogêneo e intenso pelo meio de contraste, sem restrição à difusão das moléculas de água. Oblitera o óstio timpânico da tuba auditiva, envolve o estribo, os ramos longos da bigorna e do martelo, obliterando as janelas oval e redonda. Posteromedial, mantém contato ao forame jugular, sem extensão evidente. Mede cerca de 1,0 cm no maior eixo.\n'
          },
          'paraganglioma_vagal': {
            'title': 'Paraganglioma vagal',
            'body': 'Lesão sólida hipervascularizada e de contornos lobulados centrada no espaço carotídeo esquerdo, medindo cerca de 7,4 cm em seu maior eixo craniocaudal e 5,3 x 3,2 cm nos seus maiores eixos axiais (imagens-chave). Apresenta hipersinal em T2, flow voids de permeio e intenso realce após o uso de contraste, sem significativa restrição à difusão. Determina deslocamento anterior das artérias carótidas interna e externa, afastando-nas da veia jugular interna, deslocada lateralmente em seu segmento médio e indistinta da lesão em seu segmento superior. O conjunto deste achados é sugestivo de paraganglioma de provável origem vagal. '
          },
          'schw_acustico': {
            'title': 'Schwannoma do Acústico ',
            'body': 'Lesão sólida expansiva no ângulo ponto-cerebelar esquerdo, com leve hipersinal em T2 e impregnação heterogênea pelo meio de contraste, com focos de marcado hipossinal em T2* que podem representar depósitos de hemossiderina / calcificações. Apresenta relação com os nervos vestíbulo-coclear e facial e insinua-se para o poro acústico esquerdo. O conduto auditivo interno e as estruturas do labirinto membranoso esquerdos apresentam sinal mais baixo que o usual nas sequencias ponderadas em T2, podendo representar represamento do líquor / endolinfa ou aumento do conteúdo proteico, inalterado em relação ao exame anterior. Faz contato com o pedúnculo cerebelar médio esquerdo e hemisfério cerebelar esquerdo, sem compressão significativa destes. Mínima quantidade de material hidratado oblitera células mastoideas\n\nLesão sólida expansiva centrada no ângulo ponto-cerebelar esquerdo, caracterizada por sinal e contrastação heterogêneos pelo meio do contraste endovenoso. Apresenta um componente no interior do conduto auditivo interno esquerdo, que alarga e atinge seu fundo. Seu outro componente ocupa a cisterna do ângulo ponto-cerebelar esquerdo, comprimindo e deslocando o pedúnculo cerebelar médio, a ponte e o hemisfério cerebelar adjacentes deste lado. Nervos cranianos VI e VII nao caracterizados no seus trajetos cisternais e canaliculares à esquerda. O V nervo encontra-se deslocado anteriormente e o VI inferiormente do mesmo lado. Tal lesão determina ainda compressão sobre o IV ventrículo, com moderada dilatação do sistema ventricular supra-tentorial, além de insinuação das amídalas cerebelares ao forame magno.\n\nImagem nodular no interior do conduto auditivo interno esquerdo, em sua porção mesial, com discreto hipersinal em T1 e isossinal em T2, com realce intenso e homogêneo pelo meio de contraste, sem restrição à difusão das moléculas de água, medindo 0,5 x 0,5 cm no plano axial. Entre as possibilidades diagnósticas, considerar schwannoma do nervo acústico.\nà difusão. Determina deslocamento anterior das artérias carótidas interna e externa, afastando-nas da veia jugular interna, deslocada lateralmente em seu segmento médio e indistinta da lesão em seu segmento superior. O conjunto deste achados é sugestivo de paraganglioma de provável origem vagal. '
          },
          'conflito': {
            'title': 'Conflito neurovascular  ',
            'body': 'Alça vascular da artéria cerebelar inferior anterior (AICA) direita, desloca levemente o nervo vestibulococlear deste lado no seu segmento cisternal. \n\nAlça vascular da artéria cerebelar anteroinferior mantém contato com a porção cisternal e intracanalicular dos nervos vestibulococlear e facial à direita. Aspecto normal das demais porções destes nervos. \n\nPequena alça vascular se insinua no poro acústico esquerdo e mantém contato com os nervos facial e vestibulococlear, sem evidente alteração das suas espessuras ou trajetos, achado frequentemente fortuito e desprovido de importância clínica, mas que pode estar relacionado a conflito neurovascular em contexto clínico compatível.  '
          },
          'graves': {
            'title': 'OFTALMOPATIA DE GRAVES',
            'body': 'Espessamento dos ventres musculares, principalmente dos músculos retos inferiores, reto mediais e grupamento muscular superior / levantador da pálpebra direito, sem comprometimento das inserções tendíneas, destacando-se hipersinal em T2 e realce pelo meio de contraste nos músculos retos inferiores. Discreta obliteração dos planos adiposos circunjacentes. Aumento da gordura orbitária bilateral. O conjunto de achados é compatível com a suspeita clínica de Oftalmopatia de Graves e determina proptose ocular bilateral, grau 3.'
          },
          'lab_ossifi': {
            'title': 'LABIRINTITE OSSIFICANTE',
            'body': 'Perda parcial do sinal habitual em T2 dos canais semicirculares à direita e perda quase total do sinal habitual dos canais semicirculares à esquerda. Observa-se também irregularidade dos vestíbulos, principalmente à esquerda.  Há discreto realce do vestíbulo esquerdo. A espessura da espira basal da cóclea mede 2,0 mm à direita e 1,7 mm à esquerda.Há discreta irregularidade da rampa vestibular esquerda na sua porção basal. Observa-se leve realce da espira apical esquerda, sugerindo atividade do processo inflamatório. \n\nHipossinal em T2 e realce na espira basal da cóclea e no vestíbulo à direita, observando-se também redução da intensidade do sinal dos canais semicirculares, achados sugestivos de labirintite crônica (transição entre as fases fibrosa e ossificante). '
          },
          'ca_parotida': {
            'title': 'CARCINOMA DE PARÓTIDA T4N0M0',
            'body': 'Formação expansiva na glândula parótida esquerda, sólido-cística, com contornos lobulados e limites bem definidos, predominantemente no lobo superficial da glândula parótida, com extensão para a porção profunda, alargando o espaço estilomandibular e comprimindo a veia jugular interna esquerda, que se encontra pérvia. O componente depositado no aspecto posterior da lesão apresenta baixo sinal em todas as sequências, e pode estar relacionado a material hemático, e o segmento anterior apresenta componente mais sólido com realce heterogêneo pelo meio de contraste paramagnético. Desloca anteriormente o ramo mandibular deste lado e afila a sua cortical posterior, com pequenas irregularidades/ descontinuidades nos contornos posteriores da cabeça mandibular que pode representar erosão óssea. Apresenta íntimo contato com os músculos pterigoideos e masseter esquerdos, este último lipossubstituído. Lateralmente apresenta componente nodular heterogêneo com realce também heterogêneo pelo contraste paramagnético que comprime o espaço parafaríngeo esquerdo e desloca o processo estilóide homolateral. Apresenta também extensão ao interior do conduto auditivo externo, parcialmente obliterado e sem sinais de erosões ósseas locais. Mede 5,7 x 5,5 x 5,3 cm (CC x AP x LL).\nA sequência ponderada em difusão demonstra restrição à movimentação das moléculas de água no componente anterior da lesão, indicando hipercelularidade.\nO segmento mastóideo do nervo facial esquerdo apresenta discreto realce assimétrico pouco antes da sua emergência no forame estilomastóideo, de caráter inespecífico, não se observando outras alterações significativas do nervo nos demais segmentos.\n'
          }
        }
      }
    }
  },
  'torax': {
    'metadata': {
      'specialty_name': 'torax'
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'medidas': {
            'title': 'Medidas Normais Tórax',
            'body': 'Aorta ascendente: < 4,0 cm\nArco aórtico (crossa): < 3,5 cm\nAorta descendente: < 3,0 cm\nAorta infrarrenal: < 2,0 cm\nÁtrio direito: 4,4 cm (transverso)\nÁtrio esquerdo: 4,5 cm (anteroposterior)\nVentrículo direito: Menor que o VE\nVentrículo esquerdo: < 5,5 cm - Parede: < 1,2 cm\nTronco artéria pulmonar: < 2.9 cm\nArtérias pulmonares principais: < 2,2 cm\nArtéria pulmonar interlobar: < 1,6 cm\n\nLinfonodos mediastinais: <1 cm no menor eixo\nLinfonos hilares e intrapulmonares: < 3 - 5 mm no menor eixo\nTimo: < 20 anos: menor eixo até 1,8cm ; > 20 anos menor eixo de 1,3 cm. Atenução : 34UH incremento pós-contraste: 20 - 30 UH\n\nTraqueia: H: < 2 cm (13 - 25 mm) M: <1,8 cm (10 - 23 mm) ; Parede: 1 - 2 mm; Comprimento: 10-12 cm; Ângulo subcarinal: 35 - 90º (media 60º)\nBrônquio principal direito: 2,0 cm\nBrônquio intermédio: 3-4 cm\nBrônquio principal esquerdo: 5,0 cm\nEspessura parede das vias aéreas: 10 - 15% do seu diâmetro.\nBrônquios visíveis: 1 - 2 cm da pleura.\n\nLóbulo pulmonar secundário: 1 - 2,5 cm - contém: 6 - 24 ácinos\nÁcino pulmonar: 6 - 10 mm'
          },
          'partes_moles': {
            'title': 'PARTES MOLES',
            'body': 'Densificação difusa dos tecidos moles superficiais do tórax, achado comumente relacionado a congestão sistemica.Atrofia difusa da musculatura torácicaLipomatose mediastinalMama esquerda heterogênea nos quadrantes mediais, com realce lobular ao meio de contraste e pequenos focos calcificados de permeio, achado que pode ser melhor avaliado por estudos ultrassonográfico e mamográfico específicos. Lesão nodular com atenuação de partes moles, limites bem definidos, localizada nos tecidos moles superficiais do tórax, anterolateralmente ao músculo peitoral direito, medindo 1,6 cm no eixo transversal. Há outros dois nódulos com as mesmas características e de menores dimensões na região axilar direita e na face anterior do hemitórax esquerdo.Imagem ovalada circunscrita com densidade de gordura na parede torácica lateral direita, medindo cerca de 3,0 x 1,0 cm, compatível com lipoma e suas variantes histológicas. '
          },
          'meta_osso': {
            'title': 'Metástases ósseas (secundárias)',
            'body': 'Múltiplas lesões blásticas difusas pelo arcabouço ósseo torácico, associadas a focos de fraturas costais bilaterais, compatível com acometimento secundário pela doença de base.\nLesão osteolítica de margens indefinidas e irregulares, com erosão das corticais ossea adjacente e determinando fratura patológica da porção média do sexto arco costal esquerdo. Lesões osteolíticas com as mesmas características na porção proximal do sexto arco costal direito e porção distal da primeira costela esquerda. Tais lesões podem estar relacionadas a doença de base (plasmocitoma/mieloma).'
          },
          'degenera': {
            'title': 'Alterações degenerativas',
            'body': 'Alterações degenerativas do arcabouço torácico/coluna torácica.Acentuação da cifose torácica.Rarefação óssea difusa.'
          },
          'agressivas_osso': {
            'title': 'ALTERAÇÕES ÓSSEA AGRESSIVAS',
            'body': 'Lesão osteolítica irregular da cabeça umeral (parcialmente caracterizada no estudo) e na porção média da quinta costela à esquerda, esta com rompimento da cortical óssea adjacente, indicando lesão óssea de alta agressividade.'
          },
          'vascular': {
            'title': 'VASCULAR',
            'body': 'Artéria carótida comum esquerda ramo do tronco braquicefálico (variação anatômica). \nEctasia do tronco da artéria pulmonar (<>cm).\nVeia hemiázigos de trajeto lateral ao arco aórtico com drenagem para veia braquiocefálica esquerda através da veia intercostal superior esquerda.\nAteromatose aortocoronariana e dos vasos supra-aórticos. Calcificações na valva mitral e aórtica.\nArtéria subclávia direita aberrante (variação anatômica) emergindo do arco aórtico e com trajeto retroesofágico, determinando discreta ectasia esofágica a montante.\n'
          },
          'dispositivos': {
            'title': 'DISPOSITIVOS',
            'body': 'Cateter venoso central inserido na  veia subclávia direita com extremidade distal na veia cava superior. \nSonda disgestiva de trajeto esôfago-gástrico. \nTubo orotraqueal adequadamente posicionado.  \nDispositivo de infusão medicamentosa na parede torácica anterior esquerda com cateter com extremidade na veia cava superior.\nDispositivo gerador de marca-passo bicameral com eletrodos inseridos na veia jugular interna direita, com extremidades posicionadas no átrio e ventrículo direitos.\nHaste metálica torácica para correção de pectus excavatum'
          },
          'tep': {
            'title': 'TEP',
            'body': 'Falha de enchimento em ramo subsegmentar arterial para o lobo pulmonar inferior direito, compatível com tromboembolismo pulmonar agudo (TEP). \nExtensas falhas de enchimento em ramos arteriais lobares, segmentares e subsegmentares difusas bilateralmente, compatíveis com tromboembolismo pulmonar. Nota-se ainda ectasia do tronco da artéria pulmonar (mede até 4,3 cm), aumento das dimensões das câmaras direitas, abaulamento do septo interatrial e refluxo do contraste para as veias cava inferior e hepáticas, achados compatíveis com regime de hipertensão pulmonar. \nFalhas de enchimento em ramos segmentares / subsegmentares em ramos da língula e segmentos basilares à esquerda e do lobo superior direito compatíveis com tromboembolismo pulmonar. Associa-se refluxo na veia cava inferior e veias supra-hepáticas bem como ectasia do tronco das pulmonares (diâmetro máximo 3,3 cm), achados que podem estar relacionados com hipertensão pulmonar.\nSinais de tromboembolismo pulmonar agudo caracterizados por falhas de enchimento no ramo segmentar anterior do lobo superior direito e em ramos segmentar e subsegmentares basais posteriores do lobo inferior esquerdo. Há também falhas de enchimento parciais na artéria lobar superior direita e em ramo segmentar da artéria pulmonar esquerda para a língula.'
          },
          'sobrecarga_vd': {
            'title': 'SOBRECARGA DE VD',
            'body': 'Dilatação do tronco da artéria pulmonar (<> cm), cardiomegalia à custa da dilatação das câmaras direitas com abaulamento paradoxal do septo interventricular e dilatação do ânulo da tricúspide, refluxo de contraste para veia cava inferior e veias hepáticas e aumento do calibre da veia cava superior Sinais sugestivos de sobrecarga cardíaca direita.'
          },
          'infarto_pulmonar': {
            'title': 'INFARTO PULMONAR',
            'body': 'Áreas de opacidades em vidro fosco bilaterais e difusas, mais proeminentes nos terços médio e inferior dos pulmões, achado que pode estar correlacionado com distúrbio ventilação x perfusão.\nTênues opacidades centrolobulares nas bases pulmonares, mais acentuado à esquerda, com atelectasias laminares em faixa. No contexto clínico de TEP, deve-se considerar como primeira hipótese áreas de infarto, não sendo possível descartar processo inflamatório / infeccioso associado.\nOpacidades periféricas em cunha com atenuação em vidro fosco, circundadas por halo de consolidação, configurando "sinal do halo invertido", uma no segmento anterior do lobo superior direito e outra na porção lingular inferior, compatíveis com áreas de infarto pulmonar'
          },
          'bronq_resp': {
            'title': 'Bronquiolite respiratória - tabagismo',
            'body': 'Leve espessamento difuso de paredes brônquicas, associado a tênues opacidades centrolobulares com atenuação em vidro fosco, compatível com broncopatia inflamatória / bronquiolite respiratória secundário ao tabagismo. \nEspessamento difuso das paredes brônquicas de aspecto inflamatório, provavelmente crônico relacionado ao antecedente de tabagismo.\nAcentuação difusa do pontilhado centrolobular, que pode representar bronquiolite respiratória relacionada ao tabagismo.'
          },
          'hiperinsuf': {
            'title': 'Hiperinsuflação - tabagismo',
            'body': 'Sinais de hiperinsuflação pulmonar caracterizados por aumento do espaço retroesternal, retificação e rebaixamento das cúpulas frênicas.'
          },
          'enfisema': {
            'title': 'Enfisema - tabagismo',
            'body': 'Enfisema centrolobular e parasseptal disperso por ambos os pulmões, com predomínio nos campos pulmonares superiores.\nModerado enfisema parasseptal e centrolobular, com bolhas subpleurais associadas, bilateral e com predomínio nos campos pulmonares superiores.'
          },
          'dpoc': {
            'title': 'DPOC - tabagismo',
            'body': 'Aumento do diâmetro anteroposterior da traqueia, achado comum em quadros pulmonares obstrutivos crônicos.'
          },
          'piu': {
            'title': 'Pneumonia intersticial usual (PIU)',
            'body': 'Opacidades reticulares e em vidro fosco associadas a bronquiectasias / bronquiolectasias de tração e a faveolamento, além de calcificações dendriformes, distribuídas bilateralmente pela periferia de ambos os pulmões, mais evidentes nas bases. O conjunto dos achados é compatível com intersticiopatia fibrosante crônica com padrão de pneumonia intersticial usual.\nInfiltrado pulmonar intersticial difuso, caracterizado por extensas opacidades reticulares grosseiras e múltiplos cistos de faveolamento, de distribuição periférica e predomínio basal, associadas a bronquiectasias e bronquiolectasias de tração, determinando distorção arquitetural e redução volumétrica pulmonar, sobretudo sobretudo à direita e nos lobos inferiores. Há discretas opacidades em vidro fosco adjacentes às alterações supracitadas . Intersticiopatia pulmonar fibrogênica crônica com padrão tomográfico compatível com pneumonia intersticial usual (UIP/PIU), provavelmente relacionada à doença de base.'
          },
          'pine': {
            'title': 'Pneumonia intersticial não específica (PINE)',
            'body': 'Opacidades reticulares com vidro fosco, associadas a bronquiectasias e bronquiolectasias de tração, acometendo de forma simétrica ambos os pulmões, com predomínio periférico e nos lobos inferiores, notando-se uma relativa preservação do parênquima pulmonar subpleural (subpleural sparing). Destaca-se também maior distorção e redução volumétrica dos lobos pulmonares inferiores. O conjunto dos achados é compatível com intersticiopatia fibrosante crônica, com padrão tomográfico de pneumonia intersticial não específica (PINE).\nInfiltrado pulmonar intersticial difuso, caracterizado por extensas opacidades reticulares e em vidro fosco, associadas a bronquiectasias e bronquiolectasias de tração, de distribuição periférica e predomínio basal, determinando distorção arquitetural e redução volumétrica pulmonar.\nOpacidades reticulares e em vidro fosco predominando na periferia das bases pulmonares onde também se observam bronquiectasias e bronquioloectasias de tração. Ausência de faveolamento. Tais achados são sugestivos de intersticiopatia fibrosante crônica com padrão tomográfico de pneumopatia intersticial não específica.'
          },
          'asbesto': {
            'title': 'Asbesto',
            'body': 'Opacidades reticulares finas com distribuição subpleural em ambos os pulmões, pouco mais evidentes nos lobos inferiores, associadas a leve acentuação do pontilhado centrolobular e diminutos cistos subpleurais esparsos, compatíveis com intersticiopatia leve relacionada ao antecedente ocupacional.Extensas placas pleurais calcificadas bilaterais, envolvendo as faces diafragmáticas e mediastinais, compatíveis com doença pleural relacionada ao asbesto.Focos esparsos de espessamento pleural, por vezes calcificados, nas faces costal, mediastinal e diafragmática. Ausência de derrame pleural. Placas pleurais calcificadas, achado que pode estar associado a doença pleural relacionada ao asbesto no cenário clinico apropriado (exposição ao asbesto).'
          },
          'tuberculose_ativa': {
            'title': 'Tuberculose ATIVA',
            'body': 'Múltiplos micronódulos centrolobulares com padrão de “árvore em brotamento”, por vezes confluentes, predominantemente nos lobos superiores e médio, associados à múltiplas lesões escavadas no LSE, medindo a maior até 3,0 cm e à direita com até 3,6 cm, compatíveis com processo infeccioso de disseminação endobrônquica, cujas características favorecem a possibilidade de tuberculose pós primária em atividade.'
          },
          'tuberculose_sequelas': {
            'title': 'Tuberculose SEQUELAS',
            'body': 'Cavidade de paredes finas e contornos lobulados, associada a opacidades lineares, irregulares e retráteis e focos de calcificação no lobo superior esquerdo, determinando redução volumétrica regional.\nOpacidades parenquimatosas focais subpleurais retráteis de aspecto inflamatório crônico em ambos os ápices pulmonares.\nExtensas bronquiectasias varicosas acometendo todo o lobo superior do pulmão direito, com cavidades císticas com conteúdo aéreo medindo até 5,0 cm e faixas fibroatelectasicas de permeio, determinando redução volumétrica deste lobo e consequente desvio das estruturas mediastinais para este lado. Espessamento difuso das paredes brônquicas, com alguns brônquios de calibre aumentado, sobretudo no pulmão direito. Opacidades reticulares grosseiras e em vidro fosco periféricas com predomínio nos campos pulmonares inferiores, associadas a brônquios dilatados e alguns pequenos cistos subpleurais, de aspecto intersticial crônico. Alterações broncopulmonares de aspecto inflamatório crônico no lobo superior direito, possivelmente sequelares a processo infeccioso granulomatoso prévio.\nOpacidades lineares fibroatelectasicas nos segmentos posterior e apicoposterior dos lobos superiores de ambos os pulmões, discreta distorção arquitetural e bronquiolectasias de tração, de aspecto sequelar. Multiplos nódulos, por vezes calcificados, predominando nos segmentos posterior e anterior do lobo superior direito e apicoposterior do lobo superior esquerdo, medindo até 0,6 cm. Bolha de paredes finas e bem definidas, medindo 5,3 cm, associado a banda parenquimatosa adjacente, localizada na base pulmonar esquerda, de aspecto sequelar.\nFibroatelectasia de aspecto retrátil, com bronquiectasias de permeio, do lobo superior direito. Coexistem múltiplas bronquiectasias e bronquiolectasias associadas a estrias atelectásicas e bandas parenquimatosas retráteis no lobo médio e no segmento superior do lobo inferior direito, bem como no lobo superior e no segmento superior do lobo inferior, à esquerda. Há consequente redução volumétrica do pulmão direito e desvio das estruturas mediastinais para o mesmo lado.'
          },
          'tuberculose_atipica': {
            'title': 'Tuberculose ATÍPICA',
            'body': 'Bronquiectasias cilíndricas e bronquiolectasias (algumas com impactação mucoide), associadas a micronódulos e tênues opacidades em vidro fosco centrolobulares, com múltiplas imagens de árvore em brotamento, além de pequenos focos de consolidações irregulares, dispersos em ambos os pulmões, mais exuberantes no lobo médio e língula.'
          },
          'tuberculose_miliar': {
            'title': 'Tuberculose MILIAR',
            'body': 'Múltiplos micronodulos pulmonares de distruibuição randômica, acometendo difusamente o parênquima de ambos pulmões, por vezes com aspecto de árvore em brotamento. Notam-se focos esparsos de consolidação nos lobos superiores e no lobo médio. Considerar entre os diferenciais a hipótese de tuberculose miliar (principalmente) ou infecção fúngica.'
          },
          'tuberculose_ganglionar': {
            'title': 'Tuberculose GANGLIONAR',
            'body': 'Linfonodomegalias nas cadeias paratraqueais inferiores, medindo até 1,4 cm no menor eixo, com centro hipoatenuante, podendo corresponder a necrose/liquefação central. Há múltiplas linfonofomegalias abdominais parcialmente caracterizadas, com centro hipoatenuante, (necrose/liquefação central) medindo até 3,0 cm. A critério clínico, prosseguir investigação com estudo específico para o abdome.Volumosa coleção líquida no músculo psoas maior direito, parcialmente caracterizada nesse estudo, medindo 10,1x 3,6 x 4,0 cm (CC x LL x AP). Conclusão:: Linfonodomegalias mediastinais e abdominais com necrose/liquefação central, associado a coleção no interior do musculo psoas maior direito. Entre os diagnósticos diferenciais, considerar a hipótese de processo infeccioso granulomatoso (por exemplo de etiologia micobacteriana).'
          },
          'pnm_hipersens': {
            'title': 'Pneumonia por hipersensibilidade ',
            'body': 'CRÔNICA: Infiltrado pulmonar difuso caracterizado por opacidades reticulares finas e em vidro fosco associadas a áreas lobulares hipoatenuantes de permeio e tênues bronquiectasias e bronquiolectasias de tração, predominando nos campos médios e inferiores.'
          },
          'sarcoidose': {
            'title': 'Sarcoidose',
            'body': 'Tênue infiltrado pulmonar bilateral difuso, caracterizado por micronódulos pulmonares com distribuição perilinfática.\nMúltiplas opacidades micronodulares difusas por ambos os pulmões, por vezes confluentes em pequenos nódulos de até 0,7 cm, de distribuição perilinfática, predominando nos campos médios e superiores.\nMúltiplas opacidades nodulares pulmonares, bilaterais, com distribuição subpleural, septal e peribroncovascular (padrão perilinfático de acometimeto), medindo até 1,2 cm no maior eixo axial.Linfonodomegalias hilares bilaterais e mediastinais paraórticas e subaórticas, paratraqueais superior direita e inferior bilateral, pré-vasculares, retrotraqueais e subcarinais, por vezes calcificadas. Multiplas opacidades nodulares pulmonares perilinfáticas, associadas a linfonodomegalias hilares e mediastinais, achados compatíveis com a hipótese clínica de sarcoidose.\nMultiplos nódulos disseminados com distribuição perilinfática (peribroncovascular, subpleural e nos septos interlobulares), mais evidente nas regiões perihilar e periférica de ambos os pulmões e à direita, com predomínio nos campos pulmonares médio e superior. Numerosos linfonodos e algumas linonofonodomegalias mediastinais e hilares bilaterais, por vezes com tênues calcificações. Linfonodomegalias axilar e retropeitoral bilateral, assumindo aspecto globoso, medindo até 2,5 x 1,9 cm. Infiltrado pulmonar bilateral com padrão nodular e distribuição preferencialmente perilinfática associado a linfonodos e linfonodomegalias torácicas, achados que em conjunto são  sugestivos de sarcoidose.'
          },
          'metastases': {
            'title': 'Metástases',
            'body': 'Múltiplos nódulos pulmonares não calcificados bilaterais, medindo até 2,5 cm, compatíveis com lesões neoplásicas secundárias. Alguns nódulos determinam obstrução de brônquios distais, como o do brônquio do segmento basal posterior do lobo inferior esquerdo e o do subsegmento superior do lobo superior esquerdo, provavelmente invadidos.\nMúltiplos nódulos pulmonares não calcificados, de contornos regulares e distribuição randômica, disseminados por ambos os pulmões, compatíveis com acometimento neoplásico secundário.\nMúltiplos nódulos não calcificados multifocais, de distribuição randômica, de dimensões variadas (medindo até 0,9 cm), de predomínio periférico e nos lobos pulmonares inferiores. Tais achados são suspeito para acometimento secundário hematogênico.\n'
          },
          'Câncer de Pulmão  ': {
            'title': 'Câncer de Pulmão',
            'body': 'Volumosa lesão sólida expansiva,  infiltrativa, de contornos lobulados e irregulares, limites pouco definidos,  com componentes hipoatenuantes centrais e captação heterogênea e discreta do meio de contraste endovenoso, ocupando o terço superior e médio do pulmão esquerdo e medindo aproximadamente 12,0 x 10,0 x 9,0 cm (CC x LL x AP).  A lesão está centrada na região hilar esquerda, com extensão mediastinal com envolvimento completo do arco aórtico, aorta descendente, artéria pulmonar esquerda, porção proximal da artéria subclávia esquerda, veias pulmonares esquerdas, carina e o brônquio principal esquerdo . Há envolvimento parcial do tronco da artéria pulmonar, artéria pulmonar direita, porção proximal da artéria carótida esquerda, porção cranial do pericárdio e a porção proximal do brônquio principal direito. O conjunto dos achados determina colapso total do pulmão esquerdo, desvio das estruturas mediastinais para a esquerda, acentuado afilamento da artéria pulmonar esquerda (pérvia e filiforme) e discreta redução de calibre da artéria pulmonar direita e do tronco da artéria pulmonar. Os achados são compatíveis com neoplasia primária de pulmão.\nPresença de linfonodomegalias mediastinais nas cadeias paratraqueais superiores, paratraqueais inferiores, hilares esquerda e junto ao ligamento pulmonar esquerdo, medindo até 1,6 cm no menor eixo. Pequeno linfonodo cervical inferior esquerdo, com 1,0 cm. Pequeno espessamento e derrame pleural esquerdo. Moderado derrame pericárdico.\n\nNódulo pulmonar de margens espiculadas e limites pouco definidos, medindo 2,8 cm no maior eixo no plano sagital, localizado no segmento posterior do lobo superior do pulmão direito.\n\n'
          },
          'derrame': {
            'title': 'Derrame Pleural',
            'body': 'Pequeno/moderado derrame pleural bilateral, associado a atelectasias parciais dos segmentos basais posteriores.'
          },
          'bronquiec': {
            'title': 'Bronquiectasias',
            'body': '\nBronquiectasias varicosas difusas -\nExuberantes bronquiectasias pulmonares varicosas difusas, com predomínio central e nos campos pulmonares médio e superior.\nBronquiectasias varicosas e cilíndricas\nFibroatelectasia de aspecto retrátil, com bronquiectasias de permeio, do lobo superior direito. Coexistem múltiplas bronquiectasias e bronquiolectasias associadas a estrias atelectásicas e bandas parenquimatosas retráteis no lobo médio e no segmento superior do lobo inferior direito, bem como no lobo superior e no segmento superior do lobo inferior, à esquerda\nBronquiectasias varicosas, cilíndricas e císticas\nBronquiectasias difusas pelo parênquima pulmonar, assumindo as formas cilíndricas, varicosas e císticas, com predomínio nos campos pulmonares médios e inferiores, associado a discreto espessamento das paredes brônquicas. Impactações mucoides nas bases pulmonares.\nBronquiectasias com processo infeccioso / inflamatório crônico agudizado\nBronquiectasias cilíndricas, varicosas e saculares, difusas por todos os lobos pulmonares (acometendo em menor intensidade o lobo superior esquerdo), associadas a espessamento das paredes brônquicas, com focos de impactação mucoide. Associam-se opacidades em vidro fosco peribrônquicas e múltiplos micronódulos centrolobulares, por vezes assumindo o padrão de "árvore em brotamento", predominantemente nos lobos inferiores, mais evidentes à direita. '
          },
          'micronodulos': {
            'title': 'Micronódulos',
            'body': 'Raros e esparsos micronódulos pulmonares, menores que 0,3 cm, inespecíficos. Outros pequenos nódulos pulmonares calcificados, residuais.'
          },
          'micronodulos2': {
            'title': 'Micronódulos',
            'body': 'Raros e esparsos micronódulos pulmonares, menores que 0,4 cm, in específicos, achado usual e frequentemente desprovido de significado clínico.'
          },
          'micronodulos3': {
            'title': 'Micronódulos',
            'body': 'Pequenos nódulos pulmonares esparsos bilateralmente, menores que 0,5 cm, alguns calcificados, residuais, outros não calcificados, inespecíficos.'
          },
          'ca_esofago': {
            'title': 'Câncer de esôfago',
            'body': 'Formação expansiva cirunferencial do esôfago na transição toracoabdominal, no plano intervertebral de T10-T11, com atenuação de partes moles com extensão craniocaudal  aproximada de 3,6 cm.  A lesão ocupa o recesso ázigoesofágico; possui contato anterior com a veia cava inferior e contato posterior com a aorta torácica descendente (menor que 180º). \nMassa endoluminal do esôfago distal, heterogênea, com aparente origem na parede anterior, que se estende do nível vertebral de D7 até D11, atinge o plano superior da cárdia e mede cerca de 10 x 6 x 3 cm (CC x LL x AP). Provoca dilatação esofágica a montante com conteúdo de estase luminal (subestenose / estenose). Não há sinais evidentes de invasão da gordura periesofágica nem de estruturas mediastinais / pulmonares. Ausência de linfonodomegalias. (carcinoma epidermoide sarcomatoide invasivo.\nLesão expansiva circunferencial irregular e heterogênea do esôfago médio, que mede cerca de 4,5 cm no maior eixo axial e apresenta extensão longitudinal de cerca de 8,0 cm, associada a dilatação e estase de conteúdo líquido a montante. A lesão apresenta componente que invade o brônquio principal esquerdo, determinando abaulamento da sua parede posterior e obliteração parcial da sua luz. Não se observa plano de clivagem da lesão com a carina, com o átrio esquerdo e com a aorta descendente (contato menor que 90 graus). \nEspessamento parietal circunferencial no terço médio do esôfago torácico , com extensão longitudinal de cerca de 6,5 cm, fazendo contato com a parede posterior do brônquio-fonte esquerdo, determinado abaulamento desta, e com a aorta torácica descendente em ângulo inferior a 90º.\n'
          },
          'mediastinite': {
            'title': 'Mediastinite',
            'body': 'Densificação dos tecidos moles superficiais no aspecto anterior do tórax, com acentuação dos septos adiposos e espessamento cutâneo, achados que podem estar associados a processo inflamatório/infeccioso. Densificação de aspecto heterogêneo dos tecidos moles mediastinais ao redor da traquéia e dos brônquios principais bilateralmente, associado a linfonodos mediastinais aumentados em número. O conjunto dos achados podem representam processo inflamatório/infeccioso mediastinal em continuidade com as alterações cervicais (mediastinite).'
          },
          'pneumocistose': {
            'title': 'Pneumocistose',
            'body': 'Opacidades em vidro fosco difusas em ambos os pulmões, mais extensas à esquerda, poupando discretamente a região subpleural. Tais opacidades são por vezes confluentes em consolidações, notadamente nas bases e segmentos pulmonares superiores. No contexto, deve-se considerar a possibilidade de pneumocistose, não se podendo descartar processo infeccioso de outra etiologia sobreposto, notadamente nas bases e segmentos posteriores, de possível etiologia aspirativa.'
          },
          'pneumonia_asp': {
            'title': 'Pneumonia Aspirativa',
            'body': 'Extensos focos de consolidação e nódulos centrolobulares com aspecto de "árvore em brotamento", associados a preenchimento luminal brônquico, nos lobos inferiores, mais exuberantes nas porções posteriores. Coexistem tênues opacidades centrolobulares em vidro fosco no segmento posterior do lobo superior direito. Traqueia e brônquios centrais pérvios, com calibre normal. Importante quantidade de secreção no interior da traqueia, brônquios principais e, principalmente, dos brônquios intermédio e inferiores. Tais achados são sugestivos para processo infeccioso / inflamatório de provável origem aspirativa.'
          },
          'pneumonia': {
            'title': 'Pneumonia',
            'body': 'Opacidades em vidro fosco de distribuição peribroncovascular difusas à esquerda, podendo corresponder a congestão ou processo inflamatório/ infeccioso.'
          },
          'broncopneumonia': {
            'title': 'Broncopneumonia',
            'body': 'Múltiplas opacidades centrolobulares esparsas pelos lobos inferiores, médio e pela língula. Destacam-se consolidações com broncogramas aéreos de permeio nos lobos inferiores, ocupando quase totalmente o lobo pumonar à esquerda. O conjunto de achados é sugestivo de processo inflamatório/infeccioso.'
          },
          'pneumon_viral': {
            'title': 'Pneumonia Viral',
            'body': 'Múltiplas opacidades em vidro fosco, distribuidas difusamente por todo o parênquima pulmonar bilateral, acometendo principalmente os campos pulmonares  médios e inferiores. Tais achados podem representar processo inflama tório/infeccioso, principalmente de etiologia viral.'
          },
          'pnm_dad': {
            'title': 'Pneumonia evoluindo com dano alveolar difuso',
            'body': 'Opacidades em vidro fosco bilaterais e difusas associadas a consolidações pulmonares bilaterais, com predomínio basal e posterior, de aspecto inflamatório e que podem corresponder a dano alveolar difuso.'
          },
          'pnm_micobac': {
            'title': 'Pneumonia micobacteriana',
            'body': ' Múltiplos nódulos centrolobulares, por vezes com aspecto em "árvore em brotamento", distribuídos por ambos os pulmões, predominando nos segmentos apical e posterior do lobo superior, no lobo médio e no segmento superior do lobo inferior à direita. Associam-se ainda nódulos cavitados nos segmentos apical do lobo superior e superior do lobo inferior direitos e no segmento superior do lobo inferior esquerdo. O conjunto dos achados favorece o diagnóstico de acometimento inflamatório/infeccioso pulmonar, sobretudo à direita, devendo-se considerar etiologia micobacteriana dentre os diferenciais.'
          },
          'congestao': {
            'title': 'Congestão/Edema pulmonar',
            'body': 'Opacidades peribroncovasculares em vidro fosco, de localização central, bilaterais, com predomínio nos campos pulmonares médios, associado a espessamento septal difuso. Tais achados podem estar associados à congestão pulmonar. Moderado derrame pleural bilateral associado a atelectasia dos segmentos basais posteriores.'
          },
          'at_mosaico': {
            'title': 'Atenuação em mosaico',
            'body': 'Atenuação em mosaico do parênquima pulmonar, que pode representar distúrbio ventilatório/perfusional. '
          },
          'massa_med_ant': {
            'title': 'Massa mediastino anterior',
            'body': 'Volumosa massa mediastinal anterior, heterogênea, de contornos lobulados/irregulares, estendendo-se ao mediastino médio e ao hilo pulmonar esquerdo, medindo cerca de 13,0 x 13,0 x 9,0 (LL x AP x CC). Superiormente, estende-se além da fúrcula esternal, ao nível de C7, com plano de clivagem com a tireóide. Inferiormente, estende-se até o saco pericárdico/nível de T5. A massa parece envolver as estruturas vasculares da base, comprimindo a veia cava superior à direita, cuja perviedade é de avaliação limitada em decorrência da não injeção do meio de contraste. Há sinais de invasão da parede torácica anterior, com extensão aos planos musculoadiposos paraesternais sobretudo à esquerda, envolvendo o manúbrio esternal e parte do corpo do esterno, os quais apresentam aspecto lítico permeativo. A lesão apresenta amplo contato com a traquéia, arco aórtico, pericárdico e parênquima pulmonar do lobo superior esquerdo, sem sinais definitivos de invasão. Desloca e comprime as estruturas do hilo pulmonar esquerdo, com afilamento sem obliteração da árvore brônquica. O aspecto de imagem permite considerar a princípio doença linfoproliferativa (principal), neoplasia tímica e tumor de linhagem germinativa.'
          },
          'acalasia': {
            'title': 'Acalásia - ectasia esofago',
            'body': 'Acentuada dilatação esofágica em toda a sua extensão, com estase no seu interior, deslocando e afilando a traquéia no seu segmento proximal. O afilamento distal é progressivo sugerindo acalásia da cárdia (congênito ou adquirida, ex. Chagas ou Idiopática).'
          },
          'linfonodomegalia': {
            'title': 'Acalásia - ectasia esofago',
            'body': 'Múltiplas linfonodomegalias globosas, por vezes formando conglomerados linfonodais, com captação heterogênea do meio de contraste e hipoatenuação central (necrose/liquefação central) nas cadeias cervicais inferiores (parcialmente incluídas), cadeias mediastinais pre-vascular, paratraqueais superiores e inferiores, paraaórtica, subaórtica, subcarinal e hilares. Determinam impressão sobre a veia inominada esquerda, que se mantém pérvia.\nPresença de linfonodomegalias mediastinais nas cadeias paratraqueais superiores, paratraqueais inferiores, hilares esquerda e junto ao ligamento pulmonar esquerdo, medindo até 1,6 cm no menor eixo. Pequeno linfonodo cervical inferior esquerdo, com 1,0 cm\nLinfonodomegalias nas cadeias paratraqueais inferiores, medindo até 1,4 cm no menor eixo, com centro hipoatenuante, podendo corresponder a necrose/liquefação central. Há múltiplas linfonofomegalias  abdominais parcialmente caracterizadas, com centro hipoatenuante, (necrose/liquefação central) medindo até 3,0 cm\n'
          },
          'intersti_cronica': {
            'title': 'INTERSTICIOPATIA PULMONAR FIBROGÊNICA CRÔNICA ',
            'body': 'Infiltrado pulmonar intersticial difuso, caracterizado por extensas opacidades reticulares, múltiplos cistos de faveolamento e bronquiectasias/bronquiolectasias, com distribuição periférica, determinando distorção arquitetural, um pouco mais acentuado à esquerda. O conjunto de achados é sugestivo de intersticiopatia pulmonar fibrogênica crônica.'
          },
          'ca_pulm_vcs': {
            'title': 'CÂNCER DE PULMÃO COM SÍNDROME DA VEIA CAVA SUPERIOR + MTX LINFONODO + OSSO + INVASÃO PAREDE TORÁCICA ANTERIOR',
            'body': 'Volumosa lesão pulmonar sólida, expansiva e infiltrativa de limites mal definidos centrada no lobo superior do pulmão direito com focos hipoatenuantes de permeio inferindo necrose. A lesão apresenta invasão da parede torácica anterior determinando áreas líticas e de rotura cortical na extremidade esternal da clavícula, no terço superior direito do manúbrio do esterno e porção anterior do primeiro e segundo arcos costais. Há invasão do terço distal da veia jugular interna e veia braquiocefálica à direita, bem como da veia cava superior e do arco da veia ázigos, com extensa circulação colateral mediastinal e drenagem via veia ázigos e hemiázigos para a veia cava inferior. A lesão mantém contato com a artéria braquiocefálica e a bifurcação das artérias carótida comum e subclávia direitas, envolvendo circunferencialmente essa última com afilamento e irregularidades, porém pérvia. Há contato com a artéria pulmonar direita e envolvimento circunferencial com áreas de irregularidade e afilamentos dos ramos segmentares apical e anterior do lobo superior. Há extensão para o mediastino, apresentando íntimo contato com o terço inferior da traqueia, carina e brônquio principal direito, determinando redução da sua luz nesse último, bem como amputação dos brônquios dos segmentos apical e anterior do lobo superior. O conjunto de achados é compatível com lesão pulmonar primária com extensa invasão locorregional e síndrome da veia cava superior associada. Linfonodomegalias mediastinais nas cadeias pré-vascular, paratraqueal inferior direita e subcarinal, a maior nessa última com 1,9 cm no menor diâmetro axial, achados compatíveis com acometimento secundário. Há outras lesões nodulares esparsas pelo parênquima pulmonar suspeitas para acometimento secundário, destacando-se a maior no segmento posterior do lobo superior direito com 1,3 cm no maior diâmetro axial. Áreas de espessamento septal nodular/irregular, sugestivos de linfangite carcinomatosa associada. Lesão esclerótica sem rotura cortical significativa no segundo arco costal esquerdo, suspeita para acometimento secundário. '
          },
          'ca_pulm_pnm_obst': {
            'title': 'ADENOCARCINOMA DE PULMÃO SUBPLEURAL E NO HILO COM PNEUMONITE OBSTRUTIVA',
            'body': 'Nódulo irregular na periferia do ápice pulmonar direito, medindo 2,7 cm, em contato com a pleura.\nLesão sólida no hilo pulmonar direito, que mede cerca de 4,2 cm no maior eixo axial. Esta lesão determina afilamento do ramo arterial apical do lobo pulmonar superior direito e invade o ramo arterial interlobar direito, ambos pérvios,  apresenta sinais de invasão dos brônquios principal e intermédio direitos e oblitera o brônquio lobar superior deste lado. Associa-se extenso preenchimento brônquico e bronquiolar no lobo superior direito (pneumonite obstrutiva).\nEspessamento parietal brônquico difuso, com outros focos de preenchimento luminal e tênues opacidades centrolobulares esparsas (alteração inflamatória das vias aéreas). Não há focos de consolidação alveolar.\n'
          },
          'ca_pulm_pleural': {
            'title': 'ADENOCARCINOMA DE PULMÃO HILAR METASTÁTICO PARA A PLEURA',
            'body': ' Lesão expansiva sólida e infiltrativa na região perihilar do pulmão esquerdo, medindo 3,5 x 4,0 cm, com extensão direta ao lobo inferior e língula com atelectasia parcial desses segmentos. Envolve os ramos da artéria pulmonar para os respectivos lobos, envolvendo e afilando os brônquios correspondentes.Não há nítido plano de clivagem com a artéria pulmonar direita, bem como com aspecto lateral esquerdo do pericárdio. \n Espessamento nodular pleural, suspeito para acometimento secundário, associado a moderado derrame pleural circunferencial.\n Linfonodomegalias mediastinais medindo até 1,1 cm.\n Linfonodos cardiofrênicos medindo até 1,7 cm. \n Nódulo com componente de partes moles não calcificado e irregular medindo 0,9 cm em segmento lateral do lobo médio de aspecto suspeito para acometimento secundário.'
          },
          'hemorr_alveolar': {
            'title': 'HEMORRAGIA ALVEOLAR',
            'body': 'Leve espessamento dos septos interlobulares, associado a opacidades em vidro fosco, presentes difusamente por ambos os pulmões, assumindo maior atenuação nos lobos superiores e no lobo inferior esquerdo, onde possuem distribuição predominantemente medular. '
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      },
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      }
    }
  },
  'mama': {
    'metadata': {
      'specialty_name': 'mama'
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      },
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'fibroadenolipoma': {
            'title': 'Fibroadenolipoma',
            'body': 'Nódulo oval, circunscrito de densidade mista, com pseudocápsula '
          },
          'rotura_intracapsular': {
            'title': 'Rotura intracapsular de prótese',
            'body': 'Observam-se irregularidades da superfície do elastômero, associadas a regiões com acúmulo da material hipercogênico produtor de sombra acústica posterior, com aspecto em tempestade de neve,  interposto entre a cápsula fibrosa e a superfície do implante, na UQL. Observam-se ainda faixas hiperecoicas lineares adjacentes junto à superfície do elastômero. O conjunto dos achados sugere rotura intracapsular da prótese. \n'
          }
        }
      }
    }
  },
  'abdome': {
    'metadata': {
      'specialty_name': 'abdome'
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'colangiocarcinoma': {
            'title': 'Colangiocarcinoma',
            'body': 'Grande massa sólida e hipovascularizada centrada nos segmentos IV e V hepáticos e com componente estendendo-se aos segmentos laterais do lobo esquerdo, que determina retração capsular adjacente e mede aproximadamente 15,5 cm no maior eixo. Dentre os diferenciais, deve-se considerar as possibilidadades de lesões secundárias confluentes ou de neoplasia primária hepática (colangiocarcinoma). Caso haja indicação clínica, esta lesão é passível de biópsia percutânea.'
          },
          'neo_gastrico': {
            'title': 'Neoplasia gástrica (adenocarcinoma)',
            'body': 'Acentuado espessamento parietal do estômago na transição da pequena curvatura para o antro, notando-se realce ao meio de contraste, sugestivo de lesão primária. Sugere-se correlação com estudo endoscópico.'
          },
          'omental_cake': {
            'title': 'Omental cake',
            'body': 'Espessamento irregular do grande omento no seu aspecto superior, em contato com o cólon transverso, provável "omental cake".'
          },
          'crohn': {
            'title': 'Doença de Crohn',
            'body': 'Sinais de acometimento transmural das paredes do cólon sigmóide com densificação do mesentério e ingurgitamento dos vasos retos adjacentes, destacando-se realce parietal da sua parede. Associa-se coleção com conteúdo líquido e focos gasosos próximo à reflexão peritoneal medindo 6,3 x 3,6 x 2,2 cm (AP x LL x CC), volume estimado de 25mL. Não há dilatação de alças a montante. Há extensão do espessamento parietal mural para o reto, com realce de suas paredes, sem redução significativa da sua luz. Nota-se conteúdo líquido no seu interior, presença de gás na parede no seu terço distal e coleção à esquerda com nível hidroaéreo, apresentando trajeto no subcutâneo ainda sem exteriorização.'
          },
          'meta_hepatica': {
            'title': 'Metástase hepática (secundárias)',
            'body': 'Múltiplas lesões sólidas e com realce periférico esparsas por ambos lobos hepáticos, maiores e mais numerosas no lobo direito, onde confluem em grande massa centrada nos segmentos VII e VIII, medindo aproximadamente 15,5 cm no maior eixo, suspeitas para acometimento secundário. Algumas destas lesões deslocam as veias hepáticas, afiladas (pérvias).'
          },
          'trauma_renal': {
            'title': 'Trauma renal',
            'body': 'Lesão traumática da artéria renal esquerda no seu terço proximal, associada a hipocontrastação / lacerações traumáticas renais à esquerda, acometendo predominantemente os dois terços superiores do rim esquerdo, associadas a fino hematoma perirrenal. Não há sinais de lesão do sistema coletor. Há fina artéria renal acessória à esquerda (variação anatômica), nutrindo o terço inferior do rim esquerdo.'
          },
          'trauma_esplenico': {
            'title': 'Trauma esplênico',
            'body': 'Múltiplas lacerações traumáticas esplênicas, associadas a hematoma subcapsular que se estende por mais que 50% da superfície esplênica, bem como densificação da gordura periesplênica e peripancreática, com pequena quantidade de líquido depositada na goteira parietocólica esquerda e adjacente a cúpula diafragmática deste lado. Não há lesão da artéria e veia esplênica. '
          },
          'pancreatite_edematosa': {
            'title': 'Pancreatite Aguda Edematosa',
            'body': '1- Aumento volumétrico difuso do pâncreas, sobretudo da região caudal, associado a densificação dos planos gordurosos peripancreáticos, estendendo-se ao hipocôndrio esquerdo, à raiz do mesentério e às fáscias pararrenais anteriores, achados sugestivos de pancreatite aguda.\n2- Aumento volumétrico difuso do pâncreas, com perda de seus contornos acinares e densificação dos planos adiposos peripancreáticos. Pequena coleção hemática junto a fáscia pararrenal anterior esquerda e cauda do pâncreas, com extensão superior ao espaço esplenorrenal\nPancreatite Crônica / Crônica agudizada:\nPâncreas difusamente afilado com cálculos/calcificações difusas, em maior concentração na cabeça. Nota-se ainda dilatação do ducto pancreático principal (0,5 cm), com pequenos focos gasosos no seu interior e em ductos secundários. Os achados sugerem pancreatite crônica. Destaca-se provável componente de agudização do processo inflamatório na cabeça pancreática, que apresenta aumento volumétrico e densificação dos planos adiposos adjacentes. Há ainda hipocontrastação do parênquima nessa região, que pode representar componente de necrose parenquimatosa. Não há coleções peripancreáticas. '
          },
          'colite': {
            'title': 'Colite',
            'body': 'Espessamento parietal e realce mucoso difuso de longo segmento contínuo do cólon, iniciando-se no ângulo esplênico do cólon transverso e progredindo até o sigmóide, acompanhados por densificação da gordura pericólica e ingurgitamento vascular local, achados compatíveis com colite (inespecífica).'
          },
          'sequela_inf_espl': {
            'title': 'Sequela Infarto esplênico',
            'body': 'Áreas de retrações esplênicas, sequelas de infartos prévios.'
          },
          'fistula_ileocolica': {
            'title': 'Fístula Íleo-cólica cólon sigmoide',
            'body': 'Segmento da transição cólon descendente / sigmóide apresentando-se com discreto hiperrealce e espessamento parietal, além de borramento dos planos adiposos adjacentes. Notam-se pelo menos 3 fístulas deste segmento cólico com alças adjacentes de delgado, com passagem de material fecalóide, além de amplo contato com o ureter esquerdo no plano do cruzamento com os vasos ilíacos. Linfonodos proeminentes adjacentes e no mesentério, com até 1,5 cm. Linfonodomegalias retrocrurais, cardiofrênicas, peripancreáticas e no hilo hepático com até 2,0 cm. Densificação difusa do mesentério, planos adiposos pélvicos e pré-sacrais, com possível espessamento peritoneal associado, incaracterístico. \n'
          },
          'lesao_peq_inesp': {
            'title': 'Lesão hepática pequena, inespecífica',
            'body': 'Fígado de dimensões normais e contornos regulares. Formação hipoatenuante no segmento V,  medindo 0,6 cm, de aspecto tomográfico inconclusivo devido às suas reduzidas dimensões.'
          },
          'tumor_neuroend_duvidoso': {
            'title': 'Duvidoso tumor neuroendócrino de pâncreas com cistos de retenção / pseudocistos',
            'body': 'Aparente lesão sólida hipervascular, localizada no corpo do pâncreas, mantendo contato com o ducto pancreático principal, medindo 1,1 cm. Estruturas vasculares livres. Atrofia e dilatação do ducto pancreático na cauda associada a formações císticas, medindo até 9,2 cm em conjunto, podendo corresponder a cistos de retenção/pseudocistos. Considerar a hipótese de lesão neuroendócrina. Um estudo de medicina nuclear (para avaliação de tumores neuroendócrinos) ou uma ressonância magnética podem trazer mais informações.'
          },
          'colecao_po_pancreas': {
            'title': 'Coleção pós-operatório pâncreas',
            'body': 'Acúmulo líquido com aspecto de coleção em organização adjacente à pequena curvatura gástrica, irregular, associada a densificação dos tecidos adjacentes, medindo cerca de 6,3 x 6,3 x 5,9 cm (volume de 121,7 ml). A coleção mantém amplo contato com a margem de ressecção do pâncreas remanescente (cabeça e processo uncinado), não sendo possível descartar comunicação da coleção com o ducto pancreático principal. Há envolvimento do tronco celíaco e da junção venosa esplenomesentérica, esta última com afilamento focal, sem trombos evidentes. Pequena quantidade de líquido livre abdominal, mais evidente na fáscia pararrenal anterior à esquerda, e na pelve.'
          },
          'possivel_ipmn': {
            'title': 'Lesão cística do pâncreas - possível IPMN',
            'body': 'Pâncreas apresentando cisto de 2,5 x 2,0 cm na topografia do colo em aparente comunicação com o ducto pancreático principal, que pode estar relacionado a lesão mucinosa papilar intraductal e suas variantes histológicas.'
          },
          'colite2': {
            'title': 'Colite',
            'body': 'Reto e cólons com paredes bastante espessadas, em alguns segmentos com realce mucoso, sugerindo processo inflamatório.'
          },
          'obstrutivo_alca': {
            'title': 'Abdome agudo obstrutivo em alça fechado por provável hérnia interna/brida',
            'body': 'Anastomose entérica no hipocôndrio esquerdo, ampla e pérvia.\nObstrução em "alça fechada" de longo segmento de alças delgadas no mesogástrio (no plano da bifurcação aórtica), provavelmente determinada por brida/aderência ou hérnia interna, notando-se transições abruptas de calibre ao nível da transição jejunoileal (logo após a anastomose entérica) e também ao nível do ileo terminal. Há sinais de algum grau de sofrimento vascular, caracterizados por espessamento e hiporrealce parietal e densificação dos planos adiposos mesentéricos. Destaca-se também importante afilamento focal da veia mesentérica superior junto à área de estreitamento, pérvia. Artéria mesentérica superior pérvia.\nDilatação do estômago e alças jejunais a montante da obstrução. Cólon e ampola retal colabados. \nPequena / moderada quantidade de líquido livre, sem coleções organizadas ou pneumoperitônio.'
          },
          'coledocolitiase_duvidos': {
            'title': 'Coledocolitíase duvidosa',
            'body': 'Pequena dilatação das vias biliares intra e extra-hepáticas até segmento distal do colédoco. Há aparente conteúdo hiperatenuante em sua luz em contiguidade com a papila que se apresenta proeminente (cálculo?), que poderá ser avaliado com estudo especifico.'
          },
          'linfonodos_proeminentes': {
            'title': 'Linfonodos proeminentes',
            'body': 'Linfonodos proeminentes retroperitoneais e mesentéricos medindo até 2,0 cm.'
          },
          'tu_cabeca_pancreas': {
            'title': 'Tumor cabeça do pâncreas',
            'body': 'Lesão infiltrativa hipovascularizada e mal delimitada no aspecto lateral da cabeça pancreática, medindo 2,5 cm, compatível com neoplasia primária. A lesão amputa o colédoco intrapancreático Determina dilatação acentuada das vias biliares e da vesícula biliar, esta que atinge a fossa ilíaca direita e apresenta alguns cálculos calcificados. Determina também dilatação do ducto pancreático principal (0,4 cm). Restante do pâncreas com atenuação e realce homogêneo. Planos adiposos peripancreáticos conservados. Linfonodo proeminente no hilo hepático medindo 1,5 cm, suspeito para acometimento secundário. Artérias do tronco celíaco, mesentérica superior e gastroduodenal pérvias e sem sinais de invasão. Tronco celíaco sem variações anatômicas. Veias porta, mesentérica superior e esplênica pérvias, de calibre'
          },
          'dreno_transparieto': {
            'title': 'Dreno transparieto',
            'body': 'Lesão sólida de limites mal definidos, medindo aproximadamente 3,0 cm de localização periampular, provocando dilatação do ducto pancreático principal. Espessamentos das paredes da segunda porção duodenal. Dreno inserido no flanco direito, com trajeto através da loja vesicular, onde nota-se coleção com focos gasosos de permeio.'
          },
          'necrose_pancreatica_delimitada': {
            'title': 'Volumosa lesão cística cisto pâncreas - necrose pancreática bem delimitada (WON)',
            'body': 'Volumosa lesão cística intrapancreática, de contornos irregulares, delimitada por cápsula fibrosa, comprometendo praticamente todo parênquima do corpo e, parcialmente, da porção cefálica e da cauda, medindo 16,0 x 9,0 x 10,5 cm (volume estimado em 800 ml). Há espessamento parietal em algumas porções, finos septos de permeio e lobulações inferiores que se insinuam em meio ao parênquima remanescente da cauda. Tal lesão é compatível com necrose pancreática bem delimitada e apresenta as seguintes relações anatômicas: \n- Deslocamento anterolateral com compressão do duodeno; \n- Amplo contato com as artérias hepática própria e esplênica, que mantém-se pérvias, com calibre preservado. \n- Envolve a veia esplênica, com aparente trombose da mesma e da junção esplenomesentérica, resultando em distúrbio perfusional hepático e circulação colateral periesplênica e perigástrica com vasos de moderado calibre, acentuadamente na grande curvatura. \nRestante da cauda do pâncreas com dimensões normais e atenuação do parênquima preservada, destacando-se dilatação do ducto pancreático que desemboca na coleção acima descrita (sinais de desconexão ductal).\nCoexiste densificação dos planos adiposos peripancreáticos e no espaço pararrenal anterior, com áreas de esteatonecrose de permeio, estendendo-se inferiormente nas goteiras parietocólicas.\nMúltiplas linfonodomegalias peripancreáticas, para-aórticas e mesentéricas medindo até 2,5 cm.'
          },
          'hemangioma_hepatico': {
            'title': 'Hemangioma hepático fígado',
            'body': 'Lesão com realce periférico ao meio de contraste no segmento VI, medindo 2,5 cm, compatível com hemangioma.'
          },
          'copro_fecaloma': {
            'title': 'Coprostase fecaloma',
            'body': 'Reto distendido, com coprostase e densificação dos planos gordurosos adjacentes na sua porção distal.'
          },
          'trombose_cronica_porta': {
            'title': 'Trombose crônica da veia porta',
            'body': 'Fígado de dimensões aumentadas à custa do lobo caudado, que apresenta contornos rombos. Lobos direito e esquerdo de dimensões normais. Distúrbio perfusional arterial transitório periférico, relacionado à trombose crônica da veia porta. Trombose crônica do ramo esquerdo da veia porta (não opacificado).Tronco da veia porta, ramo portal direito e ramo direito para o segmento posterior bastante afilados. Ramo para o segmento anterior direito não opacificado. Circulação colateral no hilo hepático de fino e médio calibre, compatível com transformação cavernomatosa. Varizes de fino calibre perigástricas, periesplênicas e periesofágicas.'
          },
          'figado_tx_dilatacao_biliar': {
            'title': 'Fígado transplantado com dilatação de vias biliares e coleção',
            'body': 'Fígado transplantado de dimensões normais, contornos regulares, com atenuação discretamente heterogênea e leve distúrbio perfusional. Foco hipodenso alongado na periferia do segmento VI, provável sítio de biópsia. Anastomose arterial pérvia, com irregularidade na emergência da artéria hepática própria. Anastomoses portal e venosa sem particularidades. Ectasia e realce parietal das vias biliares intra-hepáticas, estendendo-se até o plano da anastomose duodenal, onde se observa formação líquida de cerca de 4 cm bloqueada entre o hilo hepático e a segunda porção duodenal, que admite biloma e menos provavelmente dilatação focal do colédoco pré-anastomótico. Caso haja indicação clínica, um estudo de ressonância magnética com colangiorressonância e contraste hepatoespecífico (primovist) poderá trazer informações adicionais.'
          },
          'fluxo_hepatofugal': {
            'title': 'Hepatopata, possível fluxo hepatofugal',
            'body': 'Fígado de contornos irregulares, dimensões globalmente reduzidas com proeminência relativa do lobo caudado e segmentos laterais do lobo esquerdo, caracterizando hepatopatia crônica. Apresenta atenuação grosseiramente heterogênea. Múltiplas lesões hipovascularizadas esparsas, medindo até 1,0 cm, indeterminadas (LIRADS 3). Não há lesões hipervascularizadas com fluxo rápido (washout) que sugiram carcinoma hepatocelular. Alguns focos de calcificação / corpos livres calcificados junto à borda hepática inferior. Veia porta afilada, pérvia, porém hipocontrastada em relação ao sistema venoso mesentérico e esplênico, sugerindo fluxo portal hepatofugal. Varizes de grosso calibre no hilo esplênico, retroperitônio e perigástricas, com shunt gastrorrenal/mesenterorrenal. Artéria hepática esquerda (para os segmentos II e III) tem origem precoce, junto à emergência da artéria gastroduodenal. Veias hepáticas afiladas, de difícil caracterização.'
          },
          'tu_pancreas_duodenal': {
            'title': 'Tumor de pâncreas com possível acometimento duodenal - progressão',
            'body': 'Houve discreto aumento das dimensões da lesão expansiva e heterogênea localizada junto a cabeça pancreática, com extensão ao lúmen da segunda e terceira porções duodenais, medindo cerca de 9,3 x 5,9 cm (media 8,0 x 5,0 cm). Destacam-se irregularidades dos contornos da parede anterior da terceira porção duodenal, associadas a densificação e estriações da gordura adjacente, sugerindo a possibilidade de acometimento além da serosa. Há ainda contato menor que 180º com a parede posterior da artéria e veia mesentérica superior, além de amplo contato com tributária jejunal. Determina, ainda, moderada dilatação das vias biliares intra e extra-hepáticas a montante, bem como do ducto pancreático principal (calibre de 0,7 cm) e consequente atrofia parenquimatosa pancreática. Persiste a linfonodomegalia heterogênea sugestiva de acometimento secundário na cadeia interaortocaval, medindo 1,7 x 1,8 cm. Linfonodos proeminentes no hilo hepático e no espaço porto-cava, medindo até 2,4 x 0,8 cm. Artéria hepática direita é ramo da mesentérica superior (variação anatômica).'
          },
          'hepatopatia_cronica': {
            'title': 'Hepatopatia Crônica',
            'body': 'Fígado com hipertrofia do lobo caudado e segmento lateral do lobo esquerdo, contornos algo lobulados, bordos rombos e parênquima discretamente e difusamente heterogêneo, compatível com hepatopatia crônica.'
          },
          'colangiopatia_portal': {
            'title': 'Colangiopatia portal, trombose crônica da porta, transformação cavernomatosa',
            'body': 'Trombose crônica da veia porta, com transformação cavernomatosa, observando-se múltiplas colaterais, com varizes de fino e médio calibre no hilo hepático, periportais e peribiliares. Tais colaterais determinam leve dilatação das vias biliares à montante, compatível com colangiopatia portal. Sinais de hipertensão portal, com circulação colateral perigástrica, hilar esplênica, além de varizes periesofágicas de moderado calibre, além de esplenomegalia homogênea.'
          },
          'diverticulo_gastrico': {
            'title': 'Divertículo gástrico',
            'body': 'Pequeno divertículo no fundo gástrico, medindo 2,4 cm.'
          },
          'lirads_5': {
            'title': 'Hepatopatia LIRADS-5',
            'body': 'Sinais de hepatopatia crônica caracterizada por proeminência dos segmentos laterais esquerdos e do lobo caudado e contornos lobulados. Nódulo hipervascularizado com "washout" e pseudocápsula no segmento II, medindo 1,7cm, compatível com carcinoma hepatocelular (LIRADS 5). Tem contato com o ramo portal segmentar, que se mantem pérvio.'
          },
          'nodulo_adrenal_incaract': {
            'title': 'Adrenal - nódulo incaracterístico',
            'body': 'Nódulo sólido na adrenal direita, medindo 1,1 cm, incaracterístico.'
          },
          'estenose_tc': {
            'title': 'Estenose tronco celíaco',
            'body': 'Ateromatose aortoilíaca. Estenose de cerca de 50% na origem do tronco celíaco, com discreta dilatação pós estenótica.'
          },
          'polipo_colon': {
            'title': 'Pólico cólon',
            'body': 'Realce mais acentuado de área focal no cólon transverso medindo 1,6cm, podendo corresponder a pequena lesão parietal polipoide.'
          },
          'pancreatite_aguda': {
            'title': 'Pancreatite aguda',
            'body': 'Aumento volumétrico difuso do pâncreas, sobretudo da região caudal, associado a densificação dos planos gordurosos peripancreáticos, estendendo-se ao hipocôndrio esquerdo, à raiz do mesentério e às fáscias pararrenais anteriores, achados sugestivos de pancreatite aguda.'
          },
          'enterocolite': {
            'title': 'Enterocolite',
            'body': 'Espessamento difuso com edema da submucosa e aumento do realce mucoso em alças delgadas e cólicas, contendo líquido intraluminal, compatível com enterocolite.'
          },
          'pseudomixoma_peritoneal': {
            'title': 'Pseudomixoma peritoneal - mucocele de apêndice',
            'body': 'Material com atenuação sugestiva de líquido espesso (15-25 U.H.) preenche a cavidade peritoneal e seus recessos, de aspecto multiloculado. Tem efeito de massa sobre os órgãos parenquimatosos, determinando aspecto bocelado dos seus contornos, notadamente no fígado, bem como no tronco portal. Promove ainda compressão e deslocamento anterior da bexiga. Associa-se espessamento difuso do grande omento e determina o deslocamento das alças entéricas predominantemente para a região central do abdome. \nDestaca-se duvidosa imagem arredondada com calcificações periféricas, situada medialmente ao ceco, medindo cerca de 6,5 x 4,2 x 3,2 cm, com conteúdo de atenuação um pouco maior que o restante da cavidade (31 U.H.). O aspecto descrito pode estar relacionado a mucocele do apêndice cecal. \nHérnia inguinal indireta bilateral, com protrusão do material espesso para o canal inguinal e escroto, com espessamento difuso do revestimento parietal peritoneal.\n Impressão: Material espesso preenchendo a cavidade peritoneal com aspecto multiloculado, conforme descrito acima. O conjunto dos achados sugere pseudomixoma peritoneal. Destaca-se duvidosa imagem arredondada adjacente ao ceco, que admite a possibilidade de mucocele do apêndice.'
          },
          'pseudomixoma': {
            'title': 'Pseudomixoma',
            'body': 'Conteúdo mucinoso preenchendo a cavidade peritoneal e seus recessos, de aspecto multiloculado, determinando efeito de massa sobre os órgãos parenquimatosos, deformando seus contornos, notadamente no fígado e baço, bem como no tronco portal. Há ainda compressão e deslocamento anterior da bexiga. Semelhante o espessamento difuso do grande omento, que determina o deslocamento das alças entéricas predominantemente para a região central do abdome, tendo surgido focos de calcificação esparsas, provavelmente representando alterações pós tratamento.\nHérnia inguinal indireta bilateral, com protrusão do material espesso para o canal inguinal e escroto, com espessamento difuso do revestimento parietal peritoneal.'
          },
          'hemangiomatose': {
            'title': 'Hemangiomatose',
            'body': 'Fígado com hipertrofia do caudado, contornos ondulados, bordas rombas e atenuação heterogênea, achados indicativos de hepatopatia crônica. Focos hipervascularizados esparsos pelo parênquima, inespecífcios.\nEspessamento parietal difuso do retossigmóide com pequenas calcificações / flebólitos parietais e alguns vasos proeminentes, achados já caracterizados como hemangiomatose. Densificação difusa dos planos gordurosos peritoneais.'
          },
          'lesao_papila_duvidosa': {
            'title': 'Lesão de papila duvidosa, dilatação de vias biliares',
            'body': 'Dilatação das vias biliares intra e extra hepáticas até a porção distal do colédoco, que apresenta redução de calibre com duvidoso espessamento parietal. A papila duodenal tem aumento volumétrico. Sugere-se correlação com colangio-RM.'
          },
          'carcinoma_cabeca_pancreas': {
            'title': 'Carcinoma de cabeça de pâncreas',
            'body': 'Massa sólida mal delimitada acometendo o processo uncinado e a cabeça do pâncreas, com aproximadamente 4,5 cm no seu maior eixo, cujo aspecto é usualmente observado em adenocarcinomas pancreáticos. Tal lesão envolve e afila as origens do tronco celíaco e da artéria mesentérica superior, bem como envolve e trombosa a confluência venosa esplenomesentérica. A extensão posterior dessa massa atinge estruturas do plexo celíaco de maneira mais acentuada à direita. \nA lesão compromete ainda a terceira porção do duodeno e atinge a veia mesentérica inferior pouco antes do seu óstio na veia esplênica.\nAtrofia do corpo e cauda do pâncreas com dilatação do ducto pancreático principal. Pequenos cálculos em ectasias de ductos secundários esparsos pelo pâncreas.\nComo consequência do comprometimento da junção venosa esplenomesentérica, notam-se ingurgitamento de veias cólicas e gastroepiplóicas.'
          },
          'retocolite_atividade': {
            'title': 'Retocolite ulcerativa com atividade de doença',
            'body': 'Reto, cólon sigmoide e cólon descendente com discreto espessamento parietal e com perda do padrão habitual de haustrações. A camada submucosa/ muscular no reto e sigmoide está hipoatenuante, possivelmente representando gordura, que sugere cronicidade do acomentimento.  \nHá discreto realce mucoso na porção distal do cólon transverso e ângulo esplênico e parte do sigmoide e retos superior e medio, que podem estar relacionados a atividade discreta da doença'
          },
          'crohn_atividade': {
            'title': 'Doença de Crohn com área de atividade',
            'body': 'Sinais de doença inflamatória com componente fibroestenosante e componente de atividade, apresentando espessamento parietal segmentar do íleo terminal, com hiperrealce mucoso, com extensão de cerca de 4,5 cm a partir da válvula ileocecal. Não se observa dilatação significativa das alças à montante. '
          },
          'tumor_sigmoide_valv_comp': {
            'title': 'Tumor de Sigmóide / cólon descendente estenosante com válvula ileocecal competente',
            'body': ' Lesão expansiva sólida, intraluminal, circunferencial e estenosante no terço proximal do sigmoide, com extensão de cerca de 8,0 cm, suspeita para neoplasia primária. Há discreta densificação da gordura cranial à lesão, não sendo possível descartar extensão extramural da mesma por este estudo. Notam-se alguns linfonodos regionais, medindo até 1,4 x 1,0 cm.\nHá outra lesão de características semelhantes e menores dimensões ou polipo séssil de base larga, na transição sigmoide-descendente, com extensão de cerca de 4,0 cm, também suspeita para neoplasia.\nAssocia-se acentuada distensão colônica difusa, apresentando áreas de pneumatose intestinal com densificação da gordura mesentérica e acúmulos líquidos perialça, inferindo sofrimento vascular. Há discreta distensão de alças ileais, despropocional à distensão colônica. Logo, deve-se considerar a possibilidade de lesão sigmoídea estenosante com válvula ileocecal competente, determinando obstrução em alça fechada.'
          },
          'colecistite_aguda': {
            'title': 'Colecistite Aguda',
            'body': 'Vesícula biliar hiperdistendida (medindo cerca de 13,5 x 5,3 cm), com paredes espessadas, associando-se borramento da gordura perivesicular que se estende à gordura da região paracólida direita e distúrbio perfusional do parênquima hepático adjacente à vesícula biliar. O conjunto dos achados é compatível com colecistite aguda'
          },
          'apendicite_sem_perf': {
            'title': 'APENDICITE - SEM PERFURAÇÃO:',
            'body': ' Apêndice cecal distendido, com hiperrealce e espessamento parietal, achados compatíveis com apendicite. Associam-se densificação da gordura adjacente e lâminas líquidas de permeio, sem coleções evidentes, e pequenos linfonodos ileocólicos e mesentéricos, medindo até 1,2 cm. Pequeno segmento do íleo terminal discretamente espessado e distendido, com nível líquido, achado provavelmente reacional.\n\nApêndice de localização retrocecal e trajeto ascendente, com espessamento e realce parietal, com calibre deaté 1,4 cm. Associa-se densificação dos planos gordurosos , bem como dos linfonodos aumentados em número periapendiculares. O conjunto de achados sugere processo inflamatório / infeccioso agudo do apêndice cecal (apendicite aguda).'
          },
          'apendicite_perf': {
            'title': 'APENDICITE PERFURADA',
            'body': ' Apêndice cecal distendido e espessado, com realce parietal. Há comunicação do seu lúmen próximo à base com coleção bloqueada na fossa ilíaca direita  (volume estimado em 60 mL), em contato com os músculos laterais da parede abdominal, de paredes espessas, com focos gasosos de permeio e contendo pequena imagem calcificada (provável apendicolito). Outro acúmulo líquido loculado na goteira parietocólica direita (volume estimado em 8 mL). Não se observa pneumoperitôneo à distância. Associam-se densificação dos planos adiposos e espessamento dos folhetos peritoneais adjacentes.  Os achados acima descritos são compatíveis com apendicite perfurada com coleções bloqueadas adjacentes.  Espessamento parietal de algumas alças ileais adjacentes, provavelmente reacional. Coprostase. Pequena quantidade de conteúdo fecal na ampola retal.'
          },
          'apendicite_inicial': {
            'title': 'APENDICITE INICIAL - Com apendicolito',
            'body': 'Apêndice cecal distendido em toda a sua extensão, com localização retrocecal dirigido à pequena pelve (retroperitoneal?), apresentando conteúdo líquido e paredes discretamente espessadas (até 1,2 cm de diâmetro), contendo apendicolito na sua base de implantação, sem evidente densificação dos planos adiposos adjacentes. Os achados podem sugerir apendicite incipiente caso haja correlação clínica/laboratorial.'
          },
          'apendagite_epiploica': {
            'title': 'APENDANGITE EPIPLOICA',
            'body': 'Pequena formação nodular com atenuação de gordura na na fossa ilíaca esquerda ( borda antimesentérica do cólon descendente) medindo 1,7 x 0,6 cm, associada a densificação gordurosa dos planos adjacentes, sugestiva de apendagite epiplóica. '
          },
          'diverticulite': {
            'title': 'DIVERTICULITE',
            'body': 'Divertículos cólicos esparsos no cólon sigmoide, destacando-se área de espessamento segmentar, associada a edema e densificação dos planos adiposos adjacentes, bem como pequena quantidade de líquido livre, sugerindo processo inflamatório local, que pode corresponder a  diverticulite. Não são identificados focos de pneumoperitônio ou coleções. \n\n Grande divertículo com conteúdo fecalóide na face inferior do cólon sigmóide, mantendo amplo contato com a cúpula vesical, que apresenta-se com paredes espessadas, notando-se ainda gás no interior da bexiga, sugerindo fístula colovesical. Nota-se ainda outro grande divertículo de paredes espessadas na transição entre o cólon descendente e o sigmóide (fossa ilíaca esquerda), com discreta densificação dos planos adiposos adjacentes e espessamento das reflexões peritoneais locais, achado que pode estar relacionado a processo inflamatório agudo (diverticulite), a depender de correlação clínica. Outros pequenos divertículos no cólon descendente e sigmóide, sem sinais inflamatórios evidentes.'
          },
          'funiculite': {
            'title': 'FUNICULITE - ALTERAÇÃO DA VESÍCULA SEMINAL DIREITA',
            'body': ' Espessamento difuso do funículo espermático direito, associado a densificação da gordura peritoneal adjacente e no interior do canal inguinal homolateral, achados que podem representar processo infeccioso / inflamatório no contexto clínico adequado. '
          },
          'pancolite': {
            'title': 'PANCOLITE',
            'body': 'Leve aumento do conteúdo líquido em alças delgadas. Cólons apresentando espessamento parietal difuso com aumento do realce mucoso e densificação adiposa adjacente, aspecto compatível com pancolite. Apêndice cecal de aspecto preservado.'
          },
          'aortite': {
            'title': 'AORTITE / PERIAORTITE + ENDOPRÓTESE',
            'body': '- Está mais evidente a densificação dos planos gordurosos adjacentes ao segmento aórtico infra-renal e surgiram coleções mal delimitadas com focos gasosos de permeio nesta topografia, sobretudo à esquerda, onde medem até 3,5 x 2,6 cm. Observam-se ainda linfonodos periaórticos e interaortocavais aumentados em número e proeminentes, medindo até 1,4 x 1,0 cm, provavelmente reacionais. O conjunto destes achados sugere a possibilidade de processo inflamatório/infeccioso (periaortite).  - Houve aumento do diâmetro máximo do saco aneurismático que reveste a endoprótese, atualmente medindo 5,1 x 4,2 cm (media 4,8 x 4,1 cm). Demais achados sem alterações significativas, a saber: Ateromatose aórtica difusa destacando-se placas parietais irregulares no segmento distal da aorta torácica descendente, sugestivas de ulcerações rasas.  Endoprótese auto-expansiva bifurcada na aorta abdominal infrarrenal com extremidade cranial localizada 0,6 cm inferior à emergência da artéria renal esquerda.  Opacificação além da malha metálica da endoprótese no segmento distal da aorta abdominal, com espessura máxima de 0,9 cm, provavelmente relacionada a abaulamento da malha não-metálica, estável. Opacificação do saco aneurismático no aspecto posterolateral direito da prótese, por provável reenchimento por ramos lombares (endoleak do tipo II), estável.  O diâmetro máximo do saco aneurismático que reveste a prótese é de 5,1 x 4,0 cm. '
          },
          'diverticulo_ileal': {
            'title': 'DIVERTÍCULO ILEAL',
            'body': 'Divertículo espessado no íleo terminal, adjacente à válvula ileocecal, com densificação dos planos adiposos e folhetos peritoneais adjacentes e espessamento do segmento de alça correspondente. Associam-se pequenas bolhas gasosas regionais, com lâminas líquidas de permeio e linfonodos aumentados regionais. Os achados são compatíveis com diverticulite aguda de íleo com microperfuração, sem coleções.'
          },
          'pileflebite': {
            'title': 'PILEFLEBITE',
            'body': ' Divertículo irregular na transição do cólon descendente / sigmoide, associado a discreta densificação dos planos mesentéricos adjacentes, podendo representar processo inflamatório / infeccioso. Nota-se pequena quantidade de gás adjacente ao divertículo supracitado, com trajeto ao longo da topografia da veia mesentérica inferior.'
          },
          'abdome_vascular': {
            'title': 'ABDOME AGUDO VASCULAR - EMBOLIZAÇÃO E SOFRIMENTO DE ALÇAS',
            'body': 'Persiste extenso trombo envolvendo a origem e a porção proximal da artéria mesentérica superior, determinando estenose moderada/acentuada, com reenchimento distal do seu tronco principal. Há falhas de enchimento de alguns ramos mais distais (território ileal).  No exame atual está mais nítida e mais extensa a hipocontrastação parietal das alças ileais, com aspecto "parético", associada a borramento da gordura mesentérica adjacente com lâminas líquidas de permeio. O conjunto dos achados sugere sofrimento isquêmico agudo de alças intestinais de etiologia tromboembólica.'
          },
          'obstrucao_fechada': {
            'title': 'OBSTRUÇÃO EM ALÇA FECHADA',
            'body': 'Obstrução em "alça fechada", com área de estreitamento junto à bifurcação aórtica (possivelmente por brida/aderência ou mesmo hérnia interna), notando-se transições abruptas de calibre ao nível da transição jejunoileal e também no íleo terminal. Alguns segmentos ileais e parte do cólon ascendente apresentam espessamento parietal e redução do realce mucoso, sugerindo algum grau de sofrimento vascular (provavelmente venoso). Há também afilamento focal da veia mesentéria superior junto ao foco de estreitamento, pérvia. Artéria mesentérica superior pérvia.  As alças jejunais a montante da obstrução também apresentam-se dilatadas, porém em menor grau, sem nítidos sinais de sofrimento vascular.  Moderada quantidade de líquido livre abdominal. Não há coleções organizadas ou pneumoperitônio.'
          },
          'hernia_ing_obst': {
            'title': 'HÉRNIA INGUINOESCROTAL COM OBSTRUÇÃO',
            'body': 'Estômago e duodeno com distensão normal. Distensão difusa e acentuada das alças jejunais, com transição abrupta de calibre em curto segmento jejunal encarcerado no interior de hérnia inguinoescrotal esquerda. Os segmentos delgados a jusante da hérnia apresentam-se colabados. O realce parietal das alças intestinais está preservado, inclusive das alças distendidas. Não há pneumatose intestinal, pneumoperitôneo ou coleções intra-abdominais. Hérnia inguinoescrotal direita com conteúdo gorduroso e discretamente líquido, sem sinais inflamatórios. '
          },
          'tumor_estenosante': {
            'title': 'TUMOR ESTENOSANTE + VÁLVULA ILEOCECAL COMPETENTE',
            'body': 'Lesão expansiva sólida, intraluminal, circunferencial e estenosante no terço proximal do sigmoide, com extensão de cerca de 8,0 cm, suspeita para neoplasia primária. Há discreta densificação da gordura cranial à lesão, não sendo possível descartar extensão extramural da mesma por este estudo. Notam-se alguns linfonodos regionais, medindo até 1,4 x 1,0 cm. Há outra lesão de características semelhantes e menores dimensões ou polipo séssil de base larga, na transição sigmoide-descendente, com extensão de cerca de 4,0 cm, também suspeita para neoplasia. Associa-se acentuada distensão colônica difusa, apresentando áreas de pneumatose intestinal com densificação da gordura mesentérica e acúmulos líquidos perialça, inferindo sofrimento vascular. Há discreta distensão de alças ileais, despropocional à distensão colônica. Logo, deve-se considerar a possibilidade de lesão sigmoídea estenosante com válvula ileocecal competente, determinando obstrução em alça fechada.'
          },
          'hernia_femoral': {
            'title': 'HÉRNIA FEMORAL - Sinais de encarceramento',
            'body': 'Volumosa hérnia femoral à esquerda contendo gordura e curto segmento de intestino delgado levemente dilatado, com conteúdo de estase e paredes espessadas. Associa-se densificação dos planos gordurosos adjacentes, ingurgitamento dos vasos retos e pequena quantidade de líquido livre no interior do saco herniário. Há também leve distensão de curto segmento de alça delgada a montante da hérnia, com conteúdo de estase. Segmentos ileais a jusante e alças cólicas predominantemente colabadas. O conjunto é compatível com hérnia femoral encarcerada, contendo alça delgada obstruída em "alça fechada" e com algum grau de sofrimento vascular.\n\n\nPós-operatório\nManipulação cirúrgica caracterizada por densificação dos planos adiposos da região inguinal e parede abdominal da fossa ilíaca à esquerda, com dreno e focos gasosos nesta topografia, associando-se sinais de enterectomia segmentar. Nota-se, ainda, surgimento de coleção heterogênea na fossa ilíaca esquerda, adjacente à enterorrafia, com lâminas líquidas e focos gasosos de permeio, medindo cerca de 9,3 x 9,3 x 10,1 cm (AP x LL x CC) - volume estimado de 454 cm³. \n Surgimento de moderada dilatação de alças delgadas a montante do nível da anastomose entero-entérica, com redução do calibre nesta topografia, sugerindo um quadro suboclusivo. Nota-se retração do cólon e de alças delgadas adjacentes a este ponto, achados que podem estar relacionados à bridas. Nota-se ainda aspecto retrátil do ceco e válvula íleocecal à parede abdominal anterior do flanco direito.  Surgimento de hérnia femoral contendo gordura e líquido ascítico.'
          },
          'intussusc': {
            'title': 'INTUSSUSCEPÇÃO + SINAIS DE MÁ ROTAÇÃO',
            'body': ' Angulo de Treitz em posição não habitual, deslocado para o hipocondrio direito, onde observa-se inversão da posição dos vasos mesentéricos superiores. Na fossa ilíaca esquerda, notam-se sinais de obstrução intestinal com intussuscepção ileo-cólica, que determina dilatação de alças a montante, sobretudo de delgado, até o nível do estômago. '
          },
          'abdo_vas_vesic': {
            'title': 'ABDOME AGUDO VASCULAR + SOFRIMENTO ISQUÊMICO DA VESÍCULA',
            'body': 'Aorta de trajeto e calibre preservados. Notam-se placas não calcificadas aderidas às paredes da aorta abdominal apresentando contornos irregulares e projetadas para o interior luminal, sugerindo instabilidade. A maior placa encontra-se obstruindo o fluxo na emergência do tronco celíaco, porém havendo fluxo no interior dos terços médio das artérias hepática comum e esplênica, provavelmente por reenchimento via arcada pancreatoduodenal. Nota-se interrupção do fluxo da artéria hepática própria e aumento do seu calibre distal a esse ponto de obstrução, sugerindo a presença de um trombo intraluminal.  Artéria gástrica esquerda com calibre afilado sendo a avaliação de seu fluxo prejudicada.  Vesícula biliar com dimensões no limite superior da normalidade (9,0 x 3,5 cm), com paredes espessadas e com densificação da gordura mesentérica adjacente, sugerindo acometimento inflamatório, provavelmente devido ao acometimento vascular. Não há evidência de cálculos no seu interior. Há moderada dilatação das vias biliares intra-hepáticas.  '
          },
          'tumor_sitio_indeterminado': {
            'title': 'TUMOR DE SÍTIO INDETERMINADO COM METÁSTASES LINFONODAL, ORGÂNICA E IMPLANTES',
            'body': 'Múltiplos implantes secundários peritoneais e retroperitoneais difusos, alguns com centro hipodenso (podendo representar necrose/liquefação) e o maior medindo 4,2 cm junto ao ventre do músculo psoas à direita no flanco. Destaca-se implante comprimindo a JUP/ureter proximal à direita, com moderada dilatação pielocalicinal a montante.\nOutros nódulos de aspecto secundário esparsos pelo subcutâneo toracoabdominal e pelo parênquima de ambas as mamas, medindo até 2,0 cm. Caso haja indicação clínica, alguns destes nódulos são passíveis de biópsia percutânea guiada por ultrassonografia, como por exemplo na região inguinal esquerda (1,9 cm).\nLinfonodomegalias heterogêneas retrocrurais (medem até 1,7 cm) e cardiofrênicas (medem até 2,8 cm), compatíveis com acometimento secundário.\nNódulos na cauda pancreática (2,1 cm) e em ambas adrenais, medindo 3,7 cm à direita, compatíveis com acometimento secundário.\nMúltiplas lesões líticas com componente de partes moles esparsas pela coluna toracolombar, arcos costais inferiores e ossos da bacia, também compatíveis com acometimento secundário.\nMassa heterogênea e com centro hipodenso na pelve/hipogástrio, de aspecto indeterminado neste estudo sem contraste endovenoso, podendo representar o útero de dimensões aumentadas e com conteúdo distendendo a cavidade uterina.'
          },
          'colecistite_aguda2': {
            'title': 'COLECISTITE AGUDA',
            'body': 'Vesícula biliar distendida (mede cerca de 11,0 x 4,5 cm) e com paredes difusamente espessadas, notando-se densificação difusa dos planos adiposos perivesiculares, com lâminas líquidas de permeio. Os achados sugerem processo inflamatório agudo (colecistite).'
          },
          'abdome_agudo_vasc': {
            'title': 'ABDOME AGUDO VASCULAR',
            'body': 'Segmentos de alças delgadas no mesogastro, hipogastro e na fossa ilíaca direita exibindo pneumatose intestinal, alguns destes com discreto espessamento e hiperrealce parietais e outros com realce reduzido e conteúdo de estase. Associa-se gás no trajeto de drenagem venosa de tais alças, incluindo as veias ileocólicas e a veia mesentérica superior, com consequente aeroportia. O conjunto dos achados é compatível com isquemia intestinal aguda. Não são observadas falhas de enchimento nos principais leitos arteriais e venosos mesentéricos, o que permite considerar a etiologia de hipofluxo / instabilidade hemodinâmica como causa possível para o sofrimento vascular intestinal.'
          },
          'sepulta_reto': {
            'title': 'SIGMOIDECTOMIA COM SEPULTAMENTO DE COTO RETAL - COLOSTOMIA',
            'body': 'Sinais de sigmoidectomia com sepultamento do coto retal. Colostomia  na fossa ilíaca esquerda, com hérnia paracolostômica.'
          },
          'tu_vb_fistula': {
            'title': 'Tumor de VB + Fístula gástrica com migração de cálculo para o seu interior',
            'body': ' Fígado com sinais de atrofia do lobo esquerdo e contornos regulares. Lesão irregular e mal delimitada na região corporal e fúndica da vesícula biliar que parece infiltrar o parênquima hepático no segmento IVb e a parede lateral direita do antro gástrico (de avaliação limitada neste estudo sem contraste endovenoso), suspeita para lesão primária. Cálculos no interior da vesícula, um deles insinuando-se à luz gástrica, achado que pode representar trajeto fistuloso entre estas duas estruturas.'
          },
          'hernia_interna': {
            'title': 'Hérnia Interna',
            'body': 'Notam-se alças delgadas com topografia lateral ao cólon direito associada a afilamento focal e "torção" da mesentérica superior no mesogástrio, pérvia, com ectasia a montante e com circulação colateral mesentérica associada. Não há sinais obstrutivos ou de sofrimento de alça. Há discreta densificação região da gordura mesentérica.  '
          },
          'hernia_interna2': {
            'title': 'Hérnia Interna + AAO',
            'body': ' Obstrução em "alça fechada", com área de estreitamento junto à bifurcação aórtica (possivelmente por brida/aderência ou mesmo hérnia interna), notando-se transições abruptas de calibre ao nível da transição jejunoileal e também no íleo terminal. Alguns segmentos ileais e parte do cólon ascendente apresentam espessamento parietal e redução do realce mucoso, sugerindo algum grau de sofrimento vascular (provavelmente venoso). Há também afilamento focal da veia mesentéria superior junto ao foco de estreitamento, pérvia. Artéria mesentérica superior pérvia. '
          },
          'coledocolitiase_trombose': {
            'title': 'Coledocolitíase + Trombose de Veia Porta + Distúrbio Perfusional',
            'body': 'Fígado de dimensões normais e contornos regualres. Apresenta distúrbio perfusional difuso no lobo esquerdo, secundário a trombose do ramo esquerdo da veia porta, de aspecto recente. Nota-se aumento da vascularização arterial neste lobo, provavelmente compensatória. Prováveis hemangiomas hepáticos esparsos, o maior medindo 1,3 cm no segmento II (em correlação com a RM de 14/02/2015). Moderada / acentuada dilatação difusa das vias biliares, até o nível da papila duodenal, sem fatores obstrutivos evidentes ao método. Considerar a possibilidade de processo expansivo da papila duodenal (a critério clínico, uma endoscopia digestiva com visão lateral poderá trazer informações adicionais), cabendo diferencial com coledocolitíase. Ducto hepático posterior direito tem confluência baixa no colédoco, ao nível do platô pancreático (variação anatômica).'
          },
          'colangiocarcinoma2': {
            'title': 'Colangiocarcinoma',
            'body': 'Fígado de dimensões normais e contornos regualres. Apresenta distúrbio perfusional difuso no lobo esquerdo, secundário a trombose do ramo esquerdo da veia porta, de aspecto recente. Nota-se aumento da vascularização arterial neste lobo, provavelmente compensatória. Prováveis hemangiomas hepáticos esparsos, o maior medindo 1,3 cm no segmento II (em correlação com a RM de 14/02/2015). Moderada / acentuada dilatação difusa das vias biliares, até o nível da papila duodenal, sem fatores obstrutivos evidentes ao método. Considerar a possibilidade de processo expansivo da papila duodenal (a critério clínico, uma endoscopia digestiva com visão lateral poderá trazer informações adicionais), cabendo diferencial com coledocolitíase. Ducto hepático posterior direito tem confluência baixa no colédoco, ao nível do platô pancreático (variação anatômica).'
          },
          'carcinoma_vb': {
            'title': 'Carcinoma de VB',
            'body': 'Lesão expansiva de caráter infiltrativo, centrada no corpo/fundo da vesícula biliar, de formato irregular, com extenso componente necrótico interno. Apresenta infiltração extensa do parênquima hepático do segmento IV e da gordura abdominal infra-hepática, onde notam-se pequenos implantes satélites. Há também contato com a parede abdominal anterior no hipocôndrio direito e com a flexura hepática do cólon. A lesão mede cerca de 11,0 x 10,0 x 8,5  cm (CC x AP x LL) e é compatível com neoplasia primária da vesícula biliar. Linfonodomegalias necróticas no hilo hepático e peripancreáticas, medindo até 4,0 cm, que promovem afilamento do tronco da veia porta, pérvio. Outros linfonodos numerosos e proeminentes nas cadeias retroperitoneais e cardiofrênicas, medindo até 1,3 cm, suspeitos para acometimento secundário. Associa-se moderada quantidade de líquido livre, sobretudo no recesso frênico direito, na goteira parietocólica esquerda e na pelve. Diminuta hérnia epigástrica com conteúdo gorduroso e provável implante peritoneal no seu interior.'
          },
          'colecist_xanto': {
            'title': 'Colecistite Xantugranulomatosa',
            'body': ' Vesícula biliar hiperdistendida, com paredes espessadas e contendo cálculos calcificados no seu interior, medindo até 5,0 cm. Algumas áreas da sua parede apresentam-se descontínuas e em contato com formações hipoatenuantes no parênquima hepático adjacente nos segmentos IV e V, aspecto que pode representar pequenos abscessos resultantes de perfuração vesicular bloqueada. Associa-se distúrbio perfusional transitório envolvendo os segmentos IV e V hepáticos atribuído a trombose hemática dos ramos portais para estes segmentos, provavelmente reacional ao processo inflamatório. O conjunto dos achados é compatível com processo inflamatório da vesícula biliar com sinais de perfuração para o parênquima hepático. Deve-se considerar também, menos provavelmente, a hipótese de processo neoplásico primário vesicular com extensão hepática. '
          },
          'tumor_vs_coledocoli': {
            'title': 'Tumor de papila x Coledocolitíase',
            'body': 'Moderada dilatação difusa das vias biliares intra e extra-hepáticas, com redução relativamente gradual do calibre ao nível do colédoco distal justapapilar, achado que poderia ser mais bem avaliado por colangiorressonância, a critério clínico (coledocolitíase?). Discreto realce parietal tardio do colédoco justapapilar, sugerindo processo inflamatório local. '
          },
          'teratoma_ovar': {
            'title': 'Teratoma de provável origem ovariana',
            'body': 'Formação ovalada, heterogênea, encapsulada, com conteúdo gorduroso, associado a área de calcificação, localizada no flanco direito, promovendo deslocamento medial do cólon ascendente e do ceco, medindo cerca de 8,5 x 7,8 x 7,4 cm (volume aproximado de 255 cc). A lesão descrita é compatível com teratoma.'
          },
          'tu_cel_renais': {
            'title': 'Tumor de células renais (multinodular)',
            'body': 'Rim direito de dimensões preservadas, sem hidronefrose. Observam-se três lesões nodulares compatíveis com tumores de células renais assim descritas:\n- Nódulo na região posterior do terço superior do rim direito, acima da linha polar superior, diâmetro máximo de 5,1 cm, com cerca de 50% do seu volume exofítico, em contato com o seio renal, sem sinais inequívocos de invasão do sistema coletor.\n- Nódulo na região anterior do terço superior do rim direito, acima da linha polar superior, diâmetro máximo de 2,4 cm, predominantemente exofítico, sem aparente contato com o sistema coletor.\n- Nódulo na região posterior do terço médio do rim direito, entre as linhas polares, diâmetro máximo de 2,6 cm, totalmente endofítico e centrado na gordura sinusal.\nArtéria e veia renal direitas únicas e anatômicas. Não há sinais de trombose tumoral na veia renal direito neste protocolo de estudo.\n\n'
          },
          'angiomiolipoma': {
            'title': 'ANGIOMIOLIPOMA',
            'body': 'Nódulo heterogêneo, com conteúdo de gordura, predominantemente exofítico, junto à face medial do terço médio-inferior do rim direito com 6,3 cm no seu maior eixo. O aspecto de imagem favorece o diagnóstico de angiomiolipoma.'
          },
          'neo_vulva': {
            'title': 'Neoplasia Vulvar',
            'body': 'Volumosa lesão expansiva, infiltrativa e ulcerada nos grandes e pequenos lábios com focos de necrose e realce heterogêneo pós-contraste. Posteriormente se estende pela prega interglútea, com acometimento da borda e do canal anal, bem como do reto, apresentando sinais de fistulização. Superiormente estende-se pelo canal vaginal e colo uterino. Não há evidências de fistulização com o trato urinário. O aspecto infiltrativo da lesão limita precisar as dimensões, estimando-se: 12,7 x 5,8 x 14,2 cm (AP x LL x CC). Surgiu volumosa linfonodomegalia inguinal à direita com centro necrótico e realce periférico pós contraste medindo 4,3 x 4,4 x 3,8 cm. '
          },
          'adenoma_adrenal': {
            'title': 'ADENOMA ADRENAL',
            'body': 'Nódulo na asa medial da adrenal esquerda com 1,5 cm e atenuação de gordura (<-10UH) sem realce significativo pós-contraste sugestivo de adenoma.'
          },
          'urotelial_bex': {
            'title': 'TUMOR UROTELIAL DE BEXIGA',
            'body': '- Sinais de cistectomia radical, com derivação ureterocutânea bilateral transileal (Bricker) com estomia na fossa ilíaca direita. '
          },
          'tu_cel_renais2': {
            'title': 'TUMOR CÉLULAS RENAIS',
            'body': ' Nódulo sólido hipervascular heterogêneo com focos necróticos / liquefeitos centrais, parcialmente exofítico, localizado posteromedialmente no terço superior do rim esquerdo, medindo 3,6 x 3,6 x 3,6 cm, com volume estimado em 24 cc. Toca cálices superiores e não  há extensão para a gordura perirrenal.'
          },
          'ca_adrenal_rec': {
            'title': 'Carcinoma de Adrenal - Recidiva',
            'body': 'Lesão sólida expansiva de aspecto neoplásico no leito de adrenalectomia, com áreas de necrose central, medindo cerca de 8,0 cm. Há amplo contato com a pequena curvatura gástrica e da cárdia, com sinais sugestivos de invasão.'
          },
          'ccr_iv': {
            'title': 'CCR - Estágio IV',
            'body': 'Lesão sólida hipervascular com focos de necrose/liquefação de permeio centrado no pólo renal inferior esquerdo, com diâmetro máximo de 6,8 cm, com maior componente endofítico, que ultrapassa a linha polar inferior e possui extensão para a gordura do seio renal. O conjunto de achados é sugestivo de carcinoma de células renais do subtipo células claras.\nMúltiplas lesões hipervascularizadas hepáticas compatíveis com acometimento secundário. Tais lesões determinam distúrbio perfusional hepático difuso.\nMúltiplas linfonodomegalias e conglomerados de linfonodos de aspecto secundário nas cadeias  periaórticas (a partir da aorta torácica distal), interaortocavais e ilíacos comuns, algumas com necrose/liquefação central, destacando-se a maior inferiormente à veia renal esquerda com 3,8 x 3,8 cm nos maiores diâmetros axiais, determinando afilamento da veia, que se encontra pérvia. Há também amplo contato com a aorta abdominal em toda a sua extensão, que se encontra de calibre e fluxo preservados.\nLesões líticas com componente de partes moles anterior de aspecto secundário nos corpos vertebrais de L3 e L4.\nObserva-se outros focos de lesões líticas bilaterais no aspecto posterior dos ílios suspeitas para acometimento secundário.\nNão se observa trombos no interior das veias renais e da veia cava inferior.\nNão há lesões de aspecto secundário no parênquima pulmonar.\nArtéria renal esquerda única, com bifurcação cerca de 2,5 cm do hilo renal.\n'
          },
          'achados_angio_aorta': {
            'title': 'Aorta - aneurisma, trombose, ateromatose',
            'body': '*Sinais de ateromatose difusa, caracterizados por espessamento e calcificações parietais.\n*Notam-se irregularidades da superfície luminal, indicativas de ulcerações.\n*Aneurisma fusiforme da aorta torácica, que se inicia num plano cerca de .... cm e se estende por cerca de ..... cm. O calibre máximo do aneurisma é de ...... cm. O calibre da aorta superiormente à dilatação é de .... cm e distalmente de ..... cm.\nNota-se ainda, trombose mural na ao longo da luz do segmento dilatado.\n*Controle pós-operatório de correção endovascular de aneurisma da aorta torácica, com colocação de endoprótese metálica. Endoprótese com posicionamento habitual e sem sinais de extravasamentos do meio de contraste. O diâmetro máximo do saco aneurismático é de ...........cm.\n*Controle pós-operatório de correção de aneurisma da aorta torácica com colocação de prótese, sem sinais de extravasamentos. Não são identificadas coleções no leito cirúrgico.'
          },
          'litiase_ureteral': {
            'title': 'Litíase ureteral - nefrolitíase obstrutiva - cálculo renal',
            'body': 'Cálculo obstrutivo no ureter #, medindo cm, com atenuação de UH, distando cerca de cm da # junção ureteropiélica #junção ureterovesical e determinando moderada dilatação ureteropielocalicinal a montante, com densificação da gordura periureteral e perirrenal.'
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'ipmn': {
            'title': 'IPMN',
            'body': 'Pâncreas com forma preservada e sinal normal. Formações císticas envolvendo o ducto pancreático principal e ductos secundário na cabeça e no processo uncinado, medindo em conjunto cerca de 5,2 cm, compatível com lesão intraductal produtora de mucina (IPMN). No componente cístico anterior a veia cava inferior, observam-se ao menos três pequenas projeções sólidas de até 0,5 cm. Há dilatação do ducto principal à montante com calibre de até 1,3 cm.'
          },
          'cisto_ciliado': {
            'title': 'CISTO CILIADO HEPÁTICO',
            'body': 'Formação nodular na periferia do segmento hepático IV, sugestiva de lesão cística com componente hemorrágico / espesso, medindo 2,0 cm, estável em relação ao estudo tomográfico de xx/xx/xx. A lesão tem características mais comumente observadas em cistos ciliados hepáticos (ciliated hepatic foregut cyst) e, menos provavelmente, lesão cística mucinosa do fígado.'
          },
          'fistula_perianal': {
            'title': 'FÍSTULA PERIANAL COM COLEÇÃO ',
            'body': 'Fístula perianal com orifício mucoso às 06 h e distando cerca de 2,0 cm da borda anal, com curto componente ascendente no plano interesfincterino e outro componente posterior transesfincteriano que se estende bilateralmente a ambas as fossas isquioanais em formato de "U", com trajetos assim pormenorizados:\n- à direita com maior distensão líquida e processo inflamatório, notando-se ramificação do trajeto e exteriorização à pele em dois pontos na prega interglútea;\n- à esquerda também há ramificação do trajeto com exteriorização à pele em dois pontos na prega interglútea.'
          },
          'teratoma_ovariano': {
            'title': 'Teratoma de provável origem ovariana',
            'body': 'Lesão heterogênea localizada no flanco direito, de provável origem ovariana, com componente predominantemente gorduroso, medindo 8,7 x 8,0 x 7,6 cm (volume = 276 cm³), promovendo deslocamento medial do cólon ascendente. Há pequena quantidade de líquido adjacente. Este aspecto de imagem é compatível com neoplasia de linhagem germinativa (teratoma maduro). '
          },
          'ca_vulvar': {
            'title': 'Carcinoma Vulvar',
            'body': 'Volumosa lesão expansiva, infiltrativa e ulcerada, envolvendo os pequenos lábios, o grande lábio à direita e o clitóris, e estendendo-se posteriormente infiltrando a prega interglútea,  especialmente à direita. Há envolvimento do terço distal da vagina, com extensão até o terço médio, e um amplo contato da lesão com a porção mais distal da uretra. Há ainda extensão da lesão para o canal anal, desde a borda anal até a transição anorretal, com sinais de fístula com a vagina.'
          },
          'recidiva_bexiga': {
            'title': 'PÓS OP DE NEOPLASIA DE BEXIGA COM RECIDIVA LOCAL AVANÇADA',
            'body': 'Sinais de cistectomia total, com derivação dos ureteres em alça ileal que se exterioriza na fossa ilíaca direita.\nLesões nodulares com realce heterogêneo pelo meio de contraste localizada na pelve, algumas de aspecto confluente, compatíveis com lesões de aspecto secundário / recidivas locais e peritoneais, medindo até cerca de 7,0 cm. Estas lesões infiltram a cúpula vaginal e pelo menos dois segmentos não-contíguos do cólon sigmoide e apresentam ampla base de contato com a parede anterior do reto no plano da reflexão peritoneal. \nLinfonodomegalias heterogêneas de aspecto secundário nas cadeias ilíacas internas e externas bilaterais, a maior na cadeia ilíaca externa esquerda medindo cerca de 2,6 x 2,1 cm.\nPequena quantidade de líquido, de aspecto algo loculado na pelve. \nImagem ovalada exofítica junto à borda anal, de aspecto indeterminado ao método e que pode ser mais bem avaliado por exame físico dirigido. Admite como diferenciais por este método as hipóteses de lesão secundária ou alteração inflamatória relacionada à hemorroida. '
          }
        }
      },
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      }
    }
  },
  'obstetrico': {
    'metadata': {
      'specialty_name': null
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      },
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'sop': {
            'title': 'SOP - OVÁRIOS POLICÍSTICOS',
            'body': 'Ovário direito tópico, de dimensões aumentadas, com múltiplos cistos subcentimétricos de distribuição predominantemente periférica.\nDimensões: 4,0 x 3,5 x 3,0 cm. Volume: 16,8 cm3.\nOvário esquerdo tópico, de dimensões aumentadas, com múltiplos cistos subcentimétricos de distribuição predominantemente periférica.\nDimensões: 4,0 x 3,5 x 3,0 cm. Volume: 16,8 cm3.\nCONCLUSÃO:\n- Ovários de dimensões aumentadas com múltiplos cistos de distribuição predominantemente periférica. Aspecto ultrassonográfico sugestivo de ovários policísticos.\n'
          }
        }
      }
    }
  },
  'msk': {
    'metadata': {
      'specialty_name': 'msk'
    },
    'modalities': {
      'tc': {
        'metadata': {
          'modality_name': 'tc'
        },
        'findings': {
          'lesao_escapula': {
            'title': 'Lesão secundária na escápula',
            'body': 'Lesão lítica erodindo a cortical óssea do corpo da escápula esquerda, com grande componente de partes moles infiltrando os planos musculares adjacentes e medindo aproximadamente 12,0 cm no maior eixo, suspeita para acometimento secundário. Há outros focos líticos esparsos pelos elementos posteriores de alguns corpos vertebrais dorsais, também suspeitos para acometimento secundário. '
          },
          'discos': {
            'title': 'Discos',
            'body': 'Discopatia degenerativa multissegmentar, caracterizada por redução da altura dos discos intervertebrais. Associam-se sinais de degeneração gasosa intradiscal em alguns níveis.\nProtrusão discal posterior de base larga determinando impressão sobre o saco dural.\nComplexo disco-osteofitário posterior determinando impressão sobre o saco dural.\nProtrusão discal de base larga associada a osteófitos posteriores, determinando leve compressão sobre o saco dural.\nComplexo disco-osteofitário posterior que comprime o contorno anterior do saco dural, sem estenose do canal vertebral.\nComplexo disco-osteofitário posterior que comprime o saco dural, determinando estenose do canal vertebral.\nPequeno abaulamento discal difuso, sem repercussões sobre o saco dural.'
          },
          'uncovertebral': {
            'title': 'Uncovertebral',
            'body': 'Artropatia uncovertebral bilateral em C5-C6, sem redução significativa dos diâmetros dos forames de conjugação correspondentes.\nArtropatia uncovertebral bilateral em C5-C6, reduzindo os diâmetros dos forames de conjugação correspondentes.\nArtropatia uncovertebral bilateral em C5-C6, determinando estenose dos forames de conjugação correspondentes.'
          },
          'niveis': {
            'title': 'Níveis vertebrais / discais',
            'body': 'Nível C2-C3:\nNível C3-C4:\nNível C4-C5:\nNível C5-C6:\nNível C6-C7:\nNível C7:T1:\n\nNível L1-L2:\nNível L2-L3:\nNível L3-L4:\nNível L4-L5:\nNível L5-S1:\n'
          }
        }
      },
      'rm': {
        'metadata': {
          'modality_name': 'rm'
        },
        'findings': {
          'desmoide': {
            'title': 'TUMOR DESMOIDE',
            'body': ' Lesão sólida expansiva em planos de partes moles na face volar do cotovelo, de limites indefinidos com o músculo braquiorradial, com contornos parcialmente definidos, com maior componente com alto sinal em T1 e intenso realce pelo meio de contrate e menor componente central com baixo sinal em todas as sequências. A lesão tem contato com o tendão distal do bíceps e proximidade com o nervo radial e a veia basílica, sem sinais de invasão destas estruturas. Mede cerca de 2,0 x 2,0 x 3,2 cm (LL x AP x CC), apresentando discreta redução das suas medidas em relação ao exame prévio de 11/01/2018 onde media, aproximadamente, 2,5 x 2,0 x 3,3 cm (LL x AP x CC). Nota-se também mínimo edema e realce das partes moles adjacentes.\n'
          },
          'osteossarcoma_parosteal': {
            'title': 'OSTEOSSARCOMA PAROSTEAL',
            'body': 'Lesão sólida de aspecto agressivo e origem corticoperiosteal localizada na região metafisária proximal da da tíbia, de forma quase circunferencial. Mede cerca de 4,3 x 2,0 x 6,5 cm )CC x LL x AP). Dista 8,0 cm da articulação do joelho. Não há sinais de acometimento da medular óssea subjacente. A lesão determina abaulamento da fáscia superficial da perna, bem como dos septos intermusculares relacionados aos compartimentos anterior e posterior, sem infiltração destas estruturas.'
          }
        }
      },
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'esteatose': {
            'title': 'Esteatose Hepática',
            'body': 'Sinais de deposição gordurosa hepática difusa.'
          }
        }
      }
    }
  },
  'doppler': {
    'metadata': {
      'specialty_name': 'doppler'
    },
    'modalities': {
      'usg': {
        'metadata': {
          'modality_name': 'usg'
        },
        'findings': {
          'refluxo': {
            'title': 'REFLUXO / INSUFICIÊNCIA',
            'body': 'SAFENA MAGNA\n\nNota-se calibre aumentando da veia safena magna direita / esquerda nos terços proximais/médios/distais da coxa e proximal/médio/distal da perna, com insuficiência segmentar nesta topografia.\nInsuficiência segmentar da veia safena magna direita / esquerda desde a sua crossa até 12 cm abaixo da interlinha  articular do joelho direito onde transfere o refluxo para varizes superficiais.\nInsuficiência da veia safena magna direita / esquerda por toda sua extensão.\nSAFENA PARVA\n\nVeia safena parva direita / esquerda insuficiente desde a junção (que localiza-se 5 cm acima da prega cutanea poplítea), estendendo-se este refluxo até o terço médio da perna onde é transferido para varizes superficiais.'
          },
          'varizes': {
            'title': 'VARIZES',
            'body': 'Varizes superficiais no terço médio da perna direita / esquerda com material ecogênico (trombos organizados) que obstrui parcialmente o calibre, e calcificações sequelares no interior.\nDetectam-se duas veias perfurantes incompetentes na perna direita, no aspecto lateral da perna, distando 25 cm e 17 cm da face plantar, apresentando comunicação com varizes superficias. \nVeias reticulares nas coxas e pernas bilateralmente.'
          },
          'variacoes': {
            'title': 'VARIAÇÕES ANATÔMICAS',
            'body': 'A partir dos terços médios das coxas as veias safenas magnas drenam para veias safenas magnas acessórias superficiais (localizadas no subcutâneo), e encontram-se de fino calibre no seu leito até os terços distais das pernas.\nExtensão cranial das veias safenas parvas bilateralmente com confluência na veia femoral a cerca de 10 cm da prega poplítea. \nPresença de veia safena magna acessória nos terços superior e médio da coxa esquerda, localizada lateralmente à safena magna, competente em seu trajeto. \nDuplicação da veia femoral, observando-se refluxo em uma delas. \nPresença de veia safena magna acessória superficial no terço distal da coxa e proximal da perna à esquerda, distando cerca de 0,2 cm da superfície cutânea, sem sinais de insuficiência, localizada superiormente à safena magna, competente e de fino calibre nesses segmentos.'
          }
        }
      }
    }
  }
}

export default descriptors
