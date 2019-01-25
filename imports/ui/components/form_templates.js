/* eslint "no-unused-vars": "warn", "no-trailing-spaces" : "off", "comma-dangle" : "off" */

const form_templates = {
    ob_tardio : `<form id="rendered-form"><div class="rendered-form">
    <div class="">
      <h3 id="control-4928516">2º/3º trimestre</h3>
    </div>
    
    <div class="row idade-gestacional">
      <div class="col-5" style="padding:2px;">
        <div>
        <ul class="collapsible popout">
        <li style="margin:0px;">
          <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Idade gestacional</span>
          </div>
          <div class="collapsible-body white" id="form_div" style="padding:1px;padding-bottom:1px;"><span class="headline white--text">
          Data USG:<input id="form_usg_date" type=date style=""/>
          IG USG:
          <div class="row" style="padding-left: 10%; padding-right: 10%; margin-bottom:1px;">
            <div class="col" style="padding:0px;">
              <input type="number" id="form_usg_weeks" placeholder="semanas" style=""/>
            </div>
            <div class="col" style="padding:0px;">
              <input type="number" id="form_usg_days" placeholder="dias" style=""/>
            </div> 
          </div>
          DUM:
          <input type="date" id="form_dum" placeholder="dias" style=""/>
          <button type="button" onclick="calculate_history()">Calcular</button>
          </span>            
          </div>
          
        
      </ul>
        </div>
      </div>
      <div class="col">
        <input type="number" placeholder="Semanas" class="form-control" name="form_semanas" step="1" id="form_semanas">
      </div>
      <div class="col">
        <input type="number" placeholder="Dias" class="form-control" name="form_dias" step="1" id="form_dias">
      </div>
    </div>

    <div class="row">
    
    <div class="col">
      <div class="fb-number form-group field-form_dbp">
        <label for="form_dbp" class="fb-number-label">DBP (mm)</label>
        <input type="number" placeholder="DBP (mm)" class="form-control" name="form_dbp" step="0.1" id="form_dbp"></div>
      <div class="fb-number form-group field-form_cc">
        <label for="form_cc" class="fb-number-label">CC (mm)</label>
        <input type="number" placeholder="CC (mm)" class="form-control" name="form_cc" step="0.1" id="form_cc"></div>
      <div class="fb-number form-group field-form_ca">
        <label for="form_ca" class="fb-number-label">CA (mm)</label>
        <input type="number" placeholder="CA (mm)" class="form-control" name="form_ca" step="0.1" id="form_ca"></div>
      <div class="fb-number form-group field-form_cf">
        <label for="form_cf" class="fb-number-label">CF (mm)</label>
        <input type="number" placeholder="CF (mm)" class="form-control" name="form_cf" step="0.1" id="form_cf"></div>
    </div>
    
    <div class="col">
      <div class="fb-number form-group field-form_bcf">
        <label for="form_bcf" class="fb-number-label">BCF</label>
        <input type="number" placeholder="BCF" class="form-control" name="form_bcf" step="1" id="form_bcf"></div>
      <div class="inputGroup">
        <label>
          <input type="checkbox" id="bcf_ausente" class="filled-in"/>
          <span>BCF ausente?</span>
        </label>
        
      </div>
      
      <div class="fb-number form-group field-number-1540578047417">
        <label for="number-1540578047417" class="fb-number-label">ILA (mm)</label>
        <input type="number" placeholder="ILA (mm)" class="form-control" name="number-1540578047417" step="0.1" id="form_ila">
      </div>
      <div class="input-field col">
        <select id="form_apresentacao" class="form_select_init" onchange="change_presentation()">
          <option value="***" disabled selected>...</option>
          <option value="cefálica">Cefálica</option>
          <option value="pélvica">Pélvica</option>
          <option value="córmica">Córmica</option>
        </select>
        <label>Apresentação</label>
      </div>
      <div class="input-field col">
        <select id="form_dorso" class="form_select_init">
          <option value="***" disabled selected>...</option>
          <option value="direita">Direita</option>
          <option value="esquerda">Esquerda</option>
        </select>
        <label id="form_dorso_label">Dorso</label>
      </div>
    </div>
    
     
    
    </div>
    
    </div>
    </form>`,


    ob_inicial : `<form id="rendered-form">
    <div class="rendered-form">
      <div class="">
        <h3 id="control-4928516">1º trimestre</h3>
      </div>
      <div class="row">

        <div class="fb-number form-group field-form_dbp form_sg">
          <label for="form_dbp" class="fb-number-label">SG 1 </label>
          <input type="number" placeholder="SG 1 (mm)" class="form-control" name="form_dbp" step="0.1" id="form_sg1"></div>
        <div class="fb-number form-group field-form_cc form_sg">
          <label for="form_cc" class="fb-number-label">SG 2</label>
          <input type="number" placeholder="SG 2 (mm)" class="form-control" name="form_cc" step="0.1" id="form_sg2"></div>
        <div class="fb-number form-group field-form_ca form_sg">
          <label for="form_ca" class="fb-number-label">SG 3</label>
          <input type="number" placeholder="SG 3 (mm)" class="form-control" name="form_ca" step="0.1" id="form_sg3"></div>
        <div class="fb-number form-group field-form_cf">
          <label for="form_cf" class="fb-number-label">CCN</label>
          <input type="number" placeholder="CCN (mm)" class="form-control" name="form_ccn" step="0.1" id="form_ccn"></div>


        <div class="fb-number form-group field-form_bcf">
          <label for="form_bcf" class="fb-number-label">BCF</label>
          <input type="number" placeholder="BCF" class="form-control" name="form_bcf" step="1" id="form_bcf"></div>
      </div>

      <div class="row">
        <div class="inputGroup col" style="margin-right:8px;">
          <label>
            <input type="checkbox" id="embriao_ausente" class="filled-in" />
            <span>Embrião ausente?</span>
          </label>
        </div>
        <div class="inputGroup col" style="margin-right:8px;">
          <label>
            <input type="checkbox" id="vesicula_ausente" class="filled-in" />
            <span>Vesícula ausente?</span>
          </label>
        </div>
      </div>

      <div class="row">
        <div class="inputGroup col" style="margin-right:50px;">
          <label>
            <input type="checkbox" id="bcf_ausente" class="filled-in" />
            <span>BCF ausente?</span>
          </label>
        </div>

    
      </div>
    </div>
  </form>`,

  escrotal : `
  <form id="rendered-form">
  <div class="rendered-form">
    <div class="">
      <h3 id="control-4928516">1º trimestre</h3>
    </div>
    <div class="row">

      <div class="fb-number form-group field-form_dbp form_sg">
        <label for="form_dbp" class="fb-number-label">SG 1 </label>
        <input type="number" placeholder="SG 1 (mm)" class="form-control" name="form_dbp" step="0.1" id="form_sg1"></div>
      <div class="fb-number form-group field-form_cc form_sg">
        <label for="form_cc" class="fb-number-label">SG 2</label>
        <input type="number" placeholder="SG 2 (mm)" class="form-control" name="form_cc" step="0.1" id="form_sg2"></div>
      <div class="fb-number form-group field-form_ca form_sg">
        <label for="form_ca" class="fb-number-label">SG 3</label>
        <input type="number" placeholder="SG 3 (mm)" class="form-control" name="form_ca" step="0.1" id="form_sg3"></div>
      <div class="fb-number form-group field-form_cf">
        <label for="form_cf" class="fb-number-label">CCN</label>
        <input type="number" placeholder="CCN (mm)" class="form-control" name="form_ccn" step="0.1" id="form_ccn"></div>


      <div class="fb-number form-group field-form_bcf">
        <label for="form_bcf" class="fb-number-label">BCF</label>
        <input type="number" placeholder="BCF" class="form-control" name="form_bcf" step="1" id="form_bcf"></div>
    </div>

    <div class="row">
      <div class="inputGroup col" style="margin-right:8px;">
        <label>
          <input type="checkbox" id="embriao_ausente" class="filled-in" />
          <span>Embrião ausente?</span>
        </label>
      </div>
      <div class="inputGroup col" style="margin-right:8px;">
        <label>
          <input type="checkbox" id="vesicula_ausente" class="filled-in" />
          <span>Vesícula ausente?</span>
        </label>
      </div>
    </div>

    <div class="row">
      <div class="inputGroup col" style="margin-right:50px;">
        <label>
          <input type="checkbox" id="bcf_ausente" class="filled-in" />
          <span>BCF ausente?</span>
        </label>
      </div>

  
    </div>
  </div>
</form>
  
  `,

  abdome_total: `
  <form id="rendered-form">
  <div class="rendered-form">
    <div class="">
      <h3 id="control-4928516">Abdome total(em desenvolvimento)</h3>
    </div>

    <div class="row">
      <div class="col" style="padding:2px;">
        <div>
          <ul class="collapsible popout">
            <li style="margin:0px;">
              <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Fígado</span>
              </div>
              <div class="collapsible-body white" style="padding-bottom:1px;">
                <div class="inputGroup">
                  <label>
                    <input type="checkbox" id="bcf_ausente" class="filled-in" />
                    <span>Esteatose</span>
                  </label>
                </div>
              </div>
            </li>

            <li style="margin:0px;">
              <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Vesícula biliar</span>
              </div>
              <div class="collapsible-body white" style="padding-bottom:1px;">
                <div class="inputGroup">
                  <label>
                    <input type="checkbox" id="bcf_ausente" class="filled-in" />
                    <span>Colecistite</span>
                  </label>
                </div>
              </div>
            </li>

            <li style="margin:0px;">
              <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Rins</span>
              </div>
              <div class="collapsible-body white" style="padding-bottom:1px;">
                <ul class="collapsible popout">
                  <li style="margin:0px;">
                    <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Dimensões renais</span>
                    </div>
                    <div class="collapsible-body white" style="padding:1px;padding-bottom:1px;">
                      <div class="row">
                        <div class="col">
                          <div class="row">
                            <div class="col">
                              Rim direito
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="fb-number form-group field-form_dbp">
                                <input type="number" placeholder="Comprimento (cm)" class="form-control" name="form_dbp" step="0.1" id="form_dbp"></div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="fb-number form-group field-form_dbp">
                                <input type="number" placeholder="Parênquima (cm)" class="form-control" name="form_dbp" step="0.1" id="form_dbp"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col">
                            <div class="row">
                              <div class="col">
                                Rim esquerdo
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="fb-number form-group field-form_dbp">
                                  <input type="number" placeholder="Comprimento (cm)" class="form-control" name="form_dbp" step="0.1" id="form_dbp"></div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="fb-number form-group field-form_dbp">
                                  <input type="number" placeholder="Parênquima (cm)" class="form-control" name="form_dbp" step="0.1" id="form_dbp"></div>
                              </div>
                            </div>
                          </div>
                      </div>

                    </div>
                  </li>
                </ul>
                <div class="inputGroup">
                  <label>
                    <input type="checkbox" id="bcf_ausente" class="filled-in" />
                    <span>Nefropatia crônica</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</form>
  `,

  transvaginal:
   `<form id="rendered-form">
   <div class="rendered-form">
     <div class="">
       <h3 id="control-4928516">Transvaginal (em desenvolvimento)</h3>
     </div>

     <!-- utero -->
     <div class="row">
       <div class="col" style="padding:2px;">
         <div>
           <h5>Útero</h3>
         </div>
         <div class="row">
           
         </div>
         <div class="row">
             <div class="col-6">
                 <div class="input-field col">
                   <select id="form_utero_posicao" class="form_select_init">
                     <option value="***" disabled selected>...</option>
                     <option value="anteversoflexão">anteversoflexão</option>
                     <option value="retroversoflexão">retroversoflexão</option>
                     <option value="medioversão">medioversão</option>
                   </select>
                   <label>Posição</label>
                 </div>
               </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_utero1">
           </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_utero2">
           </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_utero3">
           </div>
         </div>
         <div>
           <ul class="collapsible popout">
             <li style="margin:0px;">
               <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Achados (útero) (em desenvolvimento)</span>
               </div>
               <div class="collapsible-body white" style="padding-bottom:1px;">
                 <div class="inputGroup">
                   <label>
                     <input type="checkbox" id="bcf_ausente" class="filled-in" />
                     <span>Mioma</span>
                   </label>
                 </div>
               </div>
             </li>
           </ul>
         </div>
       </div>
     </div>
     <!-- ovario direito -->
     <div class="row">
       <div class="col" style="padding:2px;">
         <div>
           <h5>Ovário direito</h3>
         </div>
         <label>
           <input type="checkbox" id="form_od_ausente" class="filled-in" />
           <span>Não caracterizado</span>
         </label>
         <div class="row">
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_od_1">
           </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_od_2">
           </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_od_3">
           </div>
         </div>
       </div>
     </div>
     <!-- ovario esquerdo -->
     <div class="row">
       <div class="col" style="padding:2px;">
         <div>
           <h5>Ovário esquerdo</h3>
         </div>
         <label>
           <input type="checkbox" id="form_oe_ausente" class="filled-in" />
           <span>Não caracterizado</span>
         </label>
         <div class="row">
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_oe_1">
           </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_oe_2">
           </div>
           <div class="col">
             <input type="number" placeholder="(cm)" class="form-control" step="0.1" id="form_oe_3">
           </div>
         </div>
         <div>
           <ul class="collapsible popout">
             <li style="margin:0px;">
               <div class="collapsible-header" style="padding:4  px;"><span class="headline white--text" style="margin-top:0px;">Achados (ovários) (em desenvolvimento)</span>
               </div>
               <div class="collapsible-body white" style="padding-bottom:1px;">
                 <div class="inputGroup">
                   <label>
                     <input type="checkbox" id="bcf_ausente" class="filled-in" />
                     <span>Cisto</span>
                   </label>
                 </div>
               </div>
             </li>
           </ul>
         </div>
       </div>
     </div>
 </form>`,

    nodulo_tireoide : `<form>
    <div class="rendered-form">
      <h3>Nódulo Tireoideano</h3>
      <div class="row">
        <div class="fb-number form-group col-4">
          <label for="thyroid_nodule_size_1" class="fb-number-label">Tamanho 1 (cm)</label>
          <input type="number" placeholder="" step="0.1" class="form-control" name="thyroid_nodule_size_1" id="thyroid_nodule_size_1">
        </div>
        <div class="fb-number form-group col-4">
          <label for="thyroid_nodule_size_2" class="fb-number-label">Tamanho 2 (cm)</label>
          <input type="number" placeholder="" step="0.1" class="form-control" name="thyroid_nodule_size_2" id="thyroid_nodule_size_2">
        </div>
        <div class="fb-number form-group col-4">
          <label for="thyroid_nodule_size_3" class="fb-number-label">Tamanho 3 (cm)</label>
          <input type="number" placeholder="" step="0.1" class="form-control" name="thyroid_nodule_size_3" id="thyroid_nodule_size_3">
        </div>
      </div>

      <div class="row">
        <label for="thyroid_nodule_lobe_select" class="fb-number-label">Lobo</label>
        <select class="form-control" id="thyroid_nodule_lobe_select">
           <option value="right" selected>Direito</option>
           <option value="left">Esquerdo</option>
           <option value="isthmus">Istmo</option>
        </select>
      </div>

      <div class="row">
        <label for="thyroid_nodule_cc_location_select" class="fb-number-label">Terço</label>
        <select class="form-control" id="thyroid_nodule_cc_location_select">
           <option value="superior"> Superior </option>
           <option value="middle" selected> Médio </option>
           <option value="inferior"> Inferior </option>
        </select>
      </div>

      <div class="row">
        <label for="thyroid_nodule_composition_select" class="fb-number-label">Composição</label>
        <select class="form-control" id="thyroid_nodule_composition_select">
           <option value="cystic" selected>Cístico</option>
           <option value="almost_cystic">Quase completamente cístico</option>
           <option value="spongyform">Espongiforme</option>
           <option value="mpc">Misto predominantemente cístico</option>
           <option value="mps">Misto predominantemente sólido</option>
           <option value="almost_solid">Quase completamente sólido</option>
           <option value="solid">Sólido</option>
        </select>
      </div>
 
      <div class="row">
        <label for="thyroid_nodule_echo_select" class="fb-number-label">Ecogenicidade</label>
        <select class="form-control" id="thyroid_nodule_echo_select">
           <option value="anechoic" selected>Anecogênico</option>
           <option value="hyperechoic">Hiperecogênico</option>
           <option value="isoechoic">Isoecogênico</option>
           <option value="hypoechoic">Hipocogênico</option>
           <option value="very_hypoechoic">Marcadamente hipoecogênico</option>
        </select>
      </div>

      <div class="row">
        <label for="thyroid_nodule_shape_select" class="fb-number-label">Forma</label>
        <select class="form-control" id="thyroid_nodule_shape_select">
           <option value="wider" selected>Mais largo que alto</option>
           <option value="taller">Mais alto que largo</option>
        </select>
      </div>

      <div class="row">
        <label for="thyroid_nodule_margin_select" class="fb-number-label">Margens</label>
        <select class="form-control" id="thyroid_nodule_margin_select">
           <option value="well_defined" selected>Bem definidas</option>
           <option value="ill_defined">Mal definidas</option>
           <option value="lobulated">Lobuladas</option>
           <option value="extra">Extensão extra-tireoideana</option>
        </select>
      </div>

      <div class="row">
        <label for="thyroid_nodule_halo_select" class="fb-number-label">Halo hipoecogênico</label>
        <select class="form-control" id="thyroid_nodule_halo_select">
           <option value="complete" selected> Completo </option>
           <option value="incomplete"> Incompleto </option>
           <option value="absent"> Ausente </option>
        </select>
      </div>
  
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label pt-0"> Focos hiperecogênicos </legend>

          <div class="col inputGroup">
            <label>
              <input type="checkbox" id="thyroid_nodule_comet" class="filled-in" />
                <span> Grandes, com artefatos em cauda de cometa </span>
            </label>
          </div>

          <div class="col inputGroup">
            <label>
              <input type="checkbox" id="thyroid_nodule_macro" class="filled-in" />
              <span> Calcificações grosseiras </span>
            </label>
          </div>

          <div class="col inputGroup">
            <label>
              <input type="checkbox" id="thyroid_nodule_rim" class="filled-in" />
              <span> Calcificações periféricas </span>
            </label>
          </div>

          <div class="col inputGroup">
            <label>
              <input type="checkbox" id="thyroid_nodule_micro" class="filled-in" />
              <span> Microcalcificações </span>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </form>`,

}


export default {
  'usg' : {
    'obstetrico' : {
      'ob_tardio' : {
        nickname : 'Obstétrico 2o/3o TRI',
        template : form_templates['ob_tardio']
      },
      'ob_inicial' : {
        nickname : 'Obstétrico 1o TRI',
        template : form_templates['ob_inicial']
      },
      'transvaginal' : {
        nickname : 'Transvaginal',
        template : form_templates['transvaginal']
      },
    },

    'superficial' : {
      'escrotal' : {
        nickname : 'Escrotal',
        template : form_templates['escrotal']
      },
    },

    'abdome' : {
      'abdome_total' : {
        nickname : 'Abdome Total',
        template : form_templates['abdome_total']
      },
    },

    'cep' : {
      'nodulo_tireoide' : {
        nickname : 'Nódulo Tireoideano',
        template : form_templates['nodulo_tireoide']
      }
    }
  }
}
