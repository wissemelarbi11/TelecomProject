import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { CelluleService } from 'src/app/features/services/cellule.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cellule',
  templateUrl: './add-cellule.component.html',
  styleUrls: ['./add-cellule.component.css']
})
export class AddCelluleComponent {

  listOfReg: any[] = [];
  public formFiles!: FormGroup;
  public form!: FormGroup;

  delegations: any[] = [];
  listOfSite: Site[] = [];

  ngOnInit(): void {

    this.formFiles = new FormGroup({
      apd: new FormControl('')
    });

    this.form = this.fb.group({
      id: [],
      idSite: [],
      bande: [''],
      pci: [''],
      power: [''],
      tac: [''],
      tilt: [''],
      azimuth: [''],
    })

    this.getGouv();
    this.getSite();
  }

  constructor(
    public gouvService: GovernorateService,
    private siteService: SiteService,
    private service: CelluleService, private fb: FormBuilder) {
  }

  save() {

    this.service.add(this.form.value).subscribe(
      (response: any) => {
        alert('Cellule a été ajoutée avec succèes');
        this.showConfirmationDialog();
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout', error);
      }
    );


  }


  onFormSubmit() {
    console.log(this.form);
    this.save();
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


  getSite() {
    this.siteService.getList().subscribe(
      (data: Site[]) => {
        this.listOfSite = data;
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de la liste des sites", error);
      }
    );
  }

  selectedFiles: any;
  currentFileUpload: any;
  progress!: number;
  message: any;

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.apd;
  }

  get isFinished() {
    return this.progress >= 95;
  }


  showConfirmationDialog() {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez-vous ajouter d'autres cellules",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
      /************************************************************ Popup Result  */

    }).then((result: any) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
        this.form.reset();
      }
      else{
        window.location.reload(); 
      }
      
    })

  }

}



