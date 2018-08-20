import React from 'react';

//Forward Ref
const TextInput = ( {forwardedRef, children, ...rest} ) => (
    <div>
        <input ref={forwardedRef} {...rest} />
        {children}
    </div>
);

//HOC
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

//HOC Creation
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
                {/* Calling HOC Component */}
                <InputField ref={inputRef} onTextChange={this.handleOnTextChange.bind(this)}/>
                <br />
                <p>{this.state.textInputValue}</p>
            </div>
        );
    }
}

export default CustomHOCTextInput;