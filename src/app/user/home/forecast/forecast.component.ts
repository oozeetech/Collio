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
  constructor(public _UserService: UserService, private _DataFileService: DataFileService, private route: ActivatedRoute, private _DashboardService: DashboardService) {
    this._UserService.CurrentRoutingPage("forecast");
    this._DashBoardArray = new Array<DashBoardInfo>();
  }

  ngOnInit() {
    var row = 0;
    this._DashboardService.GetTabInformation(`${environment.api_url}` + 'template/?tab=forecast').subscribe(data => {
      console.log(data);
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
  }

}
