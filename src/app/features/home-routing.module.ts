import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Get7CelluleComponent } from "./components/cellule/get7-cellule/get7-cellule.component";
import { GetParamArchiveComponent } from "./components/param-archive/get-param-archive/get-param-archive.component";
import { GetParamLogiqueComponent } from "./components/param-logique/get-param-logique/get-param-logique.component";
import { GetParamPhyComponent } from "./components/param-physique/get-param-phy/get-param-phy.component";
import { GetDocComponent } from "./components/site/doc/get-doc/get-doc.component";
import { GetDocFinancComponent } from "./components/site/finance/get-doc-financ/get-doc-financ.component";
import { GetSiteComponent } from "./components/site/get-site/get-site.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [

  {  path: '', component: HomeComponent ,
  children: [
  {
    
    path: 'getParamArchive',
    component: GetParamArchiveComponent,
  },
  {
    path: 'getParamLogique',
    component: GetParamLogiqueComponent
  },
  {
    path: 'getParamPhysique',
    component: GetParamPhyComponent
  },
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
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
