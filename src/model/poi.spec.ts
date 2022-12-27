import { Poi } from './poi';
import { LatLon } from './lat-lon';

describe('Poi', () => {
  describe('constructor', () => {
    it('should create Poi', () => {
      const poi = new Poi('way45664541', ['restaurant', 'hotel'], new LatLon(52.3, 8.6), {
        amenity: 'restaurant',
        tourism: 'hotel',
        cuisine: 'german',
      }, null);
      expect(poi.id).toEqual('way45664541');
    });
  });
});
