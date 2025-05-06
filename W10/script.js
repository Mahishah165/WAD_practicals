document.addEventListener('DOMContentLoaded', ()=>{
    loadtasks();

    document.getElementById('add-button').onclick=()=>{
        const task = document.getElementById('task-input').value.trim();
        if(task){
            const xhr = new XMLHttpRequest();
            //post route /api true->asynchronous is true
            xhr.open('POST', '/add', true);
            xhr.onload = function () {
                if(xhr.status==200){
                    loadtasks();
                    document.getElementById('task-input').value = "";
                }
            };
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8'); 
            xhr.send(JSON.stringify({task}));
        }
    };
});

function loadtasks(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/tasks', true);
    xhr.onload = function (){
        if(xhr.status===200){
            console.log("Response Text:", xhr.responseText);
            const tasks = JSON.parse(xhr.responseText);
            const tasklist = document.getElementById('task-list');
            tasklist.innerHTML='';

            tasks.forEach((task, index) => {
                const listitem = document.createElement('li');

                const spanitem = document.createElement('span');
                spanitem.textContent = task;
                spanitem.id=`task-${index}`

                const editbtn = document.createElement('button');
                editbtn.textContent='Edit';
                editbtn.onclick = ()=>{
                    //create input element
                    const inputele = document.createElement('input');
                    inputele.type = 'text';
                    inputele.value = task;
                    inputele.id=`edit-${index}`;

                    //create save btn
                    const savebtn = document.createElement('button');
                    savebtn.textContent='Save';
                    savebtn.onclick = ()=> {
                        const updatedtask = inputele.value.trim();
                        if(updatedtask) updatetask(index, updatedtask);
                    }

                    //create cancel button
                    const cancelbtn = document.createElement('button');
                    cancelbtn.textContent='Cancel';
                    cancelbtn.onclick=()=>loadtasks();

                    //append items
                    listitem.innerHTML='';
                    listitem.appendChild(inputele);
                    listitem.appendChild(savebtn);
                    listitem.appendChild(cancelbtn);
                }

                const deletebtn = document.createElement('button');
                deletebtn.textContent='Delete';
                deletebtn.onclick=()=>deleteTask(index);

                listitem.appendChild(spanitem);
                listitem.appendChild(editbtn);
                listitem.appendChild(deletebtn);
                tasklist.appendChild(listitem);
            });
        }
    }
    xhr.send();
}

function updatetask(index, updatedtask){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/update', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload=()=>{
        if(xhr.status===200){
            loadtasks();
        }
    }
    xhr.send(JSON.stringify({index, task: updatedtask}));
}

function deleteTask(index){
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/delete', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload=()=>{
        if(xhr.status===200){
            loadtasks();
        }
    }
    xhr.send(JSON.stringify({index}));
}