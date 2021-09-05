import "./index.scss";

class User {
    name: string;
    constructor(_name: string) {
        this.name = _name;
    }
}

// Comment
const nick: User = new User("Nick");
const wrap = document.getElementById("wrap");
wrap.innerHTML = "Привет " + nick.name;