import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/factura/all');
  }

  exportFile(type_document: string): Observable<any> {
    return this.httpClient.get(
      `http://localhost:3000/factura/exportar/${type_document}`,
      { responseType: 'blob' },
    );
  }
}
