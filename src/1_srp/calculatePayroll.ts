import pgp from "pg-promise";
import { getEmployee, getTimeRecords } from "./employeeData";

export default async function calculatePayroll (input: any) {
	const employee = await getEmployee(input.employeeId);
	const timeRecords = await getTimeRecords(input.employeeId, input.month, input.year);
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
	return {
		employeeName: employee.name,
		salary
	};
}
