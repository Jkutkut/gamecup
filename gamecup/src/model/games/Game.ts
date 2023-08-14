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
}

export default Game;