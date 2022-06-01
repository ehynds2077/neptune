import { app } from "./app";
import { testDb } from "./services/db";

testDb();
const port = 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
