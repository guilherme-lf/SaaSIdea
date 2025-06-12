import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // ✅ ATUALIZADO

  constructor(private http: HttpClient) {}

  // POST /api/usuarios
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // GET /api/usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST /api/usuarios/login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }
}