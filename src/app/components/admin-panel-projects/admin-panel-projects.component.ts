import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-projects',
    templateUrl: './admin-panel-projects.component.html',
    styleUrls: ['./admin-panel-projects.component.scss']
})
export class AdminPanelProjectsComponent implements OnInit {
    // public projectClone = null;
    public activeProject;
    public projectMembers = [];//Employees participating in the project
    public employees = [];//List of employees not participating in the project

    public technologiesMembers = []; // Technologies used in the project
    public technologies = []; // Technologies not used in the project

    constructor(private storageService: StorageService) {
    }

    ngOnInit() {
    }
    
    public addProject() {
        
    }

    public editingProject(project) {
        // this.projectClone = JSON.parse(JSON.stringify(project));
        this.activeProject = project;

        this.employees = [];
        this.projectMembers = [];
        for (const employee of this.storageService.team) {
            let notProject = true;
            let description_for_project = '';
            for (const employeeProject of project.employees) {
                if (employee.id === employeeProject.id) {
                    this.projectMembers.push({
                        id: employee.id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        sity: employee.sity,
                        image: employee.image,
                        position: employee.position,
                        technologies: employee.technologies,
                        description_for_project: employeeProject.description
                    });
                    notProject = false;
                }
            }
            if (notProject === true) {
                this.employees.push({
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    sity: employee.sity,
                    image: employee.image,
                    position: employee.position,
                    technologies: employee.technologies,
                    description_for_project: description_for_project
                });
            }
        }
    }

    //I delete an employee from the this.projectMembers and add to the project this.employees
    public delEmployee(delEmployee) {
        const mass = [];
        for (const employee of this.projectMembers) {
            if (employee !== delEmployee) {
                mass.push(employee);
            }
        }
        this.projectMembers = mass;
        delEmployee.description_for_project = '';
        this.employees.push(delEmployee);
    }

    // I'm adding an employee from the this.projectMembers and delete it from the this.employees
    public addEmployeeProject(addEmployee) {
        const mass = [];
        for (const employee of this.employees) {
            if (employee !== addEmployee) {
                mass.push(employee);
            }
        }
        this.employees = mass;
        this.projectMembers.push(addEmployee);
    }

    public delProject(delProject) {
        const mass = [];
        for (const project of this.storageService.projects) {
            if (project !== delProject) {
                mass.push(project);
            }
        }
        this.storageService.projects = mass;
    }
    
    public saveChanges() {
        const mass = [];
        for (const employee of this.projectMembers) {
            mass.push({
                id: employee.id,
                description: employee.description_for_project
            });
        }
        this.activeProject.employees = mass;
    }

}
