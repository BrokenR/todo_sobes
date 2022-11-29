//Не понял как добавить файл...
import React from "react";
import "./style.scss";
import { Header, TodoList, Bottom } from "./components/index";
import axios from "axios";

export interface Task {
  title: string;
  data: string;
  completed: boolean;
  date: string;
  id?: number;
  files?: any
}

function App() {
  const [list, setList] = React.useState<Task[]>([]);
  React.useEffect(() => {
    axios.get("http://localhost:3001/tasks/").then(({ data }) => {
      setList(data);
    });

    list.map((item, id) => (item.id = id));
    console.log(list);
  }, []);
  const onCompleteTask = (id: number, completed: boolean) => {
    const newList: Task[] = list.map((item) => {
      if (item.id === id) {
        item.completed = completed;
      }
      return item;
    });
    setList(newList);
    axios.patch(`http://localhost:3001/tasks/${id}`, { completed });
  };
  const filterActive = () => {
    axios
      .get("http://localhost:3001/tasks?completed=false")
      .then(({ data }) => {
        setList(data);
      });
  };
  const filterCompleted = () => {
    axios.get("http://localhost:3001/tasks?completed=true").then(({ data }) => {
      setList(data);
    });
  };
  const filterAll = () => {
    axios.get("http://localhost:3001/tasks/").then(({ data }) => {
      setList(data);
    });
  };
  const onClearAll = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    list.map((item) => {
      axios.delete("http://localhost:3001/tasks/" + item.id);
    });
    setList([]);
  };

  const onAddTask = (data: Task): void => {
    if (data.files) {
      const formData = new FormData();
      formData.append("file", data.files[0]);
      const file = formData.get('file')
      }
      

    axios.post<Task>("http://localhost:3001/tasks/", {
      title: data.title,
      data: data.data,
      completed: data.completed,
      date: data.date,
      file:data.files? new FormData(data.files[0]):null,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setList([...list, data]);
  };
  const onEditTask = (
    id: number,
    title: string,
    data: string,
    date: string
  ) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.title = title;
        item.data = data;
        item.date = date;
        axios.patch("http://localhost:3001/tasks/" + item.id, {
          title,
          data,
          date,
        });
        return item;
      }
      return item;
    });
    setList(newList);
  };
  const onRemoveTask = (id: number) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    axios.delete("http://localhost:3001/tasks/" + id);
  };
  return (
    <div className="container">
      <div className="main">
        <Header
          addTask={(title, data, completed, date, files) =>
            onAddTask({ title, data, completed, date, files })
          }
        />
        <TodoList
          list={list}
          onEditTask={(id: number, title: string, data: string, date: string) =>
            onEditTask(id, title, data, date)
          }
          completeTask={(id: number, completed: boolean) =>
            onCompleteTask(id, completed)
          }
          deleteTask={(id: number) => onRemoveTask(id)}
        />
        <Bottom
          list={list}
          filterActive={filterActive}
          filterCompleted={filterCompleted}
          showAll={filterAll}
          clearAll={onClearAll}
        />
      </div>
    </div>
  );
}
export default App;
