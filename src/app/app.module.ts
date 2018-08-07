import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { AddProjectPage } from '../pages/add-project/add-project';
import { ProjectDetailsPage } from '../pages/project-details/project-details';
import { EditProjectPage } from '../pages/edit-project/edit-project';
import { AllProjectsPage } from '../pages/all-projects/all-projects';
import { SignPage } from '../pages/sign/sign';
import { DonationPage } from '../pages/donation/donation';
import { UserProvider } from '../providers/user/user';
import { ProjectProvider } from '../providers/project/project';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    AddProjectPage,
    ProjectDetailsPage,
    SignPage,
    DonationPage,
    EditProjectPage,
    AllProjectsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    AddProjectPage,
    ProjectDetailsPage,
    SignPage,
    DonationPage,
    EditProjectPage,
    AllProjectsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    ProjectProvider
  ]
})
export class AppModule { }
