
let finaldata=[]
const endpoint='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const prom= fetch(endpoint,{method:"GET"})
let x= prom.then((data)=>{
        return data.json()
 })
 x.then(dfg=>{
    for(let i=0;i<dfg.length;i++){
    finaldata.push(dfg[i])
    }
 })
async function getData(){
const endpoint='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'; 
const prom= await fetch(endpoint,{method:"GET"})
const res= await prom.json()
populateData(res)
getEvent()
}
function populateData(res){
    const tablereg= document.getElementById("table")
    const thead= document.createElement("tr")
    const name1= document.createElement("th")
    const name2= document.createElement("th")
    const name3= document.createElement("th")
    const name4= document.createElement("th")
    const name5= document.createElement("th")
    const name6= document.createElement("th")
    const name7= document.createElement("th")
    name1.innerText="Image"
    name2.innerText="Name"
    name3.innerText="Symbol"
    name4.innerText="Current Price"
    name5.innerText="Total Volume"
    name6.innerText="Percent Change"
    name7.innerText="MarketCap"
    thead.append(name1,name2,name3,name4,name5,name6,name7)
    tablereg.append(thead)
    for(let i=0;i<res.length;i++){
        const tr = document.createElement("tr")
        tablereg.append(tr)
        const name = document.createElement("td")
       const code = document.createElement("td")
       const image = document.createElement("td")
        const percentchange = document.createElement("td")
        const currentprice = document.createElement("td")
        const totalvolume = document.createElement("td")
        const marketcap = document.createElement("td")
        const imagecontainer= document.createElement("img")
        name.innerText=res[i].name
        code.innerText=res[i].symbol.toUpperCase()
        currentprice.innerText="$"+res[i].current_price
        totalvolume.innerText="$"+res[i].total_volume
        marketcap.innerText="Mkt Cap:$"+res[i].market_cap
        percentchange.innerText=(res[i].price_change_percentage_24h).toFixed(2)+"%"
        if(res[i].price_change_percentage_24h>0){
            percentchange.style.color="green"
        }
        else{
            percentchange.style.color="red"
        }
        imagecontainer.src=res[i].image
        imagecontainer.className="imager"
        image.className="imag"
        image.append(imagecontainer)
        tr.append(image,name,code,currentprice,totalvolume,percentchange,marketcap)
    }
}
function getEvent(){
    const mkcapref = document.getElementById("searchmarket")
    const spercentref= document.getElementById("searchpercent")
    const searchb = document.getElementById("searchmain")
    mkcapref.addEventListener("click",sorter1)
    spercentref.addEventListener("click",sorter2)
    searchb.addEventListener("click",search)
}
function sorter1(){
    let temp = finaldata.slice()
    temp.sort(function(a,b){
        if(a.market_cap>b.market_cap){
            return 1
        }
        else{
            return -1
        }
    })
    const tablereg= document.getElementById("table")
    tablereg.innerHTML=""
    populateData(temp)
}
function sorter2(){
    let temp = finaldata.slice()
    temp.sort(function(a,b){
        if(a.price_change_percentage_24h>b.price_change_percentage_24h){
            return 1
        }
        else{
            return -1
        }
    })
    const tablereg= document.getElementById("table")
    tablereg.innerHTML=""
    populateData(temp)
}
function search(){
    let str=document.getElementById("fgh").value
    let temp = finaldata.slice()
    let filteredata= temp.filter(x=>(x.name.includes(str) || x.name.includes(str.toUpperCase()))||(x.symbol.includes(str) || x.symbol.includes(str.toUpperCase())))
    const tablereg= document.getElementById("table")
    tablereg.innerHTML=""
    populateData(filteredata)
}

getData()