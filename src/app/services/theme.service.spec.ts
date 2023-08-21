import {ThemeService} from "./theme.service";
import {TestBed} from "@angular/core/testing";

describe('ThemeService', () => {
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeService],
    })

    themeService = new ThemeService();
  })

  it('should create', () => {
    expect(themeService).toBeDefined();
  });

  it('should have a default theme of light', () => {
    expect(themeService['currentTheme']).toEqual('light');
  });

  it('should toggle the theme from light to dark', () => {
    themeService.toggleTheme();
    expect(themeService['currentTheme']).toEqual('dark');
  });

  it('should toggle the theme from dark to light', () => {
    themeService['currentTheme'] = 'dark';
    themeService.toggleTheme();
    expect(themeService['currentTheme']).toEqual('light');
  });

  it('should add "dark-theme" class to body when the theme is dark', () => {
    themeService['currentTheme'] = 'light';
    themeService.toggleTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should remove "dark-theme" class from body when the theme is light', () => {
    themeService['currentTheme'] = 'dark';
    themeService.toggleTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });
})
