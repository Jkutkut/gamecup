import Team from "../teams/Team";

class Game {
    private name: String;
    private teams: Team[];
    private points: number[];

    constructor(name: String, teams: Team[]) {
        this.name = name;
        this.teams = teams;
        this.points = [];
        for (let i = 0; i < teams.length; i++) {
            this.points.push(0);
        }
    }

    public getTeams(): Team[] {
        return this.teams;
    }

    public getPointsTeam(team: Team): number {
        return this.points[this.teams.indexOf(team)];
    }

    public getPoints(): number[] {
        return this.points;
    }

    public getName(): String {
        return this.name;
    }

    // ------------------------------

    public testScore() {
        const randomTeamIdx = Math.floor(Math.random() * this.teams.length);
        this.points[randomTeamIdx] += 1;
    }

    // ------------------------------

    public static fromJSON(json: any): Game {
        const teams: Team[] = json.teams.map((team: any) => Team.fromJSON(team));
        const g = new Game(json.name, teams);
        g.points = json.points;
        return g;
    }
}

export default Game;