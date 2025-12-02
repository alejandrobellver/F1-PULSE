import { TestBed } from '@angular/core/testing';
import { F1App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(F1App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(F1App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, F1-Pulse');
  });
});
