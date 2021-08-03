import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeatilsComponent } from './account-deatils.component';

describe('AccountDeatilsComponent', () => {
  let component: AccountDeatilsComponent;
  let fixture: ComponentFixture<AccountDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDeatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
