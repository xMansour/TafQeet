window.addEventListener('DOMContentLoaded', () => {
  //The ipcRenderer module is used here to send a show-notification event to the Main process with the task as payload.
  const { ipcRenderer } = require('electron');
  const { tafqeet } = require('./tafqeet');

  document.getElementById("btnChange").addEventListener("click", function () {
    const fakatChecked = document.getElementById("fakatCheck").checked;
    const pracesChecked = document.getElementById("pracesCheck").checked;
    const txt = document.getElementById("enteredNumber").value;
    if (txt.length >= 15) {
      document.getElementsByTagName("h6")[0].innerText = "الرقم لا يجب ان يتعدى اربعة عشر خانه";
      //ipcRenderer.invoke('show-notification', "الرقم لا يجب ان يتعدى اربعة عشر خانه");
    }
    else if (txt.length == 0) {
      document.getElementsByTagName("h6")[0].innerText = "ادخل رقما صحيحا";
      //ipcRenderer.invoke('show-notification', "ادخل رقما صحيحا");
    }
    else {
      let numberInArabic = tafqeet(txt);
      if (fakatChecked) {
        numberInArabic = "فقط " + numberInArabic + " لا غير"
      }

      if (pracesChecked) {
        numberInArabic = "(" + numberInArabic + ")";
      }

      document.getElementsByTagName("h6")[0].innerText = numberInArabic;
      copyToClipBoard(numberInArabic);
    }

  });

  const copyToClipBoard = (numberInArabic) => {
    const dummyTxtArea = document.createElement("textarea");
    document.body.appendChild(dummyTxtArea);
    dummyTxtArea.value = numberInArabic;
    dummyTxtArea.select();
    document.execCommand("copy");
    document.body.removeChild(dummyTxtArea);
    ipcRenderer.invoke('show-notification', `تم نسخ ${numberInArabic} الى الحافظة`);
  }

})
