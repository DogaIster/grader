import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {
  private messagesSource = new BehaviorSubject<string[]>([]);
  messagesChange: Observable<string[]> = this.messagesSource.asObservable();

  constructor() { }

  add(message: string): void {
    const messages = this.messagesSource.getValue();
    messages.push(message);
    this.messagesSource.next(messages);
    setTimeout(() => this.clear(), 5000); // Clear message after 5 seconds
  }

  clear(): void {
    this.messagesSource.next([]);
  }
}
