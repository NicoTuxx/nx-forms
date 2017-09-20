import { Component, Input, Output, EventEmitter } from '@angular/core';
import { generateGuid, AssetService } from '../index';

@Component({
  selector: 'nx-select',
  templateUrl: './nx-select.component.html',
  styleUrls: ['../main.scss', './nx-select.component.scss']
})
export class NxSelectComponent {
  @Input() required: boolean;
  @Input() label: string;
  @Input() model: any;
  @Input() options: any[];
  @Input() alert: string;
  @Input() disabled: boolean;
  @Input() locale: string;
  @Output() ngModelChange = new EventEmitter();

  selectName: string;
  valid = false;
  submitted = false;

  constructor(private assetService: AssetService) {
    this.selectName = generateGuid();
  }

  isValid(): boolean {
    this.submitted = true;
    this.valid = true;
    if (this.required && this.model === '') {
      this.assetService.get('alert.required', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    }
    return this.valid;
  }
}
