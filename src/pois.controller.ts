import { Controller, Get, Param, Query } from '@nestjs/common';
import { OsmId } from './model/osm-id';
import { Poi } from './model/poi';
import { PoiOverpassService } from './service/poi-overpass.service';
import { LatLon } from './model/lat-lon';

@Controller('pois')
export class PoisController {
  constructor(private readonly poiOverpassService: PoiOverpassService) {}

  @Get('node:id')
  findNode(@Param('id') id: string): Promise<Poi> {
    const osmId = OsmId.node(id);
    return this.poiOverpassService.findById(osmId);
  }

  @Get('way:id')
  findWay(@Param('id') id: string): Promise<Poi> {
    const osmId = OsmId.way(id);
    return this.poiOverpassService.findById(osmId);
  }

  @Get('relation:id')
  findRelation(@Param('id') id: string): Promise<Poi> {
    const osmId = OsmId.relation(id);
    return this.poiOverpassService.findById(osmId);
  }

  // http://localhost:3000/pois?category=restaurant&lat=52.908&lon=8.588&distance=2500
  @Get()
  findAll(
    @Query('category') category: string,
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('distance') distance: number,
  ): Promise<Poi[]> {
    return this.poiOverpassService.findByFilter(category, new LatLon(lat, lon), distance);
  }
}
