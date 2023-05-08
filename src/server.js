const app = require("./app");
const config = require("./configs");

// Express server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
