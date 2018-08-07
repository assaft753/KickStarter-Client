import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllProjectsPage } from './all-projects';

@NgModule({
  declarations: [
    AllProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllProjectsPage),
  ],
})
export class AllProjectsPageModule {}
