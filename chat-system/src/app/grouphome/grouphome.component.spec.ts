import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouphomeComponent } from './grouphome.component';

describe('GrouphomeComponent', () => {
  let component: GrouphomeComponent;
  let fixture: ComponentFixture<GrouphomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrouphomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
