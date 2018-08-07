import { MainPage } from '../main/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Classes/User';
import { Project } from '../../Classes/Project';
import { ProjectProvider } from '../../providers/project/project';
import { SecondaryImage } from '../../Classes/SecondaryImage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { DonationPage } from '../donation/donation';
import { EditProjectPage } from '../edit-project/edit-project';

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  prefixUrlVideo: string = 'http://localhost:3000/media/video?video=';
  prefixUrlImage: string = 'http://localhost:3000/media/image?image=';
  user_info: User;
  project: Project;
  is_owner: boolean;
  is_donatble: boolean;
  is_admin: number;
  secondary_images: SecondaryImage[];
  primary_image: string;
  video_name: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private projectProvider: ProjectProvider, private modalCtrl: ModalController) {
    this.user_info = this.navParams.get('user_info');
    this.project = this.navParams.get('project');

    this.secondary_images = this.project.secondary_images;
    this.primary_image = this.project.primary_image;
    this.video_name = this.project.video;
    if (this.user_info != null) {
      this.projectProvider.checkPermission({ project_id: this.project.id, user_id: this.user_info.user_id }).subscribe(data => {
        this.is_owner = data['is_owner'];
        this.is_donatble = data['donatble'];
        this.is_admin = this.user_info.is_admin;

      }, err => {

      });
    }
    else {
      this.is_owner = false;
      this.is_donatble = false;
    }

  }
  goBack() {
    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
  }

  delete() {
    this.projectProvider.removeProject({ project_id: this.project.id }).subscribe(data => {
      alert("Project Removed");
      this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
    }, err => {
    })
  }
  edit() {
    this.navCtrl.setRoot(EditProjectPage, { user_info: this.user_info, project: this.project }, { animate: true });
  }

  donate() {
    let modal = this.modalCtrl.create(DonationPage);
    modal.onDidDismiss(data => {
      if (data != null) {
        this.projectProvider.donateToProject({ project_id: this.project.id, user_id: this.user_info.user_id, amount: data }).subscribe(data => {
          this.is_donatble = false;
          alert("Doantion was recieved successfully");
        }, err => {
        })
      }
    });
    modal.present();
  }

}
