import React, {Component} from 'react';

let AppContext = React.createContext();

class AppProvider extends Component {

    state = {
        isAdmin:false,
        catEditModalOpen:false,
        editingCatName:null,
        catDeleteModalOpen:false,
        prodEditModalOpen:false,
        editingProdName:null,
        prodDeleteModalOpen:false
    };

    render(){
        return (
            <AppContext.Provider value={{
                state: this.state,
                openCatEdit:()=>{
                    this.setState({catEditModalOpen:true})}
            }}
                                 children={this.props.children}/>
        )
    }
}

export {AppProvider, AppContext};