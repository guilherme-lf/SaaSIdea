import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private cadastroService: CadastroService,
    private usuarioService: UsuarioService
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rua: [''],
      numero: [''],
      cidade: [''],
      estado: [''],
      cep: [''],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['']
    }, { validators: this.senhasIguaisValidator });
  }

  senhasIguaisValidator(form: FormGroup) {
    const senha = form.get('senha')?.value;
    const confirmar = form.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const usuario = this.cadastroForm.value;
      console.log('Cadastro enviado:', usuario);
      alert('Cadastro realizado com sucesso!');
      this.cadastroForm.reset();
    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }

    if (this.cadastroForm.valid) {
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: (res) => {
          console.log('Usuário cadastrado com sucesso!', res);
          // Aqui você pode resetar o form ou redirecionar
          this.cadastroForm.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário:', err);
        }
      });
    }
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(res => {
      console.log(res);
    });
  }

}
