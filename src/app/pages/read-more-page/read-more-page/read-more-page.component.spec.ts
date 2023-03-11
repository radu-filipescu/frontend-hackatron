import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMorePageComponent } from './read-more-page.component';

describe('ReadMorePageComponent', () => {
  let component: ReadMorePageComponent;
  let fixture: ComponentFixture<ReadMorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMorePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
