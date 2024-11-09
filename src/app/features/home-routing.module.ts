import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Get7CelluleComponent } from "./components/cellule/get7-cellule/get7-cellule.component";
import { GetDocComponent } from "./components/site/doc/get-doc/get-doc.component";
import { GetDocFinancComponent } from "./components/site/finance/get-doc-financ/get-doc-financ.component";
import { GetSiteComponent } from "./components/site/get-site/get-site.component";
import { TbComponent } from "./components/site/tb/tb.component";
import { HomeComponent } from "./home.component";
import { Tb1Component } from "./components/cellule/tb1/tb1.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

const routes: Routes = [

  {  path: '', component: HomeComponent ,
  children: [
  
  {
    path: 'getSite',
    component: GetSiteComponent
  },
  {
    path: 'getDoc',
    component: GetDocComponent
  },
  {
    path: 'getDocFinanc',
    component: GetDocFinancComponent
  },
  {
    path: 'getCellule',
    component: Get7CelluleComponent
  },
  {
    path: 'search',
    component: TbComponent
  },
  {
    path: 'bi',
    component: Tb1Component
  },
  {
    path: 'tb',
    component: DashboardComponent

  },
 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
