import axios from "axios";

export default {
  // Post login
  login: function (login) {
    console.log(login);
    var result = axios.post("/api/users/login", login);
    console.log("Token: ");
    console.log(result);
    return result;
  },
  join: function (user) {
    console.log(user);
    var result = axios.post("/api/users", user);
    console.log(result);
    return result;
  },
  technology: function (technology) {
    console.log(technology);
    var result = axios.post("/api/technology", technology);
    console.log(result);
    return result;
  },
  scrape: function () {
    console.log("in API client scrape");

    var result = axios.get("/api/scrape");

    console.log("API" + result);

    return result;
  }
};