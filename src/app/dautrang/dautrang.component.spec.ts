import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DautrangComponent } from './dautrang.component';

describe('DautrangComponent', () => {
  let component: DautrangComponent;
  let fixture: ComponentFixture<DautrangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DautrangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DautrangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
