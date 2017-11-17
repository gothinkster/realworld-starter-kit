let todoId = 0

class Todo {
    constructor (description) {
        this.id = todoId++
        this.description = description
        this.done = false
    }

    toggle () {
        this.done = !this.done
    }
}

export default Todo