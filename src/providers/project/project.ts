import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Projects } from '../../Classes/Projects';
import { Project } from '../../Classes/Project';
import { SecondaryImage } from '../../Classes/SecondaryImage';
import { Donator } from '../../Classes/Donator';

@Injectable()
export class ProjectProvider {
  private readonly prefixUrlMain = 'http://localhost:3000/main/';
  private readonly prefixUrlProject = 'http://localhost:3000/project';
  private readonly prefixUrlMedia = 'http://localhost:3000/media';
  constructor(public http: HttpClient) {
  }

  getAllLiveProjects() {
    return this.http.get(this.prefixUrlMain).map(res => {
      let projects_res: any[] = res['projects'];
      if (projects_res.length == 0) {
        return new Projects();
      }
      var project_arr: Project[] = [];
      let live = res['live'];
      let go = res['go'];
      for (var element of projects_res) {
        var secondary_images: SecondaryImage[] = [];
        var donators: Donator[] = [];
        let secondary_images_arr = element['secondary_images'];
        let donators_arr = element['donators'];
        for (var image of secondary_images_arr) {
          secondary_images.push(new SecondaryImage(image['image_name']));
        }
        for (var donator of donators_arr) {
          donators.push(new Donator(donator['name'], donator['amount'], donator['user_id']))
        }
        project_arr.push(new Project(
          element['id'],
          element['user_id'],
          element['project_name'],
          element['idea'],
          element['description'],
          element['desire_amount'],
          element['days'],
          element['hours'],
          element['created_date'],
          element['donation'],
          element['primary_image'],
          secondary_images,
          element['video'],
          donators,
          element['days_to_go']
        ));
      }
      return new Projects(project_arr, live, go);
    });
  }

  getAllProjects() {
    return this.http.get(this.prefixUrlMain + 'all').map(res => {
      let projects_res: any[] = res['projects'];
      if (projects_res.length == 0) {
        return new Projects();
      }
      var project_arr: Project[] = [];
      for (var element of projects_res) {
        var secondary_images: SecondaryImage[] = [];
        var donators: Donator[] = [];
        let secondary_images_arr = element['secondary_images'];
        let donators_arr = element['donators'];
        for (var image of secondary_images_arr) {
          secondary_images.push(new SecondaryImage(image['image_name']));
        }
        for (var donator of donators_arr) {
          donators.push(new Donator(donator['name'], donator['amount'], donator['user_id']))
        }
        project_arr.push(new Project(
          element['id'],
          element['user_id'],
          element['project_name'],
          element['idea'],
          element['description'],
          element['desire_amount'],
          element['days'],
          element['hours'],
          element['created_date'],
          element['donation'],
          element['primary_image'],
          secondary_images,
          element['video'],
          donators,
          element['days_to_go']
        ));
      }
      return new Projects(project_arr);
    });
  }
  checkPermission(body: any) {
    return this.http.post(this.prefixUrlProject + '/' + 'permission', body);
  }

  removeProject(body: any) {
    return this.http.post(this.prefixUrlProject + '/' + 'delete', body);
  }

  donateToProject(body: any) {
    return this.http.post(this.prefixUrlProject + '/' + 'donate', body);
  }

  addProject(body: any) {
    return this.http.post(this.prefixUrlProject + '/' + 'add', body);
  }

  addPrimaryImage(image: File, project_id: number) {
    var formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('project_id', project_id + "");
    return this.http.post(this.prefixUrlMedia + '/upload/primary', formData);
  }
  addSecondaryImages(images: FileList, project_id: number) {
    var formData: FormData = new FormData();
    if (images.length > 0) {
      formData.append('project_id', project_id + "");
      for (var i = 0; i < images.length; i++) {
        formData.append('image', images.item(i));
      }
      return this.http.post(this.prefixUrlMedia + '/upload/secondary', formData);
    }
    return null;
  }

  addMovie(movie: FileList, project_id: number) {
    var formData: FormData = new FormData();
    if (movie.length > 0) {
      formData.append('project_id', project_id + "");
      for (var i = 0; i < movie.length; i++) {
        formData.append('video', movie.item(i));
      }
      return this.http.post(this.prefixUrlMedia + '/upload/video', formData);
    }
    return null;

  }

  updatePrimaryImage(image: File, project_id: number) {
    var formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('project_id', project_id + "");
    return this.http.post(this.prefixUrlMedia + '/update/primary', formData);
  }

  updateSecondaryImages(images: File[], project_id: number) {
    var formData: FormData = new FormData();
    if (images.length > 0) {
      formData.append('project_id', project_id + "");
      for (var i = 0; i < images.length; i++) {
        formData.append('image', images[i]);
      }
      return this.http.post(this.prefixUrlMedia + '/update/secondary', formData);
    }
    return null;
  }

  updateMovie(movie: File, project_id: number) {
    var formData: FormData = new FormData();
    formData.append('project_id', project_id + "");
    formData.append('video', movie);
    return this.http.post(this.prefixUrlMedia + '/update/video', formData);
  }

  updateProjectDetails(idea: string, description: string, desire_amount: string, days: string, hours: string, id: number) {
    return this.http.post(this.prefixUrlProject + '/update', {
      idea: idea, description: description,
      desire_amount: desire_amount, days: days, hours: hours, id: id
    });
  }

  deleteSecondaryImages(project_id: number) {
    return this.http.post(this.prefixUrlMedia + '/delete/secondary', { project_id: project_id });
  }

  deleteMovie(project_id: number) {
    return this.http.post(this.prefixUrlMedia + '/delete/video', { project_id: project_id });
  }

  deleteDonator(donators: Donator[], project_id: number) {
    return this.http.post(this.prefixUrlProject + '/donate/delete', { donators: donators, project_id: project_id });
  }


}
