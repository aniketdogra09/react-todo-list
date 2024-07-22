import { createContext,useContext } from "react";

//we want the task list app to create a context with below properties to share among components
//we create a context TodoContext using createContext() which takes an {object of values} - the properties - as parameter and export it
//in order to use it we create a function useTodoContext() and export it.
//every context comes with a context-provider, we create and export a variable TodoContextProvider which can we used to wrap our App component in.


export const TodoContext = createContext({

    //tasks is an array of task-ojects with properties - id, task-name, isCompleted

    tasks:[{
        id: 1,
        todo: "task 1",
        isCompleted: false,
    }
    ],
    addTask: (task)=>{},
    updateTask: (id,todo)=>{},
    deleteTask: (id)=>{},
    taskCompletedToggle: (id)=>{}
});

//a better practice would be to :
//a. use variable name as 'taskList' instead of 'tasks' in createContext,
//b. use variable name as 'taskName' instead of 'todo' in the tasks array


export const useTodoContext=()=>{
    return useContext(TodoContext);
}

export const TodoContextProvider=TodoContext.Provider;