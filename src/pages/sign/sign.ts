import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../Classes/User';
import { MainPage } from '../main/main';


declare var jquery: any;
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }
  signUp() {
    $("#main").animate({ left: "22.5%" }, 400);
    $("#main").animate({ left: "30%" }, 500);
    $("#loginform").css("visibility", "hidden");
    $("#loginform").animate({ left: "25%" }, 400);
    $("#signupform").animate({ left: "17%" }, 400);
    $("#signupform").animate({ left: "30%" }, 500);
    $("#signupform").css("visibility", "visible");
  }

  signIn() {
    $("#main").animate({ left: "77.5%" }, 400);
    $("#main").animate({ left: "70%" }, 500);
    $("#signupform").css("visibility", "hidden");
    $("#signupform").animate({ left: "75%" }, 400);
    $("#loginform").animate({ left: "83.5%" }, 400);
    $("#loginform").animate({ left: "70%" }, 500);
    $("#loginform").css("visibility", "visible");
  }

  checkUserInput(email: any, password: any, userProvider: UserProvider, navCtrl: NavController, action: (email: String, password: String, userProvider: UserProvider, navCtrl: NavController) => void) {
    if (email.value.trim() != '' && password.value.trim() != '') {
      action(email.value, password.value, userProvider, navCtrl);
    }
    else {
      alert("You must fill all the fields");
    }
  }

  signUpUser(email: String, password: String, userProvider: UserProvider, navCtrl: NavController) {
    let user = new User(email, password);
    userProvider.registerUser(user).subscribe(data => {
      user.user_id = data['id'];
      navCtrl.setRoot(MainPage, { user_info: user });
    }, err => {
      alert(err.error);
    });
  }

  signInUser(email: String, password: String, userProvider: UserProvider, navCtrl: NavController) {
    let user = new User(email, password);
    userProvider.loginUser(user).subscribe(data => {
      user.user_id = data['id'];
      user.is_admin = data['is_admin'];
      navCtrl.setRoot(MainPage, { user_info: user });
    }, err => {
      alert(err.error);
    });
  }

  goBack() {
    this.navCtrl.setRoot(MainPage, { user_info: null }, { animate: true });
  }
}
