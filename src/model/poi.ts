import { LatLon } from './lat-lon';

export class Poi {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly website: string,
    public readonly categories: string[],
    public readonly coordinates: LatLon,
    public readonly tags: { [key: string]: string },
  ) {}
}
