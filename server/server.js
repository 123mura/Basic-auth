const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const users = []; // In-memory user storage

const SECRET_KEY = "your_secret_key";

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true }).json({ email });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.sendStatus(401);
  }
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true }).json({ email: user.email });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token").sendStatus(200);
});

app.get("/api/auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const { email } = jwt.verify(token, SECRET_KEY);
    res.json({ email });
  } catch {
    res.sendStatus(401);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
