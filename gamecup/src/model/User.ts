class User {
    private name: String;

    constructor(name: String) {
        this.name = name;
    }

    public getName(): String {
        return this.name;
    }

    public static fromJSON(json: any): User {
        return new User(json.name);
    }
}

export default User;