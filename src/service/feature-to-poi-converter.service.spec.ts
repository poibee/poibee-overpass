import { GeometryCenterCalculatorService } from './geometry-center-calculator.service';
import { Feature, Geometry } from 'geojson';
import { FeatureToPoiConverterService } from './feature-to-poi-converter.service';
import { TagsToCategoryConverter } from './tags-to-category-converter.service';

describe('FeatureToPoiConverterService', () => {
  let sut: FeatureToPoiConverterService;

  beforeEach(async () => {
    const tagsToCategoryConverter = new TagsToCategoryConverter();
    const geometryCenterCalculatorService = new GeometryCenterCalculatorService();
    sut = new FeatureToPoiConverterService(tagsToCategoryConverter, geometryCenterCalculatorService);
  });

  describe('calculates poi', () => {
    it('should work for feature without original object', () => {
      const pointFeature: Feature<Geometry, { [p: string]: any }> = {
        type: 'Feature',
        id: 'node/12345678',
        properties: {
          tags: {
            name: 'Mjam Mjam',
            cuisine: 'german',
            opening_hours: '17:00+',
            smoking: 'separated',
            amenity: 'restaurant',
            tourism: 'unknown',
            historic: 'memorial',
            website: 'https://mjam.mjam',
          },
        },
        geometry: {
          type: 'Point',
          coordinates: [8.567, 52.345],
        },
      };

      const poi = sut.convert(pointFeature, false);

      expect(poi.id).toEqual('node/12345678');
      expect(poi.name).toEqual('Mjam Mjam');
      expect(poi.website).toEqual('https://mjam.mjam');
      expect(poi.categories).toEqual(['restaurant', 'memorial']);
      expect(poi.coordinates).toEqual({ lat: 52.345, lon: 8.567 });
      expect(poi.tags).toEqual({
        amenity: 'restaurant',
        cuisine: 'german',
        historic: 'memorial',
        name: 'Mjam Mjam',
        opening_hours: '17:00+',
        smoking: 'separated',
        tourism: 'unknown',
        website: 'https://mjam.mjam',
      });
      expect(poi.original).toBeNull();
    });

    it('should work for feature with original object', () => {
      const pointFeature: Feature<Geometry, { [p: string]: any }> = {
        type: 'Feature',
        id: 'node/12345678',
        properties: {
          tags: {
          },
        },
        geometry: {
          type: 'Point',
          coordinates: [8.567, 52.345],
        },
      };

      const poi = sut.convert(pointFeature, true);

      expect(poi.id).toEqual('node/12345678');
      expect(poi.name).toBeUndefined();
      expect(poi.website).toBeUndefined();
      expect(poi.categories).toEqual(['all']);
      expect(poi.coordinates).toEqual({ lat: 52.345, lon: 8.567 });
      expect(poi.tags).toEqual({});
      expect(poi.original).toBe(pointFeature);
    });

  });
});
