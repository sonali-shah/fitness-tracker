import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    // Remove any non-digit characters from the input
    const sanitizedValue = value.replace(/\D/g, '');

    // Check if the input is a 16-digit number
    if (sanitizedValue.length !== 16) {
      throw new Error('Invalid credit card number. It should have exactly 16 digits.');
    }

    // Format the 16-digit number with dashes every 4 digits
    return sanitizedValue.replace(/(.{4})/g, '$1-');
  }
}