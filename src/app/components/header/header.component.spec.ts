import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {ContactsComponent} from "../contacts/contacts.component";
import {AppModule} from "../../app.module";
import {HeaderComponent} from "./header.component";

describe('HeaderComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(ContactsComponent, AppModule)
  })

  it('should create component', () => {
    expect(() => MockRender(HeaderComponent).point.componentInstance).not.toThrow();
  });

  it('should contain "app-search"', () => {
    const component = MockRender(HeaderComponent);

    expect(() => component.nativeElement.querySelector('app-search')).toBeDefined();
  });
})
