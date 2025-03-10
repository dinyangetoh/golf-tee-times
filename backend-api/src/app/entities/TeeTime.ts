export interface TeeTimeCreateInput {
    time: string;
    price: number;
    min_players: number;
    max_players: number;
    holes: number;
    golfCourseName: string;
    courseUrl: string;
    date: string;
}

export interface TeeTimeUpdateInput {
    time?: string;
    price?: number;
    min_players?: number;
    max_players?: number;
    holes?: number;
    golfCourseName?: string;
    courseUrl?: string;
    date?: string;
}
