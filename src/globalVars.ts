const distPath = __dirname; // ...pmo/pmo-backend/dist
const rootPath_array = distPath.split('/');
rootPath_array.pop();
export const rootPath = rootPath_array.join('/');
const rootPathSrc = rootPath_array.join('/') + '/src/';
const xlsx_file_dir = rootPath + '/src/';

export const fileNamesWithoutExtension = [
  'budget_report',
  'KPI-report_1',
  'status_report',
  'test_data',
  'budget_past',
];

export const fileNames = {
  xlsx_file_dir,
  main_file: 'realData/' + fileNamesWithoutExtension[3] + '.xlsx', // = Status Report Demo.xlsx
  kpi_file_1: 'realData/' + fileNamesWithoutExtension[1] + '.xlsx',
  budgetFile: 'realData/' + fileNamesWithoutExtension[0] + '.xlsx',
  status_report: 'realData/' + fileNamesWithoutExtension[2] + '.xlsx', // = overview
  budget_past: 'realData/' + fileNamesWithoutExtension[4] + '.xlsx',
};

type FocusAreaNames = {
  'Slow down hackers': 'SH';
  'Increase detection': 'ID';
  'Reduce damage': 'RD';
  'Streamline compliance': 'SC';
  'Build Security org/skills': 'BS';
};

export const FOCUS_AREA_NAMES: FocusAreaNames = {
  'Slow down hackers': 'SH',
  'Increase detection': 'ID',
  'Reduce damage': 'RD',
  'Streamline compliance': 'SC',
  'Build Security org/skills': 'BS',
};

export const dateTimeNow = () => {
  const currentdate = new Date();
  return (
    currentdate.getDate() +
    '.' +
    (currentdate.getMonth() + 1) +
    '.' +
    currentdate.getFullYear() +
    ' ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes()
  );
};
