import { useEffect, useState } from "react";
import "./Main.css";
import Leaderboard from "../../components/Leaderboard/Leaderboard.tsx";
export class UserLeaderboard {
  username: string;
  high_score: number;

  constructor(username: string, high_score: number) {
    this.username = username;
    this.high_score = high_score;
  }
}

function Main() {
  const [users, setUsers] = useState<UserLeaderboard[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch("https://api.gamedev.study/game/ranking", {
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al obtener ranking");
        const data = await response.json();

        const userList: UserLeaderboard[] = data.map(
          (item: any) => new UserLeaderboard(item.username, item.high_score)
        );

        setUsers(userList);
      } catch (error) {
        console.error("Error al cargar ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="main-container">
      <Leaderboard users={users} />
    </div>
  );
}

export default Main;
