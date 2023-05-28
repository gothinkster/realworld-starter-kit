import app from "./app";

require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}`));