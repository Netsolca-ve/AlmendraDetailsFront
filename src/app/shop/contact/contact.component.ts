import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CONTACT_INFO } from '../../shared/contact-info';

@Component({
  selector: 'app-contact',
  imports: [MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact = CONTACT_INFO;

  // Sin backend todavía: el formulario arma el mensaje y lo abre en WhatsApp
  sendToWhatsApp(event: Event, name: string, lastName: string, message: string) {
    event.preventDefault();
    const text = `Hola, soy ${name} ${lastName}. ${message}`;
    window.open(`${this.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}
