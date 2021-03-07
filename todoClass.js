

class ToDo {
    constructor(title, description, dueDate, priority, relation) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._relation = relation;
    };
}; 

class Project {
    constructor (projName, description) {
        this._projName = projName;
        this._description = description;
        this._toDoList = []
    };

    createTodos (title, description, dueDate, priority, relation = this._projName) {
        this._toDoList.push(new ToDo (title, description, dueDate, priority, relation)); 
    };
};

export default Project;
