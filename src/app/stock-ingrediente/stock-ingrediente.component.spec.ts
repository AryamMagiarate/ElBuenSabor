import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIngredienteComponent } from './stock-ingrediente.component';

describe('StockIngredienteComponent', () => {
  let component: StockIngredienteComponent;
  let fixture: ComponentFixture<StockIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockIngredienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
