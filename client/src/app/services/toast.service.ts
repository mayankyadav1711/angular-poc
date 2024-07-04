// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastElement: HTMLElement | null = null;

  constructor() {}

  showToast(message: string, duration: number = 3000) {
    if (this.toastElement) {
      this.toastElement.remove();
    }

    this.toastElement = document.createElement('div');
    this.toastElement.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg opacity-0 transition-opacity duration-300 ease-in-out animate-fadeIn';
    this.toastElement.innerText = message;

    document.body.appendChild(this.toastElement);

    setTimeout(() => {
      // Trigger the fade-out animation
      this.toastElement!.classList.remove('animate-fadeIn');
      this.toastElement!.classList.add('animate-fadeOut');
      setTimeout(() => {
        this.toastElement?.remove();
        this.toastElement = null;
      }, 300);
    }, duration);
  }
}
