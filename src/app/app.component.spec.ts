import {AppComponent} from "./app.component";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {MockBuilder, MockRender} from "ng-mocks";

describe('AppComponent', () => {
  beforeEach(() => {
    return MockBuilder(AppComponent)
  });

  it(`the title is 'Contact List'`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Contact List');
  }));

  it('should render', () => {
    const fixture = MockRender(AppComponent);
    const app = fixture.point.componentInstance;
    console.log(app.service)
    expect(() => MockRender(AppComponent)).not.toThrow();
  });

  it('should contain "router-outlet"', () => {
    const component = MockRender(AppComponent).point;
    expect(component.nativeElement.querySelector('router-outlet')).toBeDefined();
  })
})

