import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminRoutingModule} from '../admin-routing.module';
import {AdminPanelComponent} from "../components/admin-panel/admin-panel.component";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ],
    declarations: [
        AdminPanelComponent
    ]
})
export class AdminModule {
}
