import EqualsInterface from "../dLinkList/EqualsInterface";

abstract class GameAction implements EqualsInterface {

  constructor() {
  }

  public toJSX(): JSX.Element {
    return <></>;
  }

  public equals(obj: EqualsInterface): boolean {
    return this === obj;
  }

  // ---------- JSON ----------

  public toJSON(): any {
    return {class: this.constructor.name};
  }
}

export default GameAction;