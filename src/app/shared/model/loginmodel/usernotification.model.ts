export class Result {
    id: number;
    user_id: number;
    time_created: Date;
    text: string;
    page_id: number;
}

export class UserNotification {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}
