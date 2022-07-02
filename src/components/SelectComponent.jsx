import { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";

export const SelectComponent = (props) => {
  const [filterSelected, setFilterSelected] = useState(props.value || "");

  useEffect(() => {
    if (props.clear) {
      setFilterSelected("");
    }
  }, [props.clear]);

  const handleChange = (e) => {
    setFilterSelected(e.target.value);
    props.onChange(e.target.value);
  };

  const select = {
    height: "20px",
    width: "180px",
    margin: "auto 0",
    textAlign: "center",
  };

  if (!props.type) {
    return <></>;
  }

  return (
    <Select
      key={props.key}
      id={props.key}
      name={props.key}
      value={filterSelected || props.initialLabel}
      onChange={handleChange}
      sx={props.styles || select}
      variant="standard"
    >
      {props.initialLabel && (
        <MenuItem
          key={props.initialLabel}
          value={props.initialLabel}
          disabled={true}
        >
          {props.initialLabel}
        </MenuItem>
      )}
      {Object.keys(props.type).map((k) => (
        <MenuItem key={props.type[k]} value={props.type[k]}>
          {props.iconFunc && (
            <img
              key={props.type[k]}
              src={props.iconFunc(props.type[k])}
              loading="lazy"
              alt={""}
              width="20px"
              height="20px"
              style={{ marginRight: "5px" }}
            />
          )}
          {k}
        </MenuItem>
      ))}
    </Select>
  );
};
