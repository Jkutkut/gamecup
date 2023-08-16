import Team from "../teams/Team";
import GameAction from "./GameAction";

class ScoreAction extends GameAction {
  private team: Team;
  private points: number;

  constructor(team: Team, points: number) {
    super();
    this.team = team;
    this.points = points;
  }

  public getPoints(): number {
    return this.points;
  }

  public getTeam(): Team {
    return this.team;
  }

  public toJSX(): JSX.Element {
    return <>
      <div className="card p-3">
        {this.team.getName()} scored {this.points} points!
      </div>
    </>;
  }

  public equals(other: ScoreAction): boolean {
    if (super.equals(other))
      return true;
    return this.team.equals(other.team) && this.points === other.points;
  }

  // ---------- JSON ----------

  public toJSON(): any {
    const obj = super.toJSON();
    obj.team = this.team;
    obj.points = this.points;
    return obj;
  }

  public static fromJSON(json: any): ScoreAction {
    const team = Team.fromJSON(json.team);
    const points = json.points;
    return new ScoreAction(team, points);
  }
}

export default ScoreAction;