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

    public textDropDownListTechnologies = 'Click for select technology';
    public textDropDownListEmployees = 'Click for select employees';

    constructor(private storageService: StorageService) {
    }

    ngOnInit() {
    }
    
    public addProject() {
        const newSpecialization = {
            id: parseInt(this.storageService.specializations[this.storageService.specializations.length - 1].id) + 1,
            name: '',
            ico: '',
            color: '',
            display: false
        };

        const newProject = {
            id: parseInt(this.storageService.projects[this.storageService.projects.length - 1].id) + 1,
            name: '',
            description: '',
            text: '',
            images: [],
            employees: [],
            technologies: []
        };
        this.storageService.projects.push(newProject);
        this.editingProject(newProject);
        
    }

    public editingProject(project) {
        // this.projectClone = JSON.parse(JSON.stringify(project));
        this.activeProject = project;

        this.createEmployeeArrays(project);
        this.createTechnologiesArrays(project);

    }

    private createEmployeeArrays(project) {
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

    private createTechnologiesArrays(project) {
        this.technologies = [];
        this.technologiesMembers = [];
        
        for (const specialization of this.storageService.specializations) {
            let notProject = true;
            for (const technologyProject of project.technologies) {
                if (specialization.id === technologyProject) {
                    this.technologiesMembers.push(specialization);
                    notProject = false;
                }
            }
            if (notProject === true) {
                this.technologies.push(specialization);
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

    public textDropDownListNamesEmployees() {
        if (this.textDropDownListEmployees === 'Click for select employees') {
            this.textDropDownListEmployees = 'Hide employees';
        } else if (this.textDropDownListEmployees === 'Hide employees') {
            this.textDropDownListEmployees = 'Click for select employees';
        }
    }

    public textDropDownListNamesTechnologies() {
        if (this.textDropDownListTechnologies === 'Click for select technology') {
            this.textDropDownListTechnologies = 'Hide technology';
        } else if (this.textDropDownListTechnologies === 'Hide technology') {
            this.textDropDownListTechnologies = 'Click for select technology';
        }
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

    public delTechnology(delTechnology) {
        const mass = [];
        for (const technology of this.technologiesMembers) {
            if (technology !== delTechnology) {
                mass.push(technology);
            }
        }
        this.technologiesMembers = mass;
        delTechnology.description_for_project = '';
        this.technologies.push(delTechnology);
    }

    public addTechnologyProject(addTechnology) {
        const mass = [];
        for (const technology of this.technologies) {
            if (technology !== addTechnology) {
                mass.push(technology);
            }
        }
        this.technologies = mass;
        this.technologiesMembers.push(addTechnology);
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
        let mass = [];
        for (const employee of this.projectMembers) {
            mass.push({
                id: employee.id,
                description: employee.description_for_project
            });
        }
        this.activeProject.employees = mass;
        mass = [];
        for (const technology of this.technologiesMembers) {
            mass.push(technology.id);
        }
        this.activeProject.technologies = mass;
    }

}
