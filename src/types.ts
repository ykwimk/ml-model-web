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
