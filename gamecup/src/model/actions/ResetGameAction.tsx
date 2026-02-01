import GameAction from "./GameAction";

class ResetGameAction extends GameAction {
  private readonly msg: string;
  private readonly points: number;

  constructor(msg: string, points: number) {
    super();
    this.msg = msg;
    this.points = points;
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
    return obj;
  }

  public static fromJSON(json: any): ResetGameAction {
    const msg = json.msg;
    const points = json.points;
    return new ResetGameAction(msg, points);
  }
}

export default ResetGameAction;
