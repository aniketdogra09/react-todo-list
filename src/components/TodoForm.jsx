import React from 'react'
import { useState } from 'react';
import { useTodoContext } from '../contexts';

function TodoForm() {
    
const [task,setTask]=useState("");

const {addTask}=useTodoContext();

//this add function is for when user clicks on the Add button
//it uses the functionality of the addTask() function defined in App.jsx
const add=(e)=>{
    e.preventDefault();
    //if the task is empty and user clicks 'Add' button, nothing should happen
    if(!task) return

    //otherwise,
    addTask({todo: task,isCompleted: false});
    setTask(""); //to clear the value of the input field after the task is added 
}



    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={task}
                onChange={(e)=>setTask(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

