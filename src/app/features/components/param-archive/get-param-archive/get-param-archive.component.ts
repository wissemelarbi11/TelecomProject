import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParamArchive } from 'src/app/features/models/param-archive';
import { ParamArchiveService } from 'src/app/features/services/param-archive.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-param-archive',
  templateUrl: './get-param-archive.component.html',
  styleUrls: ['./get-param-archive.component.css']
})
export class GetParamArchiveComponent {

  dataSource: ParamArchive[] = [];
  public paramId!: any;
  isDialogOpen: boolean = false;
  isDialogEdit: boolean = false;
  data!:any;
    /**
  * @ignore
  */
  constructor(
    public service: ParamArchiveService) {
  }


  ngOnInit(): void {

    this.getAll();

  }

  getAll() {
    this.service.getList().subscribe((res: ParamArchive[]) => {
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
      text: "Voulez vous supprimer ce paramétre d'archive",
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

