import React from 'react';

const TextInput = React.forwardRef( (props, ref) => {
    return <input type="text" placeholder="Hello World" ref={ref} />
});

const inputRef = React.createRef();

class CustomTextInput extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        console.log(inputRef.current.value);
    };

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <TextInput ref={inputRef} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default CustomTextInput;