let student_details=[]
let count=0
let ser= document.getElementById("search")
ser.addEventListener("keyup",search)
let submit=document.getElementsByTagName("form")[0]
submit.addEventListener("submit",adddata)
function adddata(event){
    event.preventDefault()
    if(student_details.length==0){
        count=0
    }
count++
let tempobj={
    ID: count, 
    name: document.getElementById("name").value, 
    age: document.getElementById("age").value, 
    grade: document.getElementById("gpa").value,
    degree: document.getElementById("degree").value,
    email:document.getElementById("email").value
    }
    student_details.push(tempobj)
    document.getElementById("name").value=""
    document.getElementById("age").value=""
    document.getElementById("gpa").value=""
    document.getElementById("degree").value=""
    document.getElementById("email").value=""
addtablerow(tempobj)
}
function addtablerow(tempobj){
    let table=document.getElementsByTagName("table")[0]
    let tr=document.createElement("tr")
    let t1=document.createElement("td")
    let t2=document.createElement("td")
    let t3=document.createElement("td")
    let t4=document.createElement("td")
    let t5=document.createElement("td")
    let t6=document.createElement("td")
    t6.className="right"
    t1.innerText=(tempobj.ID)
    t2.innerText=(tempobj.name)
    t3.innerText=(tempobj.email)
    t4.innerText=(tempobj.age)
    t5.innerText=(tempobj.grade)
    t6.innerHTML=`${tempobj.degree} <div class="imger"><img src="./images/edit 1.png" onclick="firstcalledit(${tempobj.ID})">
    <img src="./images/trash-2 1.png" onclick="deleteentry(${tempobj.ID})"></div>
    `
    t6.className="degreeflex"
    tr.append(t1,t2,t3,t4,t5,t6)
    table.append(tr)
}
function deleteentry(index){
    let t= document.getElementsByTagName("tr")
    for(let i=0;i<t.length;i++){
       let temp=t[i].childNodes;
       if(temp[0].innerText==index){
            t[i].remove()
            break
       }
    }
    let g=0
    for(let i=0;i<student_details.length;i++){
        if(student_details[i].ID==index){
            g=i
        }
    }
    student_details.splice(g,1)
    console.log(student_details)
}
function firstcalledit(index){
    let tempobj={}
    for(let i=0;i<student_details.length;i++){
        if(student_details[i].ID==index){
            tempobj=student_details[i]
        }
    }
    document.getElementById("name").value=tempobj.name 
    document.getElementById("age").value=tempobj.age
    document.getElementById("gpa").value=tempobj.grade
    document.getElementById("degree").value=tempobj.degree
    document.getElementById("email").value=tempobj.email

    let btn= document.getElementById("btn")
    btn.innerText="Edit Student"
    btn.style.backgroundColor="#111"
    btn.style.color="white"
    let submit=document.getElementsByTagName("form")[0]
    submit.removeEventListener("submit",adddata)
    submit.addEventListener("submit",finaledit)
    localStorage.setItem("index",index)
}
function finaledit(event){
    event.preventDefault()
    let tempobj={
        ID:localStorage.getItem("index"),
        name:document.getElementById("name").value,
        age:document.getElementById("age").value,
        grade:document.getElementById("gpa").value,
        degree:document.getElementById("degree").value,
        email:document.getElementById("email").value
    }
    console.log(tempobj)
    for(let i=0;i<student_details.length;i++){
        if(student_details[i].ID==tempobj.ID){
           student_details[i].name=tempobj.name
           student_details[i].age=tempobj.age
           student_details[i].grade=tempobj.grade
           student_details[i].degree=tempobj.degree
           student_details[i].email=tempobj.email
        }
    }
    console.log(student_details)
    let t= document.getElementsByTagName("tr")
    for(let i=0;i<t.length;i++){
       let temp=t[i].childNodes;
       if(temp[0].innerText==localStorage.getItem("index")){
           temp[1].innerText=tempobj.name
           temp[2].innerText=tempobj.email
           temp[3].innerText=tempobj.age
           temp[4].innerText=tempobj.grade
           temp[5].innerHTML=`${tempobj.degree} <div class="imger"><img src="./images/edit 1.png" onclick="firstcalledit(${tempobj.ID})">
    <img src="./images/trash-2 1.png" onclick="deleteentry(${tempobj.ID})"></div>
    `}
    }
    let btn= document.getElementById("btn")
    btn.innerText="Add Student"
    btn.style.backgroundColor="white"
    btn.style.color="#111"
    let submit=document.getElementsByTagName("form")[0]
    submit.removeEventListener("submit",finaledit)
    submit.addEventListener("submit",adddata)
    document.getElementById("name").value=""
    document.getElementById("age").value=""
    document.getElementById("gpa").value=""
    document.getElementById("degree").value=""
    document.getElementById("email").value=""

}
function search(){
    console.log(1)
    let search=document.getElementById("search").value
    let filter= student_details.filter((item) => { 
        let serchup=search.toUpperCase()
        let b1=item.name.toUpperCase()
        let b2=item.email.toUpperCase()
        let b3=item.degree.toUpperCase()
        return ((b1).includes(serchup)|| (b2).includes(serchup)|| (b3).includes(serchup))})
    console.log(filter)
    rednersearch(filter)
}
function rednersearch(filter){
    let table=document.getElementsByTagName("table")[0]
    table.innerHTML=""
    let tr1=document.createElement("tr")
    let t11=document.createElement("td")
    let t21=document.createElement("td")
    let t31=document.createElement("td")
    let t41=document.createElement("td")
    let t51=document.createElement("td")
    let t61=document.createElement("td")
    t11.innerText='ID'
    t21.innerText='Student Name'
    t31.innerText='Email'
    t41.innerText='Age'
    t51.innerText='GPA'
    t61.innerText='Degree'
    t11.className="head"
    t21.className="head"
    t31.className="head"
    t41.className="head"
    t51.className="head"
    t61.className="head"
    tr1.append(t11,t21,t31,t41,t51,t61)
    table.append(tr1)
    for(let i=0;i<filter.length;i++){
    let table=document.getElementsByTagName("table")[0]
    let tr=document.createElement("tr")
    let t1=document.createElement("td")
    let t2=document.createElement("td")
    let t3=document.createElement("td")
    let t4=document.createElement("td")
    let t5=document.createElement("td")
    let t6=document.createElement("td")
    t6.className="right"
    t1.innerText=(filter[i].ID)
    t2.innerText=(filter[i].name)
    t3.innerText=(filter[i].email)
    t4.innerText=(filter[i].age)
    t5.innerText=(filter[i].grade)
    t6.innerHTML=`${filter[i].degree} <div class="imger"><img src="./images/edit 1.png" onclick="firstcalledit(${filter[i].ID})">
    <img src="./images/trash-2 1.png" onclick="deleteentry(${filter[i].ID})"></div>
    `
    t6.className="degreeflex"
    tr.append(t1,t2,t3,t4,t5,t6)
    table.append(tr)
    }
}