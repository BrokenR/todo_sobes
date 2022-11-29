import React, { ChangeEvent } from "react";
import { Task } from "../../App";
import dayjs from "dayjs";

export interface TodoProps {
  item: Task;
  completed: boolean;
  id?: number;
  complete(id: number, completed: boolean): void;
  editTask(id: number, title: string, data: string, date: string): void;
  deleteTask(id: number): void;
}
export const Todo: React.FC<TodoProps> = ({
  item,
  id,
  complete,
  completed,
  editTask,
  deleteTask,
}) => {
  const [title, setTitle] = React.useState<string>(item.title);
  const [text, setText] = React.useState<string>(item.data);
  const [date, setDate] = React.useState<string>(item.date);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(false);

  const completeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    id && complete(id, e.target.checked);
  };

  if (date && dayjs() >= dayjs(date)) {
    

    return (
      <>
        {visible && (
          <div
            style={{
              width: "25rem",
              margin: "0",
              position: "absolute",
              top: "100%",
              left: "100%",
              backgroundColor: "white",
              zIndex: "1",
              border: "2px solid black",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "15px",
            }}
          >
            <svg
              onClick={() => setVisible(false)}
              style={{
                position: "absolute",
                left: "93%",
                marginRight: "10px",
                cursor: "pointer",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="black"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h1 style={{ margin: "0" }}>
              Название:
              {title}
            </h1>
            <h2>Описание:{text}</h2>
            <h2>До завершения:{date}</h2>
          </div>
        )}
        <li key={`${item}+${id}`} style={{ background: "grey" }}>
          <span onClick={() => setVisible(true)}>{item.title}</span>
          <svg
            onClick={() => id && deleteTask(id)}
            style={{ marginRight: "10px", cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red "
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" stroke="red"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </li>
      </>
    );
  }

  return (
    <React.Fragment>
      {visible &&
        (!edit ? (
          <div
            style={{
              width: "25rem",
              margin: "0",
              position: "absolute",
              top: "100%",
              left: "100%",
              backgroundColor: "white",
              zIndex: "1",
              border: "2px solid black",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "15px",
            }}
          >
            <svg
              onClick={() => setVisible(false)}
              style={{
                position: "absolute",
                left: "93%",
                marginRight: "10px",
                cursor: "pointer",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="black"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h1 style={{ margin: "0" }}>
              Название:
              {title}
            </h1>
            <h2>Описание:{text}</h2>
            <h2>До завершения:{date}</h2>
          </div>
        ) : (
          <div
            style={{
              width: "25rem",
              margin: "0",
              position: "absolute",
              top: "100%",
              left: "100%",
              backgroundColor: "white",
              zIndex: "1",
              border: "2px solid black",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "15px",
            }}
          >
            <svg
              onClick={() => {
                setVisible(false);
                setEdit(false);
              }}
              style={{
                position: "absolute",
                left: "93%",
                marginRight: "10px",
                cursor: "pointer",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="black"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h1 style={{ margin: "0" }}>
              Название:
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                type="text"
                value={title}
              />
            </h1>
            <h2>
              Описание:
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                value={text}
              />
            </h2>
            <h2>
              До завершения:
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                type="datetime-local"
                value={date}
              />
            </h2>
          </div>
        ))}
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
        {!completed ? (
          <span onClick={() => setVisible(true)}>{item.title}</span>
        ) : (
          <span style={{ textDecoration: "line-through" }}>{item.title}</span>
        )}

        {edit ? (
          <svg
            onClick={() => id && editTask(id, title, text, date)}
            style={{ cursor: "pointer", marginRight: "10px" }}
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
        ) : (
          <svg
            onClick={() => {
              setEdit(true);
              setVisible(true);
            }}
            style={{ marginRight: "5px", cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="feather feather-edit-2"
          >
            <path
              d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}

        <svg
          onClick={() => id && deleteTask(id)}
          style={{ marginRight: "10px", cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" stroke="black"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </li>
    </React.Fragment>
  );
};
