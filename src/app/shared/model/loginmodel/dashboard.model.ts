export class DashBoardInfo {
    tab: string
    rubric_name: string
    rubric_title: string
    description: string
    btstrp_size: number
    representation: string
    color: string
    icon: string
    my_order: number
}
export class PostComments {
    count: number;
}
export class PostPhotos { }

export class PostData {
    id: number;
    user_id: number;
    post_key: string;
    text: string;
    url: string;
    likes: number;
    shares: number;
    time: Date;
    comments: PostComments;
    photos: PostData;
    post_type: string;
    page_id: number;
}