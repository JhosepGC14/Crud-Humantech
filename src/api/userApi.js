
const URL = "http://localhost:4000";

async function callApi(endpoint, options = {}, token) {
  try {
    options.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: "Bearer " + token,
      };
    }

    let response = await fetch(URL + endpoint, options);
    if (response.ok) {
      return await response.json();
    } else {
      // Convert JSON response to Custom Error
      var error = await response.json();
      console.log(error);
    }
  } catch (ex) {
    console.log(ex)
  }
}

// function getQuery(filters) {
//   let query = "";
//   if (filters) {
//     let esc = encodeURIComponent;
//     query = Object.keys(filters)
//       .map(k => esc(k) + "=" + esc(filters[k] == null ? "" : filters[k]))
//       .join("&");
//   }

//   return query;
// }

const userApi = {
  users: {
    //get movies
    async getMovies(token, filters) {
      let response = await callApi("/movies");
      return response;
    },
    //get turnos
    async getShiftByMovie() {
      let response = await callApi(`/turnos`);
      return response;
    },
    //post
    async postMovies(user) {
      let response = await callApi("/movies", {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response;
    },
    //post turnos
    async postShift(user) {
      let response = await callApi("/turnos", {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response;
    },

    //put Movie
    async putUsers(user) {
      let response = await callApi(`/movies/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      });
      return response;
    },

    //put Shift
    async putShiftMovie(user) {
      let response = await callApi(`/movies/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      });
      return response;
    },

    //patch
    async patchMovies(id, body) {
      let response = await callApi(`/movies/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      return response;
    },

    //delete
    async deleteUsers(id) {
      let response = await callApi(`/movies/${id}`, {
        method: 'DELETE'
      });
      return response;
    },
  }
};

export default userApi;
