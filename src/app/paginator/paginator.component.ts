import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paginador',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: any;

  pages: number[];

  constructor() { }

  ngOnInit() {
      this.pages = new Array(this.paginator.totalPages).fill(0).map((v, i) => i + 1);
  }

}
