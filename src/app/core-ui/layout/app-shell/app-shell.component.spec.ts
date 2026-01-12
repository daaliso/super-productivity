import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppShellComponent } from './app-shell.component';
import { LayoutService } from '../layout.service';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(async () => {
    mockLayoutService = jasmine.createSpyObj<LayoutService>('LayoutService', [], {
      isScrolled: signal(false),
      isShowMobileBottomNav: signal(false),
    });

    await TestBed.configureTestingModule({
      imports: [AppShellComponent],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        provideRouter([]),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render magic-side-nav', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('magic-side-nav')).toBeTruthy();
  });

  it('should render main-header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main-header')).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should conditionally render mobile-bottom-nav based on signal', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Initially false, should not render
    expect(compiled.querySelector('mobile-bottom-nav')).toBeFalsy();

    // Update signal to true
    mockLayoutService.isShowMobileBottomNav.set(true);

    fixture.detectChanges();

    // Should now render
    expect(compiled.querySelector('mobile-bottom-nav')).toBeTruthy();
  });

  it('should apply RTL direction when isRTL is true', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('isRTL', true);
    fixture.detectChanges();

    const container = compiled.querySelector('.app-container') as HTMLElement;
    expect(container.getAttribute('dir')).toBe('rtl');
  });

  it('should apply LTR direction when isRTL is false', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('isRTL', false);
    fixture.detectChanges();

    const container = compiled.querySelector('.app-container') as HTMLElement;
    expect(container.getAttribute('dir')).toBe('ltr');
  });

  it('should add has-mobile-bottom-nav class when mobile nav is shown', () => {
    mockLayoutService.isShowMobileBottomNav.set(true);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.app-container') as HTMLElement;
    expect(container.classList.contains('has-mobile-bottom-nav')).toBe(true);
  });

  it('should return page identifier from outlet data', () => {
    const mockOutlet = {
      activatedRouteData: { page: 'test-page' },
    } as any;

    expect(component.getPage(mockOutlet)).toBe('test-page');
  });

  it('should return "one" as default page when no page data exists', () => {
    const mockOutlet = {
      activatedRouteData: {},
    } as any;

    expect(component.getPage(mockOutlet)).toBe('one');
  });
});
