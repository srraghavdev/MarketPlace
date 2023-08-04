// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
let login= document.getElementById('login')
let singup=document.getElementById('signup')
login.addEventListener('click',()=>{
    location.href='./login'
})
singup.addEventListener('click',()=>{
    location.href='./signup'
})