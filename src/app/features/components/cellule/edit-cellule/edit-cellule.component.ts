import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cellule } from 'src/app/features/models/cellule';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { CelluleService } from 'src/app/features/services/cellule.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';

@Component({
  selector: 'app-edit-cellule',
  templateUrl: './edit-cellule.component.html',
  styleUrls: ['./edit-cellule.component.css']
})
export class EditCelluleComponent {
  public cellule!: Cellule;
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
    public service: CelluleService,
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
      bande: [''],
      pci: [''],
      power: [''],
      tac: [''],
      tilt: [''],
      azimuth: [''],
    })
   
    if (this.formGroup && this.data) {
      this.formGroup.patchValue({
        id: this.data.id,
        idSite: this.data.idSite,
        bande: this.data.bande,
        pci: this.data.pci,
        power: this.data.power,
        tac: this.data.tac,
        tilt: this.data.tilt,
        azimuth: this.data.azimuth,
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
        bande: this.data.bande,
        pci: this.data.pci,
        power: this.data.power,
        tac: this.data.tac,
        tilt: this.data.tilt,
        azimuth: this.data.azimuth,
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
        alert("Cellule a été modifiée avec succées");
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

