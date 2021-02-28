

class ToDo {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    };
}; 

class Project {
    constructor (projName, description) {
        this._projName = projName;
        this._description = description;
    };

    createTodos (title, description, dueDate, priority) {
        return new ToDo (title, description, dueDate, priority)
    };
};

let proj1 = new Project("Project_One", "This is a test project");
let todo1 = proj1.createTodos("test-todo", 'this is a test todo description', 
"28/February/2021", "Low");

console.log(proj1);
console.log(todo1);