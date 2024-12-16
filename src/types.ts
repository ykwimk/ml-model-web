export interface IModel {
  id: string;
  name: string;
  caption: string;
  baseModel: string;
  inputType: 'text' | 'image' | 'audio';
  description: string;
}
