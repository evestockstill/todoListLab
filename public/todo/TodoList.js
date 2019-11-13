import Component from '../Component.js';
import TodoItem from './TodoItem.js';


class TodoList extends Component {
    
    onRender(list) {
        const todos = this.props.todos;

        todos.forEach(todo => {
            const props = { todo: todo };
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
