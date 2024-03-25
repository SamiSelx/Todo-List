import { useEffect, useState, useContext, useMemo } from "react";
import { TodosContexts } from "../contexts/TodosContexts";
import Todo from "./Todo";

// ID
import { v4 as uuidv4 } from "uuid";
// Mui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function TodoList() {
  const {todos,setTodos} = useContext(TodosContexts)
  const [titleField, setTitleField] = useState("");
  const [typeList, setTypeList] = useState("all");
  const [todosList, setTodosList] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("todos")) {
      setTodos(JSON.parse(window.localStorage.getItem("todos")));
    }
  }, []);

  useMemo(() => {
    console.log("render memo");
    if (typeList === "all") {
      let todosList = todos.map((todo) => {
        return (
          <div key={todo.id} className="task">
            <Todo
              id={todo.id}
              title={todo.title}
              content={todo.content}
              checked={todo.isChecked}
            />
          </div>
        );
      });
      setTodosList(todosList);
      return;
    }
    if (typeList === "done") {
      let todosListChecked = todos.map((todo) => {
        if (todo.isChecked) {
          return (
            <div key={todo.id} className="task">
              <Todo
                id={todo.id}
                title={todo.title}
                content={todo.content}
                checked={todo.isChecked}
              />
            </div>
          );
        }
      });
      setTodosList(todosListChecked);
    }
    if (typeList === "progress") {
      let todosListProgress = todos.map((todo) => {
        if (!todo.isChecked) {
          return (
            <div key={todo.id} className="task">
              <Todo
                id={todo.id}
                title={todo.title}
                content={todo.content}
                checked={todo.isChecked}
              />
            </div>
          );
        }
      });
      setTodosList(todosListProgress);
    }
  }, [todos, typeList]);

  // let todosList = todos.map((todo) => {
  //   return (
  //     <div key={todo.id} className="task">
  //       <Todo
  //         handleDelete={handleDelete}
  //         handleUpdate={handleUpdate}
  //         id={todo.id}
  //         title={todo.title}
  //         content={todo.content}
  //         checked={todo.isChecked}
  //       />
  //     </div>
  //   );
  // });

  // let todosListChecked = todos.map((todo) => {
  //   if (todo.isChecked) {
  //     return (
  //       <div key={todo.id} className="task">
  //         <Todo
  //           handleDelete={handleDelete}
  //           handleUpdate={handleUpdate}
  //           id={todo.id}
  //           title={todo.title}
  //           content={todo.content}
  //           checked={todo.isChecked}
  //         />
  //       </div>
  //     );
  //   }
  // });

  // let todosListProgress = todos.map((todo) => {
  //   if (!todo.isChecked) {
  //     return (
  //       <div key={todo.id} className="task">
  //         <Todo
  //           handleDelete={handleDelete}
  //           handleUpdate={handleUpdate}
  //           id={todo.id}
  //           title={todo.title}
  //           content={todo.content}
  //           checked={todo.isChecked}
  //         />
  //       </div>
  //     );
  //   }
  // });

  function handleAddClick() {
    let todosAdded = [
      ...todos,
      { id: uuidv4(), title: titleField, content: "", isChecked: false },
    ];
    setTodos(todosAdded);
    localStorage.setItem("todos", JSON.stringify(todosAdded));
    setTitleField("");
  }
 
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ background: "white", borderRadius: "5px", padding: "20px" }}
      >
        <Box sx={{ width: "400px", textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            My Tasks
          </Typography>
          <div className="btns" style={{ margin: "10px 0" }}>
            <Button
              variant={typeList === "all" ? "outlined" : "text"}
              sx={{
                color: typeList === "all" ? "#F02752" : "",
                fontWeight: "bold",
              }}
              onClick={() => {
                setTypeList("all");
              }}
            >
              All
            </Button>
            <Button
              sx={{ color: typeList === "done" ? "#F02752" : "" }}
              variant={typeList === "done" ? "outlined" : "text"}
              onClick={() => {
                setTypeList("done");
              }}
            >
              Done
            </Button>
            <Button
              sx={{ color: typeList === "progress" ? "#F02752" : "" }}
              variant={typeList === "progress" ? "outlined" : "text"}
              onClick={() => {
                setTypeList("progress");
              }}
            >
              In Progress
            </Button>
          </div>
          <div className="tasks">
            {todosList}
          </div>
        </Box>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginTop: "20px" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            sx={{ flex: "1" }}
            id="filled-basic"
            label="Enter The Task"
            variant="standard"
            color="label"
            value={titleField}
            onChange={(e) => {
              setTitleField(e.target.value);
            }}
          />
          <Button
            disabled={titleField === "" ? true : false}
            onClick={handleAddClick}
            variant="contained"
          >
            Add TASK
          </Button>
        </Stack>
      </Container>
    </>
  );
}
