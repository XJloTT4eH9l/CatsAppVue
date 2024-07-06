type catObject = {
    id: string;
    url: string;
    width?: number | undefined;
    hegth?: number | undefined;
}

type userActionType = {
    id: string,
    status: string,
    type: string,
    time: string
}

type breedItem = {
    id: string,
    name: string,
    description: string,
    temparament: string,
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
    }
}

type breedItemShort = Pick<breedItem, 'id' | 'name' | 'image'>

export type { catObject, userActionType, breedItem, breedItemShort }