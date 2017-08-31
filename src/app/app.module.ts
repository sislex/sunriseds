import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {FooterComponent} from './components/footer/footer.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PartnersComponent } from './components/partners/partners.component';
import {UsersService} from './services/users.service';
import {RequestsService} from './services/requests.service';
import {HttpClientModule} from '@angular/common/http';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        MainMenuComponent,
        ContactsComponent,
        HomeComponent,
        AboutComponent,
        TeamComponent,
        TeamDetailsComponent,
        ProjectsComponent,
        PartnersComponent,
        AdminPanelComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        UsersService,
        RequestsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
