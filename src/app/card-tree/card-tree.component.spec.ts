import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTreeComponent } from './card-tree.component';

describe('CardTreeComponent', () => {
  let component: CardTreeComponent;
  let fixture: ComponentFixture<CardTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
