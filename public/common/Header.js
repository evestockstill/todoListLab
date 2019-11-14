import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'Todos';

        return /*html*/ `
            <header>
                <img class="logo" src="assets/sm-9ball.png" alt="9ball logo">
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./todo.html">Todos</a>
                </nav>
            </header>
        `;
    }
}

export default Header;