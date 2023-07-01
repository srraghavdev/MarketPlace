
async function getvideo(search){
    const baseurl=`https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU&part=snippet&q=${search}&type=video&maxResults=20`
    const temp = await fetch(baseurl)
    const result = await temp.json()
    getdeatils(result.items)
}
async function getdeatils(result){
    let videodetails=[]
    let indidata=[]
    for(let i=0;i<result.length;i++){
        const ide = result[i].id.videoId
        const baseurl=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ide}&key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU`
        let temp = await fetch(baseurl)
        let tempres= await temp.json()
        videodetails.push(tempres.items[0])
   }
   console.log(videodetails)
    individualdata(videodetails)
}
async function individualdata(result){
    let indidata=[]
    for(let i=0;i<result.length;i++){
        let id=result[i].snippet.channelId
        const base=`https://www.googleapis.com/youtube/v3/channels?key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU&part=snippet&id=${id}`
        let temp = await fetch(base)
        let tempres= await temp.json()
        indidata.push(tempres.items[0])
   }
   console.log(indidata)
   console.log(result)
   renderData(result,indidata)
}
function renderData(result,indidata){
    const main= document.getElementsByClassName("main")[0]
    let viewcount=0
    const time=0
    const curdate= new Date()
    console.log(curdate)
    main.innerHTML=``
    for(let i=0;i<result.length;i++){
        const createELement=document.createElement("div")
        let customdate= new Date(Number(result[i].snippet.publishedAt.substring(0,4)),Number(result[i].snippet.publishedAt.substring(5,7))-1,Number(result[i].snippet.publishedAt.substring(8,10)),Number(result[i].snippet.publishedAt.substring(11,13))+5,Number(result[i].snippet.publishedAt.substring(14,16))+30,Number(result[i].snippet.publishedAt.substring(17,19)))
        let processeddate=''
        let diff=(curdate.getTime()-customdate.getTime())/1000
        console.log(customdate)
        console.log(diff)
        if(diff<60){
            customdate=`${diff.toFixed(0)}} seconds ago`
        }
        else if(diff<3600){
            if((diff/60).toFixed(0)<=1){
                customdate=`${(diff/60).toFixed(0)} minute ago`
            }
            else{
            customdate=`${(diff/60).toFixed(0)} minutes ago`}
        }
        else if(diff<86400){
            if((diff/3600).toFixed(0)<=1){
                customdate=`${(diff/3600).toFixed(0)} hour ago`
            }
            else{
            customdate=`${(diff/3600).toFixed(0)} hours ago`}
        }
        else if(diff<604800){
            if((diff/86400).toFixed(0)<=1){
                customdate=`${(diff/86400).toFixed(0)} day ago`
            }
            else{
            customdate=`${(diff/86400).toFixed(0)} days ago`}
        }
        else if(diff<2419200){
            if((diff/604800).toFixed(0)<=1){
                customdate=`${(diff/604800).toFixed(0)} week ago`
            }
            else{
            customdate=`${(diff/604800).toFixed(0)} weeks ago`}
        }
        else if(diff<29030400){
            if((diff/2419200).toFixed(0)<=1){
                customdate=`${(diff/2419200).toFixed(0)} month ago`
            }
            else{
            customdate=`${(diff/2419200).toFixed(0)} months ago`}
        }
        else{
            if((diff/29030400).toFixed(0)<=1){
                customdate=`${(diff/29030400).toFixed(0)} year ago`
            }
            else{
            customdate=`${(diff/29030400).toFixed(0)} years ago`}
        }
        if(result[i].statistics.viewCount<=1000){
            viewcount=result[i].statistics.viewCount
        }
        else if(result[i].statistics.viewCount>1000 && result[i].statistics.viewCount<=999999){
            viewcount=((result[i].statistics.viewCount)/1000).toFixed(1)+"K"
        }
        else {
            viewcount=((result[i].statistics.viewCount)/1000000).toFixed(1)+"M"
        }
        let str=result[i].snippet.title
        if(result[i].snippet.title.length>=80){
            str=result[i].snippet.title.substring(0,65)
            str+="..."
        }
        let videolength=0
        let durationstr=result[i].contentDetails.duration
        let dur=''
        for(let j=0;j<durationstr.length;j++){
            if(Number(durationstr[j])>=0 && Number(durationstr[j])<=9){
                console.log(Number(durationstr[j]))
                dur=dur+durationstr[j]
            }
        }
        if(dur.length===1){
            if(dur.length===1 && Number(dur[0])===1){
            dur="SHORT"
        }
        else{
            dur="0:"+dur
        }
        }
        else if(dur.length===2){
            dur="0:"+dur
        }
        else if(dur.length===3){
            dur=`${dur.substring(0,1)}:${dur.substring(1,3)}`
        }
        else if(dur.length===4){
            dur=`${dur.substring(0,2)}:${dur.substring(2,4)}`
        }
        else if(dur.length===5){
            dur=`${dur.substring(0,1)}:${dur.substring(1,3)}:${dur.substring(3,5)}`
        }
        else if(dur.length===6){
            dur=`${dur.substring(0,2)}:${dur.substring(2,4)}:${dur.substring(4,6)}`
        }
        createELement.className="video_card"
            createELement.innerHTML=
                    `<div class="top" onclick="getplayer('${result[i].id}')">
                    <img src="${result[i].snippet.thumbnails.high.url}" class="thumbnail" style="border-radius:12px;">
                    </div>
                    <div class="length">${dur}</div>
                    <div class="bottom" style="width: 100%;padding-top:5px;" onclick="getplayer('${result[i].id}')">
                         <img src="${indidata[i].snippet.thumbnails.high.url}" style="border-radius:50%;width:11%;">
                        <div class="b2">
                            <p style="color:#f1f1f1;padding-bottom:5px;font-weight:500;">${str}</p>
                            <p class="descdetails">${result[i].snippet.channelTitle}</p>
                            <p class="descdetails">${viewcount} views •${customdate}</p>
                        </div>
                    </div>
            </div> `
        main.append(createELement)
        
    }
}
const searf= document.getElementById("searchinput")
searf.addEventListener("click",searchin)
function searchin(){
getvideo(searf.value)
}
function getplayer(videoId){
    localStorage.setItem("videoId",videoId)
    window.open("./player.html")
}
