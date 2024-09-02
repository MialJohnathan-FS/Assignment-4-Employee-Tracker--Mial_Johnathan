class Employee {
    constructor(name, age, salary) {
        console.log("Employee Created");
        this.name = name;
        this.age = age;
        this.salary = salary;
    };
};

let Employee1 = new Employee("Alice Johnson", 42, 40); 
let Employee2 = new Employee("Max Hepola", 23, 50); 
let Employee3 = new Employee("Mike Ann", 34, 29); 


class Manager extends Employee {
    constructor(name, age, payrate, hours) {
        super(name, age, 0);
        this.payrate = payrate;
        this.employeeType = "Manager";
        this.calculatePay();
    };

    calculatePay() {
        const hoursPerWeek = 50;
        this.salary = (this.payrate * this.hoursPerWeek * 52)-1000
    };
};

class PartTime extends Employee {
    constructor(name, age, payrate, hours) {
        super(name, age, 0);
        this.payrate = payrate;
        this.hours = hours;
        this.employeeType = "Part-Time";
        this.calculatePay();
    };

    calculatePay() {
        this.salary = this.payrate * this.hours * 52;
    };
};

class EmployeeTracker {
    constructor() {
        this.employees = [];
        this.initializeEmployees();
        this.displayMenu();
    };

    initializeEmployees() {
        this.employees.push(new Manager("Jane Marks", 35, 50));
        this.employees.push(new Manager("Mike Smith", 25, 50));
        this.employees.push(new Manager("Alex Perez", 55, 50));
    };

    displayMenu() {
        console.clear(); 

        let menuOptions = "Employee Tracker Menu:\n";
        menuOptions += "1. Add Employee\n";
        menuOptions += "2. Remove Employee\n";
        menuOptions += "3. Edit Employee\n";
        menuOptions += "4. Display Employees\n";
        menuOptions += "5. Exit\n";

        const choice = prompt(menuOptions);
        switch (choice) {
            case '1':
                this.addEmployee();
                break;
            case '2':
                this.removeEmployee();
                break;
            case '3':
                this.editEmployee();
                break;
            case '4':
                this.displayEmployees();
                break;
            case '5':
                alert("Exiting Employee Tracker...");
                return; 
            default:
                alert("Invalid choice. Please try again.");
        };
    
       this.displayMenu();
    }

    addEmployee() {
        const name = prompt("Enter employee name: ");
        const age = parseInt(prompt("Enter employee age: "));
        const payrate = parseFloat(prompt("Enter pay rate: "));
        const hours = parseInt(prompt("Enter hours per week: "));
    
        let newEmployee;
        if (hours >= 40) {
            newEmployee = new Manager(name, age, payrate);
        } else {
            newEmployee = new PartTime(name, age, payrate, hours);
        }
    
        this.employees.push(newEmployee);
        this.displayEmployees(); 
    };
    


    editEmployee() {
        const id = parseInt(prompt("Enter employee ID to edit: ")) - 1;

        if (id >= 0 && id < this.employees.length) {
            const newPayrate = parseFloat(prompt("Enter new pay rate: "));
            this.employees[id].payrate = newPayrate;
            this.employees[id].calculatePay(); 
        } else {
            console.log("Invalid employee ID.");
        }

        this.displayEmployees();
    }

    displayEmployees() {
        console.clear();
        console.log("Bob's Burger Joint");
        console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");

        this.employees.forEach((employee, index) => {
            const id = index + 1;
            const hours = employee instanceof Manager ? "40+" : employee.hours;
            const pay = employee.payrate;
            console.log(`${id}\t${employee.name}\t${employee.salary}\t${hours}\t${pay}\t${employee.employeeType}`);
        });
    }

    logEmployeeDetails(employee) {
        console.log("Employee Details:");
        console.log("Name:", employee.name);
        console.log("Age:", employee.age);
        console.log("Salary:", employee.salary);
    }
}



(() => {
    const employeeTracker = new EmployeeTracker();
    employeeTracker.displayEmployees();
})();