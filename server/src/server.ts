import { app } from "./app";
import db from "./services/db";

// testDb();
const port = 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
