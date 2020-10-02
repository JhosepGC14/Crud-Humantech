import React, { useState, useEffect } from "react";
import Layout from "../ui/Layout";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Helper from "../../utils/Helper";
import userApi from "../../api/userApi";

const AddShifForm = () => {
  let { id } = useParams();

  //state initial
  let router = useHistory();
  const [time, setTime] = useState(new Date());
  const [beforeData, setBeforeData] = useState(null);
  const [dataSend, setDataSend] = useState({
    id: null,
    idMovie: id,
    hora: "",
    status: "",
  });
  const { status } = dataSend;

  // const getDataUser = async (id) => {
  //   try {
  //     let response = await userApi.users.getShiftByMovie();
  //     console.log("respuesta del server", response);
  //     setBeforeData(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // //GET
  // useEffect(() => {
  //   getDataUser(id);
  // }, [id]);

  //handle Change
  const handleDateChange = (e) => {
    setTime(e);
    setDataSend({
      hora: e,
    });
  };

  const handleChange = (e) => {
    setDataSend({
      ...dataSend,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterShift = async (id) => {
    try {
      dataSend.idMovie = id;
      dataSend.hora = Helper.getDatetimeFormat(dataSend.hora);
      dataSend.id = uuidv4();
      console.log("Datos enviados en Post de turnos :", dataSend);
      await userApi.users.postShift(dataSend);
      router.push(`/turnos/${dataSend.idMovie}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1>CRUD React - HumanTech</h1>
        <div className="flex-row">
          <div>
            <h2>Agregar Turnos</h2>
            <Grid container direction="column" alignContent="flex-start">
              <Grid container item xs={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Hora: "
                    value={time}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    fullWidth={true}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid container item xs={3}>
                <RadioGroup
                  aria-label="Estado"
                  name="status"
                  value={status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Activo"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Inactivo"
                  />
                </RadioGroup>
              </Grid>
              <Grid container item xs={7}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRegisterShift(id)}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddShifForm;
