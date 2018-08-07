import { Project } from '../../Classes/Project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Classes/User';
import { Projects } from '../../Classes/Projects';
import { ProjectProvider } from '../../providers/project/project';
import { ProjectDetailsPage } from '../project-details/project-details';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-all-projects',
  templateUrl: 'all-projects.html',
})
export class AllProjectsPage {
  prefixUrlImage: string = 'http://localhost:3000/media/image?image=';
  user_info: User;
  projects: Projects;
  project_arr: Project[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public projectProvider: ProjectProvider) {
    this.user_info = this.navParams.get('user_info');
    this.projectProvider.getAllProjects().subscribe(data => {
      this.projects = data;
      this.project_arr = this.projects.projects;
    }, err => {
    });
  }

  precentage(i: number) {
    let project = this.project_arr[i];
    let precentage = project.donation * 100 / project.desire_amount + "";
    let precentage_str = precentage.split('.')[0];
    return precentage_str;
  }

  goToProjectDetails(index: number) {
    this.navCtrl.setRoot(ProjectDetailsPage, { project: this.project_arr[index], user_info: this.user_info });
  }

  goBack() {
    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
  }

}
