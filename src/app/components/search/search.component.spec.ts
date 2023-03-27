import {MockBuilder, MockInstance, MockRender, ngMocks} from "ng-mocks";
import {SearchComponent} from "./search.component";
import {AppModule} from "../../app.module";
import {SearchService} from "../../services/search.service";
import {of, Subject} from "rxjs";

describe('SearchComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(SearchComponent, AppModule)
      .mock(SearchService, {
        onSearch: () => of('test'),
        onSearch$: new Subject<string>()
      })
  })

  it('should create component', () => {
    expect(() => MockRender(SearchComponent).point.componentInstance).not.toThrow();
  });

  it('should call nextOnSearch method of searchService when onSearch method is called', () => {
    const fixture = MockRender(SearchComponent);
    const component = fixture.point.componentInstance;
    const inputValue = 'test input';
    const searchService = ngMocks.get(SearchService);
    jest.spyOn(searchService, 'nextOnSearch');

    component.onSearch(inputValue);

    expect(searchService.nextOnSearch).toHaveBeenCalledWith(inputValue);
  });

  it('should emit the input value on SearchService', () => {
    const fixture = MockRender(SearchComponent);
    const component = fixture.point.componentInstance;
    const inputValue = 'test input';
    const searchService = ngMocks.get(SearchService);
    jest.spyOn(searchService, 'nextOnSearch');

    component.onSearch(inputValue);

    searchService.onSearch$.subscribe((value) => {
      expect(value).toEqual(inputValue);
    });
    expect(searchService.nextOnSearch).toHaveBeenCalledWith(inputValue);
  });
});
