import Header from "./components/Header";
import TasksList from "./views/TasksList";
import {useState} from "react";
import {BrowserRouter,Route} from "react-router-dom";

function App() {

    const [tasks, setTasks] = useState([])

    function handleClick(type, data) {
        // eslint-disable-next-line default-case
        switch (type) {
            case 'ADD':
                if (data){
                const tempObject = {
                    id: Date.now(),
                    name: data,
                    status: false
                }
                setTasks([tempObject, ...tasks])
                }
                break
            case 'CHANGE_STATUS':
                const taskId = tasks.findIndex(({id}) => data.id === id)
                const tempArr = tasks
                tempArr[taskId].status = !tempArr[taskId].status
                setTasks([...tempArr])
                break
            case 'EDIT':
                const editTaskId = tasks.findIndex(({id}) => data.id === id)
                const editTempArr = tasks
                editTempArr[editTaskId].name = data.name
                setTasks([...editTempArr])
                break
            case 'DELETE':
                const deletedTaskId = tasks.findIndex(({id}) => data === id)
                const deletedTempArr = tasks
                deletedTempArr.splice(deletedTaskId,1)
                setTasks([...deletedTempArr])
                break
        }
    }

    return (
        <div className="App container pt-5">
            <BrowserRouter>
            <Header onClick={handleClick}/>
            <Route exact path={'/'}>
                <TasksList length={tasks.filter(({status})=>!status).length} tasks={tasks} onClick={handleClick}/>
            </Route>
            <Route path={'/completed-tasks'}>
                <TasksList length={tasks.filter(({status})=>!status).length} tasks={tasks.filter(({status})=>status)} onClick={handleClick}/>
            </Route>
            <Route  path={'/incomplete-tasks'}>
                <TasksList length={tasks.filter(({status})=>!status).length} tasks={tasks.filter(({status})=>!status)} onClick={handleClick}/>
            </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
