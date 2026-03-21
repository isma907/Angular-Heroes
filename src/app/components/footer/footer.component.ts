import { Component } from '@angular/core';
import { PaginatorComponent } from "../paginator/paginator.component";

@Component({
  selector: 'app-footer',
  imports: [PaginatorComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

}
