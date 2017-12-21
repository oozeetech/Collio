import { Component, OnInit } from '@angular/core';
import { UserNotificationService } from '../../../shared/service/loginapi'
import { UserNotification } from '../../../shared/model'
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-usernotification',
  templateUrl: './usernotification.component.html',
  styleUrls: ['./usernotification.component.css']
})
export class UsernotificationComponent implements OnInit {

  _UserNotification: UserNotification;
  constructor(private _UserNotificationService: UserNotificationService) {
    this._UserNotification = new UserNotification();
    this.GetNotification(`${environment.api_url}` + 'notification/?limit=10');

  }
  ngOnInit() {
  }
  BtnNotification(Url) {
    this.GetNotification(Url)
  }
  GetNotification(Url) {
    if (Url != null) {
      this._UserNotificationService.GetNotification(Url).subscribe(data => {
        this._UserNotification.count = data.count,
          this._UserNotification.next = data.next,
          this._UserNotification.previous = data.previous,
          this._UserNotification.results = data.results;
      })
    }
  }
  NotificationDelete(id) {

    this._UserNotificationService.DeleteNotification('notification/' + id + '/').subscribe(data => { this.GetNotification(`${environment.api_url}` + 'notification/?limit=10'); });
  }
}

