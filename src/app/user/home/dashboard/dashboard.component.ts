import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { UserService, DataFileService, DashboardService } from '../../../shared/service/loginapi';
import { DashBoardInfo, PostData } from '../../../shared';
import { sample } from 'rxjs/operator/sample';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { unescapeIdentifier } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  objectKeys = Object.keys;
  _DashBoardArray: Array<DashBoardInfo>;
  _DashBoardInfo = [];
  _PageData: string[] = []//dynamic model array
  _Page: string[] = []//dynamic model arrays  
  _PostData: any[];

  constructor(private elRef: ElementRef, public _UserService: UserService, private _DataFileService: DataFileService, private route: ActivatedRoute, private _DashboardService: DashboardService) {
    this._UserService.CurrentRoutingPage("DashBoard");
    this._DashBoardArray = new Array<DashBoardInfo>();
    this._PostData = [];
    // this._UserService.Pageevent.subscribe(data => { console.log(data);this.Param(data); }).remove;
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

    this._DashboardService.GetTabInformation(`${environment.api_url}` + '/page/data/' + id + '/?tab=dashboard')
      .subscribe(data => {
        this._PageData = data;
        this.GetData();
      });
  }
  // Get Data For Dynamic assign 
  GetData() {
    var row = 0;
    var hElement: HTMLElement = this.elRef.nativeElement;
    var allDivs = hElement.getElementsByClassName('PageData');
    for (var i = 0; i < allDivs.length; i++) {
      allDivs[i].innerHTML = '';
    }

    this._DashboardService.GetTabInformation(`${environment.api_url}` + 'template/?tab=dashboard').subscribe(data => {
      this._PostData = [];
      this._Page = data;
      data.forEach(element => {

        this._DashBoardArray.push(element);
        row = row + element.btstrp_size;
        if (row === 12) {
          this._DashBoardInfo.push(this._DashBoardArray);
          this._DashBoardArray = new Array<DashBoardInfo>();
          row = 0;
        }

      });

    });
    setTimeout(() => {

      if (this._PageData != undefined && this._Page != undefined) {
        Object.entries(this._Page).forEach(([k, Pg]) => {
          Object.entries(this._PageData['time_of_day_anylsis']).forEach(([key, value]) => {
            if (Pg['rubric_name'] == key && Pg['representation'] == 'post') {
              this._DashboardService.GetTabInformation(`${environment.api_url}` + '/post/' + value).subscribe(data => {
                if (data != null) {
                  var hElement: HTMLElement = this.elRef.nativeElement;
                  var allDivs = hElement.getElementsByClassName(Pg['rubric_name']);                  
                  var PostData = "<div class=\"card-image\" data-header-animation=\"true\"><a href=\"#pablo\"><img class=\"img\" src=\"https://demos.creative-tim.com/material-dashboard-pro/assets/img/card-2.jpeg\"></a></div><div class=\"card-content\"><div class=\"card-actions\"><button type=\"button\" class=\"btn btn-danger btn-simple fix-broken-card\"><i class=\"material-icons\">build</i> Fix Header!</button><button type=\"button\" class=\"btn btn-default btn-simple\" rel=\"tooltip\" data-placement=\"bottom \" title=\"\" data-original-title=\"View\"><i class=\"material-icons \">art_track</i></button><button type=\"button\" class=\"btn btn-success btn-simple \" rel=\"tooltip \" data-placement=\"bottom \" title=\"\" data-original-title=\"Edit\"><i class=\"material-icons\">edit</i>/<button><button type=\"button\" class=\"btn btn-danger btn-simple \" rel=\"tooltip \" data-placement=\"bottom \" title=\"\" data-original-title=\"Remove \"><i class=\"material-icons\">close</i></button></div><h4 class=\"card-title\"><a href=\"#pablo \">"+data.text+"</a></h4><div class=\"card-description\"></div></div><div class=\"card-footer\"><div class=\"price\"><h4>" + data.shares + " Shares</h4></div><div class=\"stats pull-right\"><p class=\"category\"><i class=\"material-icons\">place</i> " + data.likes + " Likes," + data.comments['count'] + " Comments</p></div></div>";
                  allDivs[0].innerHTML = PostData;
                  
                }
              });
            }
          });
        });

        Object.entries(this._PageData).forEach(([key, value]) => {
          Object.entries(this._Page).forEach(([k, Pg]) => {
            if (Pg['representation'] == 'line' && value != undefined && value != null) {
              Object.entries(value).forEach(([key, value]) => {
                if (Pg['rubric_name'] == key) {
                  var Strvalue = [];
                  let colorNumber = 1;
                  Object.entries(value).forEach(([key, value]) => {
                    if (key !== 'labels') {
                      Strvalue.push({
                        data: value,
                        label: key,
                        borderColor: this.dynamicColors(colorNumber),
                        fill: false
                      });
                      if (colorNumber < 5) { colorNumber++; } else { colorNumber = 0; }
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
                  let colorNumber = 1;
                  Object.entries(value).forEach(([key, value]) => {
                    if (key !== 'labels') {
                      Strvalue.push({
                        label: key,
                        backgroundColor: this.dynamicColors(colorNumber),
                        data: value,
                      });
                      if (colorNumber < 5) { colorNumber++; } else { colorNumber = 0; }
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
          text: ''
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
          text: ''
        }
      },
      data: {
        labels: labels,
        datasets: series
      }
    });
  }
  dynamicColors(color: number) {
    if (color === 1) {
      return '#f5593d';
    } else if (color === 2) {
      return '#fbc658';
    } else if (color === 3) {
      return '#6bd098';
    } else if (color === 4) {
      return '#51bcda';
    } else if (color === 5) {
      return '#51cbce';
    } else {
      return '#f5593d';
    }
  }
}


// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { UserService, DataFileService, DashboardService } from '../../../shared/service/loginapi';
// import { DashBoardInfo } from '../../../shared'
// import { sample } from 'rxjs/operator/sample';
// import { ActivatedRoute, Router } from '@angular/router';
// import { environment } from '../../../../environments/environment';
// import { unescapeIdentifier } from '@angular/compiler';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   _DashBoardArray: Array<DashBoardInfo>
//   _DashBoardInfo = [];
//   _PageData: string[] = []//dynamic model array
//   _Page: string[] = []//dynamic model array
//   constructor(public _UserService: UserService, private _DataFileService: DataFileService, private route: ActivatedRoute, private _DashboardService: DashboardService) {
//     this._UserService.CurrentRoutingPage("DashBoard");
//     this._DashBoardArray = new Array<DashBoardInfo>();
//     this._UserService.Pageevent.subscribe(data => { this.Param(data); })
//   }

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       const id = +params['id'];
//       if (id > 0) {
//         this.Param(id);
//       }
//     });
//   }
//   Param(id) {
//     this._DashboardService.GetTabInformation(`${environment.api_url}` + '/page/data/' + id + '/?tab=dashboard').subscribe(data => { this._PageData = data; this.GetData() });
//   }
//   //Get Data For Dynamic assign 
//   GetData() {
//     var row = 0;
//     this._DashboardService.GetTabInformation(`${environment.api_url}` + 'template/?tab=dashboard').subscribe(data => {
//       this._Page = data;
//       data.forEach(element => {
//         this._DashBoardArray.push(element)
//         row = row + element.btstrp_size
//         if (row == 12) {
//           this._DashBoardInfo.push(this._DashBoardArray);
//           this._DashBoardArray = new Array<DashBoardInfo>();
//           row = 0;
//         }
//       });
//     });
//     setTimeout(() => {
//       if (this._PageData != undefined && this._Page != undefined) {
//         Object.entries(this._PageData).forEach(([key, value]) => {
//           Object.entries(this._Page).forEach(([k, Pg]) => {
//             if (Pg['representation'] == 'line' && value != undefined && value != null) {
//               Object.entries(value).forEach(([key, value]) => {
//                 if (Pg['rubric_name'] == key) {
//                   var Strvalue = [];
//                   Object.entries(value).forEach(([key, value]) => {
//                     if (key !== 'labels') {
//                       Strvalue.push({
//                         data: value,
//                         label: key,
//                         borderColor: this.dynamicColors(),
//                         fill: false
//                       });
//                     }
//                   });
//                   this.Line(key, value['labels'], Strvalue);
//                 }
//               });
//             }
//             else if (Pg['representation'] == 'bar' && value != undefined && value != null) {
//               Object.entries(value).forEach(([key, value]) => {
//                 if (Pg['rubric_name'] == key) {
//                   var Strvalue = [];
//                   Object.entries(value).forEach(([key, value]) => {
//                     if (key !== 'labels') {
//                       Strvalue.push({
//                         label: key,
//                         backgroundColor: this.dynamicColors(),
//                         data: value,
//                       });
//                     }
//                   });
//                   this.Bar(key, value['labels'], Strvalue);
//                 }
//               });
//             }
//           });
//         });
//       }
//     }, 1000);
//   }
//   //Line chart funtion
//   Line(chartname, labels, series) {
//     new Chart(document.getElementById(chartname), {
//       type: 'line',
//       data: {
//         labels: labels,
//         datasets: series
//       },
//       options: {
//         title: {
//           display: true,
//           text: 'Adjusted likes per post type'
//         }
//       }
//     });
//   }
//   //Bar Char Funtion
//   Bar(chartname, labels, series) {
//     Chart.Bar(chartname, {
//       options: {
//         legend: { display: true },
//         title: {
//           display: true,
//           text: 'Adjusted likes per post type'
//         }
//       },
//       data: {
//         labels: labels,
//         datasets: series
//       }
//     });
//   }
//   dynamicColors() {
//     var r = Math.floor(Math.random() * 255);
//     var g = Math.floor(Math.random() * 255);
//     var b = Math.floor(Math.random() * 255);
//     return "rgb(" + r + "," + g + "," + b + ")";
//   }
// }

