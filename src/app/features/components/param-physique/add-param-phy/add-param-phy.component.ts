import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamPhyService } from 'src/app/features/services/param-phy.service';
import { TypeSupportService } from 'src/app/features/services/type-support.service';

@Component({
  selector: 'app-add-param-phy',
  templateUrl: './add-param-phy.component.html',
  styleUrls: ['./add-param-phy.component.css']
})
export class AddParamPhyComponent {

types: any[] = [];

public paramPhyForm!: FormGroup;


ngOnInit(): void {
  this.paramPhyForm = this.fb.group({
    id: [],
    idType: [],
    nbAntenne: [0],
    SectionVideo: [''],
  }

  );

  this.getType();

}

constructor(private typeSupportService: TypeSupportService,
  private service: ParamPhyService, private fb: FormBuilder) {
}

save() {

  this.service.add(this.paramPhyForm.value).subscribe(
    (response: any) => {
      alert('PARAM PHYSIQUE ajouté avec succès');
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


getType() {
  this.typeSupportService.getList().subscribe(
    (data: any[]) => {
      this.types = data;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des types de support', error);
    }
  );
}

}


