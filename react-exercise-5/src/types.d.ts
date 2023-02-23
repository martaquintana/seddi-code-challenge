export interface Garment {
    id: string,
    name: string,
    avatar: string
}

export interface Collection {
    id: string,
    name: string,
    garments: Map<string, Garment>
}