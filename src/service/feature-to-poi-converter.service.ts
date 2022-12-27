import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { TagsToCategoryConverter } from './tags-to-category-converter.service';
import { Poi } from '../model/poi';
import { Injectable } from '@nestjs/common';
import { GeometryCenterCalculatorService } from './geometry-center-calculator.service';

@Injectable()
export class FeatureToPoiConverterService {
  constructor(
    private readonly tagsToCategoryConverter: TagsToCategoryConverter,
    private readonly geometryCenterCalculatorService: GeometryCenterCalculatorService,
  ) {}

  convert(poiFeature: Feature<Geometry, { [p: string]: string }>, originalFlag: boolean): Poi {
    const properties: GeoJsonProperties = poiFeature.properties;
    const tags = properties.tags as { [key: string]: string };
    const id = poiFeature.id as string;
    const categories = this.tagsToCategoryConverter.categories(tags);
    const coordinates = this.geometryCenterCalculatorService.center(poiFeature);
    const original = originalFlag ? poiFeature : null;
    return new Poi(id, categories, coordinates, tags, original);
  }
}
