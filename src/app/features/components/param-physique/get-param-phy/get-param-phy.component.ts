import { Component } from '@angular/core';
import { ParamPhy } from 'src/app/features/models/param-phy';
import { ParamPhyService } from 'src/app/features/services/param-phy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-param-phy',
  templateUrl: './get-param-phy.component.html',
  styleUrls: ['./get-param-phy.component.css']
})
export class GetParamPhyComponent {

  dataSource: ParamPhy[] = [];
  public paramId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!:any;
    /**
  * @ignore
  */
  constructor(
    public service: ParamPhyService) {
  }


  ngOnInit(): void {

    this.getAll();

  }

  getAll() {
    this.service.getList().subscribe((res: ParamPhy[]) => {
      this.dataSource = res;
    })
  }


  add() {
    this.isDialogOpen = true;
    console.log('testtt');  }

  openDialogedit(item: any) {
    this.isDialogEdit= true;
    this.data=item;
  }



  delete(id: any) {
    Swal.fire({ //Show Popup Confirmation

      /************************************************************ Popup Settings  */
      title: "",
      text: "Voulez vous supprimer ce paramétre physique",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Non",
      confirmButtonText: "Oui"
      /************************************************************ Popup Result  */

    }).then((result: any) => {
      if (result.isConfirmed) { /***> If Confirmed  **/
        this.service.delete(id).subscribe(
          (resp: any) => {
            console.log(resp);
           this.getAll();

          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    })

  }

  OnSelected(id: any) {

    this.paramId = id;

  }


  edit(item: any) {
    this.isDialogEdit= true;
    this.data=item;
  }

}

