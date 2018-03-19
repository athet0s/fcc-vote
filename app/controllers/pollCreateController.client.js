'use strict';

(function () {

   var addOpt = document.querySelector('#add_opt');
   var pollFields = document.querySelector('#poll_fields');

    addOpt.addEventListener("click", function (e){
        e.preventDefault();
        var newOpt = document.createElement('input');
        newOpt.setAttribute('name', 'field' + (pollFields.children.length + 1));
        pollFields.appendChild(newOpt);
    });
  
/*
   

   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

  */

})();
