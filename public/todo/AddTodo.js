import Component from '../Component.js';


class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        const input = form.querySelector('input[name=task]');
        
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const newTodo = input.value;
           
            const todoList = {
                task: newTodo,
                complete: false
            };
            console.log(todoList);
           

            try {
                await onAdd(todoList);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
                // window.location = `todo.html?id${saved.id}`;
            }
            // eslint-disable-next-line no-empty
            catch (err) {
                
            }
        });
    }

    renderHTML() {
        return /*html*/ `
        <section class="type-form-section">
                <form class="type-form">
                    <input name="task" required>
                    <button>Add</button>
                </form>
            </section>  
        `;
    }
}

export default AddTodo;