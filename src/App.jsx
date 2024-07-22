import { useState } from "react"
import { TodoContextProvider } from "./contexts"
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";



function App() {


  const [tasks,setTasks]=useState([]); //an array of task-objects

  const addTask=(task)=>{

    //here, the task in the parameter in an object with properties - id,todo and isCompleted
    //if we call setTask(task) directly, it removes all the last values (if present)
    //to avoid the above situation, we rather add the task as :

    setTasks((previousTasks)=>[{id: Date.now(), ...task}, ...previousTasks]);
  }

  const updateTask=(id,task)=>{

    //here, id is used to refer the task to update and replace it with the task in the parameter
    //setTasks can take a callback function with an array of task-objects
    //map() is used to loop through the entire 'previousTasks' and apply the callback on each 'previousTask'
    //previousTask.id===id?task:previousTask - overrides the 'previousTask' with 'task' if id matches 'previousTask.id'

    setTasks((previousTasks)=>previousTasks.map((previousTask)=>(previousTask.id===id?task:previousTask)));
  }

  const deleteTask=(id)=>{

    //here, id is used to refer the task to be deleted
    //filter() is used to filter out the elements 'previousTask' from 'prevoiusTasks' based on the condition previousTask)=>previousTask.id!==id
    //it keeps all the elements except the one with 'id' in a new array

    setTasks((previousTasks)=>previousTasks.filter((previousTask)=>previousTask.id!==id));
  }

  const taskCompletedToggle=(id)=>{

    //here, if the id of the checked 'previousTask' matches the 'id',
    //we update the 'isCompleted' key of 'previousTask' by !() its boolean value,
    //otherwise keep the 'previousTask' as it is.

    setTasks((previousTasks)=>previousTasks.map((previousTask)=>(previousTask.id===id?{...previousTask,isCompleted:!previousTask.isCompleted}:previousTask)));
  }

  useEffect(()=>{

    //localStorage.getItem(<key-name>) - used to get the data from the browser's server that stores it.
    //the data returned by getItem() is by-default in string format, so to convert to JSON format, we use JSON.parse()
    //when the page loads, in order to display the tasks from the storage to the page,
    //we add them in our task-list via setTasks(tasks) if they are not empty

    const tasks=JSON.parse(localStorage.getItem("tasks")); //an array of 'tasks'- ojects
    if(tasks && tasks.length){
      setTasks(tasks);
    }
  },[])

  useEffect(()=>{

    //the key-name in localStorage.setItem(<key>,<value>) must match the that in .getItem()
    //here, the 'tasks' in the key-name can be named anything by the developer
    //but the 'tasks' in the stringify() function is that declared via states above - basically the task-list we are using

    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])

  //a better practice would be to use variable names (for clarity) as :-
  //'newTask' in addTask() function instead of simply 'task',
  //'replaceWithTask' in place of simply 'task' in updateTask() function
  //'tasksInTheList' in place of 'previousTasks' (an array of task-objects) - used for map() or filter()
  //'selectedTask' in place of 'previousTask' - used in the callbacks of map() and filter()
  //'idtoDelete' in place of simply 'id' in deleteTask() function
  //'idOfCheckedTask' in place of simply 'id' in taskCompletedToggle() function
  //'tasksInLocalStorage' in place of simply 'tasks' in localStorage() functions' keys
  //'tasksToLoad' in place of simply 'tasks' in the useEffect()


  return (
    <TodoContextProvider value={{tasks,addTask,updateTask,deleteTask,taskCompletedToggle}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm /> 
            </div>
            <div className="flex flex-wrap gap-y-3">
              {tasks.map((task)=>(
                <div key={task.id} className="w-full">
                  <TodoItem task={task}/>
                </div>
              ))}
            </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
