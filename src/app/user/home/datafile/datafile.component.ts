import { Component, OnInit } from '@angular/core';
import { DataFileService, UserService, RegistersService } from '../../../shared/service/loginapi';
import { CompititorLinks } from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { debuglog } from 'util';
@Component({
  selector: 'app-datafile',
  templateUrl: './datafile.component.html',
  styleUrls: ['./datafile.component.css']
})
export class DatafileComponent implements OnInit {
  _CompititorLinks: CompititorLinks;
  public _TableName = [];
  items: string[] = []//dynamic model array
  public _TableHeader = [];
  public _TableBody = [];
  _CurrentRouting: string;
  constructor(private _DataFileService: DataFileService, private _UserService: UserService, private _RegistersService: RegistersService, private route: ActivatedRoute) {
    this._CompititorLinks = new CompititorLinks();
    this._TableName = [];
    this._UserService.CurrentRoutingPage("DataFile");// it for select current page code in afterlogin layout 
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      this._TableName = [];
      const id = +params['id'];
      if (id > 0) {
        // In a real app: dispatch action to load the details here.
        this._DataFileService.GetDataFile('page/data/' + id + '/?table=True').subscribe(data => {
          this._CurrentRouting = sessionStorage.getItem('competitors')
          Object.entries(data).forEach(([key, value]) => {
            if (typeof (value) == 'object') {
              this._TableName.push({ name: `${key}` })
              this.items[`${key}`] = value; // "a 5", "b 7", "c 9"
            }
          });
          if (this._TableName.length > 0) {
            //Order By Code here
            this.Sort(this._TableName, 'name');
            this.GetTableDataFile(this._TableName[0].name)
          }
        });
      }
    });
  }

  GetTableDataFile(TableName) {
    for (let key in this.items) {
      if (key === TableName) {
        this._TableHeader = [];
        this._TableBody = [];
        var _Body = [];//Declare only Sort Array Value
        Object.entries(this.items['' + key + '']).forEach(([key, value]) => {
          this._TableHeader.push({ name: `${key}`, index: `${key}` === "labels" ? 'A' : 'B' });
          _Body.push({ value: value, index: `${key}` === "labels" ? 'A' : 'B' });
        });
        this.Sort(this._TableHeader, 'index');
        this.Sort(_Body, 'index');
        var obj = this;
        _Body.forEach(function (x) { return obj._TableBody.push(x['value']) });
      }
    }

  }
  Sort(obj, name) {
    obj.sort((a: any, b: any) => {

      if (a[name] < b[name]) {
        return -1;
      } else if (a[name] > b[name]) {
        return 1;
      } else {
        return 0;
      }
    });

  }
}
