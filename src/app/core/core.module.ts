import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { MessageControlErrorComponent } from './message-control-error/message-control-error.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MessageControlErrorComponent,
  ],
  imports: [CommonModule],
  exports: [NavbarComponent, FooterComponent, MessageControlErrorComponent],
})
export class CoreModule {}
