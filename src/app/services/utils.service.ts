import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _message: MessageService,
    private _http: HttpClient
  ) { }

  markAllFieldsAsDirty = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsDirty();
      if (control instanceof FormGroup) {
        this.markAllFieldsAsDirty(control);
      }
    });
    this._message.alertWithIcon('Atenção!', 'Existem campos obrigatórios não preenchidos ou incorretos.', 'warning');
  }

  queryCEP = (cep: string) => {
    cep = cep.replace(/\D/g, '');
    // verifica se campo cep possui valor informado.
    if (cep !== '') {
      // regex para validar o CEP.
      const validaCep = /^[0-9]{8}$/;
      // valida o formato do CEP.
      if (validaCep.test(cep)) {
        return this._http.get<any>(`https://viacep.com.br/ws/${cep}/json`);
      } else {
        this._message.alertWithIcon('Atenção!', 'CEP inválido.', 'warning');
        return of({})
      }
    }
    return of({})
  }

  maskNumbers = (number: string) => {
    number = number.replace(/\D/g, '');
    return number;
  };

  maskLetters = (letter: string) => {
    letter = letter.replace(/[^a-zA-Z ]/g, '');
    return letter;
  };

  maskCEP = (cep: string) => {
    cep = this.maskNumbers(cep);
    cep = cep.replace(/^(\d{2})(\d)/, '$1.$2'); // após dois valores colocar o ponto (.)
    cep = cep.replace(/\.(\d{3})(\d)/, '.$1-$2'); // após três valores colocar o hífen (-)
    return cep;
  };

  maskDate = (date: string) => {
    date = this.maskNumbers(date);
    date = date.replace(/(\d{2})(\d)/, '$1/$2');
    date = date.replace(/(\d{2})(\d)/, '$1/$2');
    return date;
  };

  maskCNPJ = (cnpj: string) => {
    cnpj = this.maskNumbers(cnpj);
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    return cnpj;
  };

  maskCPF = (cpf: string) => {
    cpf = this.maskNumbers(cpf);
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1-$2');
    return cpf;
  };

  maskRG = (rg: string) => {
    rg = this.maskNumbers(rg);
    rg = rg.replace(/(\d{2})(\d)/, '$1.$2');
    rg = rg.replace(/(\d{3})(\d)/, '$1.$2');
    rg = rg.replace(/(\d{3})(\d)/, '$1-$2');
    return rg;
  };

  maskCellPhone = (cellPhone: string) => {
    cellPhone = this.maskNumbers(cellPhone);
    cellPhone = cellPhone.replace(/(\d{1})(\d)/, '($1$2) ');
    cellPhone = cellPhone.replace(/(\d{5})(\d)/, '$1-$2');
    return cellPhone;
  };

}
