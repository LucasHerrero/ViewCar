import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../interfaces/brand.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BrandService {
  public brandList: Brand[] = [];
  public brandName: string = '';

  constructor(private http: HttpClient) {}

  private serviceUrl = `${environment.apiUrl}/brands`;

  getBrands(): void {
    this.http.get<Brand[]>(this.serviceUrl)
      .subscribe((resp: Brand[]) => {
         // Imprime la respuesta completa
        if (resp) {
          this.brandList = resp; // Asigna resp a brandList directamente
        } else {
          console.error('La respuesta del servidor es nula o indefinida');
        }
      }, error => {
        console.error('Error al obtener las marcas:', error);
      });
  }

  getBrandById(id: number) {
    return this.http.get<Brand>(`${this.serviceUrl}/${id}`);
  }

  getBrandByName(name: string) {
    return this.http.get<Brand>(`${this.serviceUrl}/name/${name}`);
  }

  addBrand(brand: Brand) {
    return this.http.post<Brand>(this.serviceUrl, brand);
  }
}

