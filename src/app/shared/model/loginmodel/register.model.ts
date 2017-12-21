export class RegisterInfo {

    email: string;
    password1: string;
    password2: string;
}

export class ChangePassWord {

    old_password: string;
    new_password1: string;
    new_password2: string;

}
export class UserInfo {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    id:number;
    phone_number:string;
    access_token:string;
    email_sub:boolean;
}

export class CompititorLinksResult
{
    id: number;
    user_id: number;
    time_created: Date;
    page_key: string;
    name: string;
    url: string;
    likes: number;
    cover_photo_url: string;
    profile_photo_url: string;
    proccessing_status: boolean;
    is_competitor: boolean;
}
export class CompititorLinks {
    count: number;
    next: string;
    previous: string;
    results: CompititorLinksResult[];
}
