import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPortalPagesHomeComponent } from './page.component';

describe('ClientPortalPagesHomeComponent', () => {
  let component: ClientPortalPagesHomeComponent;
  let fixture: ComponentFixture<ClientPortalPagesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPortalPagesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPortalPagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
