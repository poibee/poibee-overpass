import { FeatureCollection, GeometryObject } from 'geojson';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import * as querystring from 'querystring';

const osmtogeojson = require('osmtogeojson');
const xmldom = require('xmldom');

@Injectable()
export class OverpassClientService {
  async query(query: string): Promise<FeatureCollection<GeometryObject>> {
    console.log('Overpass query: ' + query);
    const postData = querystring.stringify({ data: query });

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: 'overpass-api.de',
          path: '/api/interpreter',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'poibee/1.0',
            'Accept': '*/*',
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            const err = { message: `Request failed: HTTP ${res.statusCode}`, statusCode: res.statusCode };
            console.error('Overpass error:', err);
            return reject(err);
          }

          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const parser = new xmldom.DOMParser();
              const doc = parser.parseFromString(data);
              resolve(osmtogeojson(doc));
            } catch (e) {
              reject(e);
            }
          });
        },
      );

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }
}
