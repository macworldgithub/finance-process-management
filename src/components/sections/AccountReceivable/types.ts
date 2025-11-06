// export interface DataType {
//   key: string;
//   no: string | number;
//   process: string;
//   [key: string]: any; // flexible for dynamic columns
// }

export interface DataType {
  key: string;
  no: string | number;
  process: string;
  [key: string]: any; // flexible for dynamic columns
}