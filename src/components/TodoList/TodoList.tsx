import React from 'react';
import './TodoList.scss'
import {Task} from "../../App";
import {Todo} from "./Todo";
interface Props{
    list: Task[],
    completeTask(id:number, completed: boolean):void
}

export const TodoList:React.FC<Props> =({list, completeTask}):React.ReactElement=> {


    return (
        <div className='todoList'>
            <ul>
                {list.map((item, index)=>{
                    return (<Todo complete={(id:number, completed:boolean)=>completeTask(id, completed)} key={`${item}+${index}`} item={item} id={index} completed={item.completed}/>)})
                }
            </ul>
        </div>
    );
}

