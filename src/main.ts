import express from "express";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

app.post("/calculate_payroll", async function (req, res) {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	const [employee] = await connection.query("select * from branas.employee where employee_id = $1", [req.body.employeeId]);
	const timeRecords = await connection.query("select * from branas.time_record where employee_id = $1 and extract(month from checkin_date) = $2 and extract(year from checkin_date) = $3", [req.body.employeeId, req.body.month, req.body.year]);
	let hours = 0;
	for (const record of timeRecords) {
		hours += (record.checkout_date.getTime() - record.checkin_date.getTime())/(1000*60*60);
	}
	let salary = 0;
	if (employee.type === "hourly") {
		salary = parseFloat(employee.wage) * hours;
	}
	if (employee.type === "salaried") {
		const hourlyRate = parseFloat(employee.salary)/160;
		const diff = (hours - 160) * hourlyRate;
		salary = parseFloat(employee.salary) + diff;
	}
	await connection.$pool.end();
	res.json({
		employeeName: employee.name,
		salary
	});
});

app.listen(3000);

