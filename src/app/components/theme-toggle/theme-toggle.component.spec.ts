import {MockBuilder, MockInstance, MockRender, ngMocks} from "ng-mocks";
import {ThemeToggleComponent} from "./theme-toggle.component";
import {AppModule} from "../../app.module";
import {ThemeService} from "../../services/theme.service";
import spyOn = jest.spyOn;

describe('ThemeToggleComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(ThemeToggleComponent, AppModule)
      .mock(ThemeService)
  })

  it('should create component', () => {
    expect(() => MockRender(ThemeToggleComponent).point.componentInstance).not.toThrow();
  });

  it('should call toggleTheme method when toggleTheme is called', () => {
    const fixture = MockRender(ThemeToggleComponent);
    const component = fixture.point.componentInstance;
    const themeService = ngMocks.get(ThemeService);
    const toggleSpy = spyOn(themeService, 'toggleTheme');

    component.toggleTheme();

    expect(toggleSpy).toHaveBeenCalled()
  });
})
