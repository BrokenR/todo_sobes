import React from 'react';
import './Bottom.scss'
import {Task} from "../../App";

interface BottomProps{
    list: Task[]
    filterActive:Function
    filterCompleted: Function
    showAll:Function
    clearAll:Function
}
export const Bottom:React.FC<BottomProps> =({list, filterActive, filterCompleted, showAll, clearAll}):React.ReactElement=> {
    const [active, setActive] = React.useState<Number>(1)
    const bottomHandlerAll = ()=>{
        showAll()
        setActive(1)
    }
    const bottomHandlerActive = ()=>{
        filterActive()
        setActive(2)
    }
    const bottomHandlerCompleted = ()=>{
        filterCompleted()
        setActive(3)
    }
    const bottomHandlerClear = (e:React.MouseEvent<HTMLButtonElement>)=>{
        clearAll(e)
        setActive(1)
    }
    return (
            <div className='bottom'>
                <div className='bottom_counter'><span>{list.length} items left</span></div>
                <div className='bottom_selector'>
                    <button className={active===1?'active':''} onClick={bottomHandlerAll}>All</button>
                    <button className={active===2?'active':''} onClick={bottomHandlerActive}>Active</button>
                    <button className={active===3?'active':''} onClick={bottomHandlerCompleted}>Completed</button>
            </div>
            <div className='bottom_clear'>
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>bottomHandlerClear(e)}>Clear All</button>
            </div>
        </div>
    );
}

