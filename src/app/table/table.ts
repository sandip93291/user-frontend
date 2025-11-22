import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() tableContent: any[] = [];
  @Input() headers:any[] = [];
  @Input() cellTemplates: { [key: string]: TemplateRef<any> } = {};

   getValue(content: any, field: string): any {
    return content[field as keyof any];
  }
}
