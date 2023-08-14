import User from "./User";

class Team {
    private name: String | undefined;
    private players: User[];

    constructor(players: User[], name?: String) {
        this.players = players;
        this.name = name;
    }

    public getPlayers(): User[] {
        return this.players;
    }

    public getName(): String {
        if (!this.name) {
            if (this.players.length >= 1)
                return `${this.players[0].getName()}'s team`;
            return "Team without name";
        }
        return `Team ${this.name}`;
    }

    public setName(name: String): void {
        this.name = name; // ! Not validated
    }
}

export default Team;