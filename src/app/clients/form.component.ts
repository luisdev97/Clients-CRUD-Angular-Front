import { Component, OnInit } from '@angular/core';
import Client from '../../models/client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from '../../models/Region';

@Component({
  selector: 'ClientForm',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();
  public regions: Array<Region>;
  private title: string = "Create Client";
  private errors: string[];

  constructor(private clientService: ClientService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
    this.loadRegions();
  }

  private loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      id && this.clientService.getClient(id).subscribe(client => this.client = client);      
    })
  }

  private loadRegions(){
    this.clientService.getRegions().subscribe(regions => {
      this.regions = regions;
    });
  }


  public create(): void {
     this.clientService.create(this.client).subscribe(
       client => {
        //this.router.navigate(['/clients']);
        //swal.fire('Saved client', `Client ${ client.name } successfully created`, 'success');
      },
      e => {
        this.errors = e.error.errors as string[];
      }
     );
  }


  public update(): void {
    this.clientService.update(this.client).subscribe(
      client => {
        this.router.navigate(['/clients']);
        swal.fire('Modified client', `Client ${ client.name } successfully modified`, 'success');
      },
      e => {
        this.errors = e.error.errors as string[];
      }
    )
  }

  public compareRegion(object1: Region, object2: Region): boolean {
    
    if(object1 === undefined && object2 === undefined)
      return true;

    return object1 == null || object2 == null ? false : object1.id === object2.id;
  }
}
