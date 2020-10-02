import React, { useState, useEffect } from "react";
import "../../index.css";
import ShiftTable from "./ShiftTable";
import userApi from "../../api/userApi";
import Layout from "../ui/Layout";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Shift = () => {
  //state
  let { id } = useParams();
  console.log("id enviado por url: ", id);
  const [shift, setShift] = useState([]);

  const getDataUser = async (id) => {
    try {
      let response = await userApi.users.getShiftByMovie();
      console.log("respuesta del server", response);
      setShift(response.filter((turno) => turno.id === id));
    } catch (error) {
      console.log(error);
    }
  };

  //GET
  useEffect(() => {
    getDataUser(id);
  }, [id]);

  //enviar a la pagina de registrar
  let router = useHistory();
  const registerShift = (id) => {
    router.push(`/registrar/${id}`);
  };

  return (
    <>
      <Layout>
        <div className="container">
          <h1>CRUD React - HumanTech</h1>
          <div className="flex-row">
            <div>
              <div className="content_title">
                <h2>Listado De Turnos</h2>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => registerShift(id)}
                >
                  Nuevo Turno
                </Button>
              </div>
              {shift && (
                <ShiftTable
                  shiftData={shift}
                  // deleteUser={deleteUser}
                  getData={getDataUser}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shift;
