export interface IModel {
  id: string;
  name: string;
  caption: string;
  baseModel: string;
  inputType: InputType;
  description: string;
}

export type InputType = 'text' | 'image' | 'audio';

export type InputValueType = string | File | null;

export type ModelResultType =
  | string
  | Array<{ label: string; score: number }>
  | React.ReactNode;

export interface IResultData {
  result: any;
  error?: string;
}
