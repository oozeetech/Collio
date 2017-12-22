import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService, DataFileService, DashboardService } from '../../../shared/service/loginapi';
import { DashBoardInfo } from '../../../shared'
import { sample } from 'rxjs/operator/sample';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  _DashBoardArray: Array<DashBoardInfo>
  _DashBoardInfo = [];
  _PageData: string[] = []//dynamic model array
  _Page: string[] = []//dynamic model array
  constructor(public _UserService: UserService, private _DataFileService: DataFileService, private route: ActivatedRoute, private _DashboardService: DashboardService) {
    this._UserService.CurrentRoutingPage("DashBoard");
    this._DashBoardArray = new Array<DashBoardInfo>();
    this._UserService.Pageevent.subscribe(data => { this.Param(data); })
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id > 0) {
        this.Param(id);
      }
    });
  }
  Param(id) {
    this._DashboardService.GetTabInformation(`${environment.api_url}` + '/page/data/' + id + '/?tab=dashboard').subscribe(data => { this._PageData = data; this.GetData() });
  }
  //Get Data For Dynamic assign 
  GetData() {
    var row = 0;
    this._DashboardService.GetTabInformation(`${environment.api_url}` + 'template/?tab=dashboard').subscribe(data => {
      this._Page = data;
      data.forEach(element => {
        this._DashBoardArray.push(element)
        row = row + element.btstrp_size
        if (row == 12) {
          this._DashBoardInfo.push(this._DashBoardArray);
          this._DashBoardArray = new Array<DashBoardInfo>();
          row = 0;
        }
      });
    });
    setTimeout(() => {
      if (this._PageData != undefined && this._Page != undefined) {
        Object.entries(this._PageData).forEach(([key, value]) => {
          Object.entries(this._Page).forEach(([k, Pg]) => {
            if (Pg['representation'] == 'line' && value != undefined && value != null) {
              Object.entries(value).forEach(([key, value]) => {
                if (Pg['rubric_name'] == key) {
                  var Strvalue = [];
                  Object.entries(value).forEach(([key, value]) => {
                    if (key !== 'labels') {
                      Strvalue.push({
                        data: value,
                        label: key,
                        borderColor: this.dynamicColors(),
                        fill: false
                      });
                    }
                  });
                  this.Line(key, value['labels'], Strvalue);
                }
              });
            }
            else if (Pg['representation'] == 'bar' && value != undefined && value != null) {
              Object.entries(value).forEach(([key, value]) => {
                if (Pg['rubric_name'] == key) {
                  var Strvalue = [];
                  Object.entries(value).forEach(([key, value]) => {
                    if (key !== 'labels') {
                      Strvalue.push({
                        label: key,
                        backgroundColor: this.dynamicColors(),
                        data: value,
                      });
                    }
                  });
                  this.Bar(key, value['labels'], Strvalue);
                }
              });
            }
          });
        });
      }
    }, 1000);
  }
  //Line chart funtion
  Line(chartname, labels, series) {
    new Chart(document.getElementById(chartname), {
      type: 'line',
      data: {
        labels: labels,
        datasets: series
      },
      options: {
        title: {
          display: true,
          text: 'Adjusted likes per post type'
        }
      }
    });
  }
  //Bar Char Funtion
  Bar(chartname, labels, series) {
    Chart.Bar(chartname, {
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Adjusted likes per post type'
        }
      },
      data: {
        labels: labels,
        datasets: series
      }
    });
  }
  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
}

