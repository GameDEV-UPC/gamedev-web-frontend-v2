import  { useState } from "react";
import "./Main.css";
import Leaderboard from "../../components/Leaderboard/Leaderboard.tsx";
import { User } from "../../interfaces/User.tsx";
import { VideoGame } from "../../interfaces/Videogame.tsx";

function Main() {
    // Datos falsos para pruebas
    const fakeUsers: User[] = [
        new User(
            "Alice",
            "Alice",
            "Johnson",
            "alice@example.com",
            "https://via.placeholder.com/50",
            [
                new VideoGame("Game 1", 500, 120),
                new VideoGame("Game 2", 1000, 150),
            ]
        ),
        new User(
            "Bob",
            "Bob",
            "Smith",
            "bob@example.com",
            "https://via.placeholder.com/50",
            [
                new VideoGame("Game 1", 600, 200),
                new VideoGame("Game 3", 600, 100),
            ]
        ),
        new User(
            "Charlie",
            "Charlie",
            "Brown",
            "charlie@example.com",
            "https://via.placeholder.com/50",
            [
                new VideoGame("Game 4", 1000, 180),
                new VideoGame("Game 2", 800, 130),
            ]
        ),
        new User(
            "Diana",
            "Diana",
            "White",
            "diana@example.com",
            "https://via.placeholder.com/50",
            [
                new VideoGame("Game 5", 900, 100),
                new VideoGame("Game 6", 0, 50),
            ]
        ),
        new User(
            "Eve",
            "Eve",
            "Black",
            "eve@example.com",
            "https://via.placeholder.com/50",
            [
                new VideoGame("Game 1", 1000, 200),
                new VideoGame("Game 3", 1000, 150),
            ]
        ),
    ];

    const [users, setUsers] = useState(fakeUsers); // Usamos estado para controlar los usuarios


    // const { users, isLoading, error, refetch } = useFetchUsers("http://0.0.0.0:8000/users");
    return (
        <div className="container">


            <Leaderboard users={users} />


        </div>
    );
}

export default Main;
