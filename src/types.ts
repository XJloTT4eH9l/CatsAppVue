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

export type { catObject, userActionType }