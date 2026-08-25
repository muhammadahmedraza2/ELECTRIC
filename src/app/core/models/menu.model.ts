export interface MenuNode {
  id: number;
  name: string;
  icon?: string;
  route?: string;
  children?: MenuNode[];
}
