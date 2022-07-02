import { MultimediaType } from "../enums/types";
import filmIcon from "../icons/film-icon.svg";
import tvIcon from "../icons/tv-icon.svg";
import bookIcon from "../icons/book-icon.svg";
import videogameIcon from "../icons/videogame-icon.svg";

export const getDefaultImage = (type) => {
  switch (type) {
    case MultimediaType.Film: {
      return filmIcon;
    }
    case MultimediaType.Series: {
      return tvIcon;
    }
    case MultimediaType.Videogame: {
      return videogameIcon;
    }
    default:
      return bookIcon;
  }
};
