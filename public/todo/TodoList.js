import Component from '../Component.js';
import TodoItem from './TodoItem.js';


class TodoList extends Component {
    
    onRender(dom) {
        const todos = this.props.todos;
        
        todos.forEach(todo => {
            const props = { todo: todo };
            const todoItem = new TodoItem(props);
            const todoItemDom = todoItem.renderDOM();
            dom.appendChild(todoItemDom);

        }); 
        
    }
    renderHTML() {
        return /*html*/`
            <ul class="todos"></ul>
        `;
    }
}

export default TodoList;
