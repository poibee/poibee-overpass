import { GeometryCenterCalculatorService } from './geometry-center-calculator.service';
import { Feature, Geometry } from 'geojson';

describe('GeometryCenterCalculatorService', () => {
  let sut: GeometryCenterCalculatorService;

  beforeEach(async () => {
    sut = new GeometryCenterCalculatorService();
  });

  describe('calculates center', () => {
    it('should work for Geometry of type Point', () => {
      const pointFeature: Feature<Geometry, { [p: string]: any }> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [8.5833337, 52.9085918],
        },
      };

      const featureCenter = sut.center(pointFeature);

      expect(featureCenter).toEqual({ lat: 52.9085918, lon: 8.5833337 });
    });

    it('should work for Geometry of type Polygon', () => {
      const polygonFeature: Feature<Geometry, { [p: string]: any }> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [8.590481, 52.9102079],
              [8.5911187, 52.909977],
              [8.5910195, 52.9100602],
              [8.590481, 52.9102079],
            ],
          ],
        },
      };

      const featureCenter = sut.center(polygonFeature);

      expect(featureCenter).toEqual({ lat: 52.91009245, lon: 8.59079985 });
    });
  });
});
