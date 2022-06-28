// Initialize buttons
const buttonsContainer = document.getElementById('saved-functions');

// let button1 = document.getElementById("button1");
// let button2 = document.getElementById("button2");
// let button3 = document.getElementById("button3");


// initialize functions

// — get links

const getAllLinks = () => {

  var a = '';
  for (var ln = 0; ln < document.links.length; ln++) {
    var lk = document.links[ln];
    a += ln + ": <a href='" + lk + "' title='" + lk.text + "'>" + lk + '</a><br>\n';
  };
  w = window.open('', 'Links', 'scrollbars,resizable,width=400,height=600');
  w.document.write(a);

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

// setup functions Array
var functionsArray = [
  [getAllLinks ,"Get Links"],
  [getAllMails ,"Get Mails"],
  [getLookUpOnSite ,"Lookup on"]
]



// create Buttons
for (var i = 0; i < functionsArray.length; i++) {

  var functionButton = document.createElement('button');
  functionButton.classList.add('button');
  functionButton.innerHTML = functionsArray[i][1];
  functionButton.dataset.i = i;
  buttonsContainer.appendChild(functionButton);


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

// —————————— SAVE TO LOCAL STORAGE

// Saves options to chrome.storage
function save_options() {
  let stringified_functionsArray = functionsArray.map(stringify)

  function stringify(func) {
    return [
      func[0].toString(),
      func[1]
    ];
  }

  // var color = document.getElementById('color').value;
  // var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    // problème ici : les fonctions sont undefined
    // et gros problème : on ne peut pas stocker de fonction
    // dans une extension Chrome : on ne peut stocker que des valeurs :(
    // donc va falloir trouver une autre solution pour stocker les fonctions…
    'functionsArray': stringified_functionsArray
    // likesColor: likesColor
  })
  console.log('options bien saved OUAIS');
};


save_options();

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  console.log('restore');
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get('functionsArray', function(items) {
    console.log('items', items);

    functionsArray = items.functionsArray.map(unstringify);

    function unstringify(func) {
      return [
        eval(func[0]),
        func[1]
      ];
    }

    //functionsArray = items.functionsArray;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
