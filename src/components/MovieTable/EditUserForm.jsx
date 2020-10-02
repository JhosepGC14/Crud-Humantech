import React, { useState } from "react";
import userApi from "../../api/userApi";
import Helper from "../../utils/Helper";

//material ui components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    maxWidth: 440,
    width: "100%",
    minWidth: 350,
    minHeight: 313,
    padding: "20px 28px 0px 29px",
  },

  modalBody: {
    width: "100%",
    marginBottom: 20,
  },
}));

//principal component

const EditMovieModal = ({ isModalOpen, handleCloseModal, getData, data }) => {
  const classes = useStyles();
  console.log("data en EditMovieModal: ", data.datetime);
  //state inicial
  const [date, setDate] = useState(new Date(`${data.datetime}T21:11:54`));
  console.log("date : ", date);

  const [movies, setMovies] = useState({
    id: data.id,
    name: data.name,
    datetime: "",
    state: data.state,
  });

  //handleChange
  const { name, state } = movies;
  const handleMovieChange = (e) => {
    setMovies({
      ...movies,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateTimeChange = (e) => {
    setDate(e);
  };

  //metodo PUT
  const updateUser = async (movies) => {
    try {
      console.log("Movies en UpdateUser: ", movies);
      console.log("Date en UpdateUser: ", date);
      movies.datetime = Helper.getDateFormat(date);
      console.log("lo que se envia al PUT:", movies);
      await userApi.users.putUsers(movies);
      getData();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        maxWidth="xs"
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={isModalOpen}
        classes={{
          paperWidthXs: classes.modalStyle,
        }}
      >
        <Grid container justify="center">
          <Grid item xs={12}>
            <h2 style={{ textAlign: "center" }}>Agregar Nueva Película</h2>
          </Grid>
          <Grid item xs={7} className={classes.modalBody}>
            <TextField
              id="outlined-basic"
              label="Nombre de Película"
              name="name"
              value={name}
              onChange={handleMovieChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={7} className={classes.modalBody}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline"
                label="Fecha de Publicación"
                value={date}
                onChange={handleDateTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                fullWidth={true}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={7} className={classes.modalBody}>
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-label">
                Seleccione el Estado
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="state"
                value={state}
                onChange={handleMovieChange}
              >
                <MenuItem value="">Seleccione El Estado</MenuItem>
                <MenuItem value="1">Activo</MenuItem>
                <MenuItem value="0">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={7}
            className={classes.modalBody}
            justify="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateUser(movies)}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default EditMovieModal;
