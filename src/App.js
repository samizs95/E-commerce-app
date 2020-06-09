import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import './App.css';
import {Switch, Route,Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInandSignUpPage from './pages/signin-and-signup/signin-and-signup.component';

import {auth,createUserProfileDocument} from './Firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';


//modified to class from function when we started to use GoogleAuth and sign in in order to store users logged in
class App extends React.Component {
 

  unsubscribeFromAuth = null;

  componentDidMount(){

    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }
      setCurrentUser(userAuth)
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
      <Header/>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInandSignUpPage />)} />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
