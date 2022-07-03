import axios from "axios";
const domain = "http://localhost:3000";
let token = localStorage.getItem("x-access-token");

let Api = {};

function request(params) {
  return new Promise(async (resolve, reject) => {
    let apiPromise = axios(params);
    let res = await apiPromise.catch(res => ({ 
        ...res.response, 
        error: res.message
    }));

    if (res && (res.status >= 200 && res.status < 300)) {
      return resolve(res);
    } else if (res && res.status === 401) {
      let refreshToken = localStorage.getItem("x-refresh-token");

      if (token && refreshToken) {
        let refresh = await axios({
          method: "post",
          url: domain + "/auth/refresh",
          data: {
            accessToken: token,
            refreshToken: refreshToken
          },
        }).catch(res => ({ 
            ...res.response, 
            error: res.message
        }));
  
        if (refresh && refresh.status === 200) {
          token = refresh.data.accessToken;
          localStorage.setItem("x-access-token", token);
          params.headers["x-access-token"] = token;
          return resolve(axios(params));
        } else {
          return reject(refresh);
        }

      } else {
        return reject(res);
      }
    }
     
  })
}

Api.User = {
    register: function (params) {
        return request({
            method: 'post',
            url: domain + '/users',
            data: params,
        });
    },

    login: function (params) {
        return request ({
            method: 'post',
            url: domain + '/auth',
            data: params,
        })
    },

  refreshToken: function (params) {
    return request({
      method: "post",
      url: domain + "/auth/refresh",
      data: params,
    });
  },
};

Api.Quiz = {
  getList: function () {
    return request({
      method: "get",
      url: domain + "/quiz",
      headers: { "x-access-token": token },
    });
  },

  get: function (id) {
    return request({
      method: "get",
      url: domain + "/quiz/" + id,
      headers: { "x-access-token": token },
    });
  },

  getByUser: function (id) {
    return request({
      method: "get",
      url: domain + "/quiz/user/" + id,
      headers: { "x-access-token": token },
    });
  },

  add: function (params) {
    return request({
      method: "post",
      url: domain + "/quiz",
      headers: { "x-access-token": token },
      data: params,
    });
  },

  delete: function (id) {
    return request({
      method: "delete",
      url: domain + "/quiz/" + id,
      headers: { "x-access-token": token },
    });
  },

  update: function (id, params) {
    return request({
      method: "patch",
      url: domain + "/quiz/" + id,
      headers: { "x-access-token": token },
      data: params,
    });
  },
};

Api.Question = {
  getList: function () {
    return request({
      method: "get",
      url: domain + "/question",
      headers: { "x-access-token": token },
    });
  },

  get: function (id) {
    return request({
      method: "get",
      url: domain + "/question/" + id,
      headers: { "x-access-token": token },
    });
  },

  getByQuiz: function (id) {
    return request({
      method: "get",
      url: domain + "/question/quiz/" + id,
      headers: { "x-access-token": token },
    });
  },

  getByUser: function (id) {
    return request({
      method: "get",
      url: domain + "/question/user/" + id,
      headers: { "x-access-token": token },
    });
  },

  add: function (params) {
    return request({
      method: "post",
      url: domain + "/question",
      headers: { "x-access-token": token },
      data: params,
    });
  },

  delete: function (id) {
    return request({
      method: "delete",
      url: domain + "/question/" + id,
      headers: { "x-access-token": token },
    });
  },

  update: function (id, params) {
    return request({
      method: "patch",
      url: domain + "/question/" + id,
      headers: { "x-access-token": token },
      data: params,
    });
  },
};

export default Api;
