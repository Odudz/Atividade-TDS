var db = {acc: []}

// Accountant login & creation
function login(){
    var name = (document.getElementById('nome').value).toLowerCase()
    var password = document.getElementById('senha').value
    

    if(searchName(name) !== false){
        if(password === db.acc[searchName(name)][1]){
            console.log('You logged in!')
        } else {
            console.log('This password is wrong!')
        }
    }

}

function searchName(name){

    name = name.toLowerCase()

    for(i = 0; i < db.acc.length; i++){
        if(db.acc[i][0] === name){
            return i
        }
    }

    return false
}

function createAccountant(name,password){

    if(searchName(name,0) === false){
        name = name.toLowerCase()
        const acc = [name,password,{}]

        db.acc.push(acc)
    } else {
        console.log('A accountant with this name already exists')
    }
}

// Change password visibility

var visibility = 0

function changeVisibility(){
    var eye = document.getElementById('eye')
    var password = document.getElementById('senha')

    visibility++

    if(visibility === 1){
        eye.src = "/imagens/eye.png"
        password.setAttribute('type', 'text')
    } else {
        eye.src = "/imagens/closedEye.png"
        password.setAttribute('type', 'password')
        visibility = 0
    }

}

// Saving and loading functions
function saveDb(){
    localStorage.setItem('db',JSON.stringify(db))
}
function loadDb(){

    var data = JSON.parse(localStorage.getItem('db'))
    if(localStorage.getItem('db') !== null){
        db = data
    }
}

window.onload = loadDb()
setInterval(saveDb,1000)    