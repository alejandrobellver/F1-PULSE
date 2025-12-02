// Definimos la estructura de un Piloto
export interface Driver {
  id: number;
  name: string;
  team: string;
  number: number;
  country: string;
  points: number;
  image: string;
  liked: boolean;
}

// Definimos la estructura de una Escudería
export interface Team {
  name: string;
  base: string;
  principal: string;
  color: string;
}