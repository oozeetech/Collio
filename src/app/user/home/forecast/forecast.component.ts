import { Component, OnInit } from '@angular/core';
import { UserService, DataFileService, DashboardService } from '../../../shared/service/loginapi';
import { DashBoardInfo } from '../../../shared'
import { sample } from 'rxjs/operator/sample';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  _DashBoardArray: Array<DashBoardInfo>
  _DashBoardInfo = [];
  _PageData: string[] = []//dynamic model array
  _Page: string[] = []//dynamic model array
  constructor(public _UserService: UserService, private _DataFileService: DataFileService, private route: ActivatedRoute, private _DashboardService: DashboardService) {
    this._UserService.CurrentRoutingPage("forecast");
    this._DashBoardArray = new Array<DashBoardInfo>();
  }

  ngOnInit() {
    this.Param(31);
  }
  Param(id) {
    this._DashboardService.GetTabInformation(`${environment.api_url}` + '/page/data/' + id + '/?tab=forecast').subscribe(data => { this._PageData = data; console.log(data); this.GetData() });
  }
  GetData() {
    var row = 0;
    this._DashboardService.GetTabInformation(`${environment.api_url}` + 'template/?tab=forecast').subscribe(data => {
      console.log(data);
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
        Object.entries(this._Page).forEach(([k, Pg]) => {
          Object.entries(this._PageData).forEach(([key, value]) => {
            if (Pg['representation'] == 'line' && value != undefined && value != null && Pg['rubric_name'] == key) {
              var Strvalue = [];
              var label = value['ds'];
              Object.entries(value).forEach(([key, value]) => {
                if (key !== 'ds') {
                  Strvalue.push({
                    data: value,
                    label: key,
                    borderColor: this.dynamicColors(),
                    fill: false
                  });
                }
              });
              this.Line(Pg['rubric_name'], label, Strvalue);
              return false;
            }
            ;
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
        legend: { display: true },
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
