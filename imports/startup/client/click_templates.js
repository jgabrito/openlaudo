/* eslint no-unused-vars: "warn", "no-undef" : "error", "no-new" : "warn", "eqeqeq" : "off", "no-redeclare" : "warn", "semi" : "off", "brace-style" : "off", "quotes" : "off", "space-before-function-paren" : "off", "no-multiple-empty-lines" : "off", "padded-blocks" : "off", "no-trailing-spaces" : "off", "spaced-comment" : "off", "no-floating-decimal" : "off", "indent" : "off", "space-infix-ops" : "off", "comma-spacing" : "off", "keyword-spacing" : "off", "comma-dangle" : "off", "space-before-blocks" : "off", "curly" : "off", "object-curly-spacing" : "off", "no-multi-spaces" : "off", "standard/object-curly-even-spacing" : "off", "space-in-parens" : "off" */

import $ from 'jquery'

const submit_laudo = {
  ob_tardio: function (quill) {
    try {
      var DBP = ($('#form_dbp')[0].value / 10) || "***";
      var CC = ($('#form_cc')[0].value / 10) || "***";
      var CA = ($('#form_ca')[0].value / 10) || "***";
      var CF = ($('#form_cf')[0].value / 10) || "***";
      var BCF = $('#form_bcf')[0].value || "***";
      var ILA = ($('#form_ila')[0].value / 10) || "***";
      var bcf_ausente = $('#bcf_ausente')[0].checked;
      var dorso = $('#form_dorso').val();
      var apresentacao = $('#form_apresentacao').val();
      var ref_weeks = $('#form_semanas').val();
      var ref_days = $('#form_dias').val();
    }
    catch (e) {
      console.warn("Error in ob_tardio calculus");
      console.warn(e);
    }
    var dorso_label;
    if (apresentacao == "córmica"){
      dorso_label = "cabeça";
    }
    else {
      dorso_label = "dorso";
    }



    var calculated_age = calculate_efw_and_gestational(DBP, CC, CA, CF);
    var efw = calculated_age.efw;
    var weeks = calculated_age.weeks;
    var days = calculated_age.days;

    var percentile = 0;

    if (ref_weeks) {
      if (!ref_days) {
        ref_days = 0;
      }
      percentile = computeEFWPercentile(ref_weeks, ref_days, efw);
    }
    else {
      percentile = computeEFWPercentile(weeks, days, efw);
    }

    if (days == 0) {
      days = "zero";
    }
    if (days > 1)
      var days_plural = 's';
    else
      var days_plural = '';

    if (ref_days > 1)
      var ref_days_plural = 's';
    else
      var ref_days_plural = '';

    var variacao = "5";
    if (weeks >= 9)
      variacao = "7";
    if (weeks >= 16)
      variacao = "10";
    if (weeks >= 22)
      variacao = "14";
    if (weeks >= 28)
      variacao = "21";

    var peso_variacao = (roundNumber(efw*0.13,0) || "***");

    if (bcf_ausente) {
      var bcf_message = "\nAusência de batimentos cardíacos fetais.";
      var bcf_conc = "\nAusência de batimentos cardíacos fetais, compatível com óbito fetal";
    } else {
      var bcf_message = "\nO feto apresenta sinais vitais presentes, representados por movimentação ativa e batimentos cardíacos.\nBCF: " + BCF + " bpm.";
      var bcf_conc = "\nGestação única, tópica, de concepto vivo.";
    }

    var biometria_conc = "Biometria atual compatível com " + (weeks || "***") + " semanas e " + (days || "***") + " dia" + days_plural + " (Hadlock et al).";
    if (ref_weeks) {
      biometria_conc = "Gestação de "  + ref_weeks + " semanas e " + (ref_days || "zero") + " dia" + ref_days_plural + ", ***compatível com a biometria atual (" + (weeks || "***") + " semanas e " + (days || "***") + " dia" + days_plural+ ") (variação de até +/- " + variacao + " dias) (Hadlock et al)";
    }

    var efw_text = "Peso fetal em torno de " + (efw || "***") + " gramas (+/- " + peso_variacao + " g) (Hadlock et al), compatível com percentil " + percentile + " para a idade gestacional estimada.";
    if (ref_weeks) {
      efw_text = "Peso fetal em torno de " + (efw || "***") + " gramas (+/- " + peso_variacao + " g) (Hadlock et al), compatível com percentil " + percentile + " para a idade gestacional de referência (" + ref_weeks + " semanas e " + (ref_days || "zero") + " dia" + ref_days_plural + ").";
    }

    quill.setContents([
      { insert: "ULTRASSONOGRAFIA OBSTÉTRICA\n\n", attributes: { bold: true, align: "center" } },
      { insert: "Feto único, em  apresentação " + (apresentacao || "***") + ", com " + dorso_label + " à " + (dorso || "***") + "." + bcf_message + "\nPlacenta de localização ***, com aspecto compatível com grau *** de Grannum. Espessura de *** mm.\n\n", attributes: { bold: false } },
      { insert: "Parâmetros biométricos:\n", attributes: { bold: true } },
      { insert: "Diâmetro biparietal (DBP): " + (Fmt1(10 * DBP) || "***") + " mm.\nCircunferência cefálica (CC): " + (Fmt1(10 * CC) || "***") + " mm.\nCircunferência abdominal (CA): " + (Fmt1(10 * CA) || "***") + " mm.\nComprimento femoral (CF): " + (Fmt1(10 * CF) || "***") + " mm.\n" + efw_text + "\n\n", attributes: { bold: false } },
      { insert: "Líquido amniótico:\n", attributes: { bold: true } },
      { insert: "Volume de líquido amniótico subjetivamente normal. ILA= " + (10 * ILA || "***") + " mm.\n\n", attributes: { bold: false } },
      { insert: "Conclusão:", attributes: { bold: true } },
      { insert: bcf_conc + "\n" + biometria_conc + "\n" }


    ]);

  },

  ob_inicial: function (quill) {

    var sg1 = parseFloat($("#form_sg1")[0].value );
    var sg2 = parseFloat($("#form_sg2")[0].value);
    var sg3 = parseFloat($("#form_sg3")[0].value);
    var sg_mean = roundNumber((sg1 + sg2 + sg3) / 3, 1);
    var ccn = parseFloat($("#form_ccn")[0].value) / 10;
    var BCF = $('#form_bcf')[0].value || "***";
    var bcf_ausente = $('#bcf_ausente')[0].checked;
    var embriao_ausente = $('#embriao_ausente')[0].checked;
    var vesicula_ausente = $('#vesicula_ausente')[0].checked;

    var GA = 1.684969 + (0.315646 * ccn) - (0.049306 * Math.pow(ccn, 2)) + (0.004057 * Math.pow(ccn, 3)) - (0.000120456 * Math.pow(ccn, 4));
    GA = Math.pow(Math.E, GA);


    if (ccn) {
      var ccnStr = (ccn * 10).toFixed(1).replace('.', ',');
      console.log(ccn);
    }
    else {
      ccnStr = "***";
    }

    var bcf_message;
    var bcf_conc;
    if (bcf_ausente) {
      bcf_message = "Embrião único, com comprimento cabeça-nádega (CCN) de " + ccnStr + " mm.\nAusência de batimentos cardíacos embrionários detectáveis.";
      if (ccn >= 0.7) {
        bcf_conc = "Ausência de batimentos cardíacos embrionários, compatível gestação não evolutiva.";
      }
      else {
        bcf_conc = "Ausência de batimentos cardíacos embrionários. Sugere-se controle evolutivo ultrassongráfico.";
      }
    }
    else {
      bcf_message = "Embrião único, com batimentos cardíacos embrionários presentes.\nBCF: " + BCF + " bpm.\nComprimento cabeça-nádega (CCN) de " + ccnStr + " mm.";
      bcf_conc = "Gestação única, tópica, de concepto vivo.";
    }

    var follow_time = "10";
    var vesicula_message = "Vesícula vitelínica presente e de aspecto preservado.";
    if (vesicula_ausente) {
      follow_time = "14";
      vesicula_message = "Vesícula vitelínica não caracterizada.";
    }


    var GAdays;
    if (embriao_ausente) {
      GAdays = ((sg_mean) + 30);
      GA = GAdays / 7;

      bcf_message = "Embrião não caracterizado neste estudo.";
      bcf_conc = "Saco gestacional tópico na cavidade uterina, sem embrião caracterizado neste estudo. Sugere-se controle evolutivo ultrassongráfico em " + follow_time + " dias.";
    }

    var GAint = Math.floor(GA);
    var GAfloat = GA % 1;
    var days = GAfloat * 7; //percent * (xMax - xMin) + xMin;

    var weeks = GAint;
    var days = Math.round(days);

    if (days == 7) {
      weeks++;
      days = 0;
    }
    if (days == 0) {
      days = "zero";
    }
    if (days > 1)
      var days_plural = 's';
    else
      var days_plural = '';


    // source: ACOG (Methods for estimating the due date. Committee Opinion No. 700. American College of Obstetricians and Gynecologists. Obstet Gynecol 2017;129:e150–4.)
    var variacao = "5";
    if (weeks >= 9)
      variacao = "7";
    if (weeks >= 16)
      variacao = "10";
    if (weeks >= 22)
      variacao = "14";
    if (weeks >= 28)
      variacao = "21";

    var biometria_message = "Biometria atual compatível com " + (weeks || "***") + " semanas e " + (days || "***") + " dia" + days_plural + " (variação de até +/- " + variacao + " dias) (Hadlock et al).";
    if (embriao_ausente) {
      biometria_message = "Biometria atual compatível com " + (weeks || "***") + " semanas e " + (days || "***") + " dia" + days_plural + ". (obs: o cálculo da idade gestacional é pouco acurado na ausência de embrião e deve ser repetido para datação).";
    }

    var adendo = '';
    if (ccn >= 8.5) {
      adendo = "Obs: O CCN está maior que 8,4 cm. Recomenda-se a biometria de 4 parâmtros (Obstétrico 2º/3º trimestre)"
    }

    quill.setContents([
      { insert: "ULTRASSONOGRAFIA OBSTÉTRICA INICIAL\n\n", attributes: { bold: true, align: "center" } },
      { insert: "Útero aumentado de volume, contendo saco gestacional tópico, de contornos regulares, medindo " + (Fmt1(sg1) || "***") + " x " + (Fmt1(sg2) || "***") + " x " + (Fmt1(sg3) || "***") + " mm (média de " + (Fmt1(sg_mean) || "***") + " mm).\n" + bcf_message + "\n" + vesicula_message + "\nAusência de sinais de descolamento ovular.\nColo uterino de aspecto habitual, com comprimento de *** mm.\nOvários de aspecto habitual.Corpo lúteo em ovário direito / esquerdo.", attributes: { bold: false } },
      { insert: "\n\nConclusão:", attributes: { bold: true } },
      { insert: "\n" + bcf_conc + "\n" + biometria_message + "\n\n" + adendo }


    ]);


  },

  transvaginal: function (quill){
    var utero1 = $('#form_utero1').val();
    var utero2 = $('#form_utero2').val();
    var utero3 = $('#form_utero3').val();
    var uteroPos = ($('#form_utero_posicao').val() || "***");

    var od1 = $('#form_od_1').val();
    var od2 = $('#form_od_2').val();
    var od3 = $('#form_od_3').val();
    var odAusente = $("#form_od_ausente")[0].checked;

    var oe1 = $('#form_oe_1').val();
    var oe2 = $('#form_oe_2').val();
    var oe3 = $('#form_oe_3').val();
    var oeAusente = $("#form_oe_ausente")[0].checked;

    var uteroVol = (utero1*utero2*utero3*0.523);
    var odVol = od1*od2*od3*0.523;
    var oeVol = oe1*oe2*oe3*0.523;

    var uteroStr = "Dimensões do útero: " + Fmt1(utero1) + " x " + Fmt1(utero2) + " x " + Fmt1(utero3) + " cm. Volume estimado de " + Fmt1(uteroVol) + " cm³.";
    var odStr = "Dimensões: " + Fmt1(od1) + " x " + Fmt1(od2) + " x " + Fmt1(od3) + " cm. Volume estimado de " + Fmt1(odVol) + " cm³.";
    var oeStr = "Dimensões: " + Fmt1(oe1) + " x " + Fmt1(oe2) + " x " + Fmt1(oe3) + " cm. Volume estimado de " + Fmt1(oeVol) + " cm³.";


    var ovsStr;
    ovsStr = "Ovário direito tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima característica.\n" + odStr + "\nOvário esquerdo tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima característica.\n" + oeStr;
    if (odAusente) {
      ovsStr = "Ovário direito não caracterizado. Região anexial direita sem particularidades.\n\nOvário esquerdo tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima característica.\n" + oeStr;
    }
    if (oeAusente){
      ovsStr = "Ovário direito tópico, de contornos regulares e dimensões normais. Ecotextura do parênquima característica.\n" + odStr + "\nOvário esquerdo não caracterizado. Região anexial esquerda sem particularidades.";
    }
    if (odAusente && oeAusente) {
      ovsStr = "Ovários não caracterizados.\nRegiões anexiais sem particularidades.";
    }
    


    var conc = "Exame sem alterações significativas.";


    quill.setContents([
      { insert: "ULTRASSONOGRAFIA PÉLVICA VIA TRANSVAGINAL\n\n", attributes: { bold: true, align: "center" } },
      { insert: "Útero em " + uteroPos + ", de contornos regulares e dimensões normais. Ecotextura do parênquima preservada.\n" + uteroStr + "\nEndométrio centrado e homogêneo, com espessura de cm.\nCavidade uterina virtual.\n" + ovsStr + "\nAusência de líquido livre ou coleções.", attributes: { bold: false } },
      { insert: "\n\nConclusão:", attributes: { bold: true } },
      { insert: "\n" +  conc}


    ]);


  },

  aparelho: function (quill) {

  },

  escrotal: function(quill){

  },








}















