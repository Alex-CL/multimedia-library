import { useState, useEffect } from "react";
import {
  Card,
  ImageListItem,
  ImageListItemBar,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getDefaultImage } from "../utils/icons";
import { api } from "../api/api";

export function MultimediaCard(props) {
  const card = {
    display: "inline-flex",
    width: "248px",
    height: "248px",
    overflow: "hidden",
    margin: "15px",
  };

  const listItem = {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  };

  const listItemBar = {
    cursor: "auto",
    height: "54px",
  };

  const icon = {
    cursor: "pointer",
    height: "30px",
    paddingRight: "5px",
    color: "rgba(255, 255, 255, 0.54)",
    borderRadius: "20px",
    ":hover": {
      paddingLeft: "5px",
      background: "#b39abc",
    },
  };

  if (!props.item) {
    return <></>;
  }

  return (
    <Card variant="" sx={card}>
      <ImageListItem key={props.item.id + props.item.imageURL} sx={listItem}>
        <img
          src={props.item.imageUrl || getDefaultImage(props.item.type)}
          loading="lazy"
          alt={""}
        />
        <CardActionArea
          sx={{ flexGrow: "1", flexDirection: "column", alignItems: "stretch" }}
        >
          <ImageListItemBar
            sx={listItemBar}
            title={props.item.title}
            actionIcon={
              <EditIcon
                sx={icon}
                aria-label={`Edit ${props.item.title}`}
                onClick={() => props.selectItem(props.item.id)}
              />
            }
          />
        </CardActionArea>
      </ImageListItem>
    </Card>
  );
}
