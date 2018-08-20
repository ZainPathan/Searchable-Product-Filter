import React from 'react';

const TextInput = ( {forwardedRef, children, ...rest} ) => (
    <div>
        <input ref={forwardedRef} {...rest} />
        {children}
    </div>
);

const Input = (InputComponent) => {
    const forwardRef = (props, ref) => {
        const onType = () => {
            console.log(ref.current.value);
            props.onTextChange(ref.current.value);
        }
        return (
            <InputComponent forwardedRef={ref} onChange={onType} {...props} />
        );
    };

    return React.forwardRef(forwardRef);
};

const InputField = Input(TextInput);

class CustomHOCTextInput extends React.Component {
    constructor() {
        super();
        this.state = {
            textInputValue: ''
        }
    }
    handleOnTextChange(val) {
        console.log('val : ', val);
        this.setState({textInputValue: val});
    }
    render() {
        const inputRef = React.createRef();
        return (
            <div>
                <InputField ref={inputRef} onTextChange={this.handleOnTextChange.bind(this)}/>
                <br />
                <p>{this.state.textInputValue}</p>
            </div>
        );
    }
}

export default CustomHOCTextInput;