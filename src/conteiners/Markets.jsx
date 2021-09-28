import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { visuallyHidden } from "@mui/utils";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { getCookie, setCookie } from "../service/cookie";
import FetchMarkets from "../service/FetchMarkets";
import Market from "./Market";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function createData(code, name, price, change, max, min) {
  return {
    code,
    name,
    price,
    change,
    max,
    min,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "favorite",
    numeric: false,
    disablePadding: true,
    label: "❤",
  },
  {
    id: "market",
    numeric: false,
    disablePadding: false,
    label: "مارکت",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "قیمت",
  },
  {
    id: "change",
    numeric: true,
    disablePadding: false,
    label: "٪ تغییر",
  },
  {
    id: "max",
    numeric: true,
    disablePadding: false,
    label: "بیشترین",
  },
  {
    id: "min",
    numeric: true,
    disablePadding: false,
    label: "کمترین",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value);
  };

  return (
    <Toolbar
      sx={{
        pl: { md: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 50%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        مارکت‌ها
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          name="controlled-radio-buttons-group"
          value={props.filter}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="Toman" control={<Radio />} label="تومان" />
          <FormControlLabel value="Tether" control={<Radio />} label="تتر" />
          <FormControlLabel
            value="favorite"
            control={<Radio />}
            label="دلخواه"
          />
        </RadioGroup>
      </FormControl>
    </Toolbar>
  );
};

export default function Markets() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("markets");
  const [selected, setSelected] = React.useState(JSON.parse(getCookie("fav")));
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filter, setFilter] = React.useState("Toman");
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let match = useRouteMatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await FetchMarkets();
      let newRows = [];
      for (let i of result.data.results) {
        if (filter == "favorite") {
          if (selected.includes(i.title_fa))
            newRows.push(
              createData(
                i.code,
                i.title_fa,
                i.price,
                i.price_info.change,
                i.price_info.max,
                i.price_info.min
              )
            );
        } else if (i.currency2.title == filter) {
          if (selected.includes(i.title_fa))
            newRows.push(
              createData(
                i.code,
                i.title_fa,
                i.price,
                i.price_info.change,
                i.price_info.max,
                i.price_info.min
              )
            );
        }
      }
      for (let i of result.data.results) {
        if (!selected.includes(i.title_fa) && i.currency2.title == filter) {
          newRows.push(
            createData(
              i.code,
              i.title_fa,
              i.price,
              i.price_info.change,
              i.price_info.max,
              i.price_info.min
            )
          );
        }
      }
      setRows(newRows);
    };
    fetchData();
  }, [filter]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFav = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setCookie("fav", JSON.stringify(newSelected), 9999999999);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Switch>
        <Route path={`${match.path}:marketId`}>
          <Market/>
        </Route>
        <Route exact path={`${match.path}`}>
          <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar filter={filter} setFilter={setFilter} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          align="center"
                          onClick={(event) => handleFav(event, row.name)}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          
                        >
                          <a href={`${row.code}`} > {row.name} </a>
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{`%${row.change}`}</TableCell>
                        <TableCell align="center">{row.max}</TableCell>
                        <TableCell align="center">{row.min}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        </Route>
      </Switch>
    </Box>
  );
}
