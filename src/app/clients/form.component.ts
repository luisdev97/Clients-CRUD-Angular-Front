import { Component, OnInit } from '@angular/core';
import Client from '../../models/client';
import { ClientService } from './client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ClientForm',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();
  private title: string = "Create Client";

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
  }

  public create(): void {
     this.clientService.create(this.client).subscribe(
       response => {
        this.router.navigate(['/clients']);
       }
     );
  }

}
