import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAuctionComponent } from './browse-auction.component';

describe('BrowseAuctionComponent', () => {
  let component: BrowseAuctionComponent;
  let fixture: ComponentFixture<BrowseAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
