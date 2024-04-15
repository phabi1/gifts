import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPortalPagesWishlistSettingsComponent } from './client-portal-pages-wishlist-settings.component';

describe('ClientPortalPagesWishlistSettingsComponent', () => {
  let component: ClientPortalPagesWishlistSettingsComponent;
  let fixture: ComponentFixture<ClientPortalPagesWishlistSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPortalPagesWishlistSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ClientPortalPagesWishlistSettingsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
