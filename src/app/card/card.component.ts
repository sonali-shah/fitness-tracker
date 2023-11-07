import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input()
  title!: string;
  @Input()
  subtitle!: string;
  @Input() showFooter = true;

  // You can add more properties and class bindings here
}