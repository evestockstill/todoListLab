import Component from '../Component.js';

class Loading extends Component {
    renderHTML() {
        const loading = this.props.loading;
        if (!loading) {
            return /*html*/`<div></div>`;
        }
        
        return /*html*/ `
            <div class="lds-ripple"><div></div><div></div></div>
        `;
    }
}

export default Loading;