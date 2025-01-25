const { RESTDataSource } = require("apollo-datasource-rest");

process.env.NODE_ENV = "development";

class SwapiDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api";
  }
}

module.exports = SwapiDataSource;
