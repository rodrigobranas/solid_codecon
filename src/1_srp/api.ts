import express from "express";
import calculatePayroll from "./calculatePayroll";
const app = express();
app.use(express.json());

app.post("/calculate_payroll", async function (req, res) {
	const input = req.body;
	const output = await calculatePayroll(input);
	res.json(output);
});

app.listen(3000);