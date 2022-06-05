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

  describe('findNode', () => {
    it('should return poi of PoiOverpassService', async () => {
      const serviceResult: Promise<Poi> = new Promise<Poi>((resolve) =>
        resolve(new Poi('poiId', null, null, null, null, null)),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findById').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findNode('123');

      expect(returnedPoi.id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith(OsmId.node('123'));
    });
  });

  describe('findWay', () => {
    it('should return poi of PoiOverpassService', async () => {
      const serviceResult: Promise<Poi> = new Promise<Poi>((resolve) =>
        resolve(new Poi('poiId', null, null, null, null, null)),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findById').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findWay('123');

      expect(returnedPoi.id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith(OsmId.way('123'));
    });
  });

  describe('findAll', () => {
    it('should return pois of PoiOverpassService', async () => {
      const serviceResult: Promise<Poi[]> = new Promise<Poi[]>((resolve) =>
        resolve([new Poi('poiId', null, null, null, null, null)]),
      );
      const findByIdSpy = jest.spyOn(poiOverpassService, 'findByFilter').mockImplementation(() => serviceResult);

      const returnedPoi = await sut.findAll('restaurant', 52, 9, 100);

      expect(returnedPoi.length).toBe(1);
      expect(returnedPoi[0].id).toBe('poiId');
      expect(findByIdSpy).toHaveBeenCalledWith('restaurant', { lat: 52, lon: 9 }, 100);
    });
  });
});
