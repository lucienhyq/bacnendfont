module.exports = {
  get(url, params, message) {
    if (!url) {
      console.log("输入url为空");
      return;
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
      // Authorization: "Basic " + base64_encode(uid + ":" + webToken)
    };
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "GET",
        headers: headers,
        credentials: "include"
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
    url = url + '?min=pc';
    let headers = {
      "Content-Type": "application/json",
      // Authorization: "Basic " + base64_encode(uid + ":" + webToken)
    };
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then(response =>{
          if (response.ok) {
            return response.json();
          } else {
            reject({ status: response.status });
          }
        })
        .then(response => {
          console.log(response,'postMethods')
        })
    })
  }
};
