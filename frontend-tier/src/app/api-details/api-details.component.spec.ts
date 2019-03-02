import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Apidetailscomponent } from './api-details.component';

describe('Apidetailscomponent', () => {
  let component: Apidetailscomponent;
  let fixture: ComponentFixture<Apidetailscomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Apidetailscomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Apidetailscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
