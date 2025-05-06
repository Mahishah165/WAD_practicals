const express = require('express');
const app=express();

app.use(express.static(__dirname));
app.use(express.json());

let tasks=[];

app.get('/tasks', (req,res)=>{
    res.json(tasks);
});

app.post('/add', (req, res)=>{
    const task = req.body.task;
    tasks.push(task);
    console.log(tasks);
    res.sendStatus(200);
});

app.put('/update', (req, res)=>{
    const task = req.body.task;
    const index = req.body.index;
    tasks[index] = task;
    res.sendStatus(200);
});

app.delete('/delete', (req, res)=>{
    const index = req.body.index;
    //delete from index 1 element
    tasks.splice(index,1);
    res.sendStatus(200);
});

app.listen(3000, ()=>{
    console.log('Server listening to http://localhost:3000');
})