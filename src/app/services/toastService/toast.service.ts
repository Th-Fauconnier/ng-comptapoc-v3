import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class ToastService extends Notyf {

  constructor() {
    super({
      duration: 10000,
      dismissible:true,
      position: {
        x: 'center',
        y: 'bottom',
      }
    })
  }
/* 
   // Notification de succès
  success(message: string) {
    this.success(message);
  }

  // Notification d'erreur
  error(message: string) {
    this.notyf.error(message);
  }

  // Notification personnalisée (ex: Warning configuré plus haut)
  custom(type: string, message: string) {
    this.notyf.open({ type, message });
  }
   */
}