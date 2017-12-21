import { Component, OnInit, ElementRef } from '@angular/core';
import { ChangePassWord, JwtService, UserInfo } from '../../../shared';
import { RegistersService } from '../../../shared/service/loginapi/register.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.css']
})
export class UsersettingComponent implements OnInit {
  _ChangePassWord: ChangePassWord;
  _UserInfo: UserInfo;
  _ChangePasswordError: string;
  _UpdateProfileError: string;
  constructor(public _RegistersService: RegistersService, private elRef: ElementRef, public router: Router) {
    this._ChangePassWord = new ChangePassWord();
    this._UserInfo = new UserInfo();
  }
  GetUserProfile() {

    this._UserInfo.first_name = sessionStorage.getItem("first_name");
    this._UserInfo.last_name = sessionStorage.getItem("last_name");
    this._UserInfo.phone_number = sessionStorage.getItem("phone_number");
    this._UserInfo.username = sessionStorage.getItem("username");
    this._UserInfo.email_sub = (sessionStorage.getItem("email_sub") === "true");
    this._UserInfo.access_token = sessionStorage.getItem("access_token");
    this._UserInfo.email = sessionStorage.getItem("email");

  }
  ngOnInit() {
    if (sessionStorage.getItem("username") != null) {
      this.GetUserProfile();
    } else {
      this._UserInfo.username = ' ';
    }
    document.getElementById("old_password").focus();
  }
  //Required funtion for UserProfile
  RequiredForUseProfile() {
    var cnt = 0;
    var boolean = false;
    var hElement: HTMLElement = this.elRef.nativeElement;
    var allDivs = hElement.getElementsByClassName('Profile');//Profile is class name for acccess all input controll
    for (var i = 0; i < allDivs.length; i++) {
      if (allDivs[i]['value'].replace(' ', '') != sessionStorage.getItem(allDivs[i]['name'])) {
        cnt = cnt + 1;
      }
    }
    if (cnt > 0) {
      if (this._UserInfo.username.replace(' ', '').length === 0) {
        boolean = false;
      }
      else {
        boolean = true;
      }
    }
    return boolean;
  }
  //Change For UserProfile
  UpdateProfile() {

    if (this._UserInfo.username) {
      this._RegistersService.UpdateUserDetails("rest-auth/user/", this._UserInfo).subscribe(data => {

        this._UpdateProfileError = "Profile saved successfully";
        setTimeout(() => {
          this._UpdateProfileError = "";
        }, 2000);
        var obj = data;
        sessionStorage.setItem("username", (data.username) ? data.username : "");
        sessionStorage.setItem("email", (data.email) ? data.email : "");
        sessionStorage.setItem("first_name", (data.first_name) ? data.first_name : "");
        sessionStorage.setItem("last_name", (data.last_name) ? data.last_name : "");
        sessionStorage.setItem("phone_number", (data.phone_number) ? data.phone_number : "");
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("email_sub", data.email_sub);
      }
        , error => {

          var obj = error;
          this._UpdateProfileError = Object.keys(obj)[0] + " : " + obj[Object.keys(obj)[0]][0];
          setTimeout(() => {
            this._UpdateProfileError = "";
          }, 2000);
        });
    }

  }
  // funtion for ChangePassWord
  PostChangePassword() {

    this._RegistersService.ChangePassword("rest-auth/password/change/", this._ChangePassWord).subscribe(data => {

      var obj = data;
      this._ChangePasswordError = data.detail;
      setTimeout(() => {
        this._ChangePasswordError = "";
      }, 2000);
      this._ChangePassWord = new ChangePassWord();

    }
      , error => {

        var obj = error;
        this._ChangePasswordError = obj[Object.keys(obj)[0]][0];
        setTimeout(() => {
          this._ChangePasswordError = "";

        }, 2000);
      });


  }
  //required filed validation here....!
  RequiredForPassWord() {
    var boolean = true;
    var hElement: HTMLElement = this.elRef.nativeElement;
    var allDivs = hElement.getElementsByClassName('required');
    for (var i = 0; i < hElement.getElementsByTagName('p').length; i++) {
      hElement.getElementsByTagName('p')[i].innerText = '';
    }
    for (var i = 0; i < allDivs.length; i++) {
      if (allDivs[i]['value'].replace(' ', '').length === 0) {
        //hElement.getElementsByTagName('p')[i].innerText = allDivs[i]['id'] + ' is Compalsory..';
        boolean = false;
      }
    }
    if (boolean) {
      if (this._ChangePassWord.new_password1 !== this._ChangePassWord.new_password2) {
        hElement.getElementsByTagName('p')[2].innerText = "password1 or passowrd2 dsoesn't Match.....!!";
        boolean = false;
      }
    }
    return boolean;
  }

  //clear code here...!
  clear() {
    var hElement: HTMLElement = this.elRef.nativeElement;
    var allDivs = hElement.getElementsByClassName('required');
    for (var i = 0; i < hElement.getElementsByTagName('p').length; i++) {
      hElement.getElementsByTagName('p')[i].innerText = '';
    }
  }
  //Profile Update For change filed value 
  ProfileUpdate() {
    if (this.RequiredForUseProfile()) {
      this.UpdateProfile();
    }
    if (this.RequiredForPassWord()) {
      this.PostChangePassword();
    }
    else {
      this._ChangePassWord = new ChangePassWord();
    }
  }
}
