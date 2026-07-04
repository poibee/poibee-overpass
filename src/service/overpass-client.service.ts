import { FeatureCollection, GeometryObject } from 'geojson';
import { Injectable } from '@nestjs/common';

// Patch request.post to add User-Agent before query-overpass loads it.
// query-overpass and this file resolve to the same cached `request` module
// instance, so wrapping .post here also affects query-overpass's internal calls.
const request = require('request');
const originalPost = request.post;
request.post = function (uri, options, callback) {
  options = options || {};
  options.headers = Object.assign({ 'User-Agent': 'poibee/1.0' }, options.headers);
  return originalPost.call(request, uri, options, callback);
};

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
