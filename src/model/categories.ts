import { Category } from './category';

export class Categories {
  static ALL = [
    // category
    new Category('amenity', 'amenity', []),
    new Category('historic', 'historic', []),
    new Category('leisure', 'leisure', []),
    new Category('man_made', 'man_made', []),
    new Category('shop', 'shop', []),
    new Category('sport', 'sport', []),
    new Category('tourism', 'tourism', []),
    // amenity
    new Category('restaurant', 'amenity', ['fast_food', 'restaurant', 'pub', 'cafe', 'biergarten', 'bar']),
    new Category('bank', 'amenity', ['bank']),
    new Category('postbox', 'amenity', ['post_box']),
    new Category('icecream', 'amenity', ['ice_cream']),
    new Category('hunting', 'amenity', ['hunting_stand']),
    new Category('cinema', 'amenity', ['cinema']),
    new Category('church', 'amenity', ['place_of_worship']),
    new Category('bench', 'amenity', ['bench']),
    new Category('fuel', 'amenity', ['fuel']),
    new Category('shelter', 'amenity', ['shelter']),
    new Category('parking', 'amenity', ['parking']),
    new Category('barbecue', 'amenity', ['bbq']),
    new Category('school', 'amenity', ['school']),
    new Category('kindergarten', 'amenity', ['kindergarten']),
    new Category('childcare', 'amenity', ['childcare']),
    new Category('dentist', 'amenity', ['dentist']),
    new Category('library', 'amenity', ['library']),
    new Category('toilets', 'amenity', ['toilets']),
    new Category('vendor', 'amenity', ['vending_machine']),
    new Category('theater', 'amenity', ['theatre']),
    new Category('taxi', 'amenity', ['taxi']),
    new Category('police', 'amenity', ['police']),
    new Category('hospital', 'amenity', ['hospital']),
    new Category('socialfacility', 'amenity', ['social_facility']),
    new Category('fountain', 'amenity', ['fountain']),
    new Category('bicycleparking', 'amenity', ['bicycle_parking']),
    new Category('busstation', 'amenity', ['bus_station']),
    new Category('firestation', 'amenity', ['fire_station']),
    new Category('recycling', 'amenity', ['recycling']),
    new Category('doctor', 'amenity', ['doctors']),
    new Category('pharmacy', 'amenity', ['pharmacy']),
    new Category('telephone', 'amenity', ['telephone']),
    new Category('clock', 'amenity', ['clock']),
    new Category('veterinary', 'amenity', ['veterinary']),
    new Category('carwash', 'amenity', ['car_wash']),
    // historic
    new Category('castle', 'historic', ['castle']),
    new Category('memorial', 'historic', ['memorial']),
    new Category('megalith', 'historic', ['archaeological_site']),
    new Category('ruins', 'historic', ['ruins']),
    // leisure
    new Category('playground', 'leisure', ['playground']),
    new Category('swimming', 'leisure', ['water_park', 'swimming_pool']),
    new Category('park', 'leisure', ['park']),
    // man made
    new Category('lighthouse', 'man_made', ['lighthouse']),
    new Category('watermill', 'man_made', ['watermill']),
    new Category('mast', 'man_made', ['mast', 'antenna']),
    new Category('exchange', 'man_made', ['MDF']),
    // shop
    new Category('bakery', 'shop', ['bakery']),
    new Category('kiosk', 'shop', ['kiosk']),
    new Category('supermarket', 'shop', ['supermarket']),
    new Category('hairdresser', 'shop', ['hairdresser']),
    new Category('butcher', 'shop', ['butcher']),
    new Category('photo', 'shop', ['photo']),
    new Category('gift', 'shop', ['gift']),
    new Category('optician', 'shop', ['optician']),
    new Category('florist', 'shop', ['florist', 'garden_centre']),
    new Category('shoes', 'shop', ['shoes']),
    new Category('electronic', 'shop', ['electronics', 'mobile_phone', 'computer']),
    new Category('clothes', 'shop', ['clothes']),
    new Category('travel', 'shop', ['travel_agency']),
    new Category('convenience', 'shop', ['convenience', 'tobacco']),
    new Category('bicycle', 'shop', ['bicycle']),
    new Category('hearingaids', 'shop', ['hearing_aids']),
    new Category('car', 'shop', ['car', 'car_repair', 'car_parts']),
    new Category('beverage', 'shop', ['beverages', 'alcohol', 'wine']),
    new Category('farm', 'shop', ['farm']),
    new Category('pet', 'shop', ['pet']),
    new Category('motorcycle', 'shop', ['motorcycle']),
    new Category('doityourself', 'shop', ['doityourself']),
    new Category('chemist', 'shop', ['chemist']),
    new Category('healthfood', 'shop', ['health_food']),
    // sport
    new Category('climbing', 'sport', ['climbing', 'climbing_adventure']),
    new Category('bowling', 'sport', ['bowling', '10pin', '9pin']),
    new Category('iceskating', 'sport', ['ice_skating']),
    // tourism
    new Category('attraction', 'tourism', ['attraction']),
    new Category('camping', 'tourism', ['camp_site', 'caravan_site']),
    new Category('hotel', 'tourism', ['hotel']),
    new Category('information', 'tourism', ['information']),
    new Category('museum', 'tourism', ['museum']),
    new Category('picnic', 'tourism', ['picnic_site']),
    new Category('themepark', 'tourism', ['theme_park']),
    new Category('viewpoint', 'tourism', ['viewpoint']),
    new Category('zoo', 'tourism', ['zoo']),
  ];

  static query(key: string): string {
    if (key === 'all') {
      return '~"^amenity|^historic|^leisure|^man_made|^shop|^sport|^tourism"~"."';
    }
    return this.ofKey(key).query();
  }

  static category(osmKey: string, osmValue: string): Category {
    return Categories.ALL.filter((c) => c.osmCategory === osmKey).find((c) => c.osmValues.indexOf(osmValue) >= 0);
  }

  static ofKey(key: string): Category {
    return Categories.ALL.find((c) => c.key === key);
  }

  static belongsTo(category: string, categoriesAsString: string[]): boolean {
    const isAll = category === 'all';
    const isCategory = categoriesAsString.indexOf(category) >= 0;
    const isMainCatory = !!categoriesAsString
      .map((c1) => Categories.ofKey(c1))
      .filter((c2) => c2)
      .find((c3) => c3.osmCategory === category);
    return isAll || isCategory || isMainCatory;
  }
}
