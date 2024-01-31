import EmployeeData from "./employeeData";
import { SalariedCalculator, SalaryCalculatorFactory } from "./salaryCalculator";

export default class CalculatePayroll {

	constructor (readonly employeeData: CalculatePayrollEmployeeData) {
	}

	async execute (input: any) {
		const employee = await this.employeeData.getEmployee(input.employeeId);
		const timeRecords = await this.employeeData.getTimeRecords(input.employeeId, input.month, input.year);
		const salaryCalculator = SalaryCalculatorFactory.create(employee.type);
		const salary = salaryCalculator.calculate(employee, timeRecords);
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
