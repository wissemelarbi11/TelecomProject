import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamArchiveService } from 'src/app/features/services/param-archive.service';

@Component({
  selector: 'app-add-param-archive',
  templateUrl: './add-param-archive.component.html',
  styleUrls: ['./add-param-archive.component.css']
})
export class AddParamArchiveComponent implements OnInit {

  public paramArchiveForm!: FormGroup;

  constructor(
    private service: ParamArchiveService, 
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.paramArchiveForm = this.fb.group({
      id: [],
      ficheMiseService: [''],
      afd: [],
      ficheExp: [''],
    });
  }

  save() {
    this.service.add(this.paramArchiveForm.value).subscribe(
      (response: any) => {
        alert('PARAM ARCHIVE ajouté avec succès');
        window.location.reload(); 
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout', error);
      }
    );
  }

  onFormSubmit() {
    console.log(this.paramArchiveForm);
    this.save();
  }
}
