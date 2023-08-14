import Team from "../Team";

class Game {
    private name: String;
    private teams: Team[];

    constructor(name: String, teams: Team[]) {
        this.name = name;
        this.teams = teams;
    }

    public getTeams(): Team[] {
        return this.teams;
    }

    public getName(): String {
        return this.name;
    }

    public static fromJSON(json: any): Game {
        const teams: Team[] = json.teams.map((team: any) => Team.fromJSON(team));
        return new Game(json.name, teams);
    }
}

export default Game;