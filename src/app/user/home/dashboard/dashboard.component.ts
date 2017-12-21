import { Component, OnInit, AfterViewInit } from '@angular/core';
import  'D:/COLLIO/COLLIO/src/assets/UserPanel/assets/js/demo.js'
declare var demo: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alert('adsfdsa')
  }
  ngAfterViewInit() {    
    demo.initDashboardPageCharts();
  }
}
