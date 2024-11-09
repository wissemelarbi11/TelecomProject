import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as saveAs from 'file-saver';
import { Cellule } from 'src/app/features/models/cellule';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { CelluleService } from 'src/app/features/services/cellule.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tb1',
  templateUrl: './tb1.component.html',
  styleUrls: ['./tb1.component.css']
})
export class Tb1Component implements OnInit {
  dataSource: any[] = [];
  form!: FormGroup;
  listOfReg: any[] = [];
  delegations: any[] = [];
  filteredData: any[] = [];
  siteList!: Site[];
  cellule!: any[];

  constructor(
    public service: SiteService,
    public gouvService: GovernorateService,
    public celluleService: CelluleService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      idRegion: [],
      delegation: [],
      fournisseur: [],
      libelleSite: [],
      technologie: []
    });

    this.getGouv();
    this.getSiteList();
    this.getCellule();
  }

  getGouv() {
    this.gouvService.getList().subscribe(
      (data: any[]) => {
        this.listOfReg = data;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des gouvernorats", error);
      }
    );
  }

  onGouvernoratChange(event: any): void {
    const idGouvernoratSelectionne = event.target.value;
    this.getDelegationsByGouvernoratId(idGouvernoratSelectionne);
  }

  getDelegationsByGouvernoratId(idGouvernorat: any) {
    this.gouvService.getOne(idGouvernorat).subscribe(
      (data: gouvernorate) => {
        this.delegations = data.delegations;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des délégations", error);
      }
    );
  }

  search() {
    this.service.getList().subscribe(
      (data: any[]) => {
        this.dataSource = data;
        this.applyFilters();
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des sites", error);
      }
    );
  }

  getGouvernorat(id: any): string {
    const region = this.listOfReg.find(region => region.id === id);
    return region ? region.libelle : '';
  }

  getAzimuth(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.azimuth : '';
  }

  getBande(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.bande : '';
  }

  getPsc(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.psc : '';
  }

  getTilt(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.tilt : '';
  }

  getLac(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.lac : '';
  }
  getCode(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.id : '';
  }

  getNomCell(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.nomcellule : '';
  }

  getRnc(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.rnc : '';
  }
  getTechnologie(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.technologie : '';
  }

  getPuissance(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.puissance : '';
  }

  getBsc(id: any): string {
    const cellule = this.cellule.find(param => param.idSite == id);
    return cellule ? cellule.bsc : '';
  }

  

  applyFilters() {
    this.filteredData = this.dataSource.slice();

    if (this.form.value.idRegion) {
      this.filteredData = this.filteredData.filter(site => site.idRegion == this.form.value.idRegion);
    }

    if (this.form.value.delegation) {
      this.filteredData = this.filteredData.filter(site => site.delegation == this.form.value.delegation);
    }

    if (this.form.value.fournisseur) {
      this.filteredData = this.filteredData.filter(site => site.fournisseur == this.form.value.fournisseur);
    }

    if (this.form.value.libelleSite) {
      this.filteredData = this.filteredData.filter(site => site.libelleSite == this.form.value.libelleSite);
    }

    if (this.form.value.technologie) {
      this.filteredData = this.filteredData.filter(site => site.technologie == this.form.value.technologie);
    }

    this.dataSource = this.filteredData;
  }

  getCellule() {
    this.celluleService.getList().subscribe(
      (data: any[]) => {
        this.cellule = data;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des cellules", error);
      }
    );
  }

  getSiteList() {
    this.service.getList().subscribe((res: any[]) => {
      this.siteList = res;
    });
  }

  exportToExcel() {
    let jsonExportData: any[];

    if (this.form.value.technologie === '3G') {
      jsonExportData = this.dataSource.map(item => ({
        CodeCellule: this.getCode(item.id),
        NomCellule: this.getLac(item.id),
        Gouvernorat: this.getGouvernorat(item.idRegion),
        Délegation: item.delegation,
        Technologie: this.getTechnologie,
        Fournisseur: item.fournisseur,
        NomDuSite: item.libelleSite,
        Bande: this.getBande(item.id),
        RNC: this.getRnc(item.id),
        LAC: this.getLac(item.id),
        BSC: this.getBsc(item.id),
        TILT: this.getTilt(item.id),
        Azimuth: this.getAzimuth(item.id),
        Puissance: this.getPuissance(item.id)
      }));
    } else {
      jsonExportData = this.dataSource.map(item => ({
        CodeCellule: this.getCode(item.id),
        NomCellule: this.getLac(item.id),
        Gouvernorat: this.getGouvernorat(item.idRegion),
        Délegation: item.delegation,
        Technologie: this.getTechnologie(item.id),
        Fournisseur: item.fournisseur,
        NomDuSite: item.libelleSite,
        Bande: this.getBande(item.id),
        RNC: this.getRnc(item.id),
        LAC: this.getLac(item.id),
        BSC: this.getBsc(item.id),
        TILT: this.getTilt(item.id),
        Azimuth: this.getAzimuth(item.id),
        Puissance: this.getPuissance(item.id)
        
      }));
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonExportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
    const wbArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbArrayBuffer], { type: 'application/octet-stream' });
    const fileName = 'filtered_data.xlsx';
    saveAs(blob, fileName);
  }
}
