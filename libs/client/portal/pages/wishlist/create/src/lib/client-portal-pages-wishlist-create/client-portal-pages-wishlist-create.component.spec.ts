import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPortalPagesWishlistCreateComponent } from './client-portal-pages-wishlist-create.component';

describe('ClientPortalPagesWishlistCreateComponent', () => {
  let component: ClientPortalPagesWishlistCreateComponent;
  let fixture: ComponentFixture<ClientPortalPagesWishlistCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPortalPagesWishlistCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPortalPagesWishlistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
