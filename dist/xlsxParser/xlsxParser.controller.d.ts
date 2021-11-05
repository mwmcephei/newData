import { XlsxParserService } from './xlsxParser.service';
export declare class XlsxParserController {
    private xlsxParseService;
    constructor(xlsxParseService: XlsxParserService);
    parse(params: any): Promise<void>;
    parse_overview(params: any): Promise<void>;
    triggerOverviewCreation(params: any): Promise<import("../types").InitialOverview>;
    parseKPI(params: any): Promise<string>;
    parseBudgetMonths(params: any): Promise<string>;
    parseBudgetPast(): Promise<import("../types").PastBudget[]>;
    startParsingForAllUploadedXlsxFiles(): Promise<void>;
    parseManually(params: any): Promise<boolean>;
    deleteData(params: any): Promise<unknown>;
}
