
new Vue({ 
  el: '#app',
  mounted: function(){$('.collapsible').collapsible();},
  data: {
    cards: [
      { title: 'Open Clicks', src: 'ultrasound_icon.png', description:'...'}
    ]
  }
  })









//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL

var toolbarOptions = [
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //['blockquote', 'code-block'],
  
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction
  
    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
  
    //['clean']                                         // remove formatting button
  ];  


var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions
      },
    theme: 'snow'
  });

  
  function format_template(exam) {
    tecniqueTitle = '';
    if (exam.reportTecnique) {
      tecniqueTitle = "Técnica\n";
    }
    
    quill.setContents([
        { insert: exam.title + '\n', attributes: {bold: true, align: 'center'} },
        { insert: tecniqueTitle, attributes: {bold: true, align: 'justify'} },
        { insert: exam.tecnique + '\n'},
        { insert: exam.body + '\n\n', attributes: {align: 'justify'}},
        { insert : 'Conclusão:\n', attributes : {bold: true} },
        { insert: exam.conc}
      ]);
  }












// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES
// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES
// TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES TEMPLATES

    // TRIGGERS TRIGGERS TRIGGERS
    // TRIGGERS TRIGGERS TRIGGERS
    
    new Vue({
      el: '#usg_triggers',
      data: {
        modality: templates.usg.specialties,
      },
      methods : {
        change_specialty : function(specialty) {
          v_descriptors_ul.set_specialty(specialty);
        }
      }

    });
  
  
  new Vue({
       el: '#tc_triggers',
       data: {
         modality: templates.tc.specialties
       },
       methods : {
         change_specialty : function(specialty) {
           v_descriptors_ul.set_specialty(specialty);
         }
       }


     });

    new Vue({
      el: '#rm_triggers',
      data: {
        modality: templates.rm.specialties
      },
      methods : {
        change_specialty : function(specialty) {
          v_descriptors_ul.set_specialty(specialty);
        }
      }
      
    });



    // DROPDOWNDS DROPDOWNDS DROPDOWNDS
    // DROPDOWNDS DROPDOWNDS DROPDOWNDS

new Vue( {
  el: '#usg_dropdowns',
  data : {
    modality : templates.usg.specialties
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam);
    }
  }
});

    
new Vue( {
  el: '#tc_dropdowns',
  data : {
    modality : templates.tc.specialties
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam);
    }
  }
});

new Vue( {
  el: '#rm_dropdowns',
  data : {
    modality : templates.rm.specialties
  },
  methods : {
    html_format_template : function (exam) {
      format_template(exam);
    }
  }
});


// MODALITY SELECTORS MODALITY SELECTORS
// MODALITY SELECTORS MODALITY SELECTORS







// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS


function myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("descriptors_ul");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

function format_descriptor(text) {

  try {
    selectionIndex = quill.getSelection().index;
  }
  catch(err) {
    quill.focus();
    selectionIndex = quill.getSelection().index;
    console.warn(err);
  }
    

  quill.insertText(selectionIndex, text);

}



v_descriptors_ul = new Vue( {
  el: '#descriptors_ul',
  data: {
    selected_modality : 'tc',
    selected_specialty : 'cep',
    v_descriptors : descriptors.cep.modalities.tc.findings
  },

  methods : {
    
    format_descriptor : format_descriptor,

    set_modality : function(new_modality) {
      this.selected_modality = new_modality;
      this.v_descriptors = descriptors[this.selected_specialty].modalities[this.selected_modality].findings;
    },

    set_specialty : function(new_specialty) {
      this.selected_specialty = new_specialty;
      this.v_descriptors = descriptors[this.selected_specialty].modalities[this.selected_modality].findings;
    }

  },

});

function update_descriptors(specific_descriptors) {
  v_descriptors_ul.v_descriptors = specific_descriptors;
}






  $(document).ready(function(){

    $(".dropdown-trigger").dropdown({constrainWidth : false});
    $('.tabs').tabs();

  })