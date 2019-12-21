import { Component, OnInit } from '@angular/core';
import Client from '../../models/client';

@Component({
  selector: 'ClientForm',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();
  private title: string = "Create Client";
  constructor() { }

  ngOnInit() {
  }

  public create(): void {
    console.log(this.client);
  }

}
