import { Component } from '@angular/core';
import { ParamArchive } from 'src/app/features/models/param-archive';
import { ParamLogique } from 'src/app/features/models/param-logique';
import { ParamPhy } from 'src/app/features/models/param-phy';
import { Site } from 'src/app/features/models/site';
import { Technologie } from 'src/app/features/models/technologie';
import { TypeSupport } from 'src/app/features/models/type-support';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { ParamArchiveService } from 'src/app/features/services/param-archive.service';
import { ParamLogiqueService } from 'src/app/features/services/param-logique.service';
import { ParamPhyService } from 'src/app/features/services/param-phy.service';
import { SiteService } from 'src/app/features/services/site.service';
import { TechnologieService } from 'src/app/features/services/technologie.service';
import { TypeSupportService } from 'src/app/features/services/type-support.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-site',
  templateUrl: './get-site.component.html',
  styleUrls: ['./get-site.component.css']
})
export class GetSiteComponent {


  dataSource: Site[] = [];
  public paramId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!: any;
  paramPhy!: ParamPhy;
  paramPhysiqueList: ParamPhy[]= [];
  paramLogiqueList: ParamLogique[]= [];
  paramArchiveList: ParamArchive[]= [];
  techList: Technologie[]= [];
  listOfReg: any[] = [];
  suppList: TypeSupport[]= [];
  /**
* @ignore
*/
  constructor(
    public service: SiteService,
    private paramPhyService: ParamPhyService,
    private paramLogiqueService: ParamLogiqueService,
    private paramArchiveService: ParamArchiveService,
    private technologieService: TechnologieService,
    private typeSupportService: TypeSupportService,
    public gouvService: GovernorateService,) {
  }


  ngOnInit(): void {

    this.getAll();
    this.getParamPhysiqueList();
    this.getSupportList();
    this.getParamLogiqueList();
    this.getParamLArchiveList();
    this.geTechList();
    this.getGouv();
    this.getSupportList();
  }

  getAll() {
    this.service.getList().subscribe((res: Site[]) => {
      this.dataSource = res;
    })
  }


  add() {
    this.isDialogOpen = true;
    console.log('testtt');
  }

  openDialogedit(item: any) {
    this.isDialogEdit = true;
    this.data = item;
    console.log('data edit', 'color: #007acc;', this.data);
  }



  delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer ce site",
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


  getParamPhysiqueList() {
    this.paramPhyService.getList().subscribe((res: any[]) => {
      this.paramPhysiqueList = res;
    });
  }

  getSupportList() {
    this.typeSupportService.getList().subscribe((res: any[]) => {
      this.suppList = res;
    });
  }

  getAntenneParamPhysique(idPhysique: any): number {
    // Recherchez le libellé correspondant à l'ID de paramPhysique
    const paramPhysique = this.paramPhysiqueList.find(param => param.id === idPhysique);
    return paramPhysique ? paramPhysique.nbAntenne : 0;
  }

  getSupportParamPhysique(idPhysique: any): string {

    const paramPhysique = this.paramPhysiqueList.find(param => param.id === idPhysique);

    if (!paramPhysique) {
      return '';
    }

    const support = this.suppList.find(item => item.idType === paramPhysique.idType);

    return support ? support.libelleType : '';
  }


  /**
   * get logic param
   */
  getParamLogiqueList() {
    this.paramLogiqueService.getList().subscribe((res: any[]) => {
      this.paramLogiqueList = res;
    });
  }

  getXParamLogique(idLogique: any): string {
    const paramLogique = this.paramLogiqueList.find(param => param.id === idLogique);
    return paramLogique ? paramLogique.x : '';
  }


  getYParamLogique(idLogique: any): string {
    const paramLogique = this.paramLogiqueList.find(param => param.id === idLogique);
    return paramLogique ? paramLogique.y : '';
  }

  getHBAParamLogique(idLogique: any): string {
    const paramLogique = this.paramLogiqueList.find(param => param.id === idLogique);
    return paramLogique ? paramLogique.hba : '';
  }
  /**
   * get arch param
   */
  getParamLArchiveList() {
    this.paramArchiveService.getList().subscribe((res: any[]) => {
      this.paramArchiveList = res;
    });
  }

  getLibelleParamArchive(id: any): string {
    const paramArch = this.paramArchiveList.find(param => param.id === id);
    return paramArch ? paramArch.ficheExp : '';
  }


  /**
 * get tech
 */
  geTechList() {
    this.technologieService.getList().subscribe((res: any[]) => {
      this.techList = res;
    });
  }

  getLibelleTech(id: any): string {
    const tech = this.techList.find(param => param.id === id);
    return tech ? tech.libelle : '';
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
    const site = this.dataSource.find(param => param.id == id);

    const regionId = site ? site.idRegion : '';
    const region = this.listOfReg.find(region => region.id === regionId);

    return region ? region.libelle : '';
  }

}

