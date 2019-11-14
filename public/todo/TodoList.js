import Component from '../Component.js';
import TodoItem from './TodoItem.js';


class TodoList extends Component {
    
    onRender(dom) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove; 
        
        todos.forEach(todo => {
           
            const todoItem = new TodoItem({ todo, onUpdate, onRemove });
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
