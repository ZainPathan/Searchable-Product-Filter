import React from 'react';

const withCounter = Component => {

    class HOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                count: 0
            };
            let buttonRef = this.props.forwardedRefs;
            this.update = this.update.bind(this);
        }

        update = type => {
            console.log(this.buttonRef);
            this.props.logOnConsole();
            if( type === 'Inc' ) {
                this.setState( ({count}) => ({count: count + 1}) );
            } else if ( type === 'Dec' ) {
                this.setState( ({count}) => ({count: count - 1 }) );
            }
        }

        render() {
            return (
                <React.Fragment>
                    <h2>Higher Order Component with forwarding refs</h2>
                    <Component {...this.state} ref={this.props.forwardedRefs} update={this.update}/>
                </React.Fragment>
            );
        }
    }
    
    return React.forwardRef( (props, ref, logOnConsole) => {
        return <HOC forwardedRefs={ref} logging={logOnConsole} {...props}/>
    });
};

const Counter = ( {count, update, ref} ) => (
    <div>
        <button ref={ref} onClick={ () => update('Inc')}>Increment</button>
        <br/>
        <p>Count : {count}</p>
        <br/>
        <button onClick={ () => update('Dec')}>Decrement</button>
    </div>
);

const CounterExample = withCounter(Counter);

class CounterExampleApp extends React.Component {

    constructor(props) {
        super(props);
        const buttonRef = React.createRef();
        this.logOnConsole = this.logOnConsole.bind(this);
    }

    logOnConsole() {
        console.log('Button Forwarded Ref value : ', this.buttonRef.current.offsetTop);
    }
    
    render() {
        return (
            <div>
                <CounterExample ref={this.buttonRef} logOnConsole={this.logOnConsole}/>
            </div>
        );
    }    
}

export default CounterExampleApp;