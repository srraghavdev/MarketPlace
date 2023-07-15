let order={}
async function getMenu(){
	try{
	let temp= await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
	let temper = await temp.json()
	console.log(temper)
	populateMenu(temper)
	TakeOrder(temper)
	}
	catch {
	alert("Menu could not be loaded")
	}	
}
 function TakeOrder(details){
	let d= [...details]
	try{
		let c =  new Promise((resolve) =>{
			setTimeout(()=>{
			let x= Math.floor(Math.random()*24)
			order.item1=d[x]
			d.splice(x,1)
			let y= Math.floor(Math.random()*24)
			order.item2=d[y]
			d.splice(y,1)
			let z= Math.floor(Math.random()*24)
			order.item3=d[z]
			d.splice(z,1)
			resolve(order)
			},2500)
		}).then(orderPrep)
		return c
	}
	catch(error){
		alert("The following error resulted in taking order:",error)
	}
}
function orderPrep(){
	try{
		let c =new Promise((resolve) =>{
			setTimeout(()=>{
			let obj_details={}
			obj_details.order_status=true
			obj_details.paid=false
			resolve(obj_details)
			},1500)
		}).then((message)=>{
			payOrder(message)
		})
		return c
	}
	catch(error){
		alert("The following error resulted in preparing order:",error)
	}
}
function payOrder(obj_details){
	try{
		let c =new Promise((resolve) =>{
			setTimeout(()=>{
			obj_details.order_status=true
			obj_details.paid=true
			resolve(obj_details)
			},1000)
		}).then((message)=>{
			thankyouFnc(message)
		})
		return c
	}
	catch(error){
		alert("The following error resulted in the payment of the order:",error)
	}
}
function thankyouFnc(obj_details){
	if(obj_details.paid===true){
		let g=[]
		for(let x in order){
			g.push(order[x])
		}
		populateMenu(g,1)
		alert("thankyou for eating with us today! :)")
		return
	}
	else{
		alert("Something went wrong in the process, contact customer care for more insight :)")
	}
}
function populateMenu(temp,param){
	if(param===1){
		document.getElementById("banner").style.display="none"
		document.getElementById("name").innerText="Your order"
	}
	let parent= document.getElementsByClassName("dishes")[0]
	parent.innerHTML=''
	for(let i=0;i<temp.length;i++){
		let ref= document.createElement("div")
		ref.className="item"
		ref.innerHTML=`
		<div class="topc"><img src=${temp[i].imgSrc}</div>
		<div class="bottomc">
		<div class="bt1">
		<div class="namediv">${temp[i].name}</div>
		<div class="price">$${temp[i].price}</div>
		</div>
		<div class="bt2">
		<img src="./images/plus.png"
		</div>
		</div>
		`
	parent.append(ref)		
	}
}
