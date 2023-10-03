import Team from "../teams/Team";
import GameAction from "./GameAction";
import ScoreAction from "./ScoreAction";

class PenaltyAction extends ScoreAction {
  constructor(team: Team, points: number) {
    super(team, points);
  }

  public toJSX(): JSX.Element {
    return <>
      <div className="card p-3">
        {this.getTeam().getName()} loses {this.getPoints()} points.
      </div>
    </>;
  }

  public equals(other: GameAction): boolean {
    if (super.equals(other))
      return true;
    if (!(other instanceof PenaltyAction))
      return false;
    return this.getTeam().equals(other.getTeam()) && this.getPoints() === other.getPoints();
  }

  // ---------- JSON ----------

  public toJSON(): any {
    const obj = super.toJSON();
    obj.class = "PenaltyAction";
    return obj;
  }

  public static fromJSON(json: any): PenaltyAction {
    const team = Team.fromJSON(json.team);
    const points = json.points;
    return new PenaltyAction(team, points);
  }
}

export default PenaltyAction;
