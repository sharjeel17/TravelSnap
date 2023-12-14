export interface Photos {
    id: number,
    photo: string,
    caption: string,
    comments: number[]
}

export interface Comment {
    commentID: string,
    comment: string,
    postedBy: string
}

export interface UserInfo {
    username: string,
    posts: number[]
}