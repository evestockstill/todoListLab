import Component from '../Component.js';
import TodoItem from './TodoItem.js';


class TodoList extends Component {
    
    onRender(list) {
        todos.forEach(todo => {
            const todos = this.props.todos;
            const onUpdate = this.props.onUpdate;
            const onRemove = this.props.onRemove;
            const todoItem = new TodoItem(props);
            const todoItemDOM = todoItem.renderDOM();
            list.appendChild(todoItemDOM);

        
        });
    }
    renderHTML() {
        return /*html*/`
            
        `;
    }
}

export default TodoList;
