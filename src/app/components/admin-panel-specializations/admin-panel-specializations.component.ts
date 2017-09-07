import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-specializations',
    templateUrl: './admin-panel-specializations.component.html',
    styleUrls: ['./admin-panel-specializations.component.scss']
})
export class AdminPanelSpecializationsComponent implements OnInit {
    public specializationClone = null;
    public activeSpecialization;

    constructor(private storageService: StorageService) {
    }

    ngOnInit() {
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
