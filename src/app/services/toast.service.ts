import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  autohide: boolean;
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  constructor() { }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  showSuccess(title: string, message: string, autohide: boolean = true, delay: number = 5000): void {
    this.show('success', title, message, autohide, delay);
  }

  showError(title: string, message: string, autohide: boolean = true, delay: number = 5000): void {
    this.show('error', title, message, autohide, delay);
  }

  showWarning(title: string, message: string, autohide: boolean = true, delay: number = 5000): void {
    this.show('warning', title, message, autohide, delay);
  }

  showInfo(title: string, message: string, autohide: boolean = true, delay: number = 5000): void {
    this.show('info', title, message, autohide, delay);
  }

  private show(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, autohide: boolean = true, delay: number = 5000): void {
    const toast: ToastMessage = {
      id: this.generateId(),
      type,
      title,
      message,
      autohide,
      delay
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (autohide) {
      setTimeout(() => {
        this.remove(toast.id);
      }, delay);
    }
  }

  remove(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const filteredToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(filteredToasts);
  }

  clear(): void {
    this.toastsSubject.next([]);
  }
}
