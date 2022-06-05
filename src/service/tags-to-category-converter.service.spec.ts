import { TagsToCategoryConverter } from './tags-to-category-converter.service';

describe('TagsToCategoryConverter', () => {
  let sut: TagsToCategoryConverter;

  beforeEach(async () => {
    sut = new TagsToCategoryConverter();
  });

  describe('calculates categories', () => {
    it('should return category for a known value', () => {
      const tags: { [key: string]: string } = {
        amenity: 'pub',
      };

      const categories = sut.categories(tags);

      expect(categories).toEqual(['restaurant']);
    });

    it('should return categories for multiple known values and ignore unknown values', () => {
      const tags: { [key: string]: string } = {
        amenity: 'restaurant',
        tourism: 'unknown',
        historic: 'memorial',
      };
      const categories = sut.categories(tags);

      expect(categories).toEqual(['restaurant', 'memorial']);
    });

    it('should return known category for unknown values', () => {
      const tags: { [key: string]: string } = {
        amenity: 'unknown',
        tourism: 'unknown',
      };
      const categories = sut.categories(tags);

      expect(categories).toEqual(['amenity', 'tourism']);
    });

    it('should return "all" for unknown categories', () => {
      const tags: { [key: string]: string } = {
        unknown: 'unknown',
      };
      const categories = sut.categories(tags);

      expect(categories).toEqual(['all']);
    });
  });
});
