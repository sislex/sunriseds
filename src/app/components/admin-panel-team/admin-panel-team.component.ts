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
    public employeeActive;
    public keyActive;

    public technologiesEmployee = []; // Technologies used in the employee
    public technologies = []; // Technologies not used in the employee

    public textDropDownListTechnologies = 'Click for select technology';

    constructor(
        private storageService: StorageService,
        private requestsService: RequestsService,
        public domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {}

    public addEmployee() {
        this.employeeActive = [];
        const employeeActive = {
            firstName: '',
            lastName: '',
            sity: '',
            image: '',
            position: '',
            technologies: []
        };
        this.editingEmployee(employeeActive, this.storageService.teamClone.length);
    }

    public editingEmployee(employee, i) {
        this.keyActive = i;
        this.employeeActive = JSON.parse(JSON.stringify(employee));
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

    public delEmployee(key) {
        this.storageService.teamClone.splice(key, 1);
        this.storageService.team = JSON.parse(JSON.stringify(this.storageService.teamClone));
    }

    public undoModalWindows() {
        this.storageService.teamClone = JSON.parse(JSON.stringify(this.storageService.team));
    }

    public getFileName(event) {
        let file = event.target.files[0];
        this.employeeActive.image = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    }

    public delTechnology(technology, key) {
        this.technologiesEmployee.splice(key, 1);
        technology.experience = '';
        this.technologies.push(technology);
    }

    public addTechnologyProject(technology, key) {
        this.technologies.splice(key, 1);
        this.technologiesEmployee.push(technology);
    }

    public textDropDownListNamesTechnologies() {
        if (this.textDropDownListTechnologies === 'Click for select technology') {
            this.textDropDownListTechnologies = 'Hide technology';
        } else if (this.textDropDownListTechnologies === 'Hide technology') {
            this.textDropDownListTechnologies = 'Click for select technology';
        }
    }
    
    public saveChanges() {
        const specializations = [];
        for (const specialization of this.technologiesEmployee) {
            for (const technology of this.storageService.specializations) {
                if (specialization.name === technology.name) {
                    specializations.push({
                        id: technology.id,
                        experience: specialization.experience
                    });
                }
            }
        }
        this.employeeActive.technologies = specializations;

        this.storageService.teamClone.splice(this.keyActive, 1, this.employeeActive);
        this.storageService.team = JSON.parse(JSON.stringify(this.storageService.teamClone));

        this.requestsService.postSaveEditEmployee('team', this.storageService.team);
    }

}
