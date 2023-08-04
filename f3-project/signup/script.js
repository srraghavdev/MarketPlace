let form= document.getElementsByTagName('form')[0]
let fname= document.getElementById('fname')
let lname= document.getElementById('lname')
let email= document.getElementById('email')
let pass= document.getElementById('pass')
let confirmpass= document.getElementById('confirmpass')
let dynamic=document.getElementsByClassName('dynamic')[0]
if(localStorage.getItem('accesstoken')){
    dynamic.innerText="You are logged in, redirecting you to the Home Page"
    setTimeout(()=>{
      location.href='../shop/index.html'  
    },1500) 
}
form.addEventListener('submit',(event)=>{
event.preventDefault()
if(fname.value=='' ||email.value==''|| pass.value.trim()==''|| confirmpass.value.trim()=='' || lname.value==''){
    dynamic.innerText='Error: All fields are mandatory!'
    return
}
if(pass.value.trim()!=confirmpass.value.trim()){
    dynamic.innerText='Error: Passwords dont match!'
    return 
}
let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
if(!pass.value.trim().match(decimal)){ //regex matching
    dynamic.innerText='Please enter a password between 6 to 15 characters which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    return
}
let tempuser={
    fname:fname.value,
    lname:lname.value,
    email:email.value,
    pass:pass.value
}
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
let result = ' ';
const charactersLength = characters.length;
for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}
let tempacc=generateString(16)
tempuser.token=tempacc
localStorage.setItem('accesstoken',tempacc)
//localStorage.setItem('user',JSON.stringify(tempuser))
if(localStorage.getItem('users')){
    let temp=JSON.parse(localStorage.getItem('users'))
    temp.push(tempuser)
    localStorage.setItem('users',JSON.stringify(temp))
}
else{
    let temp=[]
    temp.push(tempuser)
    localStorage.setItem('users',JSON.stringify(temp))
}
if(localStorage.getItem('cart')){
    let temp=JSON.parse(localStorage.getItem('cart'))
    let x={
        token:tempacc,
        items:[]
    }
    temp.push(x)
    localStorage.setItem('cart',JSON.stringify(temp))
}
else{
    let x=[]
    let y={
        token:tempacc,
        items:[]
    }
    x.push(y)
    localStorage.setItem('cart',JSON.stringify(x))
}
dynamic.innerText='Congratulations! Successfull Sign Up'
setTimeout(()=>{
  location.href='../shop/index.html'  
},1000)
})
