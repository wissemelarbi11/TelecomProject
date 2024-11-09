import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gouvernorate } from 'src/app/features/models/governorate';
import { ParamPhy } from 'src/app/features/models/param-phy';
import { Site } from 'src/app/features/models/site';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { ParamArchiveService } from 'src/app/features/services/param-archive.service';
import { ParamLogiqueService } from 'src/app/features/services/param-logique.service';
import { ParamPhyService } from 'src/app/features/services/param-phy.service';
import { SiteService } from 'src/app/features/services/site.service';
import { TechnologieService } from 'src/app/features/services/technologie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent implements OnInit {
  dataSource: Site[] = [];
  selectedSiteId: any;
  selectedGouvernorat: string = '';
  selectedDelegation: string = '';

  listOfPhy: ParamPhy[] = [];
  listOfLog: any[] = [];
  listOfArch: any[] = [];
  listOfTech: any[] = [];
  listOfReg: any[] = [];
  public form!: FormGroup;

  delegations: any[] = [];
  secteurs: any[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
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
    });

    this.getParamPhy();
    this.getParamArch();
    this.getParamLog();
    this.getTech();
    this.getGouv();
  }

  constructor(
    private paramPhyService: ParamPhyService,
    private paramLogiqueService: ParamLogiqueService,
    private paramArchiveService: ParamArchiveService,
    private technologieService: TechnologieService,
    public gouvService: GovernorateService,
    private service: SiteService,
    private fb: FormBuilder
  ) {}

  save() {
    const siteName = this.form.value.libelleSite;
  
    // Check if the site with the same name exists using json-server
    this.service.checkIfSiteExists(siteName).subscribe(
      (sites: Site[]) => {
        if (sites && sites.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Duplication de nom',
            html: '<span style="color:#d9534f;">Un site avec ce nom existe déjà. Veuillez entrer un nom unique pour le site.</span>',
          });
        } else {
          // If the site name is unique, proceed to save
          this.form.value.idRegion = parseInt(this.form.value.idRegion, 10);
  
          this.service.add(this.form.value).subscribe(
            (response: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Ajout réussi',
                text: 'Le site a été ajouté avec succès.',
              }).then(() => {
                window.location.reload();
              });
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Erreur d\'ajout',
                text: 'Une erreur est survenue lors de l\'ajout du site. Veuillez réessayer plus tard.',
              });
              console.error('Erreur lors de l\'ajout', error);
            }
          );
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de vérification',
          text: 'Une erreur est survenue lors de la vérification du nom du site. Veuillez réessayer plus tard.',
        });
        console.error('Erreur lors de la vérification du site', error);
      }
    );
  }
  

  onFormSubmit() {
    console.log(this.form.value);
    this.save();
  }

  getParamPhy() {
    this.paramPhyService.getList().subscribe(
      (data: any[]) => {
        this.listOfPhy = data;
        console.log('Paramètres physiques:', this.listOfPhy);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des paramètres physiques', error);
      }
    );
  }

  getParamLog() {
    this.paramLogiqueService.getList().subscribe(
      (data: any[]) => {
        this.listOfLog = data;
        console.log('Paramètres logiques:', this.listOfLog);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des paramètres logiques', error);
      }
    );
  }

  getParamArch() {
    this.paramArchiveService.getList().subscribe(
      (data: any[]) => {
        this.listOfArch = data;
        console.log('Paramètres d\'archive:', this.listOfArch);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des paramètres d\'archive', error);
      }
    );
  }

  getTech() {
    this.technologieService.getList().subscribe(
      (data: any[]) => {
        this.listOfTech = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la liste des technologies', error);
      }
    );
  }

  getGouv() {
    this.gouvService.getList().subscribe(
      (data: any[]) => {
        this.listOfReg = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la liste des gouvernorats', error);
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
        console.error('Erreur lors de la récupération de la liste des délégations', error);
      }
    );
  }

  getSecteurByDelegationId(event: any): void {
    const idDelegationSelectionne = event.target.value;
    const delegation = this.findDelegationById(idDelegationSelectionne);

    if (delegation) {
      this.secteurs = delegation.secteurs;
    } else {
      console.error('Délégation non trouvée');
    }
  }

  findDelegationById(libelle: any): any {
    for (const gouvernorat of this.listOfReg) {
      for (const delegation of gouvernorat.delegations) {
        if (delegation.libelle === libelle) {
          return delegation;
        }
      }
    }
    return null;
  }
}
