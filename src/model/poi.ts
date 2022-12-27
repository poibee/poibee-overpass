import { LatLon } from './lat-lon';
import {Feature, Geometry} from "geojson";

export class Poi {
  constructor(
    public readonly id: string,
    public readonly categories: string[],
    public readonly coordinates: LatLon,
    public readonly tags: { [key: string]: string },
    public readonly original: Feature<Geometry, { [p: string]: string }>,
  ) {}
}
