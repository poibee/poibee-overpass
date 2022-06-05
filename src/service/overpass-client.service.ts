import { FeatureCollection, GeometryObject } from 'geojson';
import { Injectable } from '@nestjs/common';

const QueryOverpass = require('query-overpass');

@Injectable()
export class OverpassClientService {
  async query(query: string): Promise<FeatureCollection<GeometryObject>> {
    console.log('Overpass query: ' + query);
    return new Promise<FeatureCollection<GeometryObject>>((resolve, reject) => {
      QueryOverpass(query, function (err: any, geojson: FeatureCollection<GeometryObject>) {
        if (!err) {
          resolve(geojson);
        } else {
          console.error('Overpass error:', err);
          reject(err);
        }
      });
    });
  }
}
