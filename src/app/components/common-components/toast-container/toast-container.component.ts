import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent implements OnInit {
  toasts$!: Observable<ToastMessage[]>;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }

  removeToast(id: string): void {
    this.toastService.remove(id);
  }

  getToastClasses(type: string): string {
    const baseClasses = 'toast show';
    switch (type) {
      case 'success':
        return `${baseClasses} text-bg-success`;
      case 'error':
        return `${baseClasses} text-bg-danger`;
      case 'warning':
        return `${baseClasses} text-bg-warning`;
      case 'info':
        return `${baseClasses} text-bg-info`;
      default:
        return `${baseClasses} text-bg-primary`;
    }
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'error':
        return 'bi-x-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  }
}
