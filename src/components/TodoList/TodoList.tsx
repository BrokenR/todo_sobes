import React from "react";
import "./TodoList.scss";
import { Task } from "../../App";
import { Todo } from "./Todo";
interface ListProps {
  list: Task[];
  completeTask(id: number, completed: boolean): void;
  onEditTask(id: number, title: string, data: string, date: string): void;
  deleteTask(id: number): void;
}

export const TodoList: React.FC<ListProps> = ({
  list,
  completeTask,
  onEditTask,
  deleteTask,
}): React.ReactElement => {
  return (
    <div className="todoList">
      <ul>
        {list &&
          list.map((item) => {
            return (
              <Todo
                editTask={(
                  id: number,
                  title: string,
                  data: string,
                  date: string
                ) => onEditTask(id, title, data, date)}
                complete={(id: number, completed: boolean) =>
                  completeTask(id, completed)
                }
                deleteTask={(id: number) => deleteTask(id)}
                key={`${item}+${item.id}`}
                item={item}
                id={item.id}
                completed={item.completed}
              />
            );
          })}
      </ul>
    </div>
  );
};
