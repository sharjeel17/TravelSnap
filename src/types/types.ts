export interface Photos {
    Id: number,
    Photo: string,
    Caption: string,
    Comments: number[],
    PostedBy: string,
    PostedById: string
}

export type Comment = {
    CommentID: string,
    Comment: string,
    PostedBy: string,
    PostedById: string | number
}

export interface UserInfo {
    Username: string,
    Posts: number[]
}