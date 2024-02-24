import React, { Component } from 'react'

class Quantity extends Component {
    constructor(props) {
        super(props);
    }

    decreaseQuantity = () => {
        this.onValueChange(this.props.quntity - 1);
    }

    decreaseQuantityByDouble = () => {
        if (this.props.quntity > 2) {
            this.onValueChange(this.props.quntity - 2);
        }
    }

    increaseQuantityByDouble = () => {
        this.onValueChange(this.props.quntity + 2);
    }

    increaseQuantity = () => {
        this.onValueChange(this.props.quntity + 1);
    }


    onValueChange = (value) => {
        this.props.onValueChange(value)
    }




    render() {

        const { quntity } = this.props;


        if (!quntity) {
            // return error message

            return (
                <div className='text-danger'>
                    Error in Quantity Component : quntity is not defined
                </div>
            )
        }


        return (
            <div className="white-div">
                <button
                    className="minus-button"
                    disabled={this.props.quntity == 1}
                    onClick={() => {
                        this.decreaseQuantity()
                    }}
                    onDoubleClick={() => {
                        this.decreaseQuantityByDouble()
                    }}
                >
                    -
                </button>
                <div>{this.props.quntity}</div>
                <button
                    className="plus-button"
                    onDoubleClick={() => {
                        this.increaseQuantityByDouble()
                    }}
                    onClick={() => {
                        this.increaseQuantity()
                    }}
                >
                    +
                </button>
            </div>

        );
    }
}

export default Quantity