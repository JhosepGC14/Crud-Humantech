import React, { useState, useEffect } from "react";
import "../../index.css";
import MovieTable from "../MovieTable/MovieTable";
import AddMovieModal from "../MovieTable/AddMovieModal";
import userApi from "../../api/userApi";
import Layout from "../../components/ui/Layout";
import Button from "@material-ui/core/Button";

function Movie() {
  //state
  const [movies, setMovies] = useState([]);
  const [modaIsOpenRegister, setModaIsOpenRegister] = useState(false);

  const getDataUser = async () => {
    try {
      const response = await userApi.users.getMovies();
      console.log("respuesta del server", response);
      setMovies(response);
    } catch (error) {
      console.log(error);
    }
  };

  //GET
  useEffect(() => {
    getDataUser();
  }, []);

  //DELETE
  //eliminar usuario
  const deleteUser = async (id) => {
    try {
      console.log("id del usaurio a eliminar", id);
      setMovies(movies.filter((movie) => movie.id !== id));
      await userApi.users.deleteUsers(id);
    } catch (error) {
      console.log(error);
    }
  };

  //handleModalSchedule
  const modalHandleRegister = () => {
    setModaIsOpenRegister(true);
  };

  const modalHandleRegisterClose = () => {
    setModaIsOpenRegister(false);
  };

  return (
    <>
      {modaIsOpenRegister && (
        <AddMovieModal
          isModalOpen={modaIsOpenRegister}
          handleCloseModal={modalHandleRegisterClose}
          getData={getDataUser}
        />
      )}
      <Layout>
        <div className="container">
          <h1>CRUD React - HumanTech</h1>
          <div className="flex-row">
            <div>
              <div className="content_title">
                <h2>Listado Películas</h2>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => modalHandleRegister()}
                >
                  Nueva Película
                </Button>
              </div>
              <MovieTable
                movies={movies}
                deleteUser={deleteUser}
                getData={getDataUser}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Movie;
