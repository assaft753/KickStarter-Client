import { Project } from '../../Classes/Project';
import { User } from '../../Classes/User';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Donator } from '../../Classes/Donator';
import { ProjectProvider } from '../../providers/project/project';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-edit-project',
  templateUrl: 'edit-project.html',
})
export class EditProjectPage {

  @ViewChild('project_name') project_name: any;
  @ViewChild('project_idea') project_idea: any;
  @ViewChild('description') description: any;
  @ViewChild('desire_amount') desire_amount: any;
  @ViewChild('days') days: any;
  @ViewChild('hours') hours: any;
  @ViewChild('video') video: any;
  @ViewChild('source_video') source_video: any;
  prefixUrlVideo: string = 'http://localhost:3000/media/video?video=';
  prefixUrlImage: string = 'http://localhost:3000/media/image?image=';
  primary_image_src: any;
  primary_image_file: File;
  secondary_images_src: any[] = [];
  use_local_images: boolean = false;
  secondary_images_files: File[] = [];
  delete_video: boolean = false;
  video_file: File;
  finish_primary = false;
  finish_secondary = false;
  finish_video = false;
  finish_donators = false;
  video_file_src: string;
  user_info: User;
  project: Project;
  there_are_donators: boolean;
  donators_to_delete: Donator[];
  count: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private projectProvider: ProjectProvider) {
    this.user_info = this.navParams.get('user_info');
    this.project = this.navParams.get('project');
    this.donators_to_delete = [];
    this.primary_image_src = this.prefixUrlImage + this.project.primary_image;
    if (this.project.video != null && this.project.video != '') {
      this.video_file_src = this.prefixUrlVideo + this.project.video;
    }
    else {
      this.video_file_src = null;
    }
  }

  ionViewDidLoad() {
    this.putDetails();
  }

  putDetails() {
    this.project_name.nativeElement.value = this.project.project_name;
    this.project_idea.nativeElement.value = this.project.idea;
    this.description.nativeElement.value = this.project.description;
    this.desire_amount.nativeElement.value = this.project.desire_amount;
    this.days.nativeElement.value = this.project.days;
    this.hours.nativeElement.value = this.project.hours;
  }

  primaryImageChanged(event) {
    var file_reader = new FileReader();
    file_reader.addEventListener('load', () => {
      this.primary_image_src = file_reader.result;

    })
    this.primary_image_file = event.srcElement.files[0];
    file_reader.readAsDataURL(this.primary_image_file);
  }
  secondaryImagesChanged(event) {
    var file_reader = new FileReader();
    file_reader.addEventListener('load', () => {
      this.secondary_images_src.push(file_reader.result);
      this.use_local_images = true;
    })
    this.secondary_images_files.push(event.srcElement.files[0]);
    file_reader.readAsDataURL(event.srcElement.files[0]);
  }

  videoChanged(event) {
    this.deleteVideo();
    var file_reader = new FileReader();
    file_reader.addEventListener('load', () => {
      this.video_file_src = file_reader.result;
      this.delete_video = false;

    })
    this.video_file = event.srcElement.files[0];
    file_reader.readAsDataURL(this.video_file);
  }

  deleteFromLocal(i) {
    this.secondary_images_src.splice(i, 1);
    this.secondary_images_files.splice(i, 1);
  }

  deleteVideo() {
    this.video_file_src = null;
    this.delete_video = true;
  }

  deleteDonator(i) {
    this.donators_to_delete.push(this.project.donators[i]);
    this.project.donators.splice(i, 1);

  }

  submit() {

    if (this.checkInputs() == true) {
      let idea = this.project_idea.nativeElement.value;
      let desc = this.description.nativeElement.value;
      let desire = this.desire_amount.nativeElement.value;
      let days = this.days.nativeElement.value;
      let hours = this.hours.nativeElement.value;


      this.projectProvider.updateProjectDetails(idea, desc, desire, days, hours, this.project.id).subscribe(
        data => {
          if (this.primary_image_file != null) {
            this.projectProvider.updatePrimaryImage(this.primary_image_file, this.project.id)
              .subscribe(data => {
                this.finish_primary = true;
                this.moveToMainPage();
              }, err => {
                this.finish_primary = true;
                this.moveToMainPage();
              });
          }
          else {
            this.finish_primary = true;
            this.moveToMainPage();
          }

          if (this.use_local_images == true) {
            if (this.secondary_images_src.length > 0) {
              this.projectProvider.updateSecondaryImages(this.secondary_images_files, this.project.id)
                .subscribe(data => {
                  this.finish_secondary = true;
                  this.moveToMainPage();
                }, err => {
                  this.finish_secondary = true;
                  this.moveToMainPage();
                })
            }
            else {
              this.projectProvider.deleteSecondaryImages(this.project.id)
                .subscribe(data => {
                  this.finish_secondary = true;
                  this.moveToMainPage();

                }, err => {
                  this.finish_secondary = true;
                  this.moveToMainPage();
                });
            }
          }

          else {
            this.finish_secondary = true;
            this.moveToMainPage();
          }

          if (this.delete_video == true) {
            this.projectProvider.deleteMovie(this.project.id)
              .subscribe(data => {
                this.finish_video = true;
                this.moveToMainPage();
              }, err => {
                this.finish_video = true;
                this.moveToMainPage();
              });
          }
          else if (this.video_file != null) {
            this.projectProvider.updateMovie(this.video_file, this.project.id)
              .subscribe(data => {
                this.finish_video = true;
                this.moveToMainPage();
              }, err => {
                this.finish_video = true;
                this.moveToMainPage();
              });
          }
          else {
            this.finish_video = true;
            this.moveToMainPage();
          }
          if (this.donators_to_delete != null && this.donators_to_delete.length > 0) {
            this.projectProvider.deleteDonator(this.donators_to_delete, this.project.id)
              .subscribe(data => {
                this.finish_donators = true;
                this.moveToMainPage();
              }, err => {
                this.finish_donators = true;
                this.moveToMainPage();
              });
          }
          else {
            this.finish_donators = true;
            this.moveToMainPage();
          }
        },
        err => { alert("Error") });
    }
  }

  checkInputs() {
    if (this.project_idea.nativeElement.value.trim() == '' || this.project_idea.nativeElement.value.length > 150) {
      alert("Not Valid Project Idea it Should not be empty nor above 150 letters");
      return false;
    }
    if (this.description.nativeElement.value.trim() == '') {
      alert("No Description");
      return false;
    }
    let desire_nubmer: string = this.desire_amount.nativeElement.value;
    if (desire_nubmer.trim() == '' || desire_nubmer.match(/^[0-9]+$/) == null) {
      alert("No Desire Amount");
      return false;
    }

    let days: string = this.days.nativeElement.value;
    if (this.days.nativeElement.value.trim() == '' || days.match(/^[0-9]+$/) == null) {
      alert("Invalid Days");
      return false;
    }
    let hours: string = this.hours.nativeElement.value;
    if (this.hours.nativeElement.value.trim() == '' || hours.match(/^[0-9]+$/) == null) {
      alert("Invalid Hours");
      return false;
    }
    return true;

  }

  moveToMainPage() {
    if (this.finish_primary && this.finish_secondary && this.finish_video && this.finish_donators) {
      alert("Project Edited");
      this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
    }
  }
  goBack() {
    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
  }

}
