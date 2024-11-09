import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocFinanc } from 'src/app/features/models/doc-financ';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { DocFinancService } from 'src/app/features/services/doc-financ.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';

@Component({
  selector: 'app-edit-doc-financ',
  templateUrl: './edit-doc-financ.component.html',
  styleUrls: ['./edit-doc-financ.component.css']
})
export class EditDocFinancComponent {

  public docFinanc!: DocFinanc;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() data: any;
  delegations: any[] = [];
  listOfReg: any[] = [];
  secteurs: any[] = [];
  listOfSite: any[] = [];

  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
    public service: DocFinancService,
    public gouvService: GovernorateService,
    private siteService: SiteService,
  ) { }


  get formControl() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    console.log('%csrc\app\features\components\site\finance\edit-doc-financ\edit-doc-financ.component.ts:41 this.data', 'color: #007acc;', this.data);
    this.formGroup = this.fb.group({
      id: [],
      idSite: [],
      idRegion: [],
      proprietaire: [],
      montant: [],
      dateContrat: [],
      delegation: [],
      site: [],

    })

    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idRegion: this.data.idRegion,
        idSite: this.data.idSite,
        proprietaire: this.data.proprietaire,
        montant: this.data.montant,
        contrat: this.data.contrat,
        delegation: this.data.delegation,
        site: this.data.site,

      });
    }

    this.getGouv();
    console.log('formGroup changes : ', this.data);
    this.getSite();

  }

  ngOnChanges() {
    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idRegion: this.data.idRegion,
        idSite: this.data.idSite,
        proprietaire: this.data.proprietaire,
        montant: this.data.montant,
        contrat: this.data.contrat,
        delegation: this.data.delegation,
        site: this.data.site,

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
      (resp: any) => {
        console.log(resp);
        alert("Docuement a été modifié avec succées");
        window.location.reload();
        //  (this.location as any).reload();
      },
      (err: { error: any; }) => {
        console.log(err);

        alert(err.error);
      }
    );

  }
  getSite() {
    this.siteService.getList().subscribe(
      (data: Site[]) => {
        this.listOfSite = data;
        console.log('testtttttttt', 'color: #007acc;', this.listOfSite);
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des sites", error);
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
    console.log('%csrc\app\features\components\site\add-site\add-site.component.ts:137 event', 'color: #007acc;', idGouvernoratSelectionne);
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

  selectedFiles: any;

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files[0];
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

