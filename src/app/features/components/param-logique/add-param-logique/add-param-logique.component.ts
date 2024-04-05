import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamLogiqueService } from 'src/app/features/services/param-logique.service';

@Component({
  selector: 'app-add-param-logique',
  templateUrl: './add-param-logique.component.html',
  styleUrls: ['./add-param-logique.component.css']
})
export class AddParamLogiqueComponent {

  public paramLogiqueForm!: FormGroup;
  
  ngOnInit(): void {
    this.paramLogiqueForm = this.fb.group({
      id: [],
      x: [],
      y: [],
      hba: [],
      c: [''],
      bande: [''],
      frequence: [''],
    }
  
    );
    
  }
  
  constructor(
    private service: ParamLogiqueService, private fb: FormBuilder) {
  }
  
  save() {
  
    this.service.add(this.paramLogiqueForm.value).subscribe(
      (response: any) => {
        alert('PARAM LOGIQUE ajouté avec succès');
        window.location.reload(); 
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout', error);
      }
    );
  
  
  }
  
  
  onFormSubmit() {
    console.log(this.paramLogiqueForm);
    this.save();
  }
  
  
  }
  
  
  