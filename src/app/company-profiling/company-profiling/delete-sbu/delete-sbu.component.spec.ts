import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSBUComponent } from './delete-sbu.component';

describe('DeleteSBUComponent', () => {
  let component: DeleteSBUComponent;
  let fixture: ComponentFixture<DeleteSBUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSBUComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteSBUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
