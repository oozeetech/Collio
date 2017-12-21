import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService, DataFileService, DashboardService } from '../../../shared/service/loginapi';
import { DashBoardInfo } from '../../../shared'
import { sample } from 'rxjs/operator/sample';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  _DashBoardArray: Array<DashBoardInfo>
  _DashBoardInfo = [];
  _PageData: string[] = []//dynamic model array
  constructor(public _UserService: UserService, private _DataFileService: DataFileService, private route: ActivatedRoute, private _DashboardService: DashboardService) {
    this._UserService.CurrentRoutingPage("DashBoard");
    this._DashBoardArray = new Array<DashBoardInfo>();
  }

  ngOnInit() {
    // function makeSVGEl(tag, attrs) {
    //   var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    //   for (var k in attrs) {
    //     el.setAttribute(k, attrs[k]);
    //   }
    //   return el;
    // }
    // var svg = document.querySelector("svg.progress-chart");
    // var g = makeSVGEl("g", { class: "ct-grids" });
    // svg.appendChild(g);
    // var dataset = [
    //   { x: 100, y: 33 },
    //   { x: 200, y: 133 },
    //   { x: 300, y: 100 },
    //   { x: 400, y: 100 },
    //   { x: 500, y: 100 },
    //   { x: 600, y: 100 }
    // ];
    // dataset.forEach(function (coords) {
    //   g.appendChild(makeSVGEl("line", {
    //     cx: coords.x,
    //     cy: coords.y,
    //     fill: "blue",
    //     r: 4.5
    //   }));
    // });
    // new Chartist.Line('.ct-chart', {
    //   labels: ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturady"],
    //   series: [[
    //     142,
    //     193,
    //     295,
    //     84,
    //     83,
    //     83,
    //     120
    //   ]
    //   ]
    // }, {
    //     fullWidth: true,
    //     chartPadding: {
    //       right: 40
    //     }
    //   });

    var row = 0;
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id > 0) {
        this._DashboardService.GetTabInformation(`${environment.api_url}` + '/page/data/' + id + '/?tab=dashboard').subscribe(data => { this._PageData = data });
      } else {
        this._DashboardService.GetTabInformation(`${environment.api_url}` + '/page/data/' + sessionStorage.getItem('CompititorPageId') + '/?tab=dashboard').subscribe(data => { this._PageData = data; console.log(this._PageData) });
      }
    });
    this._DashboardService.GetTabInformation(`${environment.api_url}` + 'template/?tab=dashboard').subscribe(data => {
      
      data.forEach(element => {
        this._DashBoardArray.push(element)
        row = row + element.btstrp_size
        if (row == 12) {
          this._DashBoardInfo.push(this._DashBoardArray);
          this._DashBoardArray = new Array<DashBoardInfo>();
          row = 0;
        }
      });
      $.getScript('//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js');
    });
    setTimeout(() => {
      this.AfterViewInit();
    }, 2000);

  }
  AfterViewInit() {

    //jQuery('head').append('<link title="HomePanel" rel="stylesheet" rel="nofollow" href="../../../assets/UserPanel/assets/css/material-dashboard.css" type="text/css" />');
  }
}

