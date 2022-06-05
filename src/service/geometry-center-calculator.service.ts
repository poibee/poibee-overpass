import { Feature, Geometry } from 'geojson';
import { AllGeoJSON } from '@turf/turf';
import { Injectable } from '@nestjs/common';
import { LatLon } from '../model/lat-lon';

const turf = require('@turf/turf');

@Injectable()
export class GeometryCenterCalculatorService {
  center(poiFeature: Feature<Geometry, { [p: string]: any } | null>): LatLon {
    const coordinates = turf.center(poiFeature as AllGeoJSON).geometry.coordinates;
    return new LatLon(coordinates[1], coordinates[0]);
  }
}
