/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { fetchData, createDessertnut, deleteNutritions } from './actions';

import reducer from './reducer';
import saga from './saga';

import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';

import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Modal,
  Grid,
  TextField,
  Tooltip
} from '@material-ui/core';


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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  modalPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  createButton: {
    position: 'relative',
    top: '50px',
    left: '85%',
    zIndex: '1'
  },
  errorTitle : {
    color: 'red',
    padding: '10px'
  }
}));

function rand() {
  return Math.round(Math.random() * 10) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const key = 'home';

const HomePage = (props) => {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.fetchData();
  }, []);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(props.load_data);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [desertName, setDesertName] = React.useState('');
  const [calorie, setCalorie] = React.useState(null);
  const [protein, setProtein] = React.useState(null);
  const [fat, setFat] = React.useState(null);
  const [carboHydrate, setCarboHydrate] = React.useState(null);
  const [validationKey, setValidationKey] = React.useState(false);



  useEffect(() => {
    setRows(props.load_data);
  }, [props.load_data]);

  useEffect(() => {
    if (Object.keys(props.success_data).length !== 0) {
      props.fetchData();
    }
  }, [props.success_data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.dessertName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {

    const selectedIndex = selected.indexOf(name);
    const selectedIndexId = selectedId.indexOf(id);
    let newSelected = [];
    let newSelectedId = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedId = newSelectedId.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedId = newSelectedId.concat(selectedId.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedId = newSelectedId.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedId = newSelectedId.concat(
        selectedId.slice(0, selectedIndexId),
        selectedId.slice(selectedIndexId + 1),
      );
    }
    setSelectedId(newSelectedId)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateBeforeSubmit()) {
      let payLoad = {
        dessertName: desertName,
        calories: calorie,
        fat: fat,
        carb: carboHydrate,
        protein: protein,
      }
      props.createDessertnut(payLoad);
      setOpen(false);
    } else {
      setValidationKey(true);
    }

  };

  const handleChange = (e) => {
    if (e.target.name === 'desertName') {
      setDesertName(e.target.value);
    } else if (e.target.name === 'calorie') {
      setCalorie(e.target.value)
    } else if (e.target.name === 'fat') {
      setFat(e.target.value)
    } else if (e.target.name === 'carboHydrate') {
      setCarboHydrate(e.target.value)
    } else if (e.target.name === 'protein') {
      setProtein(e.target.value)
    }
  }

  const deleteSelectedNutrition = () => {
    let payLoad = {
      id: selectedId
    }
    props.deleteNutritions(payLoad);
    setTimeout(() => {
      window.location.reload(true);
    }, 1000)
  }

  const validateBeforeSubmit = () => {
    if (desertName == '') {
      return false
    } else if (!calorie) {
      return false
    } else if (!fat) {
      return false
    } else if (!carboHydrate) {
      return false
    } else if (!protein) {
      return false
    }
    return true
  }
  
  const formContainer = (
    <div style={modalStyle} className={classes.modalPaper}>

      <form>
        <Paper style={{ padding: 16 }}>
          {validationKey && <div className={classes.errorTitle}>
                    Please fill the required fields*</div>}
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Dessert Name"
                InputLabelProps={{
                  shrink: true,
                }}
                name="desertName"
                value={desertName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-number"
                label="Calories"
                type="number"
                name="calorie"
                value={calorie}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-number"
                label="Fat"
                type="number"
                name="fat"
                value={fat}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-number"
                label="Carbo Hydrates"
                type="number"
                name="carboHydrate"
                value={carboHydrate}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-number"
                label="Protein"
                type="number"
                name="protein"
                value={protein}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}

              >
                Submit
            </Button>
            </Grid>
          </Grid>
        </Paper>
        {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
      </form>
    </div>
  );

  return (
    <div className={classes.root}>
      <Button type="button" variant="contained" color="primary" className={classes.createButton} onClick={handleOpen}>
        Create
      </Button>
      <Paper className={classes.paper}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {formContainer}
        </Modal>
        <EnhancedTableToolbar numSelected={selected} parentCallback={deleteSelectedNutrition} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.dessertName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.dessertName, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.dessertName}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.dessertName}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carb}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    loading: state.home && state.home.loading === true ? true : false,
    load_data: state.home && state.home.loadData ? state.home.loadData : [],
    success_data: state.home && state.home.successData ? state.home.successData : {}
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchData,
  createDessertnut,
  deleteNutritions
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
