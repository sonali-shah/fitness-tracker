import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  @Input() sections: AccordionSection[] = [];

  toggleSection(index: number) {
    this.sections[index].open = !this.sections[index].open;
  }
}

export interface AccordionSection {
  open: boolean;
  title: string;
  body: string;
}
