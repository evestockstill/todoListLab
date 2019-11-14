import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;  
        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            todo.inactive = !todo.inactive;
            onUpdate(todo);
        });
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            const confirmed = confirm(`'Remove this ${todo.task}'?`);
            if (confirmed) {
                onRemove(todo);
            }
        });
    }



    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
            <li class="todo-list">
            <div class="todo-wrap">
                <span class="${ todo.inactive ? 'inactive' : ''}">${todo.task }</span>
                <div>
                    <button class="inactive-button">
                         Make ${ todo.inactive ? 'Active' : 'Inactive'}
                    </button>
                    
                    <button class="remove-button">
                        🗑
                    </button>
                    </div>
                </div>
            </li>
        `;
    }
}

export default TodoItem;