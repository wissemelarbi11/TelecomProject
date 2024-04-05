import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gouvernorate } from 'src/app/features/models/governorate';
import { ParamPhy } from 'src/app/features/models/param-phy';
import { GovernorateService } from 'src/app/features/services/governorate.service';
import { ParamArchiveService } from 'src/app/features/services/param-archive.service';
import { ParamLogiqueService } from 'src/app/features/services/param-logique.service';
import { ParamPhyService } from 'src/app/features/services/param-phy.service';
import { SiteService } from 'src/app/features/services/site.service';
import { TechnologieService } from 'src/app/features/services/technologie.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {

  listOfPhy: ParamPhy[] = [];
  listOfLog: any[] = [];
  listOfArch: any[] = [];
  listOfTech: any[] = [];
  listOfReg: any[] = [];
  public paramPhyForm!: FormGroup;

  delegations: any[] = [];
  secteurs: any[] = [];

  ngOnInit(): void {
    this.paramPhyForm = this.fb.group({
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
    }
    );

    this.getParamPhy();
    this.getParamArch();
    this.getParamLog();
    this.getTech();
    this.getGouv();
  }

  constructor(private paramPhyService: ParamPhyService,
    private paramLogiqueService: ParamLogiqueService,
    private paramArchiveService: ParamArchiveService,
    private technologieService: TechnologieService,
    public gouvService: GovernorateService,
    private service: SiteService, private fb: FormBuilder) {
  }

  save() {

    this.paramPhyForm.value.idPhysique = parseInt(this.paramPhyForm.value.idPhysique);
    this.paramPhyForm.value.idLogique = parseInt(this.paramPhyForm.value.idLogique);
    this.paramPhyForm.value.idArchive = parseInt(this.paramPhyForm.value.idArchive);
    this.paramPhyForm.value.idTechnologie = parseInt(this.paramPhyForm.value.idTechnologie);
    this.paramPhyForm.value.idRegion = parseInt(this.paramPhyForm.value.idRegion);

    this.service.add(this.paramPhyForm.value).subscribe(
      (response: any) => {
        alert('Site ajouté avec succès');
        window.location.reload(); 
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout', error);
      }
    );


  }


  onFormSubmit() {
    console.log(this.paramPhyForm);
    this.save();
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



