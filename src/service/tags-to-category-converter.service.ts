import { Categories } from '../model/categories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsToCategoryConverter {
  categories(tags: { [key: string]: string }): string[] {
    const categories = [];
    const categoriesFallback = [];
    for (const [tagKey, tagVal] of Object.entries(tags)) {
      const category = Categories.category(tagKey, tagVal);
      if (category) {
        categories.push(category.key);
      } else {
        if (Categories.ofKey(tagKey)) {
          categoriesFallback.push(tagKey);
        }
      }
    }
    if (categories.length > 0) {
      return categories;
    }
    if (categoriesFallback.length > 0) {
      return Array.from(new Set(categoriesFallback));
    }
    return ['all'];
  }
}