// HELPER FUNCTIONS   HELPER FUNCTIONS   HELPER FUNCTIONS   HELPER FUNCTIONS   
// HELPER FUNCTIONS   HELPER FUNCTIONS   HELPER FUNCTIONS   HELPER FUNCTIONS   





function calculate_efw_and_gestational(BPD, HC, AC, FL) {

  BPD = parseFloat(BPD);
  HC = parseFloat(HC);
  AC = parseFloat(AC);
  FL = parseFloat(FL);

  var weight = Math.pow(10, 1.3596 + (0.0064 * HC) + (0.00061 * BPD * AC) + (0.0424 * AC) + (0.174 * FL) - (0.00386 * AC * FL));
  weight = Math.round(weight);

  var GA = 10.85 + (0.060 * HC * FL) + (0.6700 * BPD) + (0.1680 * AC);
  var GAint = Math.floor(GA);
  var GAfloat = GA % 1;

  var days = GAfloat * 7;

  var weeks = GAint;
  days = Math.round(days);
  if (days == 7) {
    weeks++;
    days = 0;
  }

  return {
    weeks: weeks,
    days: days,
    efw: weight
  }
}

function calculate_history() {
  var usg_date = $('#form_usg_date').val();
  var usg_weeks = $('#form_usg_weeks').val();
  var usg_days = $('#form_usg_days').val();
  var dum = $('#form_dum').val();

  if (usg_date && usg_weeks) {
    if (!usg_days)
      usg_days = 0;
    var from_usg = calculate_ga_from_previous(usg_date, usg_weeks, usg_days);
    var weeks = from_usg[0];
    var days = from_usg[1];
  }
  else if (dum) {
    var from_dum = calculate_ga_from_dum(dum);
    var weeks = from_dum[0];
    var days = from_dum[1];
  }
  else {
    alert("Preencha os dados de USG ou DUM");
  }

  $('#form_semanas').val(weeks);
  $('#form_dias').val(days);
  
}

function calculate_ga_from_previous(usg_date, weeks, days) {
  weeks = parseInt(weeks);
  days = parseInt(days);

  var total_days = weeks*7 + days;
  var today = new Date(Date.now());
  usg_date = new Date(usg_date + ' 00:00');
  var days_difference = days_between(usg_date,today);
  var total_days = total_days + days_difference;

  var diff_weeks = Math.floor(total_days/7);
  var diff_days = (total_days%7);

  return [diff_weeks, diff_days];

}

function calculate_ga_from_dum(dum) {
    var today = new Date(Date.now());
    var dum = new Date(dum);
    var days_difference = days_between(dum, today);

    var weeks = Math.floor(days_difference/7);
    var days = (days_difference%7);
  return [weeks, days];
}

function days_between(date1, date2) {

  // The number of milliseconds in one day
  var ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return Math.floor(difference_ms/ONE_DAY);

}

function separate_weeks_days(weeks) {
  var GAint = Math.floor(weeks);
  var GAfloat = GAint % 1;

  var days = GAfloat * 7;

  var weeks = GAint;
  days = Math.round(days);
  if (days == 7) {
    weeks++;
    days = 0;
  }

  return {
    weeks: weeks,
    days: days,
  }
}

var Idx3 = {};

var Data3 = {};

