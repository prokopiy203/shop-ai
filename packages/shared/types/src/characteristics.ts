export interface ICharacteristic {
  key: string;
  label?: string;
  value: string;
  type?: "string" | "number" | "boolean";
  unit?: string | null;
}
