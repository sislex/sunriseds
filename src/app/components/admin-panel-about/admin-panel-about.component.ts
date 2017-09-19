import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost/sunrisapi/upload.php';

@Component({
    selector: 'app-admin-panel-about',
    templateUrl: './admin-panel-about.component.html',
    styleUrls: ['./admin-panel-about.component.scss']
})
export class AdminPanelAboutComponent implements OnInit {

    public uploader:FileUploader = new FileUploader({url: URL});

    constructor(
        private storageService: StorageService,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {}

    public delImg(about, key) {
        console.log(about.images);
        about.images.splice(key, 1);
        this.storageService.aboutImages.splice(key, 1);
        console.log(this.storageService.aboutImages);
    }

    public addImage(event, about) {
        const file = event.target.files[0];
        // console.log(file);
        about.images.push(
            {
                flagObj: true,
                obj: file,
                name: file.name,
                src: this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
            }
        );
    }

    public cancelChanges() {
        this.storageService.aboutClone = JSON.parse(JSON.stringify(this.storageService.about));
    }

    public saveChanges() {
        console.log(this.storageService.aboutClone);
        this.storageService.saveChanges();
    }

}
