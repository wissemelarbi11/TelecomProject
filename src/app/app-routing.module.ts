import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '', 
    children: [
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

    ]
  },

  {
    path: 'home', 
    children: [
      { path: '', loadChildren: () => import('./features/home.module').then(m => m.HomeModule) },

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
