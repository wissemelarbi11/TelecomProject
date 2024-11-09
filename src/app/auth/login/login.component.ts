import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../features/services/auth.service';
import { TokenStorageService } from '../../features/services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  public form!: FormGroup;
  isPasswordVisible = false; // For toggling password visibility

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    
    this.form = this.fb.group({
      Nom: ['', Validators.required], // Champ requis
      password: ['', Validators.required] // Champ requis
    });
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    localStorage.setItem('Nom', this.form.value.Nom);
    var valeurStockee = localStorage.getItem('Nom');
    console.log("valeurStockee", valeurStockee);

    this.authService.login(this.form.value.Nom, this.form.value.password).subscribe({
      next: data => {
        localStorage.setItem('Nom', "Nom");

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

    this.router.navigate(['/home'])
  }

  reloadPage(): void {
    window.location.reload();
  }
}

