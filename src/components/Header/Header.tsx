import React, { FormEvent } from "react";
import "./Header.scss";
interface HeaderProps {
  addTask(
    data: string,
    completed: boolean,
    e: React.FormEvent<HTMLElement>
  ): void;
}
export const Header: React.FC<HeaderProps> = ({ addTask }) => {
  const [data, setData] = React.useState<string>("");
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };
  const onSubmitTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data !== "") {
      addTask(data, false, e);
      setData("");
      e.stopPropagation();
    }
  };
  return (
    <div className="Header">
      <h3>todos</h3>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmitTask(e)}>
        <input onChange={onChangeInput} value={data} type="text" />
      </form>
    </div>
  );
};
