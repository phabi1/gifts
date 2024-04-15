import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gifts-client-portal-pages-home-create',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent { }
