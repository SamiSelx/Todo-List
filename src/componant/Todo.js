import { useContext, useState } from "react";
import { TodosContexts } from "../contexts/TodosContexts";

// Mui Library
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ id, title, content, checked }) {
  const { todos, setTodos } = useContext(TodosContexts);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [update, setUpdate] = useState({
    title: title,
    content: content,
    isChecked: checked,
  });

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  function handleClickOpenUpdate() {
    setOpenUpdate(true);
  }

  const handleClose = () => {
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  function handleUpdate(update) {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        let t = {
          ...todo,
          title: update.title,
          content: update.content,
          isChecked: update.isChecked,
        };
        return t;
      } else return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  function handleDelete() {
    let newTodos = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  function handleCheck() {
    let newTodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <>
      <div
        style={{
          textAlign: "start",
          textDecoration: checked ? "line-through" : "none",
        }}
      >
        <h3>{title}</h3>
        <p>{content}</p>
      </div>

      <Stack direction="row">
        <IconButton sx={{ color: "green" }} onClick={handleCheck}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={handleClickOpenUpdate}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={handleClickOpenDelete}>
          <DeleteIcon sx={{ color: "#F02752" }} />
        </IconButton>
      </Stack>
      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are u Sure u wanna Delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            make sure u wanna delete this todo, and will delete it forEver.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* =========Delete Dialog =======*/}
      {/* Edit Dialog */}
      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogTitle>Update Your Status</DialogTitle>
        <DialogContent>
          <DialogContentText>Form Fields Below</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Todo Title"
            type="text"
            fullWidth
            variant="standard"
            value={update.title}
            onChange={(e) => {
              setUpdate({ ...update, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="content"
            label="Todo Content"
            type="text"
            fullWidth
            variant="standard"
            value={update.content}
            onChange={(e) => {
              setUpdate({ ...update, content: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleUpdate(update);
              handleClose();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
