const app = require("./dist").default;

module.exports = app;

// app.start();

if (require.main === module) {
  // Run the application
  const config = {};
  app.start();
}
