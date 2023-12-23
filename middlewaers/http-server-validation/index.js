const express = require('express')

const app = express()

app.use(express.json());

const todos = [{
    id:"1",
    title:"study dsa",
    "description":"I have to study dsa"
}]

function validationOfId(req,res,next){
    const {id}=req.params;
    if(!id) return res.status(400).json({msg:"invalid id"})
    const todo = todos.find(todo=>todo.id===id);
   if(!todo) return res.status(404).json({msg:"todo not found"})
   req.todo=todo;
    next()
}


app.get("/:id",validationOfId,(req,res)=>{
    const todo=req.todo;
    res.status(200).json({todo})
})

app.use((req,res)=>{
    res.status(500).json({msg:"Internal server error"})
})


app.listen(3000,()=>console.log("started at port 3000"))