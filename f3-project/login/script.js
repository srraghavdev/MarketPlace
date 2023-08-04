let form=document.getElementsByTagName('form')[0]
let email=document.getElementById('email')
let pass=document.getElementById('pass')
let dynamic=document.getElementsByClassName('dynamic')[0]
if(!localStorage.getItem('users')){
    dynamic.innerText='No users, redirecting you to the signup page'
    setTimeout(()=>{
    location.href='../signup/index.html'
    },1500)
}
if(localStorage.getItem('accesstoken')){
    dynamic.innerText='You are already logged in, redirecting you to the Home Page'
    setTimeout(()=>{
        location.href='../shop/index.html'
    },1500)
}
form.addEventListener('submit',(event)=>{
event.preventDefault()
let temp= JSON.parse(localStorage.getItem('users'))
let res=temp.find((element)=>{
return element.email===email.value
})
if(res){
localStorage.setItem('accesstoken',res.token)
if(res.pass=== pass.value){
    dynamic.innerText='Welcome back :)'
    setTimeout(()=>{
        location.href='../shop/index.html'
    },1500)
}
else{
    dynamic.innerText='Error: Password does not match'
    return
}
}
else{
dynamic.innerText='Error: Email does not match any account '
return
}
})
