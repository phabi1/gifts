import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationsFormComponent } from './informations-form.component';

describe('InformationsFormComponent', () => {
  let component: InformationsFormComponent;
  let fixture: ComponentFixture<InformationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
