import { PlanetvintagePage } from './app.po';

describe('planetvintage App', () => {
  let page: PlanetvintagePage;

  beforeEach(() => {
    page = new PlanetvintagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
