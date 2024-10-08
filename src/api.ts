import express from "express";
import { signup } from "./signup";
import { getAccount } from "./getAccount";

const app = express();
app.use(express.json()) 

app.post("/signup", async function (req, res) {
    const output = await signup(req.body);
    res.json(output);
});

app.get("/getAccount/:accountId", async function (req, res) {
    const output = await getAccount(req.params.accountId);
    res.json(output);
});

app.listen(3001);
