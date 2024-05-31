import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface NoticiaResponse {
  status: number;
  message: string;
  data: {
    title: string;
    description: string;
    rawDescription: string;
    icon: string;
    url: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  private http = inject(HttpClient);
  constructor() { }

  getNoticias(terminoBusqueda: string) {
    return this.http.get<NoticiaResponse>(`https://duckduckgo10.p.rapidapi.com/search?term=${terminoBusqueda}&safeSearch=off&time=a&region=wt-wt`, {
      headers: {
        'X-RapidAPI-Key': '134d35bff2msh08be83a7fe9cc95p1718e7jsn4d4d303e1a46',
        'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
      }
    });
  }

}
