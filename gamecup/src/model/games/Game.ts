import Model from "../Model";
import GameAction from "../actions/GameAction";
import GameActionFactory from "../actions/GameActionFactory";
import ScoreAction from "../actions/ScoreAction";
import DLinkList from "../dLinkList/DLinkList";
import Team from "../teams/Team";

class Game extends Model {
    private name: String;
    private teams: Team[];
    private points: number[];
    private history: DLinkList<GameAction>;

    constructor(name: String, teams: Team[]) {
        super();
        this.name = name;
        this.teams = teams;
        this.points = [];
        for (let i = 0; i < teams.length; i++) {
            this.points.push(0);
        }
        this.history = new DLinkList<GameAction>();
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

    public getHistory(): DLinkList<GameAction> {
        return this.history;
    }

    public teamIndex(team: Team): number {
        for (let i = 0; i < this.teams.length; i++) {
            if (team.equals(this.teams[i])) {
                return i;
            }
        }
        return -1;
    }

    // ------------------------------

    private applyAction(action: GameAction) {
        this.debug("Applying", action);
        const actionType = action.constructor.name;
        switch (actionType) {
            case ScoreAction.name:
                const scoreAction = action as ScoreAction;
                const idx = this.teamIndex(scoreAction.getTeam());
                this.debug("Adding", scoreAction.getPoints(), "to", this.teams[idx].getName());
                this.points[idx] += scoreAction.getPoints();
                break;
            // default: nothing
        }
    }

    public addAction(action: GameAction) {
        this.history.push(action);
        this.applyAction(action);
    }

    // ------------------------------

    public toJSON(): any {
        return {
            name: this.name,
            teams: this.teams,
            points: this.points,
            history: this.history.toArray()
        };
    }

    public static fromJSON(json: any): Game {
        const teams: Team[] = json.teams.map((team: any) => Team.fromJSON(team));
        const g = new Game(json.name, teams);
        const gameActionFactory = GameActionFactory.getInstance();
        const historyArr = gameActionFactory.fromJSON(json.history);
        g.history.pushAll(historyArr);
        for (const action of g.getHistory().iter()) {
            g.applyAction(action);
        }
        return g;
    }
}

export default Game;