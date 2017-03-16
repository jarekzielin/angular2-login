import { LoginPage } from './app.po';

describe('login App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  xit('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
