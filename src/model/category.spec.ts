import { Category } from './category';

describe('Category', () => {
  describe('calculates query', () => {
    it('should create query for no osm values', () => {
      const category = new Category('leisure', 'leisure', []);
      expect(category.query()).toEqual('"leisure"');
    });

    it('should create query for one osm value', () => {
      const category = new Category('firestation', 'amenity', ['fire_station']);
      expect(category.query()).toEqual('"amenity"="fire_station"');
    });

    it('should create query for multiple osm values', () => {
      const category = new Category('electronic', 'shop', ['electronics', 'mobile_phone', 'computer']);
      expect(category.query()).toEqual('"shop"~"electronics|mobile_phone|computer"');
    });
  });
});
