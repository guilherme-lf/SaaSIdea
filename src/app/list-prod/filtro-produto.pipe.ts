import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProduto',
  standalone: true
})
export class FiltroProdutoPipe implements PipeTransform {
  transform(produtos: any[], filtro: any): any[] {
    if (!produtos) return [];

    return produtos.filter(p => {
      const nomeOk = filtro.nome ? p.nome?.toLowerCase().includes(filtro.nome.toLowerCase()) : true;
      const categoriaOk = filtro.categoria ? p.categoria?.toLowerCase().includes(filtro.categoria.toLowerCase()) : true;
      const validadeOk = filtro.validade ? p.validade === filtro.validade : true;

      return nomeOk && categoriaOk && validadeOk;
    });
  }
}
