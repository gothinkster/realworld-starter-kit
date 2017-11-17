require('./index.scss')

// IE11?
// require('babel-polyfill')

import {Slim} from "slim-js/Slim"
import {tag, template, useShadow} from "slim-js/Decorators"
import Todo from './todo'

require('./extension-enterkey')

const awesomeTemplate = require('./awesome-app.html')

@tag('awesome-app')
@template(awesomeTemplate)
@useShadow(true)
class AwesomeApp extends Slim {

    onBeforeCreated () {
        this.todos = [
            new Todo('Install slim.js'),
            new Todo('Read the documentation'),
            new Todo('Create awesome apps with latest technology')
        ]
        this.currentTodo = null
    }

    onCreated() {
        console.log(this.tableBody)
    }

    editTodo (e) {
        this.currentTodo = e.target.todo
        this.update('todo')
        const inp = this.find('input[active="true"]')
        inp.focus()
        inp.setSelectionRange(0, inp.value.length)
    }

    updateDescription (e) {
        e.target.todo.description = e.target.value
        this.currentTodo = null
        this.update('todo')
    }

    isChecked (todo) {
        return todo.done ? 'checked' : ''
    }

    isSelected (todo) {
        return todo === this.currentTodo
    }

    todoClass (todo) {
        return todo.done ? 'completed' : ''
    }

    toggleTodo (e) {
        e.target.todo.done = e.target.checked
        this.update('todo')
    }

    handleDelete (e) {
        this.todos = this.todos.filter(todo => todo.id.toString() !== e.currentTarget.getAttribute('todo-id'))
    }

    clearCompleted () {
        this.todos = this.todos.filter(todo => !todo.done)
    }

    handleNewInput () {
        const newTodo = new Todo(this.todoInput.value || 'New Todo')
        this.todoInput.value = ''
        this.todos = this.todos.concat(newTodo)
    }
}