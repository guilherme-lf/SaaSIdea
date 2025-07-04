import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroProdutoPipe } from './filtro-produto.pipe';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-list-prod',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule, FiltroProdutoPipe],
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.css']
})

export class ListProdComponent implements OnInit {
  produtos: any[] = [];

  filtro = {
    nome: '',
    categoria: '',
    validade: ''
  };

  categoriasUnicas: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  extrairCategoriasUnicas() {
    const categorias = this.produtos.map(p => p.categoria);
    this.categoriasUnicas = [...new Set(categorias)].filter(c => c); // remove duplicados e vazios
  }

  // Método para filtrar produtos por nome, categoria e validade
  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/api/produtos').subscribe({
      next: (res) => {
        this.produtos = res;
        this.extrairCategoriasUnicas(); // <- aqui
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-produto']);
  }

  // Método para excluir um produto
  excluirProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.http.delete(`http://localhost:3000/api/produtos/${id}`).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
          this.carregarProdutos();
        },
        error: err => {
          console.error('Erro ao excluir produto:', err);
          alert('Erro ao excluir o produto.');
        }
      });
    }
  }
  
  limparFiltros() {
    this.filtro = { nome: '', categoria: '', validade: '' };
  }

  // Método para exportar produtos para JSON e Excel

  exportarJSON() {
    this.http.get<any[]>('http://localhost:3000/api/produtos').subscribe({
      next: (produtos) => {
        const blob = new Blob([JSON.stringify(produtos, null, 2)], {
          type: 'application/json'
        });
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'produtos-backup.json';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao exportar JSON:', err);
        alert('Erro ao exportar os produtos.');
      }
    });
  }

  importarJSON(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const produtos = JSON.parse(reader.result as string);
  
        if (!Array.isArray(produtos)) {
          alert('O arquivo deve conter uma lista de produtos.');
          return;
        }
  
        const confirmacao = confirm(`Importar ${produtos.length} produtos?`);
        if (!confirmacao) return;
  
        // Envia cada produto individualmente
        produtos.forEach(produto => {
          this.http.post('http://localhost:3000/api/produtos', produto).subscribe({
            next: () => this.carregarProdutos(),
            error: err => console.error('Erro ao importar produto:', err)
          });
        });
  
        alert('Importação concluída com sucesso!');
      } catch (e) {
        alert('Erro ao ler o arquivo JSON.');
        console.error(e);
      }
    };
  
    reader.readAsText(file);
  }

  exportarExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.produtos);
    const workbook = { Sheets: { 'Produtos': worksheet }, SheetNames: ['Produtos'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'produtos.xlsx');
  }
  
  importarExcel(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      const produtosImportados = XLSX.utils.sheet_to_json(worksheet);
  
      if (!Array.isArray(produtosImportados)) {
        alert('O arquivo Excel não contém dados válidos.');
        return;
      }
  
      const confirmar = confirm(`Importar ${produtosImportados.length} produtos do Excel?`);
      if (!confirmar) return;
  
      produtosImportados.forEach(produto => {
        this.http.post('http://localhost:3000/api/produtos', produto).subscribe({
          next: () => this.carregarProdutos(),
          error: err => console.error('Erro ao importar produto:', err)
        });
      });
  
      alert('Importação concluída!');
    };

    // // / // / / // /  // // // / // / // / / // // 
  
    reader.readAsArrayBuffer(file);
  }
  
  

}
