import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginador',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: any;

  pages: number[];

  from: number;
  to: number;

  constructor() { }



  ngOnInit() {
    this.initPaginator();
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    let updatePaginator   = changes['paginator'];
    if(updatePaginator.previousValue)
      this.initPaginator();
  }

  private initPaginator(): void {
      if(this.paginator.totalPages > 5){
        this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
        this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
        this.pages = new Array(this.to - this.from + 1).fill(0).map((v, i) => i + this.from);
      }    
      else
        this.pages = new Array(this.paginator.totalPages).fill(0).map((v, i) => i + 1);
  }

}
