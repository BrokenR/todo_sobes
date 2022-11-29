import React from "react";
import { FileAdd } from "../FileAdd";
import "./Header.scss";
interface HeaderProps {
  addTask(
    title: string,
    data: string,
    completed: boolean,
    endDate: string,
    files?: any
  ): void;
}
export const Header: React.FC<HeaderProps> = ({ addTask }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [data, setData] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");

  const onSubmitTask = (file: any) => {
    console.log(file);
    if (data && date && title !== "") {
      addTask(title, data, false, date, file);
      setTitle("");
      setData("");
      setDate("");
      setVisible(false);
     }
  };
  const onCancelSubmissionTask = () => {
    setTitle("");
    setData("");
    setDate("");
    setVisible(false);
  };

  return (
    <div className="Header">
      <h3>todos</h3>
      {visible ? (
        <div style={{ display: "flex" }}>
          <form>
            <input
              placeholder="Название"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
              type="text"
            />
            <textarea
              style={{
                width: "100%",
                minHeight: "35px",
              }}
              placeholder="Описание"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setData(e.target.value)
              }
              value={data}
            />
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
              type="datetime-local"
            />
            <FileAdd addFile={(e: any) => onSubmitTask(e)} />
          </form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <svg
              onClick={(e) => onSubmitTask(e)}
              style={{ marginBottom: "15px", cursor: "pointer" }}
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <svg
              onClick={() => onCancelSubmissionTask()}
              style={{ cursor: "pointer" }}
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
          </div>
        </div>
      ) : (
        <button onClick={() => setVisible(true)}>Добавить задачу</button>
      )}
    </div>
  );
};
