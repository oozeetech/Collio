import { Component, OnInit, ElementRef } from '@angular/core';
import { EmployeeInfo, JwtService } from '../../shared';
import { UserService } from '../../shared/service/loginapi/user.service';
import { RegistersService } from '../../shared/service/loginapi/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    _EmployeeInfo: EmployeeInfo;
    _ErrorEmail: string;
    _ErrorPassword: string;
    constructor(private _UserService: UserService, private elRef: ElementRef, public router: Router, public _JwtService: JwtService, public _RegistersService: RegistersService) {
        this._JwtService.destroyToken();
    }
    //page initialization code here
    ngOnInit() {
        this._EmployeeInfo = new EmployeeInfo();
        this._EmployeeInfo.email = "";
        this._EmployeeInfo.password = "";
        document.getElementById("email").focus();
    }
    //login button click event..
    Getauthentication() {
        if (this._EmployeeInfo.email != undefined && this._EmployeeInfo.password != undefined) {
            if (this._EmployeeInfo.email.length > 0 && this._EmployeeInfo.password.length > 0) {
                this._UserService.attemptAuth("rest-auth/login/", this._EmployeeInfo).subscribe(data => {
                    this._RegistersService.GetUserDetails('rest-auth/user/').subscribe(data => {
                        // sessionStorage.setItem("pk",data.pk.toString());
                        sessionStorage.setItem("username", (data.username) ? data.username : "");
                        sessionStorage.setItem("email", (data.email) ? data.email : "");
                        sessionStorage.setItem("first_name", (data.first_name) ? data.first_name : "");
                        sessionStorage.setItem("last_name", (data.last_name) ? data.last_name : "");
                        //sessionStorage.setItem("id",data.id.toString());
                        sessionStorage.setItem("phone_number", (data.phone_number) ? data.phone_number : "");
                        sessionStorage.setItem("access_token", data.access_token);
                        sessionStorage.setItem("email_sub", data.email_sub == true ? "true" : "false");
                    })
                    sessionStorage.setItem("EmployeeInfo", this._EmployeeInfo.email); this.router.navigateByUrl('home');
                },
                    error => {
                        var obj = error;
                        this._ErrorPassword = Object.keys(obj)[0] + " : " + obj[Object.keys(obj)[0]];
                        sessionStorage.removeItem('EmployeeInfo');
                    });
            } else { this.Valid(); }
        }
        else {
            this.Valid();
        }
    }
    //Validation for Email id and password..
    Valid() {

        if (this._EmployeeInfo.email == undefined) {
            this._ErrorEmail = "Please enter email..!!"
        }
        else if (this._EmployeeInfo.email.length == 0) {
            this._ErrorEmail = "Please enter email..!!"
        }
        if (this._EmployeeInfo.password == undefined) {
            this._ErrorPassword = "Please enter password..!!"
        } else if (this._EmployeeInfo.password.length == 0) {
            this._ErrorPassword = "Please enter password..!!"
        }
        setTimeout(() => {
            this._ErrorEmail = "";
            this._ErrorPassword = "";
        }, 2000);

    }
    //page redirect for register code here...!!!
    register() {
        this.router.navigateByUrl('register');
    }
    //Enter Key event
    keyDownFunction(event) {
        if (event.keyCode == 13) {
            this.Getauthentication();
        }
    }
}
