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

  convert(poiFeature: Feature<Geometry, { [p: string]: any } | null>): Poi {
    const properties: GeoJsonProperties = poiFeature.properties;
    const tags = properties.tags as { [key: string]: string };
    const id = poiFeature.id as string;
    const name = tags.name;
    const website = tags.website;
    const categories = this.tagsToCategoryConverter.categories(tags);
    const coordinates = this.geometryCenterCalculatorService.center(poiFeature);
    return new Poi(id, name, website, categories, coordinates, tags);
  }
}
