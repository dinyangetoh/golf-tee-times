export interface TeeTime {
	id: string;
	time: string;
	price: number;
	min_players: number;
	max_players: number;
	holes: number;
	golfCourseName: string;
	courseUrl: string;
	date: string;
	createdAt?: string;
	updatedAt?: string;
}
