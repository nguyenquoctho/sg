const path = require("path");
module.exports = [
  {
    path: "/",
    component: path.resolve(`src/components/homeView/index.js`)
  },
  {
    path: "/slug",
    component: path.resolve(`src/components/detailView/index.js`)
  }
];
