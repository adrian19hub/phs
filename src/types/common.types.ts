export enum ClothingTypes {
    Shoes = 'shoes',
    Shirt = 'shirt',
    Pants = 'pants'
}


export type Color = string;
export type ShirtSizes = string;
export type PantsSizes = number;
export type ShoeSizes = number;

export interface IClothing {
    type: ClothingTypes;
    color: Color;
    size: ShirtSizes | PantsSizes | ShoeSizes;
    brand: string;
    imageUrl: string;
}
export interface IClothingWithId extends IClothing {
    id: string;
};

export enum Screens {
    Home = 'home',
    SavedSets = 'savedSets',
    ClothingItems = 'clothingItems'
}