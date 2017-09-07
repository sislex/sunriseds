import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {RequestsService} from '../../services/requests.service';


@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    // public teamClone = JSON.parse(JSON.stringify(this.storageService.team));
    
    
    public specializationClone = null;
    public activeSpecialization;
    

    constructor(
        private storageService: StorageService,
        public requestsService: RequestsService
    ) {}

    ngOnInit() {}
    

    public getColor(event, name) {
        // const color = document.getElementById(name);
        // color.style.backgroundColor = event.target.value;
    }

    
    public editingSpecialization(specialization) {
        this.specializationClone = JSON.parse(JSON.stringify(specialization));
        this.activeSpecialization = JSON.parse(JSON.stringify(specialization));
    }

    public saveChangesSpecialization() {
        if (this.specializationClone.name !== '') {
            for (const specialization in this.storageService.specializations) {
                if(this.storageService.specializations[specialization].name === this.activeSpecialization.name) {
                    this.storageService.specializations[specialization] = this.specializationClone;
                    break;
                }
            }
        } else {
            this.storageService.specializations.pop();
        }
    }
    
    public addSpecialization() {
        const newSpecialization = {
            id: parseInt(this.storageService.specializations[this.storageService.specializations.length - 1].id) + 1,
            name: '',
            ico: '',
            color: '',
            display: false
        };
        this.storageService.specializations.push(newSpecialization);
        this.editingSpecialization(newSpecialization);
    }
    public delSpecialization(specializationDel) {
        const mass = [];
        for (const specialization of this.storageService.specializations) {
            if(specialization !== specializationDel) {
                mass.push(specialization);
            }
        }
        this.storageService.specializations = mass;
    }
    
}
