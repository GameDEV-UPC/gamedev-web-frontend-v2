export class User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    gamesPlayed: { gameName: string; maxScore: number; timePlayed: number }[];

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        profilePicture: string,
        gamesPlayed: { gameName: string; maxScore: number; timePlayed: number }[]
    ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePicture = profilePicture;
        this.gamesPlayed = gamesPlayed;
    }

    // Calculate total play time across all games
    totalPlayTime(): number {
        return this.gamesPlayed.reduce((total, game) => total + game.timePlayed, 0);
    }

    // Get the game with the highest score
    highestScoringGame(): { gameName: string; maxScore: number } {
        return this.gamesPlayed.reduce(
            (max, game) => (game.maxScore > max.maxScore ? game : max),
            { gameName: "N/A", maxScore: 0 }
        );
    }

    // Calculate total score across all games
    totalScore(): number {
        return this.gamesPlayed.reduce((total, game) => total + game.maxScore, 0);
    }
}
