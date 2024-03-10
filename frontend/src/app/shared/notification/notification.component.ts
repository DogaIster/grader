import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  messagesChange: Observable<string[]>;

  constructor(public notificationService: NotificationService) {
    this.messagesChange = notificationService.messagesChange;
  }
}
