import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService
  ) {}

  ngOnInit(): void {
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
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
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
  }

  cadastrar(): void {
  if (this.cadastroForm.valid) {
    const usuario = this.cadastroForm.value;

    // Exibe os dados no console
    console.log('Dados do usuário:');
    console.log('Nome:', usuario.nome);
    console.log('CPF:', usuario.cpf);
    console.log('Telefone:', usuario.telefone);
    console.log('Email:', usuario.email);
    console.log('Endereço:', {
      rua: usuario.rua,
      numero: usuario.numero,
      cidade: usuario.cidade,
      estado: usuario.estado,
      cep: usuario.cep
    });
    console.log('Senha:', usuario.senha);

    // Aqui você pode chamar o serviço para salvar
    this.cadastroService.cadastrarUsuario(usuario).subscribe(
      res => {
        console.log('Usuário cadastrado com sucesso:', res);
        alert('Cadastro realizado com sucesso!');
        this.cadastroForm.reset();
      },
      err => {
        console.error('Erro no cadastro:', err);
        alert('Erro ao cadastrar. Tente novamente.');
      }
    );
  } else {
    alert('Preencha todos os campos obrigatórios corretamente.');
  }
  }
}
