type QueryPayloadType = {
    pageId?: number,
    pageSize?: number,
    search?: any[],
    field?: string,
    criteria?:
    {
        field?: string,
        op?: any
        values?: string[]
    }[]
    ,
    orderBy?: [
        {
            field: string,
            direction: "asc" | "desc"
        }
    ],
    fields?: string[]
    searchCriteria?: {
        field?: string,
        op?: any
        values?: string[]
    }[]
}
export type { QueryPayloadType }