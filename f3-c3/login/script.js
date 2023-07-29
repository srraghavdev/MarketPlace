let name1 = document.getElementsByClassName('name')[0]
let email = document.getElementsByClassName('email')[0]
let token = document.getElementsByClassName('token')[0]
let pass = document.getElementsByClassName('pass')[0]
let btn=document.getElementById('logout')
let dynamic=document.getElementsByClassName('dynamic')[0]
let userobj= JSON.parse(localStorage.getItem('user'))
if(!localStorage.getItem('accesstoken')){
    dynamic.innerText='You are not a valid user, please Sign Up'
    setTimeout(()=>{
    location.href='../index.html'
    },500)   
}
name1.innerText='Name: '+userobj.name
email.innerText='Email: '+userobj.email
token.innerText='Token: '+userobj.token
pass.innerText='Password: '+ userobj.pass
btn.addEventListener('click',()=>{
    dynamic.innerText='Logging you out..'
    setTimeout(()=>{
        localStorage.clear()
        location.href='../index.html'
    },1000)
})