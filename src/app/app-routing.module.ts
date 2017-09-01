import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {ContactsComponent} from './components/contacts/contacts.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {TeamComponent} from './components/team/team.component';
import {TeamDetailsComponent} from './components/team-details/team-details.component';
import {ProjectsComponent} from "./components/projects/projects.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";

const ROUTES = [
    {path: '', component: HomeComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'team', component: TeamComponent},
    {path: 'team-details/:id', component: TeamDetailsComponent},
    {path: 'admin', component: AdminPanelComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {useHash: false, preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}


