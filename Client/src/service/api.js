import axios from "axios";
const domain = "http://localhost:3000";
const token = localStorage.getItem("x-access-token");

let Api = {};

// function request(params) {
//   return new Promise(async (resolve, reject) => {
//     let apiPromise = axios(params);
//     let resError = await apiPromise.catch();
//     const refreshToken = localStorage.getItem("x-refresh-token");
//     if (res.status === 401 && token && refreshToken) {
//       let refresh = await axios({
//         method: "post",
//         url: domain + "/auth/refresh",
//         data: {
//           accessToken: token,
//           refreshToken: refreshToken
//         },
//       });

//       if (refresh) {
//         localStorage.setItem("x-refresh-token", refresh.data.refreshToken);
//         return resolve(refresh(params));
//       } else {
//         return reject(refresh.catch(e => e));
//       }
//     }
     
//   })
// }

Api.User = {
    register: function (params) {
        return axios({
            method: 'post',
            url: domain + '/users',
            data: params,
        });
    },

    login: function (params) {
        return axios ({
            method: 'post',
            url: domain + '/auth',
            data: params,
        })
    },

  refreshToken: function (params) {
    return axios({
      method: "post",
      url: domain + "/auth/refresh",
      data: params,
    });
  },
};

Api.Quiz = {
  getList: function () {
    return axios({
      method: "get",
      url: domain + "/quiz",
      headers: { "x-access-token": token },
    });
  },

  get: function (id) {
    return axios({
      method: "get",
      url: domain + "/quiz/" + id,
      headers: { "x-access-token": token },
    });
  },

  getByUser: function (id) {
    return axios({
      method: "get",
      url: domain + "/quiz/user/" + id,
      headers: { "x-access-token": token },
    });
  },

  add: function (params) {
    return axios({
      method: "post",
      url: domain + "/quiz",
      headers: { "x-access-token": token },
      data: params,
    });
  },

  delete: function (id) {
    return axios({
      method: "delete",
      url: domain + "/quiz/" + id,
      headers: { "x-access-token": token },
    });
  },

  update: function (id, params) {
    return axios({
      method: "patch",
      url: domain + "/quiz/" + id,
      headers: { "x-access-token": token },
      data: params,
    });
  },
};

Api.Question = {
  getList: function () {
    return axios({
      method: "get",
      url: domain + "/question",
      headers: { "x-access-token": token },
    });
  },

  get: function (id) {
    return axios({
      method: "get",
      url: domain + "/question/" + id,
      headers: { "x-access-token": token },
    });
  },

  getByQuiz: function (id) {
    return axios({
      method: "get",
      url: domain + "/question/quiz/" + id,
      headers: { "x-access-token": token },
    });
  },

  getByUser: function (id) {
    return axios({
      method: "get",
      url: domain + "/question/user/" + id,
      headers: { "x-access-token": token },
    });
  },

  add: function (params) {
    return axios({
      method: "post",
      url: domain + "/question",
      headers: { "x-access-token": token },
      data: params,
    });
  },

  delete: function (id) {
    return axios({
      method: "delete",
      url: domain + "/question/" + id,
      headers: { "x-access-token": token },
    });
  },

  update: function (id, params) {
    return axios({
      method: "patch",
      url: domain + "/question/" + id,
      headers: { "x-access-token": token },
      data: params,
    });
  },
};

export default Api;
