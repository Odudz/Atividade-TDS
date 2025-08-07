var db = {acc: []}

function searchName(name){

    name = name.toLowerCase()

    for(i = 0; i < db.acc.length; i++){
        if(db.acc[i][0] === name){
            return i
        }
    }

    return false
}

function createAccountant(){
    var name = document.getElementById('nome').value
    var password = document.getElementById('senha').value
    var verifyPassword = document.getElementById('verifySenha').value

    if(name && password && verifyPassword !== ''){
        if(searchName(name,0) === false){
            if(password === verifyPassword){
                name = name.toLowerCase()
                const acc = [name,password,{}]

                db.acc.push(acc)
                console.log("You created a accountant!")

                saveDb()
                window.location.href = '/login/index.html'
            } else {
                console.log("The passwords dont match!")
            }
        } else {
            console.log('A accountant with this name already exists')
        }
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