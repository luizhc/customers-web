import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  simpleAlert(title: string) {
    Swal.fire(title);
  }

  alertWithIcon(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire(title, message, type);
  }

  async confirmBox(register: string, message: string): Promise<boolean> {
    const result = await Swal.fire({
      title: `Tem certeza que deseja remover ${register}?`,
      text: 'Você não poderá mais recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
    if (result.value) {
      Swal.fire(
        'Excluído',
        `${message} excluído com sucesso.`,
        'success'
      );
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        `${message} mantido com sucesso.`,
        'error'
      );
    }
    return false;
  }
}