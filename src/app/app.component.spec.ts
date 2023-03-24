import {MockBuilder, MockInstance, MockRender, ngMocks} from "ng-mocks";
import {AppComponent} from "./app.component";
import {AppModule} from "./app.module";
import {SearchService} from "./services/search.service";
import {of} from "rxjs";

describe('AppComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);


  beforeEach(() => {
    return MockBuilder(AppComponent, AppModule)
      .mock(SearchService, {
        onSearch: () => of('uliana')
      })
  })

  it('should create component', () => {
    expect(() => MockRender(AppComponent).point.componentInstance).not.toThrow();
  });

  it('should call searchService', () => {
    const fixture = MockRender(AppComponent);
    const component = fixture.point.componentInstance;
    const searchService = ngMocks.get(SearchService);
    jest.spyOn(searchService, 'onSearch').mockImplementation();

    component.ngOnInit();

    expect(searchService.onSearch).toHaveBeenCalled();
  });


  it('should contain router-outlet', () => {
    const component = MockRender(AppComponent).point;
    expect(component.nativeElement.querySelector('router-outlet')).toBeDefined();
  });
})
