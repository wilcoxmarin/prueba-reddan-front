import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FacturaService } from './factura.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule,
    ButtonModule,
    MenubarModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  loading: boolean = true;
  searchValue: string | undefined;
  rowsPerPage: number = 5;
  options: any = [];
  facturas: any[] = [];

  constructor(
    private facturaService: FacturaService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.facturaService.getAll().subscribe((resp: any) => {
      this.facturas = resp.data;
    });

    this.options = [5, 10, 15];
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-plus',
      },
      {
        label: 'Filtrar',
        icon: 'pi pi-filter',
      },
      {
        label: 'Exportar',
        items: [
          {
            label: 'Pdf',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Excel',
            icon: 'pi pi-server',
          },
        ],
      },
      {
        label: 'Opciones',
        items: [],
      },
    ];
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  eventInput(event: EventTarget | null, table: Table) {
    if (event) {
      const input = event as HTMLInputElement;
      const value = input.value;
      table.filterGlobal(value, 'contains');
    }
  }

  export(label: string) {
    console.log(label);
    this.facturaService.exportFile(label).subscribe((resp: any) => {
      saveAs(resp, `factura.${label.toLowerCase()}`);
    });
  }
}
