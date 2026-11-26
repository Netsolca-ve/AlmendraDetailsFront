// Único lugar con los datos de contacto: lo usan navbar, footer, home y la página de contacto (el mapa queda en su HTML porque un iframe con [src] dinámico exige DomSanitizer).
const WHATSAPP_NUMBER = '584241576339'; // formato internacional sin "+" ni espacios: wa.me no acepta el "+"

export const CONTACT_INFO = {
  email: 'almendradetails@gmail.com',
  location: 'Tienda online ubicada en Delicias',
  locationShort: 'Delicias',
  hours: 'Lun - Dom: 10:00 AM - 10:00 PM',
  hoursShort: '10 AM - 10 PM',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: 'https://www.instagram.com/almendra.details/',
  tiktok: 'https://www.tiktok.com/@almendra.details'
};
