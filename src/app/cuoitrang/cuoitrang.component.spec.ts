import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuoitrangComponent } from './cuoitrang.component';

describe('CuoitrangComponent', () => {
  let component: CuoitrangComponent;
  let fixture: ComponentFixture<CuoitrangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuoitrangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuoitrangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
