import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
@IonicPage()
@Component({
  selector: 'page-donation',
  templateUrl: 'donation.html',
})
export class DonationPage {
  @ViewChild('donation_input') donation_input: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

  }
  donate() {
    if (this.checkIfDigits() == true) {
      this.viewCtrl.dismiss(this.donation_input.value);
    }
    else {
      alert("Enter Only Digits!");
    }
  }

  checkIfDigits() {
    let value: string = this.donation_input.value;
    return value.match(/^[0-9]+$/) != null
  }
}
