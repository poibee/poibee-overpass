import { OsmId } from './osm-id';

describe('OsmId', () => {
  describe('has factory method', () => {
    it('should create OsmId for node', () => {
      const osmId = OsmId.node('4711');
      expect(osmId.type).toEqual('node');
      expect(osmId.id).toEqual('4711');
    });

    it('should create OsmId for way', () => {
      const osmId = OsmId.way('4711');
      expect(osmId.type).toEqual('way');
      expect(osmId.id).toEqual('4711');
    });
  });
});
