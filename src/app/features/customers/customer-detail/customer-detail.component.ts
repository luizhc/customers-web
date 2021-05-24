import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { MessageService } from '../../../services/message.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  form!: FormGroup;
  today = new Date().toJSON().split('T')[0];
  disabledSave = false;
  loading = false;
  buttonSave = 'Cadastrar';
  @ViewChild('addressNumber') addressNumber!: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private _customer: CustomerService,
    private _message: MessageService,
    public _utils: UtilsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.checkOperation();
  }

  buildForm() {
    this.form = this._fb.group({
      _id: new FormControl({ value: null, disabled: false }),
      businessKey: ['', Validators.required],
      name: ['', Validators.required],
      birthday: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      gender: [''],
      address: this._fb.group({
        zipCode: ['', [Validators.required]],
        street: [null],
        complement: [null],
        number: [null],
        neighborhood: [null],
        city: [null],
        state: [null],
        country: [null]
      }),
      about: ['']
    });
  }

  checkOperation() {
    this.loading = true;
    const _id = this._route.snapshot.paramMap.get('id');
    if (_id) {
      this.buttonSave = 'Atualizar';
      this._customer.findById(_id)
        .subscribe(
          res => {
            this.form.patchValue(res);
            this.loading = false;
          },
          () => {
            this.loading = false;
            this._message.alertWithIcon('Atenção!', 'Houve um problema na requisição, tente novamnete!', 'error');
          }
        );
    }
  }

  save() {
    if (this.form.valid) {
      if (this.form.get('_id')?.value) {
        this._customer.update(this.form.get('_id')?.value, this.form.value)
          .subscribe(
            res => {
              this._message.alertWithIcon('Parabéns!', `Cliente <strong>${res.name}</strong> atualizado com sucesso.`, 'success');
              this._utils.navigateTo('clientes');
            },
            () => {
              this._message.alertWithIcon('Atenção!', 'Houve um problema na requisição, tente novamnete!', 'error');
            }
          );
      } else {
        this.form.removeControl('_id');
        this._customer.create(this.form.value)
          .subscribe(
            res => {
              this._message.alertWithIcon('Parabéns!', `Cliente <strong>${res.name}</strong> cadastrado com sucesso.`, 'success');
              this._utils.navigateTo('clientes');
            },
            () => {
              this._message.alertWithIcon('Atenção!', 'Houve um problema na requisição, tente novamnete!', 'error');
            }
          );
      }
    } else {
      this._utils.markAllFieldsAsDirty(this.form);
      this.disabledSave = true;
    }
  }

  queryCEP() {
    this.clearAddressForm();
    const cep = this.form.get('address.zipCode')?.value;
    if (cep) {
      this._utils.queryCEP(cep)
        .subscribe(
          data => {
            if (data.erro) {
              this._message.alertWithIcon('Atenção!', 'CEP não encontrado.', 'warning');
            } else {
              this.setAddressForm(data);
            }
          }, error => {
            this._message.alertWithIcon('Atenção!', `Houve um erro na requisição! ==> ${error}`, 'error');
          }
        );
    } else {
      this._message.alertWithIcon('Atenção!', 'CEP inválido.', 'warning');
    }
  }

  clearAddressForm() {
    this.form.patchValue({
      address: {
        street: null,
        complement: null,
        neighborhood: null,
        city: null,
        state: null,
        country: null
      }
    })
  };

  setAddressForm(data: any) {
    this.form.patchValue({
      address: {
        street: data.logradouro,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        country: 'Brasil'
      }
    })
    this.addressNumber?.nativeElement?.focus();
  };

  validatorBirthday(input: string, date: any) {
    date.target.value >= this.today ? this.form.get(input)?.setErrors({ dateGreaterToday: true }) : this.form.get(input)?.setErrors(null);
  }

  maskCEP(cep: any) {
    this.form.get('address.zipCode')?.setValue(this._utils.maskCEP(cep.target.value));
  }

  maskRG(rg: any) {
    this.form.get('rg')?.setValue(this._utils.maskRG(rg.target.value));
  }

  maskCPF(cpf: any) {
    this.form.get('cpf')?.setValue(this._utils.maskCPF(cpf.target.value));
  }

  maskCellPhone(phone: any) {
    this.form.get('phone')?.setValue(this._utils.maskCellPhone(phone.target.value));
  }

}