Idx3[1] = "-3.50"; Data3[1] = "0.0002";
Idx3[2] = "-3.49"; Data3[2] = "0.0002";
Idx3[3] = "-3.48"; Data3[3] = "0.0003";
Idx3[4] = "-3.47"; Data3[4] = "0.0003";
Idx3[5] = "-3.46"; Data3[5] = "0.0003";
Idx3[6] = "-3.45"; Data3[6] = "0.0003";
Idx3[7] = "-3.44"; Data3[7] = "0.0003";
Idx3[8] = "-3.43"; Data3[8] = "0.0003";
Idx3[9] = "-3.42"; Data3[9] = "0.0003";
Idx3[10] = "-3.41"; Data3[10] = "0.0003";
Idx3[11] = "-3.40"; Data3[11] = "0.0003";
Idx3[12] = "-3.39"; Data3[12] = "0.0003";
Idx3[13] = "-3.38"; Data3[13] = "0.0004";
Idx3[14] = "-3.37"; Data3[14] = "0.0004";
Idx3[15] = "-3.36"; Data3[15] = "0.0004";
Idx3[16] = "-3.35"; Data3[16] = "0.0004";
Idx3[17] = "-3.34"; Data3[17] = "0.0004";
Idx3[18] = "-3.33"; Data3[18] = "0.0004";
Idx3[19] = "-3.32"; Data3[19] = "0.0005";
Idx3[20] = "-3.31"; Data3[20] = "0.0005";
Idx3[21] = "-3.30"; Data3[21] = "0.0005";
Idx3[22] = "-3.29"; Data3[22] = "0.0005";
Idx3[23] = "-3.28"; Data3[23] = "0.0005";
Idx3[24] = "-3.27"; Data3[24] = "0.0005";
Idx3[25] = "-3.26"; Data3[25] = "0.0006";
Idx3[26] = "-3.25"; Data3[26] = "0.0006";
Idx3[27] = "-3.24"; Data3[27] = "0.0006";
Idx3[28] = "-3.23"; Data3[28] = "0.0006";
Idx3[29] = "-3.22"; Data3[29] = "0.0006";
Idx3[30] = "-3.21"; Data3[30] = "0.0007";
Idx3[31] = "-3.20"; Data3[31] = "0.0007";
Idx3[32] = "-3.19"; Data3[32] = "0.0007";
Idx3[33] = "-3.18"; Data3[33] = "0.0007";
Idx3[34] = "-3.17"; Data3[34] = "0.0008";
Idx3[35] = "-3.16"; Data3[35] = "0.0008";
Idx3[36] = "-3.15"; Data3[36] = "0.0008";
Idx3[37] = "-3.14"; Data3[37] = "0.0008";
Idx3[38] = "-3.13"; Data3[38] = "0.0009";
Idx3[39] = "-3.12"; Data3[39] = "0.0009";
Idx3[40] = "-3.11"; Data3[40] = "0.0009";
Idx3[41] = "-3.10"; Data3[41] = "0.0010";
Idx3[42] = "-3.09"; Data3[42] = "0.0010";
Idx3[43] = "-3.08"; Data3[43] = "0.0010";
Idx3[44] = "-3.07"; Data3[44] = "0.0011";
Idx3[45] = "-3.06"; Data3[45] = "0.0011";
Idx3[46] = "-3.05"; Data3[46] = "0.0011";
Idx3[47] = "-3.04"; Data3[47] = "0.0012";
Idx3[48] = "-3.03"; Data3[48] = "0.0012";
Idx3[49] = "-3.02"; Data3[49] = "0.0013";
Idx3[50] = "-3.01"; Data3[50] = "0.0013";
Idx3[51] = "-3.00"; Data3[51] = "0.0013";
Idx3[52] = "-2.99"; Data3[52] = "0.0014";
Idx3[53] = "-2.98"; Data3[53] = "0.0014";
Idx3[54] = "-2.97"; Data3[54] = "0.0015";
Idx3[55] = "-2.96"; Data3[55] = "0.0015";
Idx3[56] = "-2.95"; Data3[56] = "0.0016";
Idx3[57] = "-2.94"; Data3[57] = "0.0016";
Idx3[58] = "-2.93"; Data3[58] = "0.0017";
Idx3[59] = "-2.92"; Data3[59] = "0.0018";
Idx3[60] = "-2.91"; Data3[60] = "0.0018";
Idx3[61] = "-2.90"; Data3[61] = "0.0019";
Idx3[62] = "-2.89"; Data3[62] = "0.0019";
Idx3[63] = "-2.88"; Data3[63] = "0.0020";
Idx3[64] = "-2.87"; Data3[64] = "0.0021";
Idx3[65] = "-2.86"; Data3[65] = "0.0021";
Idx3[66] = "-2.85"; Data3[66] = "0.0022";
Idx3[67] = "-2.84"; Data3[67] = "0.0023";
Idx3[68] = "-2.83"; Data3[68] = "0.0023";
Idx3[69] = "-2.82"; Data3[69] = "0.0024";
Idx3[70] = "-2.81"; Data3[70] = "0.0025";
Idx3[71] = "-2.80"; Data3[71] = "0.0026";
Idx3[72] = "-2.79"; Data3[72] = "0.0026";
Idx3[73] = "-2.78"; Data3[73] = "0.0027";
Idx3[74] = "-2.77"; Data3[74] = "0.0028";
Idx3[75] = "-2.76"; Data3[75] = "0.0029";
Idx3[76] = "-2.75"; Data3[76] = "0.0030";
Idx3[77] = "-2.74"; Data3[77] = "0.0031";
Idx3[78] = "-2.73"; Data3[78] = "0.0032";
Idx3[79] = "-2.72"; Data3[79] = "0.0033";
Idx3[80] = "-2.71"; Data3[80] = "0.0034";
Idx3[81] = "-2.70"; Data3[81] = "0.0035";
Idx3[82] = "-2.69"; Data3[82] = "0.0036";
Idx3[83] = "-2.68"; Data3[83] = "0.0037";
Idx3[84] = "-2.67"; Data3[84] = "0.0038";
Idx3[85] = "-2.66"; Data3[85] = "0.0039";
Idx3[86] = "-2.65"; Data3[86] = "0.0040";
Idx3[87] = "-2.64"; Data3[87] = "0.0041";
Idx3[88] = "-2.63"; Data3[88] = "0.0043";
Idx3[89] = "-2.62"; Data3[89] = "0.0044";
Idx3[90] = "-2.61"; Data3[90] = "0.0045";
Idx3[91] = "-2.60"; Data3[91] = "0.0047";
Idx3[92] = "-2.59"; Data3[92] = "0.0048";
Idx3[93] = "-2.58"; Data3[93] = "0.0049";
Idx3[94] = "-2.57"; Data3[94] = "0.0051";
Idx3[95] = "-2.56"; Data3[95] = "0.0052";
Idx3[96] = "-2.55"; Data3[96] = "0.0054";
Idx3[97] = "-2.54"; Data3[97] = "0.0055";
Idx3[98] = "-2.53"; Data3[98] = "0.0057";
Idx3[99] = "-2.52"; Data3[99] = "0.0059";
Idx3[100] = "-2.51"; Data3[100] = "0.0060";
Idx3[101] = "-2.50"; Data3[101] = "0.0062";
Idx3[102] = "-2.49"; Data3[102] = "0.0064";
Idx3[103] = "-2.48"; Data3[103] = "0.0066";
Idx3[104] = "-2.47"; Data3[104] = "0.0068";
Idx3[105] = "-2.46"; Data3[105] = "0.0069";
Idx3[106] = "-2.45"; Data3[106] = "0.0071";
Idx3[107] = "-2.44"; Data3[107] = "0.0073";
Idx3[108] = "-2.43"; Data3[108] = "0.0075";
Idx3[109] = "-2.42"; Data3[109] = "0.0078";
Idx3[110] = "-2.41"; Data3[110] = "0.0080";
Idx3[111] = "-2.40"; Data3[111] = "0.0082";
Idx3[112] = "-2.39"; Data3[112] = "0.0084";
Idx3[113] = "-2.38"; Data3[113] = "0.0087";
Idx3[114] = "-2.37"; Data3[114] = "0.0089";
Idx3[115] = "-2.36"; Data3[115] = "0.0091";
Idx3[116] = "-2.35"; Data3[116] = "0.0094";
Idx3[117] = "-2.34"; Data3[117] = "0.0096";
Idx3[118] = "-2.33"; Data3[118] = "0.0099";
Idx3[119] = "-2.32"; Data3[119] = "0.0102";
Idx3[120] = "-2.31"; Data3[120] = "0.0104";
Idx3[121] = "-2.30"; Data3[121] = "0.0107";
Idx3[122] = "-2.29"; Data3[122] = "0.0110";
Idx3[123] = "-2.28"; Data3[123] = "0.0113";
Idx3[124] = "-2.27"; Data3[124] = "0.0116";
Idx3[125] = "-2.26"; Data3[125] = "0.0119";
Idx3[126] = "-2.25"; Data3[126] = "0.0122";
Idx3[127] = "-2.24"; Data3[127] = "0.0125";
Idx3[128] = "-2.23"; Data3[128] = "0.0129";
Idx3[129] = "-2.22"; Data3[129] = "0.0132";
Idx3[130] = "-2.21"; Data3[130] = "0.0136";
Idx3[131] = "-2.20"; Data3[131] = "0.0139";
Idx3[132] = "-2.19"; Data3[132] = "0.0143";
Idx3[133] = "-2.18"; Data3[133] = "0.0146";
Idx3[134] = "-2.17"; Data3[134] = "0.0150";
Idx3[135] = "-2.16"; Data3[135] = "0.0154";
Idx3[136] = "-2.15"; Data3[136] = "0.0158";
Idx3[137] = "-2.14"; Data3[137] = "0.0162";
Idx3[138] = "-2.13"; Data3[138] = "0.0166";
Idx3[139] = "-2.12"; Data3[139] = "0.0170";
Idx3[140] = "-2.11"; Data3[140] = "0.0174";
Idx3[141] = "-2.10"; Data3[141] = "0.0179";
Idx3[142] = "-2.09"; Data3[142] = "0.0183";
Idx3[143] = "-2.08"; Data3[143] = "0.0188";
Idx3[144] = "-2.07"; Data3[144] = "0.0192";
Idx3[145] = "-2.06"; Data3[145] = "0.0197";
Idx3[146] = "-2.05"; Data3[146] = "0.0202";
Idx3[147] = "-2.04"; Data3[147] = "0.0207";
Idx3[148] = "-2.03"; Data3[148] = "0.0212";
Idx3[149] = "-2.02"; Data3[149] = "0.0217";
Idx3[150] = "-2.01"; Data3[150] = "0.0222";
Idx3[151] = "-2.00"; Data3[151] = "0.0228";
Idx3[152] = "-1.99"; Data3[152] = "0.0233";
Idx3[153] = "-1.98"; Data3[153] = "0.0239";
Idx3[154] = "-1.97"; Data3[154] = "0.0244";
Idx3[155] = "-1.96"; Data3[155] = "0.0250";
Idx3[156] = "-1.95"; Data3[156] = "0.0256";
Idx3[157] = "-1.94"; Data3[157] = "0.0262";
Idx3[158] = "-1.93"; Data3[158] = "0.0268";
Idx3[159] = "-1.92"; Data3[159] = "0.0274";
Idx3[160] = "-1.91"; Data3[160] = "0.0281";
Idx3[161] = "-1.90"; Data3[161] = "0.0287";
Idx3[162] = "-1.89"; Data3[162] = "0.0294";
Idx3[163] = "-1.88"; Data3[163] = "0.0301";
Idx3[164] = "-1.87"; Data3[164] = "0.0307";
Idx3[165] = "-1.86"; Data3[165] = "0.0314";
Idx3[166] = "-1.85"; Data3[166] = "0.0322";
Idx3[167] = "-1.84"; Data3[167] = "0.0329";
Idx3[168] = "-1.83"; Data3[168] = "0.0336";
Idx3[169] = "-1.82"; Data3[169] = "0.0344";
Idx3[170] = "-1.81"; Data3[170] = "0.0351";
Idx3[171] = "-1.80"; Data3[171] = "0.0359";
Idx3[172] = "-1.79"; Data3[172] = "0.0367";
Idx3[173] = "-1.78"; Data3[173] = "0.0375";
Idx3[174] = "-1.77"; Data3[174] = "0.0384";
Idx3[175] = "-1.76"; Data3[175] = "0.0392";
Idx3[176] = "-1.75"; Data3[176] = "0.0401";
Idx3[177] = "-1.74"; Data3[177] = "0.0409";
Idx3[178] = "-1.73"; Data3[178] = "0.0418";
Idx3[179] = "-1.72"; Data3[179] = "0.0427";
Idx3[180] = "-1.71"; Data3[180] = "0.0436";
Idx3[181] = "-1.70"; Data3[181] = "0.0446";
Idx3[182] = "-1.69"; Data3[182] = "0.0455";
Idx3[183] = "-1.68"; Data3[183] = "0.0465";
Idx3[184] = "-1.67"; Data3[184] = "0.0475";
Idx3[185] = "-1.66"; Data3[185] = "0.0485";
Idx3[186] = "-1.65"; Data3[186] = "0.0495";
Idx3[187] = "-1.64"; Data3[187] = "0.0505";
Idx3[188] = "-1.63"; Data3[188] = "0.0516";
Idx3[189] = "-1.62"; Data3[189] = "0.0526";
Idx3[190] = "-1.61"; Data3[190] = "0.0537";
Idx3[191] = "-1.60"; Data3[191] = "0.0548";
Idx3[192] = "-1.59"; Data3[192] = "0.0559";
Idx3[193] = "-1.58"; Data3[193] = "0.0571";
Idx3[194] = "-1.57"; Data3[194] = "0.0582";
Idx3[195] = "-1.56"; Data3[195] = "0.0594";
Idx3[196] = "-1.55"; Data3[196] = "0.0606";
Idx3[197] = "-1.54"; Data3[197] = "0.0618";
Idx3[198] = "-1.53"; Data3[198] = "0.0630";
Idx3[199] = "-1.52"; Data3[199] = "0.0643";
Idx3[200] = "-1.51"; Data3[200] = "0.0655";
Idx3[201] = "-1.50"; Data3[201] = "0.0668";
Idx3[202] = "-1.49"; Data3[202] = "0.0681";
Idx3[203] = "-1.48"; Data3[203] = "0.0694";
Idx3[204] = "-1.47"; Data3[204] = "0.0708";
Idx3[205] = "-1.46"; Data3[205] = "0.0721";
Idx3[206] = "-1.45"; Data3[206] = "0.0735";
Idx3[207] = "-1.44"; Data3[207] = "0.0749";
Idx3[208] = "-1.43"; Data3[208] = "0.0764";
Idx3[209] = "-1.42"; Data3[209] = "0.0778";
Idx3[210] = "-1.41"; Data3[210] = "0.0793";
Idx3[211] = "-1.40"; Data3[211] = "0.0808";
Idx3[212] = "-1.39"; Data3[212] = "0.0823";
Idx3[213] = "-1.38"; Data3[213] = "0.0838";
Idx3[214] = "-1.37"; Data3[214] = "0.0853";
Idx3[215] = "-1.36"; Data3[215] = "0.0869";
Idx3[216] = "-1.35"; Data3[216] = "0.0885";
Idx3[217] = "-1.34"; Data3[217] = "0.0901";
Idx3[218] = "-1.33"; Data3[218] = "0.0918";
Idx3[219] = "-1.32"; Data3[219] = "0.0934";
Idx3[220] = "-1.31"; Data3[220] = "0.0951";
Idx3[221] = "-1.30"; Data3[221] = "0.0968";
Idx3[222] = "-1.29"; Data3[222] = "0.0985";
Idx3[223] = "-1.28"; Data3[223] = "0.1003";
Idx3[224] = "-1.27"; Data3[224] = "0.1020";
Idx3[225] = "-1.26"; Data3[225] = "0.1038";
Idx3[226] = "-1.25"; Data3[226] = "0.1056";
Idx3[227] = "-1.24"; Data3[227] = "0.1075";
Idx3[228] = "-1.23"; Data3[228] = "0.1093";
Idx3[229] = "-1.22"; Data3[229] = "0.1112";
Idx3[230] = "-1.21"; Data3[230] = "0.1131";
Idx3[231] = "-1.20"; Data3[231] = "0.1151";
Idx3[232] = "-1.19"; Data3[232] = "0.1170";
Idx3[233] = "-1.18"; Data3[233] = "0.1190";
Idx3[234] = "-1.17"; Data3[234] = "0.1210";
Idx3[235] = "-1.16"; Data3[235] = "0.1230";
Idx3[236] = "-1.15"; Data3[236] = "0.1251";
Idx3[237] = "-1.14"; Data3[237] = "0.1271";
Idx3[238] = "-1.13"; Data3[238] = "0.1292";
Idx3[239] = "-1.12"; Data3[239] = "0.1314";
Idx3[240] = "-1.11"; Data3[240] = "0.1335";
Idx3[241] = "-1.10"; Data3[241] = "0.1357";
Idx3[242] = "-1.09"; Data3[242] = "0.1379";
Idx3[243] = "-1.08"; Data3[243] = "0.1401";
Idx3[244] = "-1.07"; Data3[244] = "0.1423";
Idx3[245] = "-1.06"; Data3[245] = "0.1446";
Idx3[246] = "-1.05"; Data3[246] = "0.1469";
Idx3[247] = "-1.04"; Data3[247] = "0.1492";
Idx3[248] = "-1.03"; Data3[248] = "0.1515";
Idx3[249] = "-1.02"; Data3[249] = "0.1539";
Idx3[250] = "-1.01"; Data3[250] = "0.1562";
Idx3[251] = "-1.00"; Data3[251] = "0.1587";
Idx3[252] = "-0.99"; Data3[252] = "0.1611";
Idx3[253] = "-0.98"; Data3[253] = "0.1635";
Idx3[254] = "-0.97"; Data3[254] = "0.1660";
Idx3[255] = "-0.96"; Data3[255] = "0.1685";
Idx3[256] = "-0.95"; Data3[256] = "0.1711";
Idx3[257] = "-0.94"; Data3[257] = "0.1736";
Idx3[258] = "-0.93"; Data3[258] = "0.1762";
Idx3[259] = "-0.92"; Data3[259] = "0.1788";
Idx3[260] = "-0.91"; Data3[260] = "0.1814";
Idx3[261] = "-0.90"; Data3[261] = "0.1841";
Idx3[262] = "-0.89"; Data3[262] = "0.1867";
Idx3[263] = "-0.88"; Data3[263] = "0.1894";
Idx3[264] = "-0.87"; Data3[264] = "0.1922";
Idx3[265] = "-0.86"; Data3[265] = "0.1949";
Idx3[266] = "-0.85"; Data3[266] = "0.1977";
Idx3[267] = "-0.84"; Data3[267] = "0.2005";
Idx3[268] = "-0.83"; Data3[268] = "0.2033";
Idx3[269] = "-0.82"; Data3[269] = "0.2061";
Idx3[270] = "-0.81"; Data3[270] = "0.2090";
Idx3[271] = "-0.80"; Data3[271] = "0.2119";
Idx3[272] = "-0.79"; Data3[272] = "0.2148";
Idx3[273] = "-0.78"; Data3[273] = "0.2177";
Idx3[274] = "-0.77"; Data3[274] = "0.2206";
Idx3[275] = "-0.76"; Data3[275] = "0.2236";
Idx3[276] = "-0.75"; Data3[276] = "0.2266";
Idx3[277] = "-0.74"; Data3[277] = "0.2297";
Idx3[278] = "-0.73"; Data3[278] = "0.2327";
Idx3[279] = "-0.72"; Data3[279] = "0.2358";
Idx3[280] = "-0.71"; Data3[280] = "0.2389";
Idx3[281] = "-0.70"; Data3[281] = "0.2420";
Idx3[282] = "-0.69"; Data3[282] = "0.2451";
Idx3[283] = "-0.68"; Data3[283] = "0.2483";
Idx3[284] = "-0.67"; Data3[284] = "0.2514";
Idx3[285] = "-0.66"; Data3[285] = "0.2546";
Idx3[286] = "-0.65"; Data3[286] = "0.2578";
Idx3[287] = "-0.64"; Data3[287] = "0.2611";
Idx3[288] = "-0.63"; Data3[288] = "0.2643";
Idx3[289] = "-0.62"; Data3[289] = "0.2676";
Idx3[290] = "-0.61"; Data3[290] = "0.2709";
Idx3[291] = "-0.60"; Data3[291] = "0.2743";
Idx3[292] = "-0.59"; Data3[292] = "0.2776";
Idx3[293] = "-0.58"; Data3[293] = "0.2810";
Idx3[294] = "-0.57"; Data3[294] = "0.2843";
Idx3[295] = "-0.56"; Data3[295] = "0.2877";
Idx3[296] = "-0.55"; Data3[296] = "0.2912";
Idx3[297] = "-0.54"; Data3[297] = "0.2946";
Idx3[298] = "-0.53"; Data3[298] = "0.2981";
Idx3[299] = "-0.52"; Data3[299] = "0.3015";
Idx3[300] = "-0.51"; Data3[300] = "0.3050";
Idx3[301] = "-0.50"; Data3[301] = "0.3085";
Idx3[302] = "-0.49"; Data3[302] = "0.3121";
Idx3[303] = "-0.48"; Data3[303] = "0.3156";
Idx3[304] = "-0.47"; Data3[304] = "0.3192";
Idx3[305] = "-0.46"; Data3[305] = "0.3228";
Idx3[306] = "-0.45"; Data3[306] = "0.3264";
Idx3[307] = "-0.44"; Data3[307] = "0.3300";
Idx3[308] = "-0.43"; Data3[308] = "0.3336";
Idx3[309] = "-0.42"; Data3[309] = "0.3372";
Idx3[310] = "-0.41"; Data3[310] = "0.3409";
Idx3[311] = "-0.40"; Data3[311] = "0.3446";
Idx3[312] = "-0.39"; Data3[312] = "0.3483";
Idx3[313] = "-0.38"; Data3[313] = "0.3520";
Idx3[314] = "-0.37"; Data3[314] = "0.3557";
Idx3[315] = "-0.36"; Data3[315] = "0.3594";
Idx3[316] = "-0.35"; Data3[316] = "0.3632";
Idx3[317] = "-0.34"; Data3[317] = "0.3669";
Idx3[318] = "-0.33"; Data3[318] = "0.3707";
Idx3[319] = "-0.32"; Data3[319] = "0.3745";
Idx3[320] = "-0.31"; Data3[320] = "0.3783";
Idx3[321] = "-0.30"; Data3[321] = "0.3821";
Idx3[322] = "-0.29"; Data3[322] = "0.3859";
Idx3[323] = "-0.28"; Data3[323] = "0.3897";
Idx3[324] = "-0.27"; Data3[324] = "0.3936";
Idx3[325] = "-0.26"; Data3[325] = "0.3974";
Idx3[326] = "-0.25"; Data3[326] = "0.4013";
Idx3[327] = "-0.24"; Data3[327] = "0.4052";
Idx3[328] = "-0.23"; Data3[328] = "0.4090";
Idx3[329] = "-0.22"; Data3[329] = "0.4129";
Idx3[330] = "-0.21"; Data3[330] = "0.4168";
Idx3[331] = "-0.20"; Data3[331] = "0.4207";
Idx3[332] = "-0.19"; Data3[332] = "0.4247";
Idx3[333] = "-0.18"; Data3[333] = "0.4286";
Idx3[334] = "-0.17"; Data3[334] = "0.4325";
Idx3[335] = "-0.16"; Data3[335] = "0.4364";
Idx3[336] = "-0.15"; Data3[336] = "0.4404";
Idx3[337] = "-0.14"; Data3[337] = "0.4443";
Idx3[338] = "-0.13"; Data3[338] = "0.4483";
Idx3[339] = "-0.12"; Data3[339] = "0.4522";
Idx3[340] = "-0.11"; Data3[340] = "0.4562";
Idx3[341] = "-0.10"; Data3[341] = "0.4602";
Idx3[342] = "-0.09"; Data3[342] = "0.4641";
Idx3[343] = "-0.08"; Data3[343] = "0.4681";
Idx3[344] = "-0.07"; Data3[344] = "0.4721";
Idx3[345] = "-0.06"; Data3[345] = "0.4761";
Idx3[346] = "-0.05"; Data3[346] = "0.4801";
Idx3[347] = "-0.04"; Data3[347] = "0.4840";
Idx3[348] = "-0.03"; Data3[348] = "0.4880";
Idx3[349] = "-0.02"; Data3[349] = "0.4920";
Idx3[350] = "-0.01"; Data3[350] = "0.4960";
Idx3[351] = "0.00"; Data3[351] = "0.5000";
Idx3[352] = "0.01"; Data3[352] = "0.5040";
Idx3[353] = "0.02"; Data3[353] = "0.5080";
Idx3[354] = "0.03"; Data3[354] = "0.5120";
Idx3[355] = "0.04"; Data3[355] = "0.5160";
Idx3[356] = "0.05"; Data3[356] = "0.5199";
Idx3[357] = "0.06"; Data3[357] = "0.5239";
Idx3[358] = "0.07"; Data3[358] = "0.5279";
Idx3[359] = "0.08"; Data3[359] = "0.5319";
Idx3[360] = "0.09"; Data3[360] = "0.5359";
Idx3[361] = "0.10"; Data3[361] = "0.5398";
Idx3[362] = "0.11"; Data3[362] = "0.5438";
Idx3[363] = "0.12"; Data3[363] = "0.5478";
Idx3[364] = "0.13"; Data3[364] = "0.5517";
Idx3[365] = "0.14"; Data3[365] = "0.5557";
Idx3[366] = "0.15"; Data3[366] = "0.5596";
Idx3[367] = "0.16"; Data3[367] = "0.5636";
Idx3[368] = "0.17"; Data3[368] = "0.5675";
Idx3[369] = "0.18"; Data3[369] = "0.5714";
Idx3[370] = "0.19"; Data3[370] = "0.5753";
Idx3[371] = "0.20"; Data3[371] = "0.5793";
Idx3[372] = "0.21"; Data3[372] = "0.5832";
Idx3[373] = "0.22"; Data3[373] = "0.5871";
Idx3[374] = "0.23"; Data3[374] = "0.5910";
Idx3[375] = "0.24"; Data3[375] = "0.5948";
Idx3[376] = "0.25"; Data3[376] = "0.5987";
Idx3[377] = "0.26"; Data3[377] = "0.6026";
Idx3[378] = "0.27"; Data3[378] = "0.6064";
Idx3[379] = "0.28"; Data3[379] = "0.6103";
Idx3[380] = "0.29"; Data3[380] = "0.6141";
Idx3[381] = "0.30"; Data3[381] = "0.6179";
Idx3[382] = "0.31"; Data3[382] = "0.6217";
Idx3[383] = "0.32"; Data3[383] = "0.6255";
Idx3[384] = "0.33"; Data3[384] = "0.6293";
Idx3[385] = "0.34"; Data3[385] = "0.6331";
Idx3[386] = "0.35"; Data3[386] = "0.6368";
Idx3[387] = "0.36"; Data3[387] = "0.6406";
Idx3[388] = "0.37"; Data3[388] = "0.6443";
Idx3[389] = "0.38"; Data3[389] = "0.6480";
Idx3[390] = "0.39"; Data3[390] = "0.6480";
Idx3[391] = "0.40"; Data3[391] = "0.6517";
Idx3[392] = "0.41"; Data3[392] = "0.6554";
Idx3[393] = "0.42"; Data3[393] = "0.6628";
Idx3[394] = "0.43"; Data3[394] = "0.6664";
Idx3[395] = "0.44"; Data3[395] = "0.6700";
Idx3[396] = "0.45"; Data3[396] = "0.6736";
Idx3[397] = "0.46"; Data3[397] = "0.6772";
Idx3[398] = "0.47"; Data3[398] = "0.6808";
Idx3[399] = "0.48"; Data3[399] = "0.6844";
Idx3[400] = "0.49"; Data3[400] = "0.6879";
Idx3[401] = "0.50"; Data3[401] = "0.6915";
Idx3[402] = "0.51"; Data3[402] = "0.6950";
Idx3[403] = "0.52"; Data3[403] = "0.6985";
Idx3[404] = "0.53"; Data3[404] = "0.7019";
Idx3[405] = "0.54"; Data3[405] = "0.7054";
Idx3[406] = "0.55"; Data3[406] = "0.7088";
Idx3[407] = "0.56"; Data3[407] = "0.7123";
Idx3[408] = "0.57"; Data3[408] = "0.7157";
Idx3[409] = "0.58"; Data3[409] = "0.7190";
Idx3[410] = "0.59"; Data3[410] = "0.7224";
Idx3[411] = "0.60"; Data3[411] = "0.7257";
Idx3[412] = "0.61"; Data3[412] = "0.7291";
Idx3[413] = "0.62"; Data3[413] = "0.7324";
Idx3[414] = "0.63"; Data3[414] = "0.7357";
Idx3[415] = "0.64"; Data3[415] = "0.7389";
Idx3[416] = "0.65"; Data3[416] = "0.7422";
Idx3[417] = "0.66"; Data3[417] = "0.7454";
Idx3[418] = "0.67"; Data3[418] = "0.7486";
Idx3[419] = "0.68"; Data3[419] = "0.7517";
Idx3[420] = "0.69"; Data3[420] = "0.7549";
Idx3[421] = "0.70"; Data3[421] = "0.7580";
Idx3[422] = "0.71"; Data3[422] = "0.7611";
Idx3[423] = "0.72"; Data3[423] = "0.7642";
Idx3[424] = "0.73"; Data3[424] = "0.7673";
Idx3[425] = "0.74"; Data3[425] = "0.7703";
Idx3[426] = "0.75"; Data3[426] = "0.7734";
Idx3[427] = "0.76"; Data3[427] = "0.7764";
Idx3[428] = "0.77"; Data3[428] = "0.7794";
Idx3[429] = "0.78"; Data3[429] = "0.7823";
Idx3[430] = "0.79"; Data3[430] = "0.7852";
Idx3[431] = "0.80"; Data3[431] = "0.7881";
Idx3[432] = "0.81"; Data3[432] = "0.7910";
Idx3[433] = "0.82"; Data3[433] = "0.7939";
Idx3[434] = "0.83"; Data3[434] = "0.7967";
Idx3[435] = "0.84"; Data3[435] = "0.7995";
Idx3[436] = "0.85"; Data3[436] = "0.8023";
Idx3[437] = "0.86"; Data3[437] = "0.8051";
Idx3[438] = "0.87"; Data3[438] = "0.8078";
Idx3[439] = "0.88"; Data3[439] = "0.8106";
Idx3[440] = "0.89"; Data3[440] = "0.8133";
Idx3[441] = "0.90"; Data3[441] = "0.8159";
Idx3[442] = "0.91"; Data3[442] = "0.8186";
Idx3[443] = "0.92"; Data3[443] = "0.8212";
Idx3[444] = "0.93"; Data3[444] = "0.8238";
Idx3[445] = "0.94"; Data3[445] = "0.8264";
Idx3[446] = "0.95"; Data3[446] = "0.8289";
Idx3[447] = "0.96"; Data3[447] = "0.8315";
Idx3[448] = "0.97"; Data3[448] = "0.8340";
Idx3[449] = "0.98"; Data3[449] = "0.8365";
Idx3[450] = "0.99"; Data3[450] = "0.8389";
Idx3[451] = "1.00"; Data3[451] = "0.8413";
Idx3[452] = "1.01"; Data3[452] = "0.8438";
Idx3[453] = "1.02"; Data3[453] = "0.8461";
Idx3[454] = "1.03"; Data3[454] = "0.8485";
Idx3[455] = "1.04"; Data3[455] = "0.8508";
Idx3[456] = "1.05"; Data3[456] = "0.8531";
Idx3[457] = "1.06"; Data3[457] = "0.8554";
Idx3[458] = "1.07"; Data3[458] = "0.8577";
Idx3[459] = "1.08"; Data3[459] = "0.8599";
Idx3[460] = "1.09"; Data3[460] = "0.8621";
Idx3[461] = "1.10"; Data3[461] = "0.8643";
Idx3[462] = "1.11"; Data3[462] = "0.8665";
Idx3[463] = "1.12"; Data3[463] = "0.8686";
Idx3[464] = "1.13"; Data3[464] = "0.8708";
Idx3[465] = "1.14"; Data3[465] = "0.8729";
Idx3[466] = "1.15"; Data3[466] = "0.8749";
Idx3[467] = "1.16"; Data3[467] = "0.8770";
Idx3[468] = "1.17"; Data3[468] = "0.8790";
Idx3[469] = "1.18"; Data3[469] = "0.8810";
Idx3[470] = "1.19"; Data3[470] = "0.8830";
Idx3[471] = "1.20"; Data3[471] = "0.8849";
Idx3[472] = "1.21"; Data3[472] = "0.8869";
Idx3[473] = "1.22"; Data3[473] = "0.8888";
Idx3[474] = "1.23"; Data3[474] = "0.8907";
Idx3[475] = "1.24"; Data3[475] = "0.8925";
Idx3[476] = "1.25"; Data3[476] = "0.8944";
Idx3[477] = "1.26"; Data3[477] = "0.8962";
Idx3[478] = "1.27"; Data3[478] = "0.8980";
Idx3[479] = "1.28"; Data3[479] = "0.8997";
Idx3[480] = "1.29"; Data3[480] = "0.9015";
Idx3[481] = "1.30"; Data3[481] = "0.9032";
Idx3[482] = "1.31"; Data3[482] = "0.9049";
Idx3[483] = "1.32"; Data3[483] = "0.9066";
Idx3[484] = "1.33"; Data3[484] = "0.9082";
Idx3[485] = "1.34"; Data3[485] = "0.9099";
Idx3[486] = "1.35"; Data3[486] = "0.9115";
Idx3[487] = "1.36"; Data3[487] = "0.9131";
Idx3[488] = "1.37"; Data3[488] = "0.9147";
Idx3[489] = "1.38"; Data3[489] = "0.9162";
Idx3[490] = "1.39"; Data3[490] = "0.9177";
Idx3[491] = "1.40"; Data3[491] = "0.9192";
Idx3[492] = "1.41"; Data3[492] = "0.9207";
Idx3[493] = "1.42"; Data3[493] = "0.9222";
Idx3[494] = "1.43"; Data3[494] = "0.9236";
Idx3[495] = "1.44"; Data3[495] = "0.9251";
Idx3[496] = "1.45"; Data3[496] = "0.9265";
Idx3[497] = "1.46"; Data3[497] = "0.9279";
Idx3[498] = "1.47"; Data3[498] = "0.9292";
Idx3[499] = "1.48"; Data3[499] = "0.9306";
Idx3[500] = "1.49"; Data3[500] = "0.9319";
Idx3[501] = "1.50"; Data3[501] = "0.9332";
Idx3[502] = "1.51"; Data3[502] = "0.9345";
Idx3[503] = "1.52"; Data3[503] = "0.9357";
Idx3[504] = "1.53"; Data3[504] = "0.9370";
Idx3[505] = "1.54"; Data3[505] = "0.9382";
Idx3[506] = "1.55"; Data3[506] = "0.9394";
Idx3[507] = "1.56"; Data3[507] = "0.9406";
Idx3[508] = "1.57"; Data3[508] = "0.9418";
Idx3[509] = "1.58"; Data3[509] = "0.9429";
Idx3[510] = "1.59"; Data3[510] = "0.9441";
Idx3[511] = "1.60"; Data3[511] = "0.9452";
Idx3[512] = "1.61"; Data3[512] = "0.9463";
Idx3[513] = "1.62"; Data3[513] = "0.9474";
Idx3[514] = "1.63"; Data3[514] = "0.9484";
Idx3[515] = "1.64"; Data3[515] = "0.9495";
Idx3[516] = "1.65"; Data3[516] = "0.9505";
Idx3[517] = "1.66"; Data3[517] = "0.9515";
Idx3[518] = "1.67"; Data3[518] = "0.9525";
Idx3[519] = "1.68"; Data3[519] = "0.9535";
Idx3[520] = "1.69"; Data3[520] = "0.9545";
Idx3[521] = "1.70"; Data3[521] = "0.9554";
Idx3[522] = "1.71"; Data3[522] = "0.9564";
Idx3[523] = "1.72"; Data3[523] = "0.9573";
Idx3[524] = "1.73"; Data3[524] = "0.9582";
Idx3[525] = "1.74"; Data3[525] = "0.9591";
Idx3[526] = "1.75"; Data3[526] = "0.9599";
Idx3[527] = "1.76"; Data3[527] = "0.9608";
Idx3[528] = "1.77"; Data3[528] = "0.9616";
Idx3[529] = "1.78"; Data3[529] = "0.9625";
Idx3[530] = "1.79"; Data3[530] = "0.9633";
Idx3[531] = "1.80"; Data3[531] = "0.9641";
Idx3[532] = "1.81"; Data3[532] = "0.9649";
Idx3[533] = "1.82"; Data3[533] = "0.9656";
Idx3[534] = "1.83"; Data3[534] = "0.9664";
Idx3[535] = "1.84"; Data3[535] = "0.9671";
Idx3[536] = "1.85"; Data3[536] = "0.9678";
Idx3[537] = "1.86"; Data3[537] = "0.9686";
Idx3[538] = "1.87"; Data3[538] = "0.9693";
Idx3[539] = "1.88"; Data3[539] = "0.9699";
Idx3[540] = "1.89"; Data3[540] = "0.9706";
Idx3[541] = "1.90"; Data3[541] = "0.9713";
Idx3[542] = "1.91"; Data3[542] = "0.9719";
Idx3[543] = "1.92"; Data3[543] = "0.9726";
Idx3[544] = "1.93"; Data3[544] = "0.9732";
Idx3[545] = "1.94"; Data3[545] = "0.9738";
Idx3[546] = "1.95"; Data3[546] = "0.9744";
Idx3[547] = "1.96"; Data3[547] = "0.9750";
Idx3[548] = "1.97"; Data3[548] = "0.9756";
Idx3[549] = "1.98"; Data3[549] = "0.9761";
Idx3[550] = "1.99"; Data3[550] = "0.9767";
Idx3[551] = "2.00"; Data3[551] = "0.9772";
Idx3[552] = "2.01"; Data3[552] = "0.9778";
Idx3[553] = "2.02"; Data3[553] = "0.9783";
Idx3[554] = "2.03"; Data3[554] = "0.9788";
Idx3[555] = "2.04"; Data3[555] = "0.9793";
Idx3[556] = "2.05"; Data3[556] = "0.9798";
Idx3[557] = "2.06"; Data3[557] = "0.9803";
Idx3[558] = "2.07"; Data3[558] = "0.9808";
Idx3[559] = "2.08"; Data3[559] = "0.9812";
Idx3[560] = "2.09"; Data3[560] = "0.9817";
Idx3[561] = "2.10"; Data3[561] = "0.9821";
Idx3[562] = "2.11"; Data3[562] = "0.9826";
Idx3[563] = "2.12"; Data3[563] = "0.9830";
Idx3[564] = "2.13"; Data3[564] = "0.9834";
Idx3[565] = "2.14"; Data3[565] = "0.9838";
Idx3[566] = "2.15"; Data3[566] = "0.9842";
Idx3[567] = "2.16"; Data3[567] = "0.9846";
Idx3[568] = "2.17"; Data3[568] = "0.9850";
Idx3[569] = "2.18"; Data3[569] = "0.9854";
Idx3[570] = "2.19"; Data3[570] = "0.9857";
Idx3[571] = "2.20"; Data3[571] = "0.9861";
Idx3[572] = "2.21"; Data3[572] = "0.9864";
Idx3[573] = "2.22"; Data3[573] = "0.9868";
Idx3[574] = "2.23"; Data3[574] = "0.9871";
Idx3[575] = "2.24"; Data3[575] = "0.9875";
Idx3[576] = "2.25"; Data3[576] = "0.9878";
Idx3[577] = "2.26"; Data3[577] = "0.9881";
Idx3[578] = "2.27"; Data3[578] = "0.9884";
Idx3[579] = "2.28"; Data3[579] = "0.9887";
Idx3[580] = "2.29"; Data3[580] = "0.9890";
Idx3[581] = "2.30"; Data3[581] = "0.9893";
Idx3[582] = "2.31"; Data3[582] = "0.9896";
Idx3[583] = "2.32"; Data3[583] = "0.9898";
Idx3[584] = "2.33"; Data3[584] = "0.9901";
Idx3[585] = "2.34"; Data3[585] = "0.9904";
Idx3[586] = "2.35"; Data3[586] = "0.9906";
Idx3[587] = "2.36"; Data3[587] = "0.9909";
Idx3[588] = "2.37"; Data3[588] = "0.9911";
Idx3[589] = "2.38"; Data3[589] = "0.9913";
Idx3[590] = "2.39"; Data3[590] = "0.9916";
Idx3[591] = "2.40"; Data3[591] = "0.9918";
Idx3[592] = "2.41"; Data3[592] = "0.9920";
Idx3[593] = "2.42"; Data3[593] = "0.9922";
Idx3[594] = "2.43"; Data3[594] = "0.9925";
Idx3[595] = "2.44"; Data3[595] = "0.9927";
Idx3[596] = "2.45"; Data3[596] = "0.9929";
Idx3[597] = "2.46"; Data3[597] = "0.9931";
Idx3[598] = "2.47"; Data3[598] = "0.9932";
Idx3[599] = "2.48"; Data3[599] = "0.9934";
Idx3[600] = "2.49"; Data3[600] = "0.9936";
Idx3[601] = "2.50"; Data3[601] = "0.9938";
Idx3[602] = "2.51"; Data3[602] = "0.9940";
Idx3[603] = "2.52"; Data3[603] = "0.9941";
Idx3[604] = "2.53"; Data3[604] = "0.9943";
Idx3[605] = "2.54"; Data3[605] = "0.9945";
Idx3[606] = "2.55"; Data3[606] = "0.9946";
Idx3[607] = "2.56"; Data3[607] = "0.9948";
Idx3[608] = "2.57"; Data3[608] = "0.9949";
Idx3[609] = "2.58"; Data3[609] = "0.9951";
Idx3[610] = "2.59"; Data3[610] = "0.9952";
Idx3[611] = "2.60"; Data3[611] = "0.9953";
Idx3[612] = "2.61"; Data3[612] = "0.9955";
Idx3[613] = "2.62"; Data3[613] = "0.9956";
Idx3[614] = "2.63"; Data3[614] = "0.9957";
Idx3[615] = "2.64"; Data3[615] = "0.9959";
Idx3[616] = "2.65"; Data3[616] = "0.9960";
Idx3[617] = "2.66"; Data3[617] = "0.9961";
Idx3[618] = "2.67"; Data3[618] = "0.9962";
Idx3[619] = "2.68"; Data3[619] = "0.9963";
Idx3[620] = "2.69"; Data3[620] = "0.9964";
Idx3[621] = "2.70"; Data3[621] = "0.9965";
Idx3[622] = "2.71"; Data3[622] = "0.9966";
Idx3[623] = "2.72"; Data3[623] = "0.9967";
Idx3[624] = "2.73"; Data3[624] = "0.9968";
Idx3[625] = "2.74"; Data3[625] = "0.9969";
Idx3[626] = "2.75"; Data3[626] = "0.9970";
Idx3[627] = "2.76"; Data3[627] = "0.9971";
Idx3[628] = "2.77"; Data3[628] = "0.9972";
Idx3[629] = "2.78"; Data3[629] = "0.9973";
Idx3[630] = "2.79"; Data3[630] = "0.9974";
Idx3[631] = "2.80"; Data3[631] = "0.9974";
Idx3[632] = "2.81"; Data3[632] = "0.9975";
Idx3[633] = "2.82"; Data3[633] = "0.9976";
Idx3[634] = "2.83"; Data3[634] = "0.9977";
Idx3[635] = "2.84"; Data3[635] = "0.9977";
Idx3[636] = "2.85"; Data3[636] = "0.9978";
Idx3[637] = "2.86"; Data3[637] = "0.9979";
Idx3[638] = "2.87"; Data3[638] = "0.9979";
Idx3[639] = "2.88"; Data3[639] = "0.9980";
Idx3[640] = "2.89"; Data3[640] = "0.9981";
Idx3[641] = "2.90"; Data3[641] = "0.9981";
Idx3[642] = "2.91"; Data3[642] = "0.9982";
Idx3[643] = "2.92"; Data3[643] = "0.9982";
Idx3[644] = "2.93"; Data3[644] = "0.9983";
Idx3[645] = "2.94"; Data3[645] = "0.9984";
Idx3[646] = "2.95"; Data3[646] = "0.9984";
Idx3[647] = "2.96"; Data3[647] = "0.9985";
Idx3[648] = "2.97"; Data3[648] = "0.9985";
Idx3[649] = "2.98"; Data3[649] = "0.9986";
Idx3[650] = "2.99"; Data3[650] = "0.9986";
Idx3[651] = "3.00"; Data3[651] = "0.9987";
Idx3[652] = "3.01"; Data3[652] = "0.9987";
Idx3[653] = "3.02"; Data3[653] = "0.9987";
Idx3[654] = "3.03"; Data3[654] = "0.9988";
Idx3[655] = "3.04"; Data3[655] = "0.9988";
Idx3[656] = "3.05"; Data3[656] = "0.9989";
Idx3[657] = "3.06"; Data3[657] = "0.9989";
Idx3[658] = "3.07"; Data3[658] = "0.9989";
Idx3[659] = "3.08"; Data3[659] = "0.9990";
Idx3[660] = "3.09"; Data3[660] = "0.9990";
Idx3[661] = "3.10"; Data3[661] = "0.9990";
Idx3[662] = "3.11"; Data3[662] = "0.9991";
Idx3[663] = "3.12"; Data3[663] = "0.9991";
Idx3[664] = "3.13"; Data3[664] = "0.9991";
Idx3[665] = "3.14"; Data3[665] = "0.9992";
Idx3[666] = "3.15"; Data3[666] = "0.9992";
Idx3[667] = "3.16"; Data3[667] = "0.9992";
Idx3[668] = "3.17"; Data3[668] = "0.9992";
Idx3[669] = "3.18"; Data3[669] = "0.9993";
Idx3[670] = "3.19"; Data3[670] = "0.9993";
Idx3[671] = "3.20"; Data3[671] = "0.9993";
Idx3[672] = "3.21"; Data3[672] = "0.9993";
Idx3[673] = "3.22"; Data3[673] = "0.9994";
Idx3[674] = "3.23"; Data3[674] = "0.9994";
Idx3[675] = "3.24"; Data3[675] = "0.9994";
Idx3[676] = "3.25"; Data3[676] = "0.9994";
Idx3[677] = "3.26"; Data3[677] = "0.9994";
Idx3[678] = "3.27"; Data3[678] = "0.9995";
Idx3[679] = "3.28"; Data3[679] = "0.9995";
Idx3[680] = "3.29"; Data3[680] = "0.9995";
Idx3[681] = "3.30"; Data3[681] = "0.9995";
Idx3[682] = "3.31"; Data3[682] = "0.9995";
Idx3[683] = "3.32"; Data3[683] = "0.9995";
Idx3[684] = "3.33"; Data3[684] = "0.9996";
Idx3[685] = "3.34"; Data3[685] = "0.9996";
Idx3[686] = "3.35"; Data3[686] = "0.9996";
Idx3[687] = "3.36"; Data3[687] = "0.9996";
Idx3[688] = "3.37"; Data3[688] = "0.9996";
Idx3[689] = "3.38"; Data3[689] = "0.9996";
Idx3[690] = "3.39"; Data3[690] = "0.9997";
Idx3[691] = "3.40"; Data3[691] = "0.9997";
Idx3[692] = "3.41"; Data3[692] = "0.9997";
Idx3[693] = "3.42"; Data3[693] = "0.9997";
Idx3[694] = "3.43"; Data3[694] = "0.9997";
Idx3[695] = "3.44"; Data3[695] = "0.9997";
Idx3[696] = "3.45"; Data3[696] = "0.9997";
Idx3[697] = "3.46"; Data3[697] = "0.9997";
Idx3[698] = "3.47"; Data3[698] = "0.9997";
Idx3[699] = "3.48"; Data3[699] = "0.9997";
Idx3[700] = "3.49"; Data3[700] = "0.9998";
Idx3[701] = "3.50"; Data3[701] = "0.9998";
Idx3[0] = 701;


