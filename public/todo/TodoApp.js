import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {
//add fetch call here
    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        // initial todo load:
        const todoList = new TodoList({
            todos: [],
            onUpdate: async todo => {
                loading.update({ loading: true });
                error.textContent = '';
            
                try {
                    const update = await updateTodo(todo);
                    const todos = this.state.todos;
                    const index = todos.indexOf(todo);
                    todos.splice(index, 1, update);
                    todoList.update({ todos });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
        
            }
        }); 
        main.appendChild(todoList.renderDOM());

        const addTodo = new AddTodo({
            onAdd: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    const saved = await addTodo(todo);
                    const todos = this.state.todos;
                    todos.push(saved);
                    todoList.update ({ todos });
                }
                catch (err) {
                    error.textContent = err;
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            },

            onRemove: async todo => {
                loading.update({ loading: true });
                error.textContent = '';
                try {
                    await removeTodo(todo.id);
                    const todos = this.state.todos;
                    const index = todos.indexOf(todo);
                    todos.splice(index, 1);
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(todoList.renderDOM());
    
        try {
            const todos = await getTodos({ showAll: true });
            this.state.todos = todos;
            todoList.update({ todos });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }  

    }     
   

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;