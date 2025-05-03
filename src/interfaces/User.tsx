import { VideoGame } from "./Videogame";  // Importa la clase VideoGame

export class User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    gamesPlayed: VideoGame[];  // Usamos la clase VideoGame aquí
    total_score: number;

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        profilePicture: string,
        gamesPlayed: VideoGame[]  // Ahora se espera un array de VideoGame
    ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePicture = profilePicture;
        this.gamesPlayed = gamesPlayed;
        this.total_score = this.calculateTotalScore(); // Calcula el total_score
    }

    // Calculate total play time across all games
    totalPlayTime(): number {
        return this.gamesPlayed.reduce((total, game) => total + game.timePlayed, 0);
    }

    // Get the game with the highest score
    highestScoringGame(): VideoGame {
        return this.gamesPlayed.reduce(
            (max, game) => (game.maxScore > max.maxScore ? game : max),
            new VideoGame("N/A", 0, 0)  // Usamos la clase VideoGame para el valor por defecto
        );
    }

    // Calculate total score across all games
    calculateTotalScore(): number {
        return this.gamesPlayed.reduce((total, game) => total + game.maxScore, 0);
    }
}
