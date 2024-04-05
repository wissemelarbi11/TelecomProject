import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, takeWhile } from 'rxjs';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { DocFinancService } from 'src/app/features/services/doc-financ.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-doc-financ',
  templateUrl: './add-doc-financ.component.html',
  styleUrls: ['./add-doc-financ.component.css']
})
export class AddDocFinancComponent {


  listOfPhy: any[] = [];
  listOfLog: any[] = [];
  listOfArch: any[] = [];
  listOfTech: any[] = [];
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
      proprietaire: [''],
      montant: [''],
      contrat: [''],
    }
    );

    this.getGouv();
    this.getSite();
  }

  constructor(
    public gouvService: GovernorateService,
    private siteService: SiteService,
    private service: DocFinancService, private fb: FormBuilder) {
  }

  save() {

    this.service.add(this.form.value).subscribe(
      (response: any) => {
        alert('Document ajouté avec succès');
        window.location.reload(); 
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


  importFile() {
    let Verif = false;
    this.progress = 0;

    if (this.selectedFiles == null || this.selectedFiles == '' || this.selectedFiles == undefined) {
      Swal.fire({
        title: "Attention",
        text: "Veuillez entrer un fichier avec une extension PDF ou texte, s'il vous plaît.",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: "Oui"
      });
    }
    else {
      this.currentFileUpload = this.selectedFiles.item(0);
      let extension = this.currentFileUpload.name.split(".")[1];
      if (extension.toUpperCase() != 'PDF' || extension.toUpperCase() != 'TXT' || extension.toUpperCase() != 'DOC' ) {
        Swal.fire({
          title: "Attention",
          text: "Veuillez entrer un fichier avec une extension PDF ou texte, s'il vous plaît.",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: "Oui"
        });
      }
      else {
        Swal.fire(
          {
            title: "",
            html: '<b>' + this.progress + ' % </b>',
            timer: 2000,
            timerProgressBar: true,
            icon: 'warning',
            didOpen: () => {
              Swal.showLoading()
              const container = Swal.getHtmlContainer();

              if (container) {
                const b = container.querySelector('b');
                this.progress = 10;
                if (b) {
                  b.textContent = this.progress.toString();
                  this.service.importFile(this.currentFileUpload).subscribe(

                    event => {

                      interval(1000)
                        .pipe(takeWhile(_ => !this.isFinished))
                        .subscribe(() => {
                          if (this.progress < 95) {
                            this.progress += 1;
                            b.textContent = this.progress.toString();
                          }
                        });
                      this.progress = 100;
                      b.textContent = this.progress.toString();
                      //  this.get_enq_TD();
                      Swal.close();
                      alert("Fichier a été bien importé");
                    },
                    err => {
                      alert("Echec du téléversement");
                      this.selectedFiles = undefined;
                        //this.formFiles.get('apd').reset();
                      Swal.close();
                    }
                  );
                }
              }
            },
            willClose: () => {
              clearInterval(this.progress = 0);
            }
          }).then((result) => {
            this.selectedFiles = undefined;
            //  this.form.get('files').reset();
          })

      }
    }
  }


}



