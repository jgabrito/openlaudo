# openlaudo
Web tool for radiology report editing


Live demo at https://diogoedl.github.io/openlaudo/editor.html or http://bit.ly/openlaudo

## Files Overview

**editor.html:**<br>
Html file for the single-page application.

**form_templates.js:** <br>
Contains the clickable forms for each report type. Each form (in html format) is a property of a JavaScript object called form_templates. Note: the form_templates need to have the same name as in templates.js.

**click_templates.js:**<br>
Contains the functions tha run when a report from a clickable form is generated. These functions are responsible for getting the input values of the forms, making calculations and priting the resulting report to the Quill Editor. Note: the functions need to have the same name as in templates.js.

**sidebar.js:**<br>
Main js file for the rendering of dynamic GUI content. Contains Vue functionsthat render menus and descriptors, and also functions to handle/insert the contet of the Quill editor;

**descriptors.js , descriptors.json:**<br>
Structured file of all descriptors divided into specialty -> modality. JSON file easyer for editing with JSON editors and js file easyer for importing in the <head> tag.

**templates.js , templates.json:**<br>
Structured file of all report templates (non clickable templates) divided into modality -> specialty. JSON file easyer for editing with JSON editors and js file easyer for importing in the \<head> tag.

## Dependecies

**Vue**<br>
**Quill**<br>
**Bootstrap**<br>
**Materialize**<br>
**JQuery**

## Roadmap

1. Have simple reporting templates for every specialty/modality/exam (mostly MR templates are missing).
2. Have clickable reporting templates for every specialty/modality/exam that encompass the frequent findings in each of them, for quicker report generation (click_templates.js and form_templates.js).
3. Make clickable templates dynamically chage report in editor.
4. ...
5. Have configurable templates for individuals.
6. 