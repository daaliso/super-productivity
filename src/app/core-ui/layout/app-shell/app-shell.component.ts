import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { warpRouteAnimation } from '../../../ui/animations/warp-route';
import { LayoutService } from '../layout.service';
import { MagicSideNavComponent } from '../../magic-side-nav/magic-side-nav.component';
import { MainHeaderComponent } from '../../main-header/main-header.component';
import { BannerComponent } from '../../../core/banner/banner/banner.component';
import { RightPanelComponent } from '../../../features/right-panel/right-panel.component';
import { GlobalProgressBarComponent } from '../../global-progress-bar/global-progress-bar.component';
import { MobileBottomNavComponent } from '../../mobile-bottom-nav/mobile-bottom-nav.component';

/**
 * AppShellComponent encapsulates the structural layout of the application.
 * It manages the sidebar, header, main content area, and mobile bottom navigation.
 *
 * Responsibilities:
 * - Provide the visual structure (sidebar + header + main + mobile nav)
 * - Respond to layout state changes from LayoutService
 * - Route page animations via warpRouteAnimation
 *
 * This component is purely presentational and delegates all business logic
 * to LayoutService and other injected services.
 */
@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [warpRouteAnimation],
  imports: [
    MagicSideNavComponent,
    MainHeaderComponent,
    BannerComponent,
    RightPanelComponent,
    RouterOutlet,
    GlobalProgressBarComponent,
    MobileBottomNavComponent,
  ],
})
export class AppShellComponent {
  readonly layoutService = inject(LayoutService);

  // Inputs
  readonly activeWorkContextId = input<string | null>(null);
  readonly isRTL = input<boolean>(false);

  // Outputs
  readonly mobileNavToggle = output<void>();

  // Computed signals
  readonly isShowMobileBottomNav = computed(() =>
    this.layoutService.isShowMobileBottomNav(),
  );

  // ViewChildren - exposed for parent component access
  @ViewChild(MagicSideNavComponent) magicSideNav?: MagicSideNavComponent;
  @ViewChild('routeWrapper', { read: ElementRef }) routeWrapper?: ElementRef<HTMLElement>;

  /**
   * Gets the current page identifier for route animations.
   * Used by the warpRoute animation to determine transition direction.
   */
  getPage(outlet: RouterOutlet): string {
    return outlet.activatedRouteData.page || 'one';
  }

  /**
   * Handles mobile nav toggle by delegating to the MagicSideNavComponent.
   */
  onMobileNavToggle(): void {
    this.magicSideNav?.toggleMobileNav();
  }
}
