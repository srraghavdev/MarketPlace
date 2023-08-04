let maincont=document.getElementsByTagName('main-content')[0]
let checkitems=document.getElementsByClassName('checkitems')[0]

if(!localStorage.getItem('accesstoken')){
    location.href='../index.html'
}
function populate(){
    localStorage.setItem('sum',0)
    let temp=JSON.parse(localStorage.getItem('cart'))
    let token=localStorage.getItem('accesstoken')
    let cartitems=[]
    temp.forEach(element=>{
        if(element.token==token){
            cartitems=element.items
        }
    })
    maincont.innerHTML=''
    cartitems.forEach((element)=>{
          let temp=document.createElement('div')
          let cartid= String(element.cartid)
          temp.className='item'
          temp.innerHTML=`
          <div class="images"><img src=${element.image} alt="Item" /></div>
          <div class="info">
          <div class="name">${element.title}</div>
          <div class='desc'>${element.description}</div>
            <div class="row">
              <div class="price">$${element.price}</div>
              <div class="sized">${element.size[0]},${element.size[1]},${element.size[2]}</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                <div class="circle" style="background-color: ${element.color[0]}"></div>
                <div class="circle" style="background-color: ${element.color[1]}"></div>
                <div class="circle" style="background-color: ${element.color[2]}"></div>
              </div>
            </div>
            <div class="row rating">Rating:<img src=${getstars(element.rating.rate)} class='stars'>(${element.rating.count})</div>
          </div>
          <button id="addBtn" onclick='removefrom(${JSON.stringify(element.cartid)})'>Remove from Cart</button>`
          maincont.append(temp)
       }
    )
    console.log(cartitems)
       checkitems.innerHTML=``
       let sum=0
       for(let i=0;i<cartitems.length;i++){
        let temp=document.createElement('div')
        temp.className='type'
        temp.innerHTML=`
        <div class='left1'>${i+1}. ${cartitems[i].title}</div>
        <div class='right1'>$${cartitems[i].price}</div>
        `
        checkitems.append(temp)
        sum+=cartitems[i].price
       }
       
       let c=document.createElement('div')
       sum=sum.toFixed(2)
       c.className='type'
       c.innerHTML=`
       <div class='left1'>Total</div>
       <div class='right1'>$${sum}</div>
       `
       c.style.borderBottom='1px solid white'
       c.style.borderTop='1px solid white'
       c.style.paddingTop='1%'
       c.style.paddingBottom='1%'
       checkitems.append(c)
       let d=document.createElement('button')
       d.innerText='Click to Checkout'
       d.style.color='black'
       d.style.backgroundColor='white'
       d.className='checkoutbtn'
       d.onclick=razorpay
       let f=document.createElement('div')
       f.className='btncontainer'
       f.append(d)
       checkitems.append(f)
       localStorage.setItem('sum',sum)
}
function getstars(rating){
    let src=''
    if(rating<=0.5){
      src='../shop/stars/0.5.png'
    }
    else if(rating>0.5 && rating<=1){
      src='../shop/stars/1.png'
    }
    else if(rating>1 && rating<=1.5){
      src='../shop/stars/1.5.png'
    }
    else if(rating>1.5 && rating<=2){
      src='../shop/stars/2.png'
    }
    else if(rating>2 && rating<=2.5){
      src='../shop/stars/2.5.png'
    }
    else if(rating>2.5 &&rating<=3){
      src='../shop/stars/3.5.png'
    }
    else if(rating>3 && rating<=3.5){
      src='../shop/stars/3.5.png'
    }
    else if(rating>3.5 && rating<=4){
      src='../shop/stars/4.png'
    }
    else if(rating>4 && rating<=4.5){
      src='../shop/stars/4.5.png'
    }
    else if(rating>4.5 &&rating<=5){
      src='../shop/stars/5.png'
    }
    return src
  }
populate()
function razorpay(){
    if(localStorage.getItem('sum')){
       if( localStorage.getItem('sum')>0){
        let temp=JSON.parse(localStorage.getItem('cart'))
        let token=localStorage.getItem('accesstoken')
        temp.forEach(element=>{
          if(element.token==token){
            element.items=[]
          }
        })
        localStorage.setItem('cart',JSON.stringify(temp))
        maincont.innerHTML=''
        alert('The items were purchased successfully')
    location.href='../razorpay/index.html' 
       }  
    }
}
function removefrom(obj){
let cartid=obj
let cart=JSON.parse(localStorage.getItem('cart'))
let token=localStorage.getItem('accesstoken')
cart.forEach(element=>{
  if(element.token==token){
    let t=element.items
    for(let i=0;i<t.length;i++){
      if(t[i].cartid==cartid){
        t.splice(i,1)
      }
    }
  }
})
localStorage.setItem('cart',JSON.stringify(cart))
populate()
}