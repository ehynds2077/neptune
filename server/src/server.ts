import { app } from "./app";
import db from "./services/db";

// testDb();
const port = 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
