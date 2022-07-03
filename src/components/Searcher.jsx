import { useState, useEffect } from "react";
import { Button, Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SortTypes } from "../enums/sorts";
import { MultimediaType } from "../enums/types";
import ClearIcon from "@mui/icons-material/Clear";
import { SelectComponent } from "./SelectComponent";

export const Searcher = (props) => {
  const [query, setQuery] = useState({
    filter: { textSearch: "" },
    sort: {},
  });

  useEffect(() => {
    props.handleQuery(query);
  }, [query]);

  const handleSearchTextChange = (e) => {
    const { ...newQuery } = query;
    newQuery.filter = { ...newQuery.filter, textSearch: e.target.value };
    setQuery({ ...newQuery });
  };

  const handleSortChange = (value) => {
    const { sort, ...newQuery } = query;
    switch (value) {
      case SortTypes.AlphabeticalA2Z: {
        newQuery.sort = { sortA2Z: true };
        break;
      }
      case SortTypes.AlphabeticalZ2A: {
        newQuery.sort = { sortZ2A: true };
        break;
      }
      default:
        newQuery.sort = { sortDate: true };
        break;
    }
    setQuery({ ...newQuery });
  };

  const handleTypeChange = (value) => {
    const { ...newQuery } = query;
    newQuery.filter = { ...newQuery.filter, type: +value };
    setQuery({ ...newQuery });
  };

  const handleDateChange = (value) => {
    const { ...newQuery } = query;
    newQuery.filter = { ...newQuery.filter, date: value };
    setQuery({ ...newQuery });
  };

  const clearFilters = () =>
    setQuery({
      filter: { ...query.filter, type: 0, date: undefined },
      sort: {},
    });

  const filterPanel = {
    height: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const filterButtonsContainer = {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const button = {
    height: "30px",
    margin: "auto 0",
  };

  const dateStyle = {
    width: "50px",
    height: "10px",
  };

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <TextField
            autoFocus
            fullWidth
            value={query.filter.textSearch}
            placeholder={"Search..."}
            onChange={handleSearchTextChange}
          />
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "10px" }}>
        <Box sx={filterPanel}>
          <Box sx={{ width: "10%" }}>
            <p sx={{ paddingRight: "10px" }}>Filters:</p>
          </Box>
          <Box sx={filterButtonsContainer}>
            <SelectComponent
              key="filters"
              type={SortTypes}
              onChange={handleSortChange}
              initialLabel="Sorts"
              clear={!Object.keys(query.sort).length}
            />

            <SelectComponent
              key="types"
              type={MultimediaType}
              onChange={handleTypeChange}
              initialLabel="Types"
              clear={!query.filter.type}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                disableFuture
                label="By creation date"
                value={query.filter.date}
                onChange={(newValue) => {
                  handleDateChange(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input ref={inputRef} {...inputProps} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
            <Button
              variant="standard"
              color="primary"
              endIcon={<ClearIcon />}
              sx={button}
              onClick={clearFilters}
            >
              Remove filters
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
