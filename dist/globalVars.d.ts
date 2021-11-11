export declare const rootPath: string;
export declare const fileNamesWithoutExtension: string[];
export declare const fileNames: {
    xlsx_file_dir: string;
    main_file: string;
    kpi_file_1: string;
    budgetFile: string;
    status_report: string;
    budget_past: string;
};
declare type FocusAreaNames = {
    'Slow down hackers': 'SH';
    'Increase detection': 'ID';
    'Reduce damage': 'RD';
    'Streamline compliance': 'SC';
    'Build Security org/skills': 'BS';
};
export declare const FOCUS_AREA_NAMES: FocusAreaNames;
export declare const dateTimeNow: () => string;
export {};
