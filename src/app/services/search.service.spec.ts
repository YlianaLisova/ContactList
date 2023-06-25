import {SearchService} from './search.service';

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(() => {
    searchService = new SearchService();
  });

  it('should emit search value when nextOnSearch is called', () => {
    const searchValue = 'Test search';
    const onSearchSpy = jest.spyOn(searchService.onSearch$, 'next');

    searchService.nextOnSearch(searchValue);

    expect(onSearchSpy).toHaveBeenCalledWith(searchValue);
  });

  it('should return an Observable that emits lowerCase value with debounceTime and distinctUntilChanged operators applied', (done) => {
    const searchValue = 'Test search';
    const debounceTime = 100;

    searchService.onSearch(debounceTime).subscribe((result) => {
      expect(result).toEqual(searchValue.toLowerCase());
      done();
    });
    searchService.nextOnSearch(searchValue);
  });
});




