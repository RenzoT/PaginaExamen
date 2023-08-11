// Import server.js functions and start server

import { listen } from "./server.js";

const port = 5500;

listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
