import Component from '../Component.js';


class AddTodo extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[task=todo]');
        
        form.addEventListener('submit', async event => {
            event.preventDefault();
           
            const todoList = {
                task: input.value
            };

           

            try {
                await onAdd(todoList);
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
        return /*html*/ `
        <section class="type-form-section">
                <form class="type-form">
                    <input name="todo" required>
                    <button>Add</button>
                </form>
            </section>  
        `;
    }
}

export default AddTodo;