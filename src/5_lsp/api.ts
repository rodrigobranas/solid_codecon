import express from "express";
import calculatePayroll from "./calculatePayroll";
import { EmployeeDataDatabase } from "./employeeData";
import CalculatePayroll from "./calculatePayroll";
import GetEmployee from "./getEmployee";
const app = express();
app.use(express.json());

app.post("/calculate_payroll", async function (req, res) {
	const input = req.body;
	const employeeData = new EmployeeDataDatabase();
	const calculatePayroll = new CalculatePayroll(employeeData);
	const output = await calculatePayroll.execute(input);
	res.json(output);
});

app.get("/employees/:employeeId", async function (req, res) {
	const employeeData = new EmployeeDataDatabase();
	const getEmployee = new GetEmployee(employeeData);
	const output = await getEmployee.execute(req.params.employeeId);
	res.json(output);
});

app.listen(3000);