import { Categories } from '../model/categories';
import { OsmId } from '../model/osm-id';
import { Poi } from '../model/poi';
import { Injectable } from '@nestjs/common';
import { FeatureToPoiConverterService } from './feature-to-poi-converter.service';
import { OverpassClientService } from './overpass-client.service';
import { LatLon } from '../model/lat-lon';

@Injectable()
export class PoiOverpassService {
  constructor(
    private readonly overpassClient: OverpassClientService,
    private readonly featureToPoiConverter: FeatureToPoiConverterService,
  ) {}

  async findById(poiOsmId: OsmId): Promise<Poi> {
    const query = this.queryForOsmId(poiOsmId);
    const featureCollectionPromise = this.overpassClient.query(query);
    return await featureCollectionPromise.then((fc) => this.featureToPoiConverter.convert(fc.features[0]));
  }

  async findByFilter(category: string, coordinates: LatLon, distance: number): Promise<Poi[]> {
    const query = this.queryForFilter(category, distance, coordinates);
    const featureCollectionPromise = this.overpassClient.query(query);
    return await featureCollectionPromise.then((featureCollection) =>
      featureCollection.features
        .map((feature) => this.featureToPoiConverter.convert(feature))
        .filter((poi) => Categories.belongsTo(category, poi.categories)),
    );
  }

  queryForOsmId(poiOsmId: OsmId): string {
    return `[out:json]; ${poiOsmId.type}(id:${poiOsmId.id});(._;>;);out;`;
  }

  queryForFilter(category: string, distance: number, coordinates: LatLon) {
    const categoryQuery = Categories.query(category);
    return `nwr[${categoryQuery}](around:${distance},${coordinates.lat},${coordinates.lon});(._;>;);out;`;
  }
}
