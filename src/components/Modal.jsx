import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getDefaultImage } from "../utils/icons";
import { MultimediaType } from "../enums/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoIcon from "@mui/icons-material/Photo";
import { api } from "../api/api";
import { SelectComponent } from "./SelectComponent";
import { v4 as uuidv4 } from "uuid";

const createNewItem = () => ({
  id: uuidv4(),
  title: "",
  type: MultimediaType.Ebook,
  createdAt: new Date(),
  imageUrl: "",
});

export function Modal(props) {
  const [open, setOpen] = useState(props.open);
  const [item, setItem] = useState(createNewItem());
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    if (props.id) {
      setItem(api.getByID(props.id));
      return;
    }
    setItem(createNewItem());
  }, [props.id]);

  const keys = () => Object.keys(item).filter((k) => "id" !== k);

  const capitalize = (k) => k.charAt(0).toUpperCase() + k.slice(1);

  const handleChange = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

  const handleDelete = () => {
    api.delete(item.id);
    setIsDeleteClicked(false);
    handleClose();
    props.save();
  };

  const handleClose = (reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setItem(createNewItem());
    props.close();
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (props.id) {
      api.update(item);
    } else {
      api.create({ ...item, createdAt: new Date() });
    }

    handleClose();
    props.save();
  };

  const validate = () => {
    if (!item.title) {
      return false;
    }

    return true;
  };

  const dialog = {
    width: "600px",
    margin: "auto",
  };

  const input = {
    width: "70%",
  };

  const image = {
    maxWidth: "200px",
    maxHeight: "200px",
    display: "block",
    margin: "auto",
  };

  const label = {
    fontWeight: "bold",
    height: "20px",
    marginBottom: "0",
  };

  const deleteLabel = {
    color: "#9c27b0",
    fontWeight: "bold",
  };

  const renderValue = (key) => {
    const value = item[key];

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (key === "type") {
      return (
        <SelectComponent
          key="types"
          type={MultimediaType}
          value={item[key]}
          onChange={(v) => setItem({ ...item, [key]: v })}
          initialLabel="Types"
          iconFunc={getDefaultImage}
        />
      );
    }

    if (key === "imageUrl") {
      if (value) {
        return (
          <Button
            key={"remove" + key}
            color="secondary"
            onClick={() => setItem({ ...item, imageUrl: "" })}
            endIcon={<DeleteIcon />}
            variant="outlined"
          >
            Remove image
          </Button>
        );
      }

      return (
        <label key={key}>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id={item.id + key}
            name={key}
            onChange={(e) => {
              setItem({
                ...item,
                imageUrl: URL.createObjectURL(e.target.files[0]),
              });
            }}
            type="file"
          />
          <Button
            key={"add" + key}
            variant="outlined"
            component="span"
            endIcon={<PhotoIcon />}
          >
            Upload
          </Button>
        </label>
      );
    }

    return (
      <TextField
        key={key}
        id={key}
        name={key}
        value={value}
        type={"text"}
        variant="standard"
        onChange={handleChange}
        required={true}
        error={!value}
        sx={input}
      />
    );
  };

  return (
    <Dialog
      sx={dialog}
      open={open}
      disableEscapeKeyDown={true}
      onClose={(_, r) => handleClose(r)}
    >
      <DialogTitle sx={{ overflow: "hidden" }}>{item.title}</DialogTitle>
      <Box
        sx={{ width: "500px" }}
        display="flex"
        justify-content="space-between"
      >
        <Box sx={{ width: "50%", margin: "auto" }} display="block">
          <img
            src={item.image || item.imageUrl || getDefaultImage(item.type)}
            loading="lazy"
            alt={""}
            style={image}
          />
        </Box>
        <Box sx={{ width: "50%", overflowX: "hidden" }}>
          <DialogContent>
            <DialogContentText>
              {keys().map((k) => (
                <Box>
                  <p style={label}>{capitalize(k)}</p>
                  {renderValue(k)}
                </Box>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isDeleteClicked ? (
              <>
                <p style={deleteLabel}>Are you sure you want to delete?</p>
                <Button
                  color="secondary"
                  onClick={() => setIsDeleteClicked(false)}
                >
                  No
                </Button>
                <Button onClick={handleDelete}>Yes</Button>
              </>
            ) : (
              <>
                <Button
                  color="secondary"
                  onClick={() => setIsDeleteClicked(true)}
                >
                  Delete
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </>
            )}
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
}
