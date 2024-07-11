type CatObject = {
    id: string;
    url: string;
    width?: number;
    hegth?: number;
}

type UserActionType = {
    id: string,
    status: string,
    type: string,
    time: string
}

type BreedItem = {
    id: string,
    name: string,
    description: string,
    temperament: string,
    origin: string,
    weight: {
        imperial: string,
        metric: string
    },
    life_span: string,
    image: {
        id: string,
        width: number,
        height: number,
        url: string
    },
    reference_image_id?: string;
}

type BreedItemShort = Pick<BreedItem, 'id' | 'name' | 'image'>

export type { CatObject, UserActionType, BreedItem, BreedItemShort }