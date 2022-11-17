import { PoisController } from './pois.controller';
import { PoiOverpassService } from './service/poi-overpass.service';
import { Poi } from './model/poi';
import { OsmId } from './model/osm-id';

describe('PoisController', () => {
  let poiOverpassService: PoiOverpassService;
  let sut: PoisController;

  beforeEach(() => {
    poiOverpassService = new PoiOverpassService(null, null);
    sut = new PoisController(poiOverpassService);
  });

  describe('finds single POI by PoiOverpassService', () => {

    it('should work for a node', async () => {
      const serviceResult: Promise<Poi> = new Promise<Poi>((resolve) =>
        resolve(new Poi('poiId', null, null, null, null, null, null)),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findById').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findNode('123');

      expect(returnedPoi.id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith(OsmId.node('123'));
    });

    it('should work for a way', async () => {
      const serviceResult: Promise<Poi> = new Promise<Poi>((resolve) =>
        resolve(new Poi('poiId', null, null, null, null, null, null)),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findById').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findWay('123');

      expect(returnedPoi.id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith(OsmId.way('123'));
    });

    it('should work for a relation', async () => {
      const serviceResult: Promise<Poi> = new Promise<Poi>((resolve) =>
          resolve(new Poi('poiId', null, null, null, null, null, null)),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findById').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findRelation('123');

      expect(returnedPoi.id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith(OsmId.relation('123'));
    });
  });

  describe('finds multiple POIs by PoiOverpassService', () => {

    it('should work', async () => {
      const serviceResult: Promise<Poi[]> = new Promise<Poi[]>((resolve) =>
        resolve([new Poi('poiId', null, null, null, null, null, null)]),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findByFilter').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findAll('restaurant', 52, 9, 100);

      expect(returnedPoi.length).toBe(1);
      expect(returnedPoi[0].id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith('restaurant', { lat: 52, lon: 9 }, 100);
    });
  });
});
