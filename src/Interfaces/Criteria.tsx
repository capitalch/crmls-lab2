interface Criteria{
    field:string
    op: 0|1|2|3|4|5|6|7|8|9|10|11|12|13
    values:string[]
}


export enum OperationCriterias  {
    Equal= 0,
    GreaterThan= 1,
    GreaterThanOrEqual= 2,
    LessThan= 3,
    LessThanOrEqual= 4,
    Between= 5,
    NotEqual= 6,
    NotEmpty= 7,
    Like= 8,
    HasAny= 9,
    Contains= 10,
    StartsWith= 11,
    NotLike= 12,
    ContainsAny= 13,
};


export default Criteria