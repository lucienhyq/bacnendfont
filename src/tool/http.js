module.exports = {
  get(url, params, message) {
    let webToken = localStorage.getItem("refereesToken");
    if (!url) {
      console.log("输入url为空");
      return;
    }
    if (process.env.NODE_ENV === "development") {
      url = '/api/' + url
    } else {
      url = '/' + url
    }
    url = url + '?min=pc';
    console.log(url)
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach((key) =>
        paramsArray.push(key + "=" + params[key])
      );
      url += "&" + paramsArray.join("&");
    }
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + webToken
    };
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "GET",
        headers: headers,
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            reject({ status: response.status });
          }
        })
        .then(response => {
          if (response.msg == "请登录" && response.result == 0) {
            // this.$router.push("login")
            console.log('dddddddddddddlogin', `${window.location.href}login`)
            window.location.href = `${window.location.href}login`;
          }
          return response
        })
        .then(response => {
          console.log(response)
          resolve(response);
        })
        .catch(err => {
          console.log(err, "网络请求，无响应！");
          //   reject({ status: "网络请求，无响应" });
        });
    });
  },
  post(url, formData, message, flag, pc_type) {
    if (!url) {
      console.log("输入url为空");
      return;
    }
    let webToken = localStorage.getItem("refereesToken");
    if (process.env.NODE_ENV === "development") {
      url = '/api/' + url
    } else {
      url = '/' + url
    }
    url = url + '?min=pc';
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + webToken
    };
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            reject({ status: response.status });
          }
        })
        .then(response => {
          if ((response.msg == "请登录" || response.msg == "未登录") && response.result == 0) {
            window.location.href = `${window.location.protocol}/#/login`;
          }
          return response
        })
        .then(response => {
          resolve(response);
        })
    })
  }
};
