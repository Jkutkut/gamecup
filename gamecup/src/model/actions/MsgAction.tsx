import GameAction from "./GameAction";

class MsgAction extends GameAction {
  private msg: string;

  constructor(msg: string) {
    super();
    this.msg = msg;
  }

  public getMessage(): string {
    return this.msg;
  }

  public toJSX(): JSX.Element {
    return <>
      <div className="card p-3">
        {this.msg}
      </div>
    </>;
  }

  public equals(obj: GameAction): boolean {
    if (super.equals(obj)) {
      return true;
    }
    if (!(obj instanceof MsgAction)) {
      return false;
    }
    return this.msg === obj.msg;
  }

  // ---------- JSON ----------

  public toJSON() {
    const obj = super.toJSON();
    obj.msg = this.msg;
    return obj;
  }

  public static fromJSON(json: any): MsgAction {
    const msg = json.msg;
    return new MsgAction(msg);
  }
}

export default MsgAction;