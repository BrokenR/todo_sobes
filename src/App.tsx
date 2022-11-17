import React from "react";
import './style.scss'
import {Header, TodoList, Bottom} from './components/index'
import axios from "axios";


export interface Task{
    data: string,
    completed: boolean,
    id?: number
}

function App(){
    const [list, setList] = React.useState<Task[]>([])
    React.useEffect(()=>{
        axios.get('http://localhost:3001/tasks/').then(({data})=>{
            setList(data)
        })
        console.log('nene')
    },[])
    const onCompleteTask = (id:number, completed:boolean)=>{
        const newList:Task[] =  list.map(item=>{
            console.log('id:',id, 'item:',item, item)
            if(item.id===id+1){
                item.completed=completed
            } return item
        })
        setList(newList)
        axios.patch(`http://localhost:3001/tasks/${id+1}`, {completed })
    }
    const filterActive = ()=>{
        axios.get('http://localhost:3001/tasks?completed=false').then(({data})=>{
            setList(data)
        })
    }
    const filterCompleted = ()=>{
        axios.get('http://localhost:3001/tasks?completed=true').then(({data})=>{
            setList(data)
        })

    }
    const filterAll = () =>{
        axios.get('http://localhost:3001/tasks/').then(({data})=>{
            setList(data)
        })
    }
    const  onClearAll  = (e:React.MouseEvent<HTMLElement>) =>{
        e.stopPropagation()
        list.map(item=>{
            axios.delete('http://localhost:3001/tasks/'+item.id)
        })
        setList([])
}

    const onAddTask = (data:Task, e:React.FormEvent<HTMLElement>)=>{
        e.stopPropagation()
        setList([...list, data])
        axios.post('http://localhost:3001/tasks/', {data:data.data, completed: data.completed}).then(res=>console.log(res.status))
    }
    return(
        <div className='container'>
            <div className='main'>
                <Header addTask={(data, completed, e)=>onAddTask({data, completed}, e)}/>
                <TodoList list={list} completeTask ={(id:number, completed:boolean)=>onCompleteTask(id, completed)}/>
                <Bottom list={list} filterActive={filterActive} filterCompleted={filterCompleted} showAll={filterAll} clearAll={onClearAll}/>
            </div>

        </div>
    )
}
export default App
