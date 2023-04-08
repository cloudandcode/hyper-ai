"use strict";
// References:
// https://github.com/daltonmenezes/hyper-init/blob/master/index.js
// https://github.com/vercel/hyperpower/blob/master/index.js
// https://github.com/KeeTraxx/hyper-letters
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateTerm = exports.decorateTerms = exports.mapTermsState = void 0;
// TODO: Delete these.
const mapTermsState = (state, map) => {
    console.log('MAP TERMS STATE', state, map);
    return map;
};
exports.mapTermsState = mapTermsState;
const decorateTerms = (Terms, { React }) => {
    return class extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.terms = null;
            this.onDecorated = this.onDecorated.bind(this);
        }
        onDecorated(terms) {
            this.terms = terms;
            // Don't forget to propagate it to HOC chain
            if (this.props.onDecorated)
                this.props.onDecorated(terms);
            console.log('TERMS', terms);
        }
        render() {
            return Object.assign({}, this.props);
            onDecorated = { this: .onDecorated } /  > ;
        }
    };
};
exports.decorateTerms = decorateTerms;
const decorateTerm = (Term, { React }) => {
    console.log('DECORATE TERM', Term, React);
    return class extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.term = null;
            this.onDecorated = this.onDecorated.bind(this);
        }
        onDecorated(term) {
            this.term = term;
            // Don't forget to propagate it to HOC chain
            if (this.props.onDecorated)
                this.props.onDecorated(term);
            console.log('TERM', term);
        }
        render() {
            return Object.assign({}, this.props);
            onDecorated = { this: .onDecorated } /  > ;
        }
    };
};
exports.decorateTerm = decorateTerm;
