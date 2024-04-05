import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { ParamArchiveService } from 'src/app/features/services/param-archive.service';
import { ParamLogiqueService } from 'src/app/features/services/param-logique.service';
import { ParamPhyService } from 'src/app/features/services/param-phy.service';
import { SiteService } from 'src/app/features/services/site.service';
import { TechnologieService } from 'src/app/features/services/technologie.service';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent implements OnInit, OnChanges {
  public Site!: Site;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() data: any;
  delegations: any[] = [];
  listOfPhy: any[] = [];
  listOfLog: any[] = [];
  listOfArch: any[] = [];
  listOfTech: any[] = [];
  listOfReg: any[] = [];
  secteurs: any= [];
  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
    public service: SiteService,
    public gouvService: GovernorateService,
    private paramPhyService: ParamPhyService,
    private paramLogiqueService: ParamLogiqueService,
    private paramArchiveService: ParamArchiveService,
    private technologieService: TechnologieService,
  ) { }


  get formControl() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {

    console.log('data test', 'color: #007acc;', this.data);
    this.formGroup = this.fb.group({
      id: [],
      idPhysique: [],
      idLogique: [],
      idArchive: [],
      idTechnologie: [],
      idRegion: [],
      libelleSite: [],
      miseEnSceneDate: [],
      surface: [],
      nbCellule: [],
      secteur: [],
      delegation: []

    })

    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idPhysique: this.data.idPhysique,
        idLogique: this.data.idLogique,
        idArchive: this.data.idArchive,
        idTechnologie: this.data.idTechnologie,
        idRegion: this.data.idRegion,
        libelleSite: this.data.libelleSite,
        miseEnSceneDate: this.data.miseEnSceneDate,
        surface: this.data.surface,
        nbCellule: this.data.nbCellule,
        secteur: this.data.secteur,
        delegation: this.data.delegation,

      });
    }

    this.getParamPhy();
    this.getParamArch();
    this.getParamLog();
    this.getTech();
    this.getGouv();

  }

  ngOnChanges() {
    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idPhysique: this.data.idPhysique,
        idLogique: this.data.idLogique,
        idArchive: this.data.idArchive,
        idTechnologie: this.data.idTechnologie,
        idRegion: this.data.idRegion,
        libelleSite: this.data.libelleSite,
        miseEnSceneDate: this.data.miseEnSceneDate,
        surface: this.data.surface,
        nbCellule: this.data.nbCellule,
        secteur: this.data.secteur,
        delegation: this.data.delegation,

      });
    }
  }

  public edit() {
    this.submitted = true;

    console.log('formGroup edit : ', this.formGroup.value);
    if (this.formGroup.invalid) {
      return;
    }

    this.formGroup.value.idPhysique = parseInt(this.formGroup.value.idPhysique);
    this.formGroup.value.idLogique = parseInt(this.formGroup.value.idLogique);
    this.formGroup.value.idArchive = parseInt(this.formGroup.value.idArchive);
    this.formGroup.value.idTechnologie = parseInt(this.formGroup.value.idTechnologie);
    this.formGroup.value.idRegion = parseInt(this.formGroup.value.idRegion);

    this.service.update(this.formGroup.value).subscribe(
      (resp) => {
        console.log(resp);
        alert("Site a été modifié avec succées");
        window.location.reload(); 
        //  (this.location as any).reload();
      },
      (err) => {
        console.log(err);

        alert(err.error);
      }
    );

  }

  getParamPhy() {
    this.paramPhyService.getList().subscribe(
      (data: any[]) => {
        this.listOfPhy = data;
        console.log('%csrc\app\features\components\site\add-site\add-site.component.ts:73 this.listOfPhy', 'color: #007acc;', this.listOfPhy);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des paramétres physique', error);
      }
    );
  }

  getParamLog() {
    this.paramLogiqueService.getList().subscribe(
      (data: any[]) => {
        this.listOfLog = data;
        console.log('%csrc\app\features\components\site\add-site\add-site.component.ts:85 this.listOfLog ', 'color: #007acc;', this.listOfLog);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des paramétres logique', error);
      }
    );
  }


  getParamArch() {
    this.paramArchiveService.getList().subscribe(
      (data: any[]) => {
        this.listOfArch = data;
        console.log('%csrc\app\features\components\site\add-site\add-site.component.ts:98 this.listOfArch', 'color: #007acc;', this.listOfArch);
      },
      (error: any) => {
        console.error("Erreur lors de la récupération des paramétres d'archive", error);
      }
    );
  }

  getTech() {
    this.technologieService.getList().subscribe(
      (data: any[]) => {
        this.listOfTech = data;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des technologies", error);
      }
    );
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

  getSecteurByDelegationId(event: any): void {
    const idDelegationSelectionne = event.target.value;
    const delegation = this.findDelegationById(idDelegationSelectionne);

    if (delegation) {
        this.secteurs = delegation.secteurs;
    } else {
        console.error("Délégation non trouvée");
    }
}

findDelegationById(libelle: any): any {
  for (const gouvernorat of this.listOfReg) {
      for (const delegation of gouvernorat.delegations) {
          if (delegation.libelle == libelle) {
              return delegation;
          }
      }
  }
  return null; 
}



}

