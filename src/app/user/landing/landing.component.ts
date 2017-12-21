import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUs, ContactUsService, ContactUsError } from '../../shared'
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  _ContactUs: ContactUs;
  _ContactUsError: ContactUsError;
  constructor(public router: Router, public _ContactUsService: ContactUsService) {
    this._ContactUs = new ContactUs();
    this._ContactUsError = new ContactUsError();
  }

  ngOnInit() {    
    jQuery('head').append('<link title="HomePanel" rel="stylesheet" rel="nofollow" href="../../../assets/HomePanel/assets/css/bootstrap.min.css" type="text/css" /><link title="HomePanel" rel="stylesheet" rel="nofollow" href="../../../assets/HomePanel/assets/css/paper-kit.css" type="text/css" /><link title="HomePanel" rel="stylesheet" rel="nofollow" href="../../../assets/HomePanel/assets/css/nucleo-icons.css" type="text/css" />');
  }
  Login() {
    $('link[title="HomePanel"]').remove();
    this.router.navigateByUrl('login');
  }
  //Validation for Email id and password..
  Valid() {

    var boolean = true;
    if (this._ContactUs.email == undefined) {
      this._ContactUsError.email = "Please enter email..!!"
      boolean = false;
    }
    else if (this._ContactUs.email.length == 0) {
      this._ContactUsError.email = "Please enter email..!!"
      boolean = false;
    } else {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!this._ContactUs.email.match(mailformat)) {
        this._ContactUsError.email = "You have entered an invalid email address!";
        boolean = false;
      }
    }
    if (this._ContactUs.name == undefined) {
      this._ContactUsError.name = "Please enter your name..!!"
      boolean = false;
    }
    else if (this._ContactUs.name.length == 0) {
      this._ContactUsError.name = "Please enter your name..!!"
      boolean = false;
    }
    if (this._ContactUs.text == undefined) {
      this._ContactUsError.text = "Please enter text msg..!!"
      boolean = false;
    } else if (this._ContactUs.text.length == 0) {
      this._ContactUsError.text = "Please enter text msg..!!"
      boolean = false;
    }

    if (boolean == false) {
      setTimeout(() => {
        this._ContactUs = new ContactUs();
        this._ContactUsError = new ContactUsError();
      }, 2000);
    }
    return boolean;
  }
  //contact us button click event..
  SendMsg() {

    if (this.Valid()) {
      this._ContactUsService.SendEmail("message/", this._ContactUs).subscribe(data => {
        if (data['id'] > 0) { this._ContactUsError.text = "Send Successfully...''';" }
      },
        error => {
          var obj = error;
          this._ContactUsError.text = Object.keys(obj)[0] + " : " + obj[Object.keys(obj)[0]];
        });
    }
    setTimeout(() => {
      this._ContactUs = new ContactUs();
      this._ContactUsError = new ContactUsError();
    }, 2000);
  }

}
