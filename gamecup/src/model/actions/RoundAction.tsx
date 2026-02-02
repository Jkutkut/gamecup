import GameAction from "./GameAction";

class RoundAction extends GameAction {
  private readonly msg: string;
  private readonly points: ([string, number])[];

  constructor(msg: string, points: ([string, number])[]) {
    super();
    this.msg = msg;
    this.points = points;
  }

  public getMsg(): string {
    return this.msg;
  }

  public getPoints(): ([string, number])[] {
    return this.points;
  }

  public toJSX(): JSX.Element {
    return (
      <div className="card p-3">
        {this.msg || <>Round:</>}
        {this.getPoints().length > 0 &&
          <ul>
            {this.getPoints().map(([team, point]) => (
              <div key={team}>
                {team}: {point > 0 ? `+${point}` : point}
              </div>
            ))}
          </ul>
        }
      </div>
    );
  }

  public equals(other: GameAction): boolean {
    if (super.equals(other))
      return true;
    if (!(other instanceof RoundAction))
      return false;
    return this.msg == other.msg && this.points === other.points;
  }

  // ---------- JSON ----------

  public toJSON(): any {
    const obj = super.toJSON();
    obj.msg = this.msg;
    obj.points = this.points;
    return obj;
  }

  public static fromJSON(json: any): RoundAction {
    const msg = json.msg;
    const points = json.points;
    return new RoundAction(msg, points);
  }
}

export default RoundAction;
