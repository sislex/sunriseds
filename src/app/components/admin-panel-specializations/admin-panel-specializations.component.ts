import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-specializations',
    templateUrl: './admin-panel-specializations.component.html',
    styleUrls: ['./admin-panel-specializations.component.scss']
})
export class AdminPanelSpecializationsComponent implements OnInit {
    public specializationActive;
    public keyActive;

    constructor(private storageService: StorageService) {}

    ngOnInit() {}

    public addSpecialization() {
        this.specializationActive = [];
        let id: number;
        if (this.storageService.specializationsClone.length) {
            id = parseInt(this.storageService.specializationsClone[this.storageService.specializationsClone.length - 1].id) + 1;
        } else {
            id = 1;
        }
        this.specializationActive = {
            id: id,
            name: '',
            ico: '',
            color: '',
            display: false
        };
        this.editingSpecialization(this.specializationActive, this.storageService.specializationsClone.length);
    }

    public editingSpecialization(specialization, i) {
        this.keyActive = i;
        this.specializationActive = JSON.parse(JSON.stringify(specialization));
    }

    public delSpecialization(key) {
        this.storageService.specializationsClone.splice(key, 1);
        this.storageService.specializations = JSON.parse(JSON.stringify(this.storageService.specializationsClone));
        this.storageService.postSaveEditJSON('specializations', this.storageService.specializations);
    }

    public undoModalWindows() {
        this.storageService.specializationsClone = JSON.parse(JSON.stringify(this.storageService.specializations));
    }

    public saveChanges() {
        this.storageService.specializationsClone.splice(this.keyActive, 1, this.specializationActive);
        this.storageService.specializations = JSON.parse(JSON.stringify(this.storageService.specializationsClone));

        this.storageService.postSaveEditJSON('specializations', this.storageService.specializations);
    }

}