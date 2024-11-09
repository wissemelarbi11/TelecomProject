import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  public form!: FormGroup;
  isPasswordVisible = false; // For toggling password visibility

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required], // Champ requis
      email: ['', Validators.required], // Champ requis
      password: ['', Validators.required], // Champ requis
      profile: ['', Validators.required] 
    });
  }

  onSubmit(): void {
    const { username, email, password, profile } = this.form.value;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
        // Show success alert
       
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;

        // Show error alert
        Swal.fire({
          title: 'Inscription réussie!',
          text: 'Vous êtes maintenant inscrit.',
          icon: 'success',
          confirmButtonText: 'OK'
             
        })
       
    
      }
    });
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}