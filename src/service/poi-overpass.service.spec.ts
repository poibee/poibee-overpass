import { PoiOverpassService } from './poi-overpass.service';
import { OsmId } from '../model/osm-id';
import { LatLon } from '../model/lat-lon';

describe('PoiOverpassService', () => {
  let sut: PoiOverpassService;

  beforeEach(async () => {
    sut = new PoiOverpassService(null, null);
  });

  describe('calculates query for an OsmId', () => {
    it('should work for a node', () => {
      const query = sut.queryForOsmId(OsmId.node('4711'));

      expect(query).toEqual('[out:json]; node(id:4711);(._;>;);out;');
    });

    it('should work for a way', () => {
      const query = sut.queryForOsmId(OsmId.way('4711'));

      expect(query).toEqual('[out:json]; way(id:4711);(._;>;);out;');
    });
  });

  describe('calculates query for a filter', () => {
    it('should work for a category with single osm value', () => {
      const query = sut.queryForFilter('bakery', 100, new LatLon(54.5, 10.5));

      expect(query).toEqual('nwr["shop"="bakery"](around:100,54.5,10.5);(._;>;);out;');
    });

    it('should work for a category with multiple osm values', () => {
      const query = sut.queryForFilter('camping', 100, new LatLon(54.5, 10.5));

      expect(query).toEqual('nwr["tourism"~"camp_site|caravan_site"](around:100,54.5,10.5);(._;>;);out;');
    });
  });
});
