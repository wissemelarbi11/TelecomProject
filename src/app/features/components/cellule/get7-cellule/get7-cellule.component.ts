import { Component } from '@angular/core';
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
export class Get7CelluleComponent {
  dataSource: Cellule[] = [];
  public paramId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!: any;
  siteList!: Site[];
  listOfReg: any[] = [];

  /**
* @ignore
*/
  constructor(
    public service: CelluleService,
    public siteService: SiteService,
    public gouvService: GovernorateService,) {
  }


  ngOnInit(): void {

    this.getAll();
    this.getSiteList();
    this.getGouv();

  }

  getAll() {
    this.service.getList().subscribe((res: Cellule[]) => {
      this.dataSource = res;
    })
  }


  add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit = true;
    this.data = item;
  }

  delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer cette cellule",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
      /************************************************************ Popup Result  */

    }).then((result: any) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
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
    })

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
    // Recherchez le libellé correspondant à l'ID de site
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
    // Recherchez le gouvernorat correspondant à l'ID de site
    const site = this.siteList.find(param => param.id == id);

    const regionId = site ? site.idRegion : '';
    const region = this.listOfReg.find(region => region.id === regionId);

    return region ? region.libelle : '';
  }


}

