const vidid= localStorage.getItem("videoId")
let count=0
function iframemaker(){
    const iframeref=document.getElementById("iframer")
    const vidid= localStorage.getItem("videoId")
    iframeref.src=`https://www.youtube.com/embed/${vidid}?autoplay=1&mute=1`
    getdataforeach()
}
async function getdataforeach(){
    let finaldata=[]
    let temp= await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${vidid}&key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU`)
    let rest= await temp.json()
    finaldata=rest.items
    console.log(finaldata)
    getchanneldata(finaldata)
}
async function getchanneldata(result){
    const t= result[0].snippet.channelId
    let indidata=[]
    const base=`https://www.googleapis.com/youtube/v3/channels?key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU&part=snippet,statistics&id=${t}`
        let temp = await fetch(base)
        let tempres= await temp.json()
        indidata.push(tempres.items[0])
        console.log(indidata)
        renderData(result,indidata)
}
function renderData(result,indidata){
const titleref= document.getElementsByClassName("title")[0]
titleref.innerText=result[0].snippet.title
const viewsref=document.getElementsByClassName("views")[0]
viewsref.innerText=result[0].statistics.viewCount+" views"
const likeref=document.getElementsByClassName("like")[0]
let templike=result[0].statistics.likeCount
let likestr=''
if(templike<=1000){
    likestr=result[i].statistics.viewCount
}
else if(templike>1000 && templike<=999999){
    likestr=(templike/1000).toFixed(1)+"K"
}
else {
    likestr=((templike)/1000000).toFixed(1)+"M"
}
likeref.innerText=likestr
const chanelav= document.getElementById("chnlav")
chanelav.src=indidata[0].snippet.thumbnails.high.url
const channelname=document.getElementsByClassName("acname")[0]
channelname.innerText=indidata[0].snippet.title
const subcount= document.getElementsByClassName("subs")[0]
let tempsub=indidata[0].statistics.subscriberCount
let substr=''
if(tempsub<=1000){
    substr=result[i].statistics.viewCount+" "+"subscribers"
}
else if(tempsub>1000 && tempsub<=999999){
    substr=(tempsub/1000).toFixed(1)+"K"+" "+"subscribers"
}
else {
    substr=((tempsub)/1000000).toFixed(1)+"M"+" "+"subscribers"
}
subcount.innerText=substr
const descr= document.getElementById("desclk")
descr.innerText=result[0].snippet.description
console.log(result[0].snippet.description)
const el= document.getElementById("accom")
accom.innerText=result[0].statistics.commentCount+" Comments"
getComments()
}
async function getComments(){
    letfinaldata=[]
let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU&part=snippet&videoId=${vidid}&maxResults=80&order=relevance`
let temp = await fetch(url)
let res = await temp.json()
finaldata=res.items
console.log(finaldata)
rendercomments(finaldata)
}
function rendercomments(result){
    for(let i=0;i<result.length;i++){
        const replycont = document.createElement("div")
        replycont.className="reply"
        const curdate= new Date()
        let customdate= new Date(Number(result[i].snippet.topLevelComment.snippet.publishedAt.substring(0,4)),Number(result[i].snippet.topLevelComment.snippet.publishedAt.substring(5,7))-1,Number(result[i].snippet.topLevelComment.snippet.publishedAt.substring(8,10)),Number(result[i].snippet.topLevelComment.snippet.publishedAt.substring(11,13))+5,Number(result[i].snippet.topLevelComment.snippet.publishedAt.substring(14,16))+30,Number(result[i].snippet.topLevelComment.snippet.publishedAt.substring(17,19)))
        let diff=(curdate.getTime()-customdate.getTime())/1000
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
        let viewcount=0
        if(result[i].snippet.topLevelComment.snippet.likeCount<=1000){
            viewcount=result[i].snippet.topLevelComment.snippet.likeCount
        }
        else if(result[i].snippet.topLevelComment.snippet.likeCount>1000 && result[i].snippet.topLevelComment.snippet.likeCount<=999999){
            viewcount=((result[i].snippet.topLevelComment.snippet.likeCount)/1000).toFixed(1)+"K"
        }
        else {
            viewcount=((result[i].snippet.topLevelComment.snippet.likeCount)/1000000).toFixed(1)+"M"
        }
        replycont.innerHTML=`
                        <div class="leftc">
                            <img src="${result[i].snippet.topLevelComment.snippet.authorProfileImageUrl}" style="border-radius: 50%;">
                        </div>
                        <div class="rightc">
                            <div class="c1">${result[i].snippet.topLevelComment.snippet.authorDisplayName} ${customdate}</div>
                            <div class="c2">${result[i].snippet.topLevelComment.snippet.textDisplay}</div>
                            <div class="c3">
                                <div class="c3like"><image src="./images/like btn.png"></image>${viewcount}</div>
                                <div class="c3dislike"><image src="./images/dislike.png"></image></div>
                                <div class="replycounter">Reply</div>
                            </div>
                        </div>`
                       // <div class="repliesboolean">> 2 replies</div>
        const replieref= document.getElementsByClassName("replies")[0]
        replieref.append(replycont)               
       if(result[i].snippet.totalReplyCount>0){
        const creater= document.createElement("div")
        creater.className="repliesboolean"
        creater.id=count
        let replycount=0
        if(result[i].snippet.totalReplyCount<=1000){
            replycount=result[i].snippet.totalReplyCount
        }
        else if(result[i].snippet.totalReplyCount>1000 && result[i].snippet.totalReplyCount<=999999){
            replycount=((result[i].snippet.totalReplyCount)/1000).toFixed(1)+"K"
        }
        else {
            replycount=((result[i].snippet.totalReplyCount)/1000000).toFixed(1)+"M"
        }
        creater.innerHTML=`<div class="downiconcont" onclick="getreplieslist('${result[i].snippet.topLevelComment.id}',${count})"><image src="./images/down cion.png" class="downicon">${replycount} replies</image></div>`
        const getright= document.getElementsByClassName("rightc")[i]
        getright.append(creater)
        count++
       }
       
    }
}
async function getreplieslist(commentId,count){
    let finaldata=[]
    const url=`https://www.googleapis.com/youtube/v3/comments?key=AIzaSyA-zzTpKPIxmpXfihLHOXLN0OLlwBs96EU&part=snippet&parentId=${commentId}&maxResults=10`
    let temp =await fetch(url)
    let res= await temp.json()
    finaldata=res.items
    console.log(finaldata)
    rendercommentreplies(finaldata,count)
}
function rendercommentreplies(result,count){
    for(let i=0;i<result.length;i++){
        const replycont = document.createElement("div")
        replycont.className="reply"
        const curdate= new Date()
        let customdate= new Date(Number(result[i].snippet.publishedAt.substring(0,4)),Number(result[i].snippet.publishedAt.substring(5,7))-1,Number(result[i].snippet.publishedAt.substring(8,10)),Number(result[i].snippet.publishedAt.substring(11,13))+5,Number(result[i].snippet.publishedAt.substring(14,16))+30,Number(result[i].snippet.publishedAt.substring(17,19)))
        let diff=(curdate.getTime()-customdate.getTime())/1000
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
        let viewcount=0
        if(result[i].snippet.likeCount<=1000){
            viewcount=result[i].snippet.likeCount
        }
        else if(result[i].snippet.likeCount>1000 && result[i].snippet.likeCount<=999999){
            viewcount=((result[i].snippet.likeCount)/1000).toFixed(1)+"K"
        }
        else {
            viewcount=((result[i].snippet.likeCount)/1000000).toFixed(1)+"M"
        }
        replycont.innerHTML=`
                        <div class="leftc">
                            <img src="${result[i].snippet.authorProfileImageUrl}" style="border-radius: 50%;">
                        </div>
                        <div class="rightc">
                            <div class="c1">${result[i].snippet.authorDisplayName} ${customdate}</div>
                            <div class="c2">${result[i].snippet.textDisplay}</div>
                            <div class="c3">
                                <div class="c3like"><image src="./images/like btn.png"></image>${viewcount}</div>
                                <div class="c3dislike"><image src="./images/dislike.png"></image></div>
                                <div class="replycounter">Reply</div>
                            </div>
                        </div>`
                       // <div class="repliesboolean">> 2 replies</div>
        const replieref= document.getElementsByClassName("repliesboolean")[count]
        replieref.append(replycont)               
    }
}