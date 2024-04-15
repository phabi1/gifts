import { Component } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { CreateComponent } from '../create/create.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'gifts-client-portal-pages-home-page',
  standalone: true,
  imports: [SearchComponent, CodeComponent, CreateComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {}
