import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestsService} from '../../services/requests.service';

@Component({
    selector: 'app-admin-panel-team',
    templateUrl: './admin-panel-team.component.html',
    styleUrls: ['./admin-panel-team.component.scss']
})
export class AdminPanelTeamComponent implements OnInit {
    public employeeClone = null;
    public activeEmployee;
    public specializationEmployee;

    public technologiesEmployee = []; // Technologies used in the employee
    public technologies = []; // Technologies not used in the employee

    public textDropDownListTechnologies = 'Click for select technology';

    constructor(
        private storageService: StorageService,
        private requestsService: RequestsService,
        public domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
    }

    public editingEmployee(employee) {
        this.employeeClone = JSON.parse(JSON.stringify(employee));
        this.activeEmployee = JSON.parse(JSON.stringify(employee));
        this.createTechnologiesArrays(employee);
    }

    public createTechnologiesArrays(employee) {
        this.technologies = [];
        this.technologiesEmployee = [];

        for (const specialization of this.storageService.specializations) {
            let notEmployee = true;
            for (const technologyProject of employee.technologies) {
                if (specialization.id === technologyProject.id) {
                    for (const employeeTechnology of employee.technologies) {
                        if (employeeTechnology.id === technologyProject.id) {
                            this.technologiesEmployee.push({
                                id: specialization.id,
                                name: specialization.name,
                                ico: specialization.ico,
                                color: specialization.color,
                                display: specialization.display,
                                experience: employeeTechnology.experience
                            });
                            break;
                        }
                    }
                    notEmployee = false;
                }
            }
            if (notEmployee === true) {
                this.technologies.push({
                    id: specialization.id,
                    name: specialization.name,
                    ico: specialization.ico,
                    color: specialization.color,
                    display: specialization.display,
                    experience: ''
                });
            }
        }
    }

    public getFileName(event) {
        let file = event.target.files[0];
        this.employeeClone.image = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    }

    public textDropDownListNamesTechnologies() {
        if (this.textDropDownListTechnologies === 'Click for select technology') {
            this.textDropDownListTechnologies = 'Hide technology';
        } else if (this.textDropDownListTechnologies === 'Hide technology') {
            this.textDropDownListTechnologies = 'Click for select technology';
        }
    }

    public delTechnology(delTechnology) {
        const mass = [];
        for (const technology of this.technologiesEmployee) {
            if (technology !== delTechnology) {
                mass.push(technology);
            }
        }
        this.technologiesEmployee = mass;
        delTechnology.experience = '';
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
        this.technologiesEmployee.push(addTechnology);
    }
    
    public saveChanges() {
        const specializations = [];
        for (const specialization of this.technologiesEmployee) {
            for (const technology of this.storageService.specializations) {
                if (specialization.name === technology.name) {
                    console.log(specialization.name);
                    console.log(technology.name);
                    specializations.push({
                        id: technology.id,
                        experience: specialization.experience
                    });
                }
            }
        }
        this.employeeClone.technologies = specializations;
        console.log(this.employeeClone);
        for (const employee in this.storageService.team) {
            if(this.storageService.team[employee].id === this.activeEmployee.id) {
                this.storageService.team[employee] = this.employeeClone;
                break;
            }
        }
        this.requestsService.postSaveEditEmployee('team', this.storageService.team);
    }

    public addEmployee() {
        const newEmploee = {
            firstName: '',
            lastName: '',
            sity: '',
            image: '',
            position: '',
            technologies: []
        };
        this.storageService.team.push(newEmploee);
        this.editingEmployee(newEmploee);
    }
    public delEmployee(employeeDel) {
        const mass = [];
        for (const employee of this.storageService.team) {
            if(employee !== employeeDel) {
                mass.push(employee);
            }
        }
        this.storageService.team = mass;
    }

}
