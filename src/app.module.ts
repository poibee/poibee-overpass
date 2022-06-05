import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PoisController } from './pois.controller';
import { AppService } from './app.service';
import { TagsToCategoryConverter } from './service/tags-to-category-converter.service';
import { PoiOverpassService } from './service/poi-overpass.service';
import { FeatureToPoiConverterService } from './service/feature-to-poi-converter.service';
import { OverpassClientService } from './service/overpass-client.service';
import { GeometryCenterCalculatorService } from './service/geometry-center-calculator.service';

@Module({
  imports: [],
  controllers: [AppController, PoisController],
  providers: [
    AppService,
    PoiOverpassService,
    FeatureToPoiConverterService,
    TagsToCategoryConverter,
    OverpassClientService,
    GeometryCenterCalculatorService,
  ],
})
export class AppModule {}
