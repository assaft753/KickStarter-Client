import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Classes/User';
import { MainPage } from '../main/main';
import { ProjectProvider } from '../../providers/project/project';

@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {
  @ViewChild('project_name') project_name: any;
  @ViewChild('project_idea') project_idea: any;
  @ViewChild('priamry_image') priamry_image: any;
  @ViewChild('secondary_images') secondary_images: any;
  @ViewChild('video') video: any;
  @ViewChild('description') description: any;
  @ViewChild('desire_amount') desire_amount: any;
  @ViewChild('days') days: any;
  @ViewChild('hours') hours: any;
  user_info: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private projectProvider: ProjectProvider) {
    this.user_info = this.navParams.get('user_info');

  }
  submit() {
    if (this.checkInputs() == true) {
      let primary_image: File = this.priamry_image.nativeElement.files[0];
      let secondary_images: FileList = this.secondary_images.nativeElement.files;
      let project_name = this.project_name.nativeElement.value;
      let project_idea = this.project_idea.nativeElement.value;
      let description = this.description.nativeElement.value;
      let days = this.days.nativeElement.valueAsNumber;
      let desire_amount = this.desire_amount.nativeElement.valueAsNumber;
      let hours = this.hours.nativeElement.valueAsNumber;
      let video: FileList = this.video.nativeElement.files;
      this.projectProvider.addProject({
        user_id: this.user_info.user_id, project_name: project_name,
        idea: project_idea, description: description, desire_amount: desire_amount, days: days, hours: hours
      })
        .subscribe(
        data => {
          let project_id = data['project_id'];
          this.projectProvider.addPrimaryImage(primary_image, project_id).subscribe(
            data => {
              let addSecondaryImagesObservable = this.projectProvider.addSecondaryImages(secondary_images, project_id);
              let addMovieObservable = this.projectProvider.addMovie(video, project_id);

              if (addSecondaryImagesObservable != null && addMovieObservable != null) {
                addSecondaryImagesObservable.subscribe(data => {
                  addMovieObservable.subscribe(data => {
                    alert("Project Added Successfully");
                    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                  },
                    err => {
                      alert("Project Added Successfully");
                      this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                    });
                }
                  , err => {
                    addMovieObservable.subscribe(data => {
                      alert("Project Added Successfully");
                      this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                    },
                      err => {
                        alert("Project Added Successfully");
                        this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                      });
                  });
              }

              else if (addSecondaryImagesObservable != null) {

                addSecondaryImagesObservable.subscribe(data => {
                  alert("Project Added Successfully");
                  this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                },
                  err => {
                    alert("Project Added Successfully");
                    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                  });

              }
              else if (addMovieObservable != null) {
                addMovieObservable.subscribe(data => {
                  alert("Project Added Successfully");
                  this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                },
                  err => {
                    alert("Project Added Successfully");
                    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
                  });
              }
              else {
                alert("Project Added Successfully");
                this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
              }
            }
            , err => { });
        }
        , err => { });
    }
  }

  goBack() {
    this.navCtrl.setRoot(MainPage, { user_info: this.user_info }, { animate: true });
  }

  checkInputs() {
    if (this.project_idea.nativeElement.value.trim() == '' || this.project_idea.nativeElement.value.length > 150) {
      alert("Not Valid Project Idea it Should not be empty nor above 150 letters");
      return false;
    }

    if (this.project_name.nativeElement.value == "" || this.description.nativeElement.value == "" || Number.isNaN(this.desire_amount.nativeElement.valueAsNumber)
      || Number.isNaN(this.days.nativeElement.valueAsNumber)
      || Number.isNaN(this.hours.nativeElement.valueAsNumber) ||
      this.project_name.nativeElement.value == null || this.project_idea.nativeElement.value == null
      || this.description.nativeElement.value == null
    ) {
      alert("enter legal inputs");
      return false;
    }
    else {
      let amount = this.desire_amount.nativeElement.valueAsNumber;
      let days = this.days.nativeElement.valueAsNumber;
      let hours = this.hours.nativeElement.valueAsNumber;
      if (amount <= 0 || days <= 0 || hours <= 0) {
        alert("enter legal digits");
        return false;
      }
    }
    let files_array: FileList = this.priamry_image.nativeElement.files;
    if (files_array.length == 0) {
      alert("must enter primary image");
      return false;
    }
    return true;
  }

}
