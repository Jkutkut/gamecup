import GameAction from "./GameAction";

class ResetGameAction extends GameAction {
  private readonly msg: string;
  private readonly points: number;
  private readonly currentPoints: ([string, number])[];

  constructor(msg: string, points: number, currentPoints: ([string, number])[] = []) {
    super();
    this.msg = msg;
    this.points = points;
    this.currentPoints = currentPoints;
  }

  public getMsg(): string {
    return this.msg;
  }

  public getPoints(): number {
    return this.points;
  }

  public toJSX(): JSX.Element {
    return (
      <div className="card p-3">
        Game reset: {this.msg || <>All players set to {this.points} points</>}
        {this.currentPoints.length > 0 && <div>
          <ul>
            {this.currentPoints.map((player) => <li key={player[0]}>{player[0]}: {player[1]}</li>)}
          </ul>
        </div>}
      </div>
    );
  }

  public equals(other: GameAction): boolean {
    if (super.equals(other))
      return true;
    if (!(other instanceof ResetGameAction))
      return false;
    return this.msg == other.msg && this.points === other.points;
  }

  // ---------- JSON ----------

  public toJSON(): any {
    const obj = super.toJSON();
    obj.msg = this.msg;
    obj.points = this.points;
    obj.currentPoints = this.currentPoints;
    return obj;
  }

  public static fromJSON(json: any): ResetGameAction {
    const msg = json.msg;
    const points = json.points;
    const currentPoints = json.currentPoints || [];
    return new ResetGameAction(msg, points, currentPoints);
  }
}

export default ResetGameAction;
