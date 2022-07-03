import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  TablePagination,
} from "@mui/material";

const rowsOptions = [12, 24, 36, 48];

export const PaginationComponent = (props) => {
  const [limit, setLimit] = useState(rowsOptions[0]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.handleQuery({ pager: { page, limit } });
  }, [limit, page]);

  const handleChangePage = (value) => setPage(value);

  const handleChangeRowsPerPage = (e) => setLimit(+e.target.value);

  const pagination = {
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <TablePagination
      labelRowsPerPage={"Items per page"}
      rowsPerPageOptions={rowsOptions}
      colSpan={3}
      count={props.count}
      rowsPerPage={limit}
      page={page}
      SelectProps={{
        inputProps: {
          "aria-label": "items per page",
        },
      }}
      onPageChange={(_, v) => handleChangePage(v)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={pagination}
    />
  );
};
