import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminRoutingModule} from '../admin-routing.module';
import {AdminPanelComponent} from '../components/admin-panel/admin-panel.component';
import {AdminPanelTeamComponent} from '../components/admin-panel-team/admin-panel-team.component';
import {AdminPanelSpecializationsComponent} from '../components/admin-panel-specializations/admin-panel-specializations.component';
import {AdminPanelProjectsComponent} from '../components/admin-panel-projects/admin-panel-projects.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ],
    declarations: [
        AdminPanelComponent,
        AdminPanelTeamComponent,
        AdminPanelSpecializationsComponent,
        AdminPanelProjectsComponent
    ]
})
export class AdminModule {
}
