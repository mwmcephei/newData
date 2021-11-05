import { Controller, Get, Param } from '@nestjs/common';
import { XlsxParserService } from './xlsxParser.service';

@Controller('xlsxParser')
export class XlsxParserController {
  constructor(private xlsxParseService: XlsxParserService) {}

  // routes for creating data
  // parameter temp indicates if new (temporary) or old data is concerned

  // main prasing function
  // fills the central database table "measures" by collecting several xlsx files
  @Get('parse/:temp')
  parse(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return this.xlsxParseService.parse(tempAsBool);
  }

  // parses data from 'Status Overview' sheet of the measure overview file
  // collects data necessary for the Dashboard page of the application therefore "parse_OVERVIEW"
  // data is added to measure table and processed in create_overview
  @Get('parse_overview/:temp')
  parse_overview(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return this.xlsxParseService.parse_overview(tempAsBool);
  }

  // initializes and fills the overview table "Sheet" with information created from already
  // existing databse entires and by parsing additional data from several files
  @Get('create_overview/:temp')
  triggerOverviewCreation(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return this.xlsxParseService.createOverview(tempAsBool);
  }

  // parses data from the KPI Report file and adds it to the respective measures and the overall table "Sheet"
  @Get('parse_kpi/:temp')
  parseKPI(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return this.xlsxParseService.parseKPI(tempAsBool);
  }

  // creates table "Budget" which has similar function to "Sheet" of holding overall data
  // also adds data to "Sheet"
  @Get('parse_budget_months/:temp')
  parseBudgetMonths(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return this.xlsxParseService.parseBudgetMonths(tempAsBool);
  }

  // parse xlsx file with legacy measures
  @Get('parse_budget_past')
  parseBudgetPast() {
    return this.xlsxParseService.parseBudgetPast();
  }

  // starts the complete parsing process including all the above routes and checks for
  // notifications arising from comparison of old and new data sets
  @Get('startParsingForAllUploadedXlsxFiles')
  startParsingForAllUploadedXlsxFiles() {
    return this.xlsxParseService.startParsingForAllUploadedXlsxFiles();
  }

  // startParsingForAllUploadedXlsxFiles without file handling and comparison of old and new data sets
  // temp boolean indicating if old or new data set should be parsed
  // for development purpose
  @Get('parseManually/:temp')
  parseManually(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return this.xlsxParseService.parseAll(tempAsBool);
  }

  // delete old or new data sets (indicated by temp) from database
  // for development purpose
  @Get('deleteData/:temp')
  async deleteData(@Param() params) {
    const tempAsBool = params.temp === 'true';
    return await this.xlsxParseService.deleteData(tempAsBool);
  }
}
