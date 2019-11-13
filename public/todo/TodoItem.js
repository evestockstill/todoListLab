import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;  
    }

    

    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
            <li class="todo-list">
            <div class="todo-info">
            <h2>${todo.task}</h2>
            <h2>${todo.complete}<h2>
            <li>
        `;
    }
}

export default TodoItem;