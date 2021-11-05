"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeNow = exports.FOCUS_AREA_NAMES = exports.fileNames = exports.fileNamesWithoutExtension = exports.rootPath = void 0;
const distPath = __dirname;
const rootPath_array = distPath.split('/');
rootPath_array.pop();
exports.rootPath = rootPath_array.join('/');
const rootPathSrc = rootPath_array.join('/') + '/src/';
const xlsx_file_dir = exports.rootPath + '/src/';
exports.fileNamesWithoutExtension = [
    'budget_report',
    'KPI-report_1',
    'status_report',
    'test_data',
    'budget_past',
];
exports.fileNames = {
    xlsx_file_dir,
    main_file: 'realData/' + exports.fileNamesWithoutExtension[3] + '.xlsx',
    kpi_file_1: 'realData/' + exports.fileNamesWithoutExtension[1] + '.xlsx',
    budget_file: 'realData/' + exports.fileNamesWithoutExtension[0] + '.xlsx',
    status_report: 'realData/' + exports.fileNamesWithoutExtension[2] + '.xlsx',
    budget_past: 'realData/' + exports.fileNamesWithoutExtension[4] + '.xlsx',
};
exports.FOCUS_AREA_NAMES = {
    'Slow down hackers': 'SH',
    'Increase detection': 'ID',
    'Reduce damage': 'RD',
    'Streamline compliance': 'SC',
    'Build Security org/skills': 'BS',
};
const dateTimeNow = () => {
    const currentdate = new Date();
    return (currentdate.getDate() +
        '.' +
        (currentdate.getMonth() + 1) +
        '.' +
        currentdate.getFullYear() +
        ' ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes());
};
exports.dateTimeNow = dateTimeNow;
//# sourceMappingURL=globalVars.js.map