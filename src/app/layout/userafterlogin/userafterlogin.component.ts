import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { EmployeeInfo, CompititorLinks } from '../../shared'
import { UserService } from '../../shared/service/loginapi/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistersService } from '../../shared/service/loginapi/register.service';


@Component({
  selector: 'app-userafterlogin',
  templateUrl: './userafterlogin.component.html',
  styleUrls: ['./userafterlogin.component.css']
})
export class UserafterloginComponent implements OnInit {
  _EmployeeInfo: EmployeeInfo;
  _CurrentRouting: String;
  _CompititorLinks: CompititorLinks;
  _CompititorPage: string;
  _CompititorPageId: number;
  _MemuFlag: boolean;
  constructor(private elementRef: ElementRef, public _UserService: UserService, public router: Router, public _RegistersService: RegistersService, private route: ActivatedRoute) {
    this._EmployeeInfo = new EmployeeInfo();
    this._CompititorLinks = new CompititorLinks();
    this._CompititorPage = '';
    this._CompititorPageId = 0;
    this._UserService.Routingevent.subscribe(data => { this._CurrentRouting = data; document.getElementById("BtnHeader").click(); })
    this._RegistersService.GetCompititorLinks('page/').subscribe(data => {
      this._CompititorLinks = data;
      this._CompititorPage = this._CompititorLinks.results[0]['name'];
      sessionStorage.setItem('competitors', this._CompititorPage)//session storage store for tilte in DataFile 
      this._CompititorPageId = this._CompititorLinks.results[0]['id'];
      sessionStorage.setItem('CompititorPageId', this._CompititorPageId.toString())//session storage store for tilte in DataFile
    });
    this._MemuFlag = true;
  }

  ngOnInit() {
    this._EmployeeInfo.email = sessionStorage.getItem("EmployeeInfo");
    //this.GetUser();        
  }
  //Logout event code here....!
  logout() {
    this._UserService.logOut("rest-auth/logout/").subscribe(data => { this.router.navigateByUrl('/'); });
  }
  ngAfterViewInit() {
    $.getScript('/assets/UserPanel/assets/js/material-dashboard.js');
    //$.getScript('/assets/UserPanel/assets/js/demo.js', function (demo) { demo.initDashboardPageCharts(); });
  }
  ngOnDestroy() {
    //destory object in subscribe for home.compoent.ts
    this._UserService.Routingevent.subscribe().unsubscribe();
  }
  //Memu Item name change code here
  CompititorPage(item) {
    this._CompititorPage = item.name;
    this._CompititorPageId = item.id;

    $(".dropdown-content").css('display', 'none');
    sessionStorage.setItem('competitors', item.name)
    $("#DropDown").attr('class', 'fa fa-angle-down pull-right')
  }
  //DropDown open close event
  DropDown() {
    this._MemuFlag = false;
    $("#DropDown").hasClass("fa fa-angle-up") == true ? $("#DropDown").attr('class', 'fa fa-angle-down pull-right') : $("#DropDown").attr('class', 'fa fa-angle-up pull-right');
    $("#DropDown").hasClass("fa fa-angle-up") == true ? $(".dropdown-content").css('display', 'block') : $(".dropdown-content").css('display', 'none');
  }
  ATag() {
    if (this._MemuFlag) {
      this.router.navigateByUrl('/home/dashboard/' + this._CompititorPageId);
    }
    this._MemuFlag = true;
  }
}
