import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gouvernorate } from 'src/app/features/models/governorate';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CelluleService } from 'src/app/features/services/cellule.service';
import { DocFinancService } from 'src/app/features/services/doc-financ.service';
import { DocService } from 'src/app/features/services/doc.service';

@Component({
  selector: 'app-tb',
  templateUrl: './tb.component.html',
  styleUrls: ['./tb.component.css']
})
export class TbComponent {

  dataSource!: any[];
  public form!: FormGroup;
  listOfReg: any[] = [];
  delegations: any[] = [];
  filteredData: any[] = [];
  listOfCel: any[] = [];
  site!: any[];
  doc!: any[];
  docs!: any[];
  

  constructor(
    public service: SiteService,
    public gouvService: GovernorateService,
    public docufService: DocFinancService,
    public docS: DocService,
  
    
    private fb: FormBuilder,
    
    ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      idRegion: [],
      delegation: [],
      fournisseur: [],
      miseEnSceneDate: [],
      technologie: [],
      NbAntenne: [],
      support: [],
      x: [],
      y: [],
      hba: [],
      surface: [],
      nbCellule: [],
      proprietaire:[],
      montant:[],
      contrat:[],
      apd:[],
      expertise:[],
      fvr:[],

    

      
      
    }
    );

  
    this.getGouv();
    this.getDoc();
    this.getDocS();
    
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
        console.error("Erreur lors de la récupération de la liste des gouvernorats", error);
      }
    );
  }

  getGouvernorat(id: any): string {
    // Recherchez le gouvernorat correspondant à l'ID de site
    const site = this.dataSource.find(param => param.idRegion == id);

    const regionId = site ? site.idRegion : '';
    const region = this.listOfReg.find(region => region.id === regionId);

    return region ? region.libelle : '';
    
  }
  getProp(id: any): string {

    const doc = this.doc.find(param => param.idSite == id);

    return doc ? doc.proprietaire : '';
    
  }
  getMontant(id: any): string {

    const doc = this.doc.find(param => param.idSite == id);

    return doc ? doc.montant : '';
    
  }

  getContrat(id: any): string {

    const doc = this.doc.find(param => param.idSite == id);

    return doc ? doc.contrat : '';
    
  }
  getApd(id: any): string {

    const docs = this.docs.find(param => param.idSite == id);

    return docs ? docs.apd : '';
    
  }
  getExpertise(id: any): string {

    const docs = this.docs.find(param => param.idSite == id);

    return docs ? docs.expertise : '';
    
  }
  getFvr(id: any): string {

    const docs = this.docs.find(param => param.idSite == id);

    return docs ? docs.fvr : '';
    
  }

  
  getDoc() {
 
    this.docufService.getList().subscribe(
      (data: any[]) => {
        this.doc = data;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des documents financiere", error);
      }
    );
  }
  getDocS() {
 
    this.docS.getList().subscribe(
      (data: any[]) => {
        this.docs = data;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des documents sites", error);
      }
    );
  }
  


  applyFilters() {
    console.log('%csrc\app\features\components\site\tb\tb.component.ts:90 this.form.value', 'color: #007acc;', this.form.value);
    // Filtrer les données en fonction des valeurs sélectionnées dans le formulaire
    this.filteredData = this.dataSource.slice(); // Copie de la source de données initiale
  
    // Filtre par idRegion
    if (this.form.value.idRegion) {
      this.filteredData = this.filteredData.filter(site => site.idRegion == this.form.value.idRegion);
    }
  
    // Filtre par delegation
    if (this.form.value.delegation) {
      this.filteredData = this.filteredData.filter(site => site.delegation == this.form.value.delegation);
    }
  
    // Filtre par fournisseur
    if (this.form.value.fournisseur) {
      this.filteredData = this.filteredData.filter(site => site.fournisseur == this.form.value.fournisseur);
    }
  
    // Filtre par miseEnSceneDate
    if (this.form.value.miseEnSceneDate) {
      this.filteredData = this.filteredData.filter(site => site.miseEnSceneDate == this.form.value.miseEnSceneDate);
    }
  
    // Filtre par technologie
    if (this.form.value.nbAntenne) {
      this.filteredData = this.filteredData.filter(site => site.nbAntenne == this.form.value.nbAntenne);
    }
    if (this.form.value.nbAntenne) {
      this.filteredData = this.filteredData.filter(site => site.support == this.form.value.support);
    }
    if (this.form.value.hba) {
      this.filteredData = this.filteredData.filter(site => site.hba == this.form.value.hba);
    }
    if (this.form.value.x) {
      this.filteredData = this.filteredData.filter(site => site.x == this.form.value.x);
    }
    if (this.form.value.y) {
      this.filteredData = this.filteredData.filter(site => site.y == this.form.value.y);
    }
    if (this.form.value.surface) {
      this.filteredData = this.filteredData.filter(site => site.surface == this.form.value.surface);
    }
    if (this.form.value.nbCellule) {
      this.filteredData = this.filteredData.filter(site => site.nbCellule == this.form.value.nbCellule);
    }
   
   
 
  
    this.dataSource = this.filteredData;
  }
  


  exportToExcel() {
  
    const jsonExportData = this.dataSource.map(item => ({
      Gouvernorat: this.getGouvernorat(item.idRegion),
      Délegation: item.delegation,
      Fournisseur: item.fournisseur,
      Date: item.miseEnSceneDate,
      NbAntenne: item.nbAntenne,
      support: item.support,
      HBA: item.hba,
      X: item.x,
      NombreCellule: item.nbCellule,
      Surface : item.surface,
      Proprietaire: this.getProp(item.id),
      Montant: this.getMontant(item.id),
      Contrat: this.getContrat(item.id),
      FVR: this.getFvr(item.id),
      APD: this.getApd(item.id),
      Expertise: this.getExpertise(item.id)
    }));
  
   
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonExportData);
  

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
  
  
    const wbArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
  
    const blob = new Blob([wbArrayBuffer], { type: 'application/octet-stream' });
  
    // Télécharger le fichier Excel
    const fileName = 'filtered_data.xlsx';
    saveAs(blob, fileName);
  }

  

}