function Fmt1(x) { 
  var v
  if(x>=0) { v=''+(x+0.0005) } else { v=''+(x-0.0005) }
  v = v.replace('.', ',');
  return v.substring(0,v.indexOf(',')+2) 
  }


function Fmt2(x) {
  var v
  if (x >= 0) { v = '' + (x + 0.00005) } else { v = '' + (x - 0.00005) }
  v = v.replace('.', ',');
  return v.substring(0, v.indexOf(',') + 3)
}

function computeEFWPercentile(MAWeeks, MADays, Measured) {

  if ((MADays > 6) || (MADays < 0)) {
    alert("Value for days should be 0 to 6");
    return false;

  }

  var Days = (MADays / 7);
  var Weeks = MAWeeks;
  var STATEDGA = roundNumber(1 * Weeks + 1 * Days, 1);

  var PREDICTEDWeight = roundNumber((Math.exp(0.578 + (.332 * STATEDGA) - (.00354 * Math.pow(STATEDGA, 2)))), 0)

  //get zscore

  var difference = Measured - PREDICTEDWeight

  var SD = 0.13 * PREDICTEDWeight;

  var Zscore = Fmt2(difference / SD)

  var Found = false

  var Item = Zscore;
  
  Item = Item.replace(",", ".");
  var Count;
  for (Count = 1; Count <= Idx3[0]; Count++) {

    if (Item == Idx3[Count]) {

      Found = true;

      var percentile = Data3[Count];

    }
  }

  percentile = roundNumber((percentile * 100), 0)
  var extremePercentile = false;
  if (Zscore > 3.08) {
    percentile = " > 99th";
    extremePercentile = true;
  }

  if (Zscore < -3.08) {
    percentile = " < 1 st";
    extremePercentile = true;
  }
  var percentiletext = "Your measured value is " + percentile + "  percentile.";
  if (extremePercentile) {
    alert(percentiletext);
  }
  return percentile;
}



function roundNumber(num, dec) {
  var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  return result;
}

// if user changes presentation, change "side of back" to "side of head"
function change_presentation() {
  var apresentacao = $('#form_apresentacao').val();
  if (apresentacao == "córmica") {
    $('#form_dorso_label').html('Cabeça');
  }
  else {
    $('#form_dorso_label').html('Dorso');
  }
}

export { submit_laudo, calculate_history }
