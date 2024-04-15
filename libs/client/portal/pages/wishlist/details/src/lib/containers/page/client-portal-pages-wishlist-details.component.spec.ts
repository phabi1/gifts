import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPortalPagesWishlistDetailsComponent } from './client-portal-pages-wishlist-details.component';

describe('ClientPortalPagesWishlistDetailsComponent', () => {
  let component: ClientPortalPagesWishlistDetailsComponent;
  let fixture: ComponentFixture<ClientPortalPagesWishlistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPortalPagesWishlistDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ClientPortalPagesWishlistDetailsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
