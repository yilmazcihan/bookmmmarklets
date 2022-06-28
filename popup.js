// Initialize buttons
const buttonsContainer = document.getElementById('saved-functions');

// let button1 = document.getElementById("button1");
// let button2 = document.getElementById("button2");
// let button3 = document.getElementById("button3");


// initialize functions

// — get links

const getAllLinks = () => {


  var obj = []
  console.log(obj);

  console.log(data)

  var a = '';
  for (var ln = 0; ln < document.links.length; ln++) {
    var lk = document.links[ln];
    a += ln + ": <a href='" + lk + "' title='" + lk.text + "'>" + lk.text + '</a><br>\n';
    obj.push(ln + ": " + lk.text + " " + lk);
  };
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

  console.log(obj);
  w = window.open('', 'Links', 'scrollbars,resizable,width=400,height=600, style="background-color:red;"');

  var myJsonString = JSON.stringify(document.links);
  let fakeButtons = '<a href="data:' + data + '" download="data.json" style="background-color:white; color:black; font-family: sans-serif; padding:10px; margin : 15px; border-radius: 0.3rem;">download JSON</a> <a href="" download="" style="background-color:white; color:black; font-family: sans-serif; padding:10px; margin : 15px; border-radius: 0.3rem;">Envoyer vers Google Docs</a>'


  w.document.write('<html><head><title>Links</title><style media="screen">* {font-family: sans-serif;color: #fafafa;}body {background-color: #1A1921;} body{display:flex; flex-direction:column;} </style></head><body>');
  w.document.write(fakeButtons);

  w.document.write(a);

  // w.document.write($("#content").html());
  w.document.write('</body></html>');
  // w.print();
  // w.close();



}

// — get mails
const getAllMails = () => {

  const documentHTML = document.documentElement.outerHTML;
  const matches = documentHTML.matchAll(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  const flatMatches = Array.from(matches).map((item) => item[0]);
  const uniqueMatches = Array.from(new Set(flatMatches));
  if (uniqueMatches.length > 0) {
    const result = uniqueMatches.join('\n');
    alert("Emails :" + result);
  } else {
    alert('No emails found!');
  };
}

const getLookUpOnSite = () => {

  window.open("https://whois.domaintools.com/" + location.hostname, "_newtab");
  console.log(location.hostname)
}

const googleSearchSite = () => {
  window.open("http://www.google.fr/search?&q=site:" + location.hostname);
}

const convertToPDF = () => {
  void(window.open('https://www.web2pdfconvert.com#'+location.href));
}

const makeEditable = () => {
    document.body.contentEditable=true;
    alert("Vous pouvez maintenant éditer les contenus di site !");
}

const turn180 = () => {
  ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix){document.body.style[prefix + 'transform'] = 'rotate(180deg)';});
}

const seeHistory = () => {
  window.open('https://web.archive.org/' + location.hostname);
}




// setup functions Array
var functionsArray = [
  [getAllLinks ,"R&#233;cup&#233;rer les liens"],
  [getAllMails ,"R&#233;cup&#233;rer les mails"],
  [getLookUpOnSite ,"Chercher sur whoIs"],
  [googleSearchSite, "Chercher le site"],
  [convertToPDF, "Convertir en PDF"],
  [makeEditable, "Rendre les contenus &#233;ditables"],
  [turn180, "Tourner &#224; 180&#176;"],
  // [seeHistory, "Voir les anciennes versions"],
]




let imagesSources = [
  "../images/recuperer-liens.png",
  "../images/recuperer-mails.png",
  "../images/whois.png",
  "../images/chercherweb.png",
  "../images/pdf.png",
  "../images/editoriable.png",
  "../images/180.png",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",
  "../images/",


]



// create Buttons
for (var i = 0; i < functionsArray.length; i++) {

  console.log('arrayyyy');
  var buttonImgContainer = document.createElement('div');
  buttonImgContainer.classList.add('button-img-container');
  buttonsContainer.appendChild(buttonImgContainer);

  var functionImg = document.createElement('img');
  functionImg.style.display = "flex";
  buttonImgContainer.appendChild(functionImg);
  functionImg.src = imagesSources[i];

  var functionButton = document.createElement('button');
  buttonImgContainer.appendChild(functionButton);

  functionButton.classList.add('button');
  functionButton.innerHTML = functionsArray[i][1];
  functionButton.dataset.i = i;
  // buttonsContainer.appendChild(functionButton);


  functionButton.addEventListener("click", async (event) => {

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    // event = window
    let func = functionsArray[event.target.dataset.i][0];

    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      func: func
    });
  });
};

// create add functions button

var lastFunctionButton = document.createElement('button');
lastFunctionButton.classList.add('last-button');
lastFunctionButton.innerHTML = "Ajouter fonction";
let lastButtonContainer = document.getElementById('add-functions');
lastButtonContainer.appendChild(lastFunctionButton);
let clickedOnce = false;
let clickedTwice = false;

var inputAddFunction = document.createElement('input');
inputAddFunction.classList.add('inactive');
lastFunctionButton.appendChild(inputAddFunction);


lastFunctionButton.addEventListener('click', function(){
  if (clickedOnce && clickedTwice) {

  } else if (clickedOnce == false && clickedTwice == false) {
    clickedOnce = true;

    // lastFunctionButton.innerHTML = "";
    inputAddFunction.classList.remove('inactive');

  } else if (clickedOnce == true && clickedTwice == false && inputAddFunction.value != "" ) {
    clickedTwice = true;
    inputAddFunction.classList.add('inactive');
    // this.innerHTML = "Voir les anciennes versions";
    this.classList.remove('button');
    this.classList.add('last-button');
    // this.classList.add('class-added');

    var buttonImgContainer = document.createElement('div');
    buttonImgContainer.classList.add('button-img-container');
    buttonsContainer.appendChild(buttonImgContainer);

    var functionImg = document.createElement('img');
    functionImg.style.display = "flex";
    buttonImgContainer.appendChild(functionImg);
    functionImg.src = imagesSources[i];

    var functionButton = document.createElement('button');

    buttonImgContainer.appendChild(functionButton);

    functionButton.classList.add('button');
    functionButton.innerHTML = "Voir les anciennes versions";
    functionButton.dataset.i = i;
    // buttonsContainer.appendChild(functionButton);


    functionButton.addEventListener("click", async (event) => {

      let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

      // event = window
      let func = functionsArray[event.target.dataset.i][0];

      chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        func: seeHistory
      });
    });
  }
})



// // initalize button listeners
// button1.addEventListener("click", async () => {
//
//   let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//
//   chrome.scripting.executeScript({
//     target: {
//       tabId: tab.id
//     },
//     function: getAllLinks
//   });
//
// });
//
// button2.addEventListener("click", async () => {
//
//   let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//
//   chrome.scripting.executeScript({
//     target: {
//       tabId: tab.id
//     },
//     function: getAllMails
//   });
//
// });
//
// button3.addEventListener("click", async () => {
//
//   let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//
//   chrome.scripting.executeScript({
//     target: {
//       tabId: tab.id
//     },
//     function: getLookUpOnSite
//   });
//
// });
