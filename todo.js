const inpbox= document.getElementById("inp1");

const listbox= document.getElementById("listcont");


function addtask(){

    if(inpbox.value===''){
        alert("write sth");
    }
    else{

        let li =document.createElement("li");
        li.innerHTML=inpbox.value;
        listbox.appendChild(li);

        let span =document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);

    }

    inpbox.value='';

    savedData();
    


}


listbox.addEventListener('click', function(e){

    if(e.target.tagName=== "LI"){

        e.target.classList.toggle("check");
        savedData();

    }

    else if(e.target.tagName==="SPAN")
    {
    
    e.target.parentElement.remove();
    savedData();

}





} ,false);


function savedData(){
    localStorage.setItem("data",listbox.innerHTML);




}


function showtasks(){

    listbox.innerHTML=localStorage.getItem("data");
}

showtasks();