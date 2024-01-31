import EmployeeData from "./employeeData";

export default class GetEmployee {

	constructor (readonly employeeData: GetEmployeeEmployeeData) {
	}

	async execute (employeeId: string) {
		const employee = await this.employeeData.getEmployee(employeeId);
		return {
			employeeName: employee.name
		};
	}

}

export interface GetEmployeeEmployeeData {
	getEmployee (employeeId: string): Promise<any>;
}
