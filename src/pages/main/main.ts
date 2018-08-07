import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectDetailsPage } from '../project-details/project-details';
import { SignPage } from '../sign/sign';
import { User } from '../../Classes/User';
import { ProjectProvider } from '../../providers/project/project';
import { Projects } from '../../Classes/Projects';
import { Project } from '../../Classes/Project';
import { AddProjectPage } from '../add-project/add-project';
import { AllProjectsPage } from '../all-projects/all-projects';
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  prefixUrlImage: string = 'http://localhost:3000/media/image?image=';
  go: number;
  live: number;
  user_info: User;
  projects: Projects;
  project_arr: Project[];
  is_sign_in: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public projectProvider: ProjectProvider) {
    this.projectProvider.getAllLiveProjects().subscribe(data => {
      this.projects = data;
      this.go = this.projects.go;
      this.live = this.projects.live;
      this.project_arr = this.projects.projects;
    }, err => {
    });
    this.user_info = this.navParams.get('user_info');
    this.is_sign_in = this.user_info != null;
  }

  addProject() {
    this.navCtrl.setRoot(AddProjectPage, { user_info: this.user_info }, { animate: true });
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

  signOut() {
    this.user_info = null;
    this.is_sign_in = false;
  }

  signIn() {
    this.navCtrl.setRoot(SignPage, { animate: true });
  }

  goToAllProjects() {
    this.navCtrl.setRoot(AllProjectsPage, { user_info: this.user_info }, { animate: true });
  }

}
