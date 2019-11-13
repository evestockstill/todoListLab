import Component from '../Component.js';
import { addTodo } from '../services/todo-api.js';
class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(form);

            const todo = {
                task: formData.get('task')
            };

            try {
                const saved = await addTodo();
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
                window.location = `todo.html?id${saved.id}`;
            }
            // eslint-disable-next-line no-empty
            catch (err) {
                
            }
        });
    }

    renderHTML() {
        return /*html*/`
        <div class="container">
        <form class="todo-items">
        <div class="todo-input">
        <input type="text" class="form-input" name="item" placeholder="Add a todo item" value="new todo"> <button type="submit" class="btn">Submit</button>
        </div>
        </form>
        <div class="rows-todo">
        <ul class="todo-list">
        </ul>
        </div>
        </div>

           
        `;
    }
}

export default AddTodo;