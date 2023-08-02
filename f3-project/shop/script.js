let products=[]
let items=document.getElementsByClassName('items')
let menbtn=document.getElementById('mens')
let womenbtn=document.getElementById('womens')
let jewel=document.getElementById('jewel')
let elec=document.getElementById('electronics')
let section=document.getElementsByClassName('cat')
let all=document.getElementById('all')
let search=document.getElementById('search')
let apply=document.getElementById('applyfilter')
let cancel=document.getElementById('cancelfilter')
let checkers=document.getElementsByClassName('checkers') 
let temp=JSON.parse(localStorage.getItem('products'))
let color=document.getElementsByName('color')
let size=document.getElementsByName('size')
let addtocart=document.getElementById('addBtn')
getproducts()
if(!localStorage.getItem('accesstoken')){
  location.href='../index.html'
}
for(let i=0;i<checkers.length;i++){
  checkers[i].addEventListener('click',()=>{
    if(checkers[i].checked){
      for(let j=0;j<checkers.length;j++){
        checkers[j].checked=false
      }
      checkers[i].checked=true
    }
    else{
      checkers[i].checked=false
    }
  })
}
async function getproducts(){
  if(!localStorage.getItem('products')){
    try{
  let color=['black','yellow','purple','red','green','blue']
  let size=['XS','S','M','L','XL','XXL']    
  let res= await fetch('https://fakestoreapi.com/products')
  let temp= await res.json()
  products=temp
  console.log(products)
  products.forEach((element)=>{
    let selectedcolor=[]
    let selectedsize=[]
    while(selectedcolor.length!=3){
      let temp1=color[Math.floor(Math.random()*6)]
      if(!selectedcolor.includes(temp1)){
        selectedcolor.push(temp1)
      }
    }
    while(selectedsize.length!=3){
      let temp2=size[Math.floor(Math.random()*6)]
      if(!selectedsize.includes(temp2)){
        selectedsize.push(temp2)
      }
    }
    element.color=selectedcolor
    element.size=selectedsize
  })
  localStorage.setItem('products',JSON.stringify(products))
  }
  catch(error){
    console.log(error)
  }
  }
  populatedata() 
}
function populatedata(array){
let temp=JSON.parse(localStorage.getItem('products'))
if(array!=undefined){
  temp=array
}
let color=['black','yellow','purple','red','green','blue']
let size=['XS','S','M','L','XL','XXL']
items[0].innerHTML=''
items[1].innerHTML=''
items[2].innerHTML=''
items[3].innerHTML=''
temp.forEach((element)=>{
  if(element.category==="men's clothing"){
    let temp=document.createElement('div')
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
    <button id="addBtn" onclick='addto(${element.id})'>Add to Cart</button>`
    items[0].append(temp)
  }
  else if(element.category==="women's clothing"){
    let temp=document.createElement('div')
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
    <button id="addBtn" onclick='addto(${element.id})'>Add to Cart</button>`
    items[1].append(temp)
  }
  else if(element.category==="jewelery"){
    let temp=document.createElement('div')
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
    <button id="addBtn" onclick='addto(${element.id})'>Add to Cart</button>`
    items[2].append(temp)
  }
  else{
    let temp=document.createElement('div')
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
    <button id="addBtn" onclick='addto(${element.id})'>Add to Cart</button>`
    items[3].append(temp)
  }
})
}
function getstars(rating){
  let src=''
  if(rating<=0.5){
    src='./stars/0.5.png'
  }
  else if(rating>0.5 && rating<=1){
    src='./stars/1.png'
  }
  else if(rating>1 && rating<=1.5){
    src='./stars/1.5.png'
  }
  else if(rating>1.5 && rating<=2){
    src='./stars/2.png'
  }
  else if(rating>2 && rating<=2.5){
    src='./stars/2.5.png'
  }
  else if(rating>2.5 &&rating<=3){
    src='./stars/3.png'
  }
  else if(rating>3 && rating<=3.5){
    src='./stars/3.5.png'
  }
  else if(rating>3.5 && rating<=4){
    src='./stars/4.png'
  }
  else if(rating>4 && rating<=4.5){
    src='./stars/4.5.png'
  }
  else if(rating>4.5 &&rating<=5){
    src='./stars/5.png'
  }
  return src
}
function getrating(rating){
  let src=0
  if(rating<=0.5){
    src=0.5
  }
  else if(rating>0.5 && rating<=1){
    src=1
  }
  else if(rating>1 && rating<=1.5){
    src=1.5
  }
  else if(rating>1.5 && rating<=2){
    src=2
  }
  else if(rating>2 && rating<=2.5){
    src=2.5
  }
  else if(rating>2.5 &&rating<=3){
    src=3
  }
  else if(rating>3 && rating<=3.5){
    src=3.5
  }
  else if(rating>3.5 && rating<=4){
    src=4
  }
  else if(rating>4 && rating<=4.5){
    src=4.5
  }
  else if(rating>4.5 &&rating<=5){
    src=5
  }
  return src
}
menbtn.addEventListener('click',()=>{
  if(menbtn.style.backgroundColor==='black'){
    menbtn.style.backgroundColor='white'
    menbtn.style.color='black'
    section[0].style.display='none'
    console.log(menbtn.style.backgroundColor)
   if(womenbtn.style.backgroundColor=='white' && jewel.style.backgroundColor=='white'&& elec.style.backgroundColor=='white'){
    all.style.backgroundColor='black'
    all.style.color='white'
    for(let i=0;i<section.length;i++){
      section[i].style.display='block'
    }
   }
  }
  else{
    all.style.backgroundColor='white'
    all.style.color='black'
    menbtn.style.backgroundColor='black'
    menbtn.style.color='white'
    section[0].style.display='block'
    if(womenbtn.style.backgroundColor!='black'){
      section[1].style.display='none'
    }
    if(jewel.style.backgroundColor!='black'){
      section[2].style.display='none'
    }
    if(elec.style.backgroundColor!='black'){
      section[3].style.display='none'
    }
  }
})
womenbtn.addEventListener('click',()=>{
  if(womenbtn.style.backgroundColor==='black'){
    womenbtn.style.backgroundColor='white'
    womenbtn.style.color='black'
    section[1].style.display='none'
   if(menbtn.style.backgroundColor==='white' && jewel.style.backgroundColor==='white'&& elec.style.backgroundColor==='white'){
    all.style.backgroundColor='black'
    all.style.color='white'
    for(let i=0;i<section.length;i++){
      section[i].style.display='block'
    }
   }
  }
  else{
    all.style.backgroundColor='white'
    all.style.color='black'
    womenbtn.style.backgroundColor='black'
    womenbtn.style.color='white'
    section[1].style.display='block'
    if(menbtn.style.backgroundColor!='black'){
      section[0].style.display='none'
    }
    if(jewel.style.backgroundColor!='black'){
      section[2].style.display='none'
    }
    if(elec.style.backgroundColor!='black'){
      section[3].style.display='none'
    }
  }
})
jewel.addEventListener('click',()=>{
  if(jewel.style.backgroundColor==='black'){
    jewel.style.backgroundColor='white'
    jewel.style.color='black'
    section[2].style.display='none'
   if(menbtn.style.backgroundColor==='white' && womenbtn.style.backgroundColor==='white'&& elec.style.backgroundColor==='white'){
    all.style.backgroundColor='black'
    all.style.color='white'
    for(let i=0;i<section.length;i++){
      section[i].style.display='block'
    }
   }
  }
  else{
    all.style.backgroundColor='white'
    all.style.color='black'
    jewel.style.backgroundColor='black'
    jewel.style.color='white'
    section[2].style.display='block'
    if(womenbtn.style.backgroundColor!='black'){
      section[1].style.display='none'
    }
    if(menbtn.style.backgroundColor!='black'){
      section[0].style.display='none'
    }
    if(elec.style.backgroundColor!='black'){
      section[3].style.display='none'
    }
  }
})
elec.addEventListener('click',()=>{
  if(elec.style.backgroundColor==='black'){
    elec.style.backgroundColor='white'
    elec.style.color='black'
    section[3].style.display='none'
   if(womenbtn.style.backgroundColor=='white' && menbtn.style.backgroundColor=='white'&& jewel.style.backgroundColor=='white'){
    all.style.backgroundColor='black'
    all.style.color='white'
    for(let i=0;i<section.length;i++){
      section[i].style.display='block'
    }
   }
  }
  else{
    all.style.backgroundColor='white'
    all.style.color='black'
    elec.style.backgroundColor='black'
    elec.style.color='white'
    section[3].style.display='block'
    if(womenbtn.style.backgroundColor!='black'){
      section[1].style.display='none'
    }
    if(jewel.style.backgroundColor!='black'){
      section[2].style.display='none'
    }
    if(menbtn.style.backgroundColor!='black'){
      section[0].style.display='none'
    }
  }
})
all.addEventListener('click',()=>{
  if(all.style.backgroundColor!='black'){
    menbtn.style.backgroundColor='white'
    womenbtn.style.backgroundColor='white'
    jewel.style.backgroundColor='white'
    elec.style.backgroundColor='white'
    menbtn.style.color='black'
    womenbtn.style.color='black'
    jewel.style.color='black'
    elec.style.color='black'
    section[0].style.display='block'
    section[1].style.display='block'
    section[2].style.display='block'
    section[3].style.display='block'
    all.style.backgroundColor='black'
    all.style.color='white'
  }
})
search.addEventListener('input',()=>{
  let temp=JSON.parse(localStorage.getItem('products'))
  let searched=search.value.toUpperCase()
  let res=temp.filter(element=>{
    return element.title.toUpperCase().includes(searched) || element.description.toUpperCase().includes(searched)
  })
  populatedata(res)
})
cancel.addEventListener('click',()=>{
  apply.style.backgroundColor='black'
  apply.style.color='white'
  populatedata()
})
apply.addEventListener('click',()=>{
  let temp=JSON.parse(localStorage.getItem('products'))
  apply.style.backgroundColor='white'
  apply.style.color='black'
let sizeselected=[]
let colorselected=[]
let rating=document.getElementById('range').value
let id=''
let x=[]
for(let i=0;i<checkers.length;i++){
  if(checkers[i].checked){
    id=checkers[i].id
  }
}
for(let i=0;i<size.length;i++){
  if(size[i].checked){
    sizeselected.push(size[i].id)
  }
}
for(let i=0;i<color.length;i++){
  if(color[i].checked){
    colorselected.push(color[i].id)
  }
}
 x=temp.filter(element=>{
let tempobjsize=element.size
let tempobjcolor=element.color  
let checker1=false
let checker2=false
let checker3=false
sizeselected.forEach(element=>{
if(tempobjsize.includes(element)){
  checker1=true
}
})
colorselected.forEach(element=>{
  if(tempobjcolor.includes(element)){
    checker2=true
  }
})
if(id.length!=0){
    if(id=="0-25"){
      if(0<element.price && element.price<=25){
        checker3=true
      }
    }
      else if(id=="25-50"){
        if(25<element.price && element.price<=50){
          checker3=true
        }
      }
      else if(id=="50-100"){
        if(50<element.price && element.price<=100){
          checker3=true
        }
      }
      else if(id== "100on"){
        if(element.price>100){
          checker3=true
        }
      }
}

return (sizeselected.length!=0? checker1:'true') && (colorselected.length!=0 ? checker2:'true') && getrating(element.rating.rate)>=Number(rating) && (id.length!=0 ? checker3:'true')
})
populatedata(x)
})
function addto(index){
 let temp1= JSON.parse(localStorage.getItem('cart'))
 let temp2=JSON.parse(localStorage.getItem('products'))
 let token=localStorage.getItem('accesstoken')
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
temp2[index-1].cartid=tempacc
for(let i=0;i<temp1.length;i++){
  if(temp1[i].token== token){
    temp1[i].items.push(temp2[index-1])
    localStorage.setItem('cart',JSON.stringify(temp1))
    return
  }
}
}