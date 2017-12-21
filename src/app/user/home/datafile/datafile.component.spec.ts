import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafileComponent } from './datafile.component';

describe('DatafileComponent', () => {
  let component: DatafileComponent;
  let fixture: ComponentFixture<DatafileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
