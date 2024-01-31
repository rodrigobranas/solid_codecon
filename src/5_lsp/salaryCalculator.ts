export default abstract class SalaryCalculator {
	calculate (employee: any, timeRecords: any): number {
		let hours = 0;
		for (const record of timeRecords) {
			hours += (record.checkout_date.getTime() - record.checkin_date.getTime())/(1000*60*60);
		}
		return this.calculateSalary(employee, hours);
	}

	abstract calculateSalary (employee: any, hours: number): number;
}

export class SalariedCalculator extends SalaryCalculator {
	calculateSalary(employee: any, hours: number): number {
		const hourlyRate = parseFloat(employee.salary)/160;
		const diff = (hours - 160) * hourlyRate;
		return parseFloat(employee.salary) + diff;
	}
}

export class HourlyCalculator extends SalaryCalculator {
	calculateSalary(employee: any, hours: number): number {
		return parseFloat(employee.wage) * hours;
	}
}

export class VolunteerCalculator extends SalaryCalculator {
	calculateSalary(employee: any, hours: number): number {
		throw new Error("Could not calculate salary");
	}
}

export class SalaryCalculatorFactory {
	static create (type: string) {
		if (type === "salaried") return new SalariedCalculator();
		if (type === "hourly") return new HourlyCalculator();
		if (type === "volunteer") return new VolunteerCalculator();
		throw new Error();
	}
}
