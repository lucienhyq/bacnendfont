module.exports = {
  get(url, params, message) {
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
      // Authorization: "Basic " + base64_encode(uid + ":" + webToken)
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
          console.log(response)
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          console.log(err, "网络请求，无响应！");
          //   reject({ status: "网络请求，无响应" });
        });
    });
  },
};
