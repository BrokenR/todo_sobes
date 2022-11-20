import React, { ChangeEvent } from "react";
import { Task } from "../../App";
export interface TodoProps {
  item: Task;
  completed: boolean;
  id: number;
  complete(id: number, completed: boolean): void;
}
export const Todo: React.FC<TodoProps> = ({
  item,
  id,
  complete,
  completed,
}) => {
  const completeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    complete(id, e.target.checked);
  };
  return (
    <li key={`${item}+${id}`}>
      <div className="checkbox">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => completeHandler(e)}
          type="checkbox"
          id={`${id}`}
          checked={completed}
        />
        <label htmlFor={`${id}`}>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </div>
      <span>{item.data}</span>
    </li>
  );
};
