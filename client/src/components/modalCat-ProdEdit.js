import React, {Component} from 'react';
import ReactModal from "react-modal";

class ModalCatEdit extends Component {

    render(){
        return(
            <ReactModal isOpen={this.props.catEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <strong>Account has been registered!</strong>
                <br/>
                <button className='submit-btn'>Ok</button>
            </ReactModal>
        );
    };
}

export {ModalCatEdit};