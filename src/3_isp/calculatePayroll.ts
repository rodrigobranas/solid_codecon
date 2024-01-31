import EmployeeData from "./employeeData";

export default class CalculatePayroll {

	constructor (readonly employeeData: CalculatePayrollEmployeeData) {
	}

	async execute (input: any) {
		const employee = await this.employeeData.getEmployee(input.employeeId);
		const timeRecords = await this.employeeData.getTimeRecords(input.employeeId, input.month, input.year);
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

}

export interface CalculatePayrollEmployeeData {
	getEmployee (employeeId: string): Promise<any>;
	getTimeRecords (employeeId: string, month: number, year: number): Promise<any>;
}
