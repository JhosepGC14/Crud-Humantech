import React, { useState } from "react";
import EditUserForm from "../components/EditUserForm";
import userApi from "../api/userApi";

//material UI components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import DeleteIcon from "@material-ui/icons/Delete";

//STYLES WITH MATERIAL UI ( WIDTHSTYLES AND MAKESTYLES)
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

//COMPONENTE
const MovieTable = (props) => {
  const classes = useStyles();
  //state
  const [modaEditIsOpen, setModaEditIsOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  //handleModalSchedule
  const modalHandleEdit = (item) => {
    setDataToEdit(item);
    setModaEditIsOpen(true);
  };

  const modalHandleEditClose = () => {
    setModaEditIsOpen(false);
  };

  //METHOD PATCH para cambiar el estado de pelicula
  const changeStateMovie = async (id, state) => {
    try {
      let body;
      if (state === "1") {
        body = {
          state: "0",
        };
      } else if (state === "0") {
        body = {
          state: "1",
        };
      }
      console.log("lo que se envia en Pacth: ", body);
      await userApi.users.patchMovies(id, body);
      props.getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modaEditIsOpen && (
        <EditUserForm
          isModalOpen={modaEditIsOpen}
          handleCloseModal={modalHandleEditClose}
          data={dataToEdit}
          getData={props.getData}
        />
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">
                Fecha de Publicación
              </StyledTableCell>
              <StyledTableCell align="center">Estado</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.movies.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.datetime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.state === "1" ? "Activo" : "Inactivo"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => modalHandleEdit(item)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin}>
                      <MenuIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => changeStateMovie(item.id, item.state)}
                    >
                      {item.state === "1" ? (
                        <LockIcon fontSize="small" />
                      ) : (
                        <LockOpenIcon fontSize="small" />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => {
                        props.deleteUser(item.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MovieTable;
