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
  secteurs: any = [];
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
      fournisseur: [],
      idRegion: [],
      libelleSite: [],
      miseEnSceneDate: [],
      surface: [],
      nbCellule: [],
      secteur: [],
      delegation: [],
      nbAntenne: [],
      technologie: [],
      hba: [],
      x: [],
      y: [],
      support: []
    })

    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        fournisseur: this.data.fournisseur,
        idRegion: this.data.idRegion,
        libelleSite: this.data.libelleSite,
        miseEnSceneDate: this.data.miseEnSceneDate,
        surface: this.data.surface,
        nbCellule: this.data.nbCellule,
        secteur: this.data.secteur,
        delegation: this.data.delegation,
        nbAntenne: this.data.nbAntenne,
        technologie: this.data.technologie,
        hba: this.data.hba,
        x: this.data.x,
        y: this.data.y,
        support: this.data.support
      });
    }

    this.getGouv();

  }

  ngOnChanges() {
    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        fournisseur: this.data.fournisseur,
        idRegion: this.data.idRegion,
        libelleSite: this.data.libelleSite,
        miseEnSceneDate: this.data.miseEnSceneDate,
        surface: this.data.surface,
        nbCellule: this.data.nbCellule,
        secteur: this.data.secteur,
        delegation: this.data.delegation,
        nbAntenne: this.data.nbAntenne,
        technologie: this.data.technologie,
        hba: this.data.hba,
        x: this.data.x,
        y: this.data.y,
        support: this.data.support
      });
    }
  }

  public edit() {
    this.submitted = true;

    console.log('formGroup edit : ', this.formGroup.value);
    if (this.formGroup.invalid) {
      return;
    }

 
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

