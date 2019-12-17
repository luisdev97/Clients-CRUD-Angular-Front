import { Component } from '@angular/core';

@Component({
    selector: 'Footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})


export class FooterComponent {
    public author: any = {
        name: 'Luis Daid',
        surName: 'Amador Montoro'
    }
}
