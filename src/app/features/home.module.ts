import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';

import { HeaderComponent } from '../core/components/header/header.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { HomeComponent } from './home.component';
import { AddCelluleComponent } from './components/cellule/add-cellule/add-cellule.component';
import { EditCelluleComponent } from './components/cellule/edit-cellule/edit-cellule.component';
import { Get7CelluleComponent } from './components/cellule/get7-cellule/get7-cellule.component';
import { TbComponent } from './components/cellule/tb/tb.component';
import { AddParamArchiveComponent } from './components/param-archive/add-param-archive/add-param-archive.component';
import { EditParamArchiveComponent } from './components/param-archive/edit-param-archive/edit-param-archive.component';
import { GetParamArchiveComponent } from './components/param-archive/get-param-archive/get-param-archive.component';
import { AddParamLogiqueComponent } from './components/param-logique/add-param-logique/add-param-logique.component';
import { EditParamLogiqueComponent } from './components/param-logique/edit-param-logique/edit-param-logique.component';
import { GetParamLogiqueComponent } from './components/param-logique/get-param-logique/get-param-logique.component';
import { AddParamPhyComponent } from './components/param-physique/add-param-phy/add-param-phy.component';
import { EditParamPhyComponent } from './components/param-physique/edit-param-phy/edit-param-phy.component';
import { GetParamPhyComponent } from './components/param-physique/get-param-phy/get-param-phy.component';
import { AddSiteComponent } from './components/site/add-site/add-site.component';
import { AddDocComponent } from './components/site/doc/add-doc/add-doc.component';
import { EditDocComponent } from './components/site/doc/edit-doc/edit-doc.component';
import { GetDocComponent } from './components/site/doc/get-doc/get-doc.component';
import { EditSiteComponent } from './components/site/edit-site/edit-site.component';
import { AddDocFinancComponent } from './components/site/finance/add-doc-financ/add-doc-financ.component';
import { EditDocFinancComponent } from './components/site/finance/edit-doc-financ/edit-doc-financ.component';
import { GetDocFinancComponent } from './components/site/finance/get-doc-financ/get-doc-financ.component';
import { GetSiteComponent } from './components/site/get-site/get-site.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    AddParamArchiveComponent,
    GetParamArchiveComponent,
    EditParamArchiveComponent,
    GetParamPhyComponent,
    GetParamPhyComponent,
    EditParamPhyComponent,
    GetParamLogiqueComponent,
    AddParamLogiqueComponent,
    EditParamLogiqueComponent,
    AddParamPhyComponent,
    EditSiteComponent,
    AddSiteComponent,
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
