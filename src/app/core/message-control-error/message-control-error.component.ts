import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-message-control-error',
  template: `
    <div *ngIf='(control?.hasError(error) && control?.dirty) || (control?.hasError(error) && control?.touched)'>
      <div class='message-error'>
        {{ msg }}
      </div>
    </div>
  `,
  styles: [
    `
      .message-error {
        color: var(--color-invalid);
        font-size: 13px;
        padding: 0px 0px 5px 0px;
      }
    `
  ]
})

export class MessageControlErrorComponent {

  @Input() error!: string;
  @Input() msg!: string;
  @Input() control!: AbstractControl | null;

}
