import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, takeWhile } from 'rxjs';
import { gouvernorate } from 'src/app/features/models/governorate';
import { Site } from 'src/app/features/models/site';
import { DocService } from 'src/app/features/services/doc.service';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { SiteService } from 'src/app/features/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css']
})
export class AddDocComponent implements OnInit {
  listOfPhy: any[] = [];
  listOfLog: any[] = [];
  listOfArch: any[] = [];
  listOfTech: any[] = [];
  listOfReg: gouvernorate[] = [];
  listOfSite: Site[] = [];
  public formFiles!: FormGroup;
  public form!: FormGroup;
  secteurs: any[] = [];
  isSiteSelected: boolean = false;
  delegations: any[] = [];
  filteredSites!: Site[];
  selectedFiles: any;
  currentFileUpload: any;
  progress!: number;
  message: any;

  constructor(
    public gouvService: GovernorateService,
    private siteService: SiteService,
    private service: DocService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formFiles = new FormGroup({
      apd: new FormControl('')
    });

    this.form = this.fb.group({
      id: [],
      idSite: [],
      idRegion: [],
      apd: [''],
      expertise: [''],
      fvr: [''],
      delegation: [],
      site: [],
    });

    this.getGouv();
    this.getSite();
  }

  save() {
    this.form.value.idRegion = parseInt(this.form.value.idRegion);

    this.service.add(this.form.value).subscribe(
      (response: any) => {
        Swal.fire('Success', 'Document ajouté avec succès', 'success').then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        Swal.fire('Erreur', 'Erreur lors de l\'ajout', 'error');
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
      (data: gouvernorate[]) => {
        this.listOfReg = data;
      },
      (error: any) => {
        Swal.fire('Erreur', 'Erreur lors de la récupération de la liste des gouvernorats', 'error');
        console.error('Erreur lors de la récupération de la liste des gouvernorats', error);
      }
    );
  }

  filterSitesByGouvernorat(gouvernoratId: number): void {
    this.filteredSites = this.listOfSite.filter(site => site.idRegion === gouvernoratId);
  }

  filterSitesByDelegation(DelegationId: number): void {
    this.filteredSites = this.listOfSite.filter(site => site.delegation === DelegationId);
  }

  onGouvernoratChange(event: any): void {
    const idGouvernoratSelectionne = event.target.value;
    this.getDelegationsByGouvernoratId(idGouvernoratSelectionne);
    this.filterSitesByGouvernorat(idGouvernoratSelectionne);
  }

  DelegationChange(event: any): void {
    const idDelegationSelectionne = event.target.value;
    this.getDelegationsByGouvernoratId(idDelegationSelectionne);
    this.filterSitesByDelegation(idDelegationSelectionne);
  }

  getDelegationsByGouvernoratId(idGouvernorat: any) {
    this.gouvService.getOne(idGouvernorat).subscribe(
      (data: gouvernorate) => {
        this.delegations = data.delegations;
      },
      (error: any) => {
        Swal.fire('Erreur', 'Erreur lors de la récupération de la liste des délégations', 'error');
        console.error('Erreur lors de la récupération de la liste des délégations', error);
      }
    );
  }

  getSite() {
    this.siteService.getList().subscribe(
      (data: Site[]) => {
        this.listOfSite = data;
      },
      (error: any) => {
        Swal.fire('Erreur', 'Erreur lors de la récupération de la liste des sites', 'error');
        console.error('Erreur lors de la récupération de la liste des sites', error);
      }
    );
  }

  getSecteurByDelegationId(event: any): void {
    const idDelegationSelectionne = event.target.value;
    const delegation = this.findDelegationById(idDelegationSelectionne);

    if (delegation) {
      this.secteurs = delegation.secteurs;
    } else {
      Swal.fire('Erreur', 'Délégation non trouvée', 'error');
      console.error('Délégation non trouvée');
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

  getGouvernoratBySite(siteId: number) {
    const site = this.listOfSite.find(site => site.id === siteId);
    if (site) {
      const gouvernorat = this.listOfReg.find(gouv => gouv.id === site.idRegion);
      if (gouvernorat) {
        return gouvernorat.id;
      }
    }
    return null;
  }

  getDelegationBySiteId(siteId: number) {
    const site = this.listOfSite.find(site => site.id === siteId);
    if (site) {
      return site.delegation;
    }
    return null;
  }

  onSiteChange(event: any) {
    const siteId = event.target.value;
    const selectedGouvernoratId = this.getGouvernoratBySite(parseInt(siteId));
    const selectedDelegation = this.getDelegationBySiteId(parseInt(siteId));
    
    if (selectedGouvernoratId) {
      this.form.get('idRegion')?.setValue(selectedGouvernoratId);
      this.getDelegationsByGouvernoratId(selectedGouvernoratId);
    }
    
    if (selectedDelegation) {
      this.form.get('delegation')?.setValue(selectedDelegation);
    }
  }

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  get isFinished() {
    return this.progress >= 95;
  }

  importFile() {
    let Verif = false;
    this.progress = 0;

    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      Swal.fire({
        title: "Attention",
        text: "Veuillez entrer un fichier avec une extension PDF ou texte, s'il vous plaît.",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: "Oui"
      });
    } else {
      this.currentFileUpload = this.selectedFiles.item(0);
      const extension = this.currentFileUpload.name.split(".").pop().toUpperCase();
      if (!['PDF', 'TXT', 'DOC'].includes(extension)) {
        Swal.fire({
          title: "Attention",
          text: "Veuillez entrer un fichier avec une extension PDF ou texte, s'il vous plaît.",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: "Oui"
        });
      } else {
        Swal.fire({
          title: "",
          html: '<b>' + this.progress + ' % </b>',
          timer: 2000,
          timerProgressBar: true,
          icon: 'warning',
          didOpen: () => {
            Swal.showLoading();
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
                    Swal.close();
                    Swal.fire('Success', 'Fichier a été bien importé', 'success');
                  },
                  err => {
                    Swal.fire('Erreur', 'Echec du téléversement', 'error');
                    this.selectedFiles = undefined;
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
        });
      }
    }
  }
}
