import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNodeViewComponent } from './user-node-view.component';

describe('UserNodeViewComponent', () => {
  let component: UserNodeViewComponent;
  let fixture: ComponentFixture<UserNodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNodeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
