//Declare some useful variables
let myLeads = []
const inputel = document.getElementById('input-el')
const ul = document.getElementById('ul')

//Get our buttons
const sumbitbtn = document.getElementById('submit-btn')
const tabbtn = document.getElementById('tab-btn')
const deletebtn = document.getElementById('delete-btn')

//Since our array was parsed and saved as a string in the save function
//we have to parse it back as an array to render it 
const LeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//If the Save Input button is clicked
sumbitbtn.addEventListener('click' , save)

//If the Save Tab button is clicked
tabbtn.addEventListener('click' , savetab)

//If the Delete All button is clicked
deletebtn.addEventListener("dblclick", deleteall)

//After the SAVE button is clicked
function save(){

    //Takes input from the input element and adds it to to the myLeads array
    myLeads.push(inputel.value)

    //We have to save the myLeads array in the LocalStorage, and we can only save strings
    //So we have to parse the array as a string after the input is saved into the myLeads array
    //So we have an updated array saved in the LocalStorage
    localStorage.setItem('myLeads' , JSON.stringify(myLeads))

    //We call the renderleads function and pass myLeads as a parameter
    //This function call renders immediately after we click Save
    render(myLeads)

    //Empty the Text input form for reuse
    inputel.value = ''
}

function savetab(){
   //Grab the current URL
   //CHrome api thats asks for the active tab of the current window
   //This API only works in the chrome environment (obviously) 
    chrome.tabs.query({active:true , currentWindow:true} , function(tabs){

        //Extracts the url from the JSON object acquired after querying the chrome API
        //And adds it to myLeads and once again parses and saves the myLeads array as a string
        //And also renders it 
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads' , JSON.stringify(myLeads))
        render(myLeads)

    })
}

//If LeadsFromStorage is not empty
//Render everything saved in it
if (LeadsFromLocalStorage){
    myLeads = LeadsFromLocalStorage
    render(myLeads)
}

//This function renders all array elements of an array passed into it
function render(leads){
    let listItems = ''
    for(let i =0 ; i < leads.length ; i++){
        listItems += `
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>
        `
    }

    //Inner HTML of all the appended elements to be rendered
    ul.innerHTML = listItems
}


//This function is used to Clear the Localstorage and the myLeads array
//And then renders everything empty
function deleteall(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
}
