import { PeopleSearchSpaPage } from './app.po';

describe('people-search-spa App', () => {
  let page: PeopleSearchSpaPage;

  beforeEach(() => {
    page = new PeopleSearchSpaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
