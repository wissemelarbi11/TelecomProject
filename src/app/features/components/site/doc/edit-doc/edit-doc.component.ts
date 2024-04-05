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
      idSite: [],
      apd: [''],
      expertise: [''],
      fvr: [''],
    })

    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idSite: this.data.idSite,
        apd: this.data.apd,
        expertise: this.data.expertise,
        fvr: this.data.fvr,
      });
    }

    this.getSite();
    this.getGouv();
    console.log('formGroup changes : ', this.data);

  }

  ngOnChanges() {
    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idSite: this.data.idSite,
        apd: this.data.apd,
        expertise: this.data.expertise,
        fvr: this.data.fvr,
      });
    }
  }

  public edit() {
    this.submitted = true;

    console.log('formGroup edit : ', this.formGroup.value);
    if (this.formGroup.invalid) {
      return;
    }

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

