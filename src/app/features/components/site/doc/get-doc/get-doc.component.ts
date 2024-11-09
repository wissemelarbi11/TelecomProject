import { Component } from '@angular/core';
import { Doc } from 'src/app/features/models/doc';
import { Site } from 'src/app/features/models/site';
import { DocService } from 'src/app/features/services/doc.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-doc',
  templateUrl: './get-doc.component.html',
  styleUrls: ['./get-doc.component.css']
})
export class GetDocComponent {

  dataSource: Doc[] = [];
  public paramId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!: any;
  siteList: Site[] = [];
  listOfReg: any[] = [];


  /**
* @ignore
*/
  constructor(
    public service: DocService,
    public siteService: SiteService,
    public gouvService: GovernorateService,) {
  }


  ngOnInit(): void {

    this.getAll();
    this.getGouv();
    this.getSiteList();
    
   
    
  }

  getAll() {
    this.service.getList().subscribe((res: Doc[]) => {
      this.dataSource = res;
    })
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

  add() {
    this.isDialogOpen = true;
  }

  openDialogedit(item: any) {
    this.isDialogEdit = true;
    this.data = item;
    console.log('%csrc\app\features\components\site\doc\get-doc\get-doc.component.ts:47 this.data', 'color: #007acc;', this.data);
  }

  delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer ce document",
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

  getGouv() {
    this.gouvService.getList().subscribe(
      (data: any[]) => {
        this.listOfReg = data;
        console.log('%csrc\app\features\components\site\get-site\get-site.component.ts:133 this.listOfReg', 'color: #007acc;', this.listOfReg);

      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des gouvernorats", error);
      }
    );
  }

  getGouvernorat(id: any): string {
    console.log('ididid', id);

    // Recherchez le gouvernorat correspondant à l'ID de site
    const site = this.dataSource.find(param => param.idRegion == id);
    console.log('site', site);

    const regionId = site ? site.idRegion : '';
    const region = this.listOfReg.find(region => region.id === regionId);
    console.log('region', region);

    return region ? region.libelle : '';
  }
 

}





