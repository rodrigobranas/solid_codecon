import pgp from "pg-promise";

export default interface EmployeeData {
	getEmployee (employeeId: string): Promise<any>;
	getTimeRecords (employeeId: string, month: number, year: number): Promise<any>;
}

export class EmployeeDataDatabase implements EmployeeData {

	async getEmployee (employeeId: string) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");	
		const [employee] = await connection.query("select * from branas.employee where employee_id = $1", [employeeId]);
		await connection.$pool.end();
		return employee;
	}
	
	async getTimeRecords (employeeId: string, month: number, year: number) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const timeRecords = await connection.query("select * from branas.time_record where employee_id = $1 and extract(month from checkin_date) = $2 and extract(year from checkin_date) = $3", [employeeId, month, year]);
		await connection.$pool.end();
		return timeRecords;
	}
}
