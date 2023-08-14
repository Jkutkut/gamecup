import Team from "./Team";

class Game {
    private teams: Team[];

    constructor(teams: Team[]) {
        this.teams = teams;
    }

    public getTeams(): Team[] {
        return this.teams;
    }
}

export default Game;