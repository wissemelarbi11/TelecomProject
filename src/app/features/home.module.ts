import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';

import { HeaderComponent } from '../core/components/header/header.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { HomeComponent } from './home.component';
import { AddCelluleComponent } from './components/cellule/add-cellule/add-cellule.component';
import { EditCelluleComponent } from './components/cellule/edit-cellule/edit-cellule.component';
import { Get7CelluleComponent } from './components/cellule/get7-cellule/get7-cellule.component';
import { AddSiteComponent } from './components/site/add-site/add-site.component';
import { AddDocComponent } from './components/site/doc/add-doc/add-doc.component';
import { EditDocComponent } from './components/site/doc/edit-doc/edit-doc.component';
import { GetDocComponent } from './components/site/doc/get-doc/get-doc.component';
import { EditSiteComponent } from './components/site/edit-site/edit-site.component';
import { AddDocFinancComponent } from './components/site/finance/add-doc-financ/add-doc-financ.component';
import { EditDocFinancComponent } from './components/site/finance/edit-doc-financ/edit-doc-financ.component';
import { GetDocFinancComponent } from './components/site/finance/get-doc-financ/get-doc-financ.component';
import { HomeRoutingModule } from './home-routing.module';
import { GetSiteComponent } from './components/site/get-site/get-site.component';
import { TbComponent } from './components/site/tb/tb.component';
import { Tb1Component } from './components/cellule/tb1/tb1.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    EditSiteComponent,
    AddSiteComponent,
    EditSiteComponent,
    GetSiteComponent,
    EditDocComponent,
    AddDocComponent,
    GetDocComponent,
    GetDocFinancComponent,
    AddDocFinancComponent,
    EditDocFinancComponent,
    EditCelluleComponent,
    Get7CelluleComponent,
    AddCelluleComponent,
    TbComponent,
    Tb1Component
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DialogModule,
   // BrowserAnimationsModule,
    //RouterModule,
    HomeRoutingModule
  ],
  providers: [Location],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
