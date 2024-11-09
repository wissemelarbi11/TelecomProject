import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doc } from 'src/app/features/models/doc';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { DocService } from 'src/app/features/services/doc.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';

@Component({
  selector: 'app-edit-doc',
  templateUrl: './edit-doc.component.html',
  styleUrls: ['./edit-doc.component.css']
})
export class EditDocComponent implements OnInit, OnChanges {

  public doc!: Doc;
  public formGroup!: FormGroup;
  submitted = false;
  @Input() data: any;
  delegations: any[] = [];
  listOfReg: any[] = [];
  secteurs: any[] = [];
  listOfSite: Site[] = [];

  /**
   * @ignore
   */
  constructor(
    private fb: FormBuilder,
    public service: DocService,
    public gouvService: GovernorateService,
    private siteService: SiteService,
  ) { }


  get formControl() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      id: [],
      idRegion: [],
      idSite: [],
      apd: [''],
      expertise: [''],
      fvr: [''],
      delegation: [],
      site: [],

    })

    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idSite: this.data.idSite,
        idRegion: this.data.idRegion,
        apd: this.data.apd,
        expertise: this.data.expertise,
        fvr: this.data.fvr,
        delegation: this.data.delegation,
        site: this.data.site,
      });
    }

    this.getGouv();
    this.getSite();
    console.log('formGroup changes : ', this.data);

  }

  ngOnChanges() {
    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idSite: this.data.idSite,
        idRegion: this.data.idRegion,
        apd: this.data.apd,
        expertise: this.data.expertise,
        fvr: this.data.fvr,
        delegation: this.data.delegation,
        site: this.data.site
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


}

