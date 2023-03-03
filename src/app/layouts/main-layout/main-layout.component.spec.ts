import {MockBuilder, MockRender} from "ng-mocks";
import {MainLayoutComponent} from "./main-layout.component";

describe('MainLayoutComponent', () => {
  beforeEach(() => {
    return MockBuilder(MainLayoutComponent);
  });

  it('should render', () => {
    expect(() => MockRender(MainLayoutComponent)).not.toThrow();
  });

  it('should contain "router-outlet"', () => {
    const component = MockRender(MainLayoutComponent)
    expect(() => component.nativeElement.querySelector('router-outlet')).toBeDefined();
  });

  it('should contain "app-header"', () => {
    const component = MockRender(MainLayoutComponent)
    expect(() => component.nativeElement.querySelector('app-header')).toBeDefined();
  });
})
