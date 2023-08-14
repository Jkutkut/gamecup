class User {
    private name: String;

    constructor(name: String) {
        this.name = name;
    }

    getName(): String {
        return this.name;
    }
}

export default User;