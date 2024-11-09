import { Component, OnInit } from '@angular/core';
import { Cellule } from 'src/app/features/models/cellule';
import { Site } from 'src/app/features/models/site';
import { CelluleService } from 'src/app/features/services/cellule.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get7-cellule',
  templateUrl: './get7-cellule.component.html',
  styleUrls: ['./get7-cellule.component.css']
})
export class Get7CelluleComponent implements OnInit {
  dataSource: Cellule[] = [];
  initialDataSource: Cellule[] = [];
  filteredDataSource: Cellule[] = [];
  public paramId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!: any;
  siteList: Site[] = []; // Ensure this is initialized as an empty array
  listOfReg: any[] = [];
  searchTerm: string = '';
  noResultsMessage: string = '';

  constructor(
    public service: CelluleService,
    public siteService: SiteService,
    public gouvService: GovernorateService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getSiteList();
    this.getGouv();
  }

  getAll() {
    this.service.getList().subscribe((res: Cellule[]) => {
      this.dataSource = res;
      this.initialDataSource = res;
      this.filteredDataSource = res;
    });
  }

  add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit = true;
    this.data = item;
  }

  delete(id: any) {
    Swal.fire({
      title: "",
      text: "Voulez-vous supprimer cette cellule?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(
          (resp: any) => {
            console.log(resp);
            this.getAll();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }

  OnSelected(id: any) {
    this.paramId = id;
  }

  edit(item: any) {
    this.isDialogEdit = true;
    this.data = item;
  }

  getSiteList() {
    this.siteService.getList().subscribe((res: any[]) => {
      this.siteList = res;
    });
  }

  getLibelleSite(id: any): string {
    const site = this.siteList.find(param => param.id == id);
    return site ? site.libelleSite : '';
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

  getGouvernorat(id: any): string {
    const site = this.siteList.find(param => param.id == id);
    const regionId = site ? site.idRegion : '';
    const region = this.listOfReg.find(region => region.id === regionId);
    return region ? region.libelle : '';
  }

  filterTable() {
    if (this.searchTerm) {
      this.filteredDataSource = this.initialDataSource.filter(item => 
        this.getLibelleSite(item.idSite).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.dataSource = this.filteredDataSource;
      this.noResultsMessage = this.filteredDataSource.length === 0 ? "Il n'y a pas cette cellule" : '';
    } else {
      this.dataSource = this.initialDataSource;
      this.noResultsMessage = '';
    }
  }
}
