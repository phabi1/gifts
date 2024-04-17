import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
  selector: 'gifts-client-portal-pages-wishlist-settings-informations-form',
  standalone: true,
  imports: [FormlyModule, FormlyMaterialModule],
  templateUrl: './informations-form.component.html',
  styleUrl: './informations-form.component.css',
})
export class InformationsFormComponent implements OnInit, OnChanges {

  form = new FormGroup({});
  model = {};
  fields = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Description',
      },
    },
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        type: 'password',
        label: 'Password',
        required: true,
      },
    },
  ];

  @Input() wishlist: any;

  ngOnInit(): void {
    this.updateModel(this.wishlist);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('wishlist' in changes) {
      this.updateModel(changes['wishlist'].currentValue);
    }
  }

  protected updateModel(wishlist: any) {
    this.model = {
      title: wishlist.title,
      description: wishlist.description,
      name: wishlist.name,
      password: '',
    };
  }
}
