// Write your script here
let form1=document.getElementById('form-1')
let form2=document.getElementById('form-2')
let lname=document.getElementById('lname')
let oldpass=document.getElementById('oldpass')
let pass=document.getElementById('pass')
let confirmpass=document.getElementById('confirmpass')
let namebtn=document.getElementById('savename')
let passbtn=document.getElementById('savepass')
let logbtn= document.getElementById('logout')
let dynamic=document.getElementsByClassName('dynamic')
let tempusers=JSON.parse(localStorage.getItem('users'))
let token=localStorage.getItem('accesstoken')
let tempobj={}
if(!localStorage.getItem('accesstoken')){
    dynamic.innerText='You are not logged in, redirecting you to the Home Page'
    setTimeout(()=>{
        locattion.href='../index.html'
    },1500)
}
else{
  let res= tempusers.find((element)=>{
       return element.token===token
    })
    tempobj=res
    fname.value=res.fname
    lname.value=res.lname
}
form1.addEventListener('submit',(event)=>{
event.preventDefault()
for(let i=0;i<tempusers.length;i++){
    if(tempusers[i].token===token){
    tempusers[i].fname=fname.value
    tempusers[i].lname=lname.value
    }
}
localStorage.setItem('users',JSON.stringify(tempusers))
dynamic[0].innerText='Changed Names successfully'
})
form2.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(oldpass.value!=tempobj.pass){
        dynamic[1].innerText='Error:You entered a wrong password'
        return
    }
    if(pass.value.trim()!=confirmpass.value.trim()){
        dynamic[1].innerText='Error: Passwords dont match!'
        return 
    }
    let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if(!pass.value.trim().match(decimal)){ //regex matching
        dynamic[1].innerText='Please enter a password between 6 to 15 characters which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
        return
    }
    for(let i=0;i<tempusers.length;i++){
        if(tempusers[i].token===token){
        tempusers[i].pass=pass.value.trim()
        }
    }
    localStorage.setItem('users',JSON.stringify(tempusers))
    dynamic[1].innerText='Changed Password successfully'
    oldpass.value=''
    pass.value=''
    confirmpass.value=''
})
logbtn.addEventListener('click',()=>{
    localStorage.removeItem('accesstoken')
    location.href='../index.html'
})