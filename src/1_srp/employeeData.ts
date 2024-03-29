import pgp from "pg-promise";

export async function getEmployee (employeeId: string) {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");	
	const [employee] = await connection.query("select * from branas.employee where employee_id = $1", [employeeId]);
	await connection.$pool.end();
	return employee;
}

export async function getTimeRecords (employeeId: string, month: number, year: number) {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	const timeRecords = await connection.query("select * from branas.time_record where employee_id = $1 and extract(month from checkin_date) = $2 and extract(year from checkin_date) = $3", [employeeId, month, year]);
	await connection.$pool.end();
	return timeRecords;
}
