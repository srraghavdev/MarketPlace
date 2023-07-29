let btn= document.getElementById('contbtn')
let name1= document.getElementById('name')
let pass= document.getElementById('pass')
let confirmpass= document.getElementById('confirmpass')
let dynamic= document.getElementsByClassName('dynamic')[0]
let email=document.getElementById('email')
let form=document.getElementsByTagName('form')[0]
if(localStorage.getItem('accesstoken')){
    dynamic.innerText='You are already a user :)'
    setTimeout(()=>{
        location.href='./login'
    },1000)
}
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(name1.value=='' ||email.value==''|| pass.value.trim()==''|| confirmpass.value.trim()==''){
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
        name:name1.value,
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
    let tempacc=generateString(9)
    tempuser.token=tempacc
    localStorage.setItem('accesstoken',tempacc)
    localStorage.setItem('user',JSON.stringify(tempuser))
    dynamic.innerText='Congratulations! Successfull Sign Up'
    setTimeout(()=>{
      location.href='./login'  
    },1000)
})