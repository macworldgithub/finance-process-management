export interface DataType {
  key: string;
  no: string | number;
  process: string;
  [key: string]: any; // flexible for dynamic columns
}
// Add this to your types.ts file
export interface ProcessData {
  No: number;
  "Main Process": string;
  "Process Description": string;
  "Process Objectives": string;
  "Process Severity Levels": string;
  key?: string;
}

export interface ImportedData {
  Process: ProcessData[];
}
