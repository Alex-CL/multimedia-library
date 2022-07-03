import { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { MultimediaCard } from "./MultimediaCard";
import { Modal } from "./Modal";
import { api } from "../api/api";
import { AddItem } from "./AddItem";
import { Searcher } from "./Searcher";
import { PaginationComponent } from "./PaginationComponent";

export const Panel = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState({
    filter: {
      textSearch: "",
      type: 0,
    },
    pager: {
      limit: 12,
      page: 0,
    },
  });
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const result = api.getAll(query);
    setItems(result.items);
    setCount(result.count);
  }, [query]);

  const selectItem = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const close = () => {
    setOpen(false);
    setSelectedItem("");
  };

  const save = () => setQuery({ ...query });

  const createItem = () => {
    setSelectedItem("");
    setOpen(true);
  };

  const title = {
    display: "flex",
    justifyContent: "space-between",
  };

  const paper = {
    marginTop: "15px",
  };

  const noResults = {
    textAlign: "center",
    fontSize: "1.5rem",
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography sx={title} variant="h3" gutterBottom>
          Multimedia Library
          <AddItem onClick={createItem} />
        </Typography>
        <Paper>
          <Searcher handleQuery={(q) => setQuery({ ...query, ...q })} />
        </Paper>
        <Paper sx={paper}>
          <PaginationComponent
            count={count}
            handleQuery={(q) => setQuery({ ...query, ...q })}
          />
        </Paper>
        <Paper sx={paper}>
          {items.map((i) => (
            <MultimediaCard key={i.id} item={i} selectItem={selectItem} />
          ))}
        </Paper>
        {items.length === 0 && (
          <p style={noResults}>
            No results. <br />
            Please, try to remove or change some filters.
          </p>
        )}
        <Modal id={selectedItem} open={open} close={close} save={save} />
      </Container>
    </>
  );
};
