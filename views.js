var $ = require('jquery') 

//The ipcRenderer module is used here to send a show-notification event to the Main process with the task as payload.
const { ipcRenderer } = require('electron');
var numberInArabic = "";
$("#btnChange").on("click", function(){
   numberInArabic = tafqeet($("input").val());
   $("h6").text(numberInArabic);
   console.log(tafqeet);
});

$("#btnCopy").on("click", function(){
   var dummy = document.createElement("textarea");
   document.body.appendChild(dummy);
   dummy.value = numberInArabic;
   dummy.select();
   document.execCommand("copy");
   document.body.removeChild(dummy);
   ipcRenderer.invoke('show-notification', "Text copied to the clipboard!");
});