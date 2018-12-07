import React, {Component} from 'react';

let AppContext = React.createContext();

class AppProvider extends Component {

    state = {
        isAdmin:false,
        catEditModalOpen:false,
        catDeleteModalOpen:false,
        prodEditModalOpen:false,
        prodDeleteModalOpen:false,
    };

    render(){
        return (
            <AppContext.Provider value={{
                state: this.state,
                actions: {
                    catEditModalOpen: ()=>{
                        this.setState({
                            catEditModalOpen:true
                        })
                    }
                }
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export {AppProvider, AppContext};