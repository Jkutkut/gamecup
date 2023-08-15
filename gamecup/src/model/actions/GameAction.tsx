abstract class GameAction {

  constructor() {
  }

  public toJSX(): JSX.Element {
    return <></>;
  }

  public getPoints(): number {
    return 0;
  }

  // ---------- JSON ----------

  public toJSON(): any {
    return {class: this.constructor.name};
  }
}

export default GameAction;