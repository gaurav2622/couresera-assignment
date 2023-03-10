import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Contact from './ContactComponent'
import About from './AboutComponent'
import { connect } from 'react-redux'
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators'
import { actions } from 'react-redux-form'

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }    
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {(fetchDishes())(dispatch)},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (feedback) => {dispatch(postFeedback(feedback))}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromos()
    this.props.fetchLeaders()
  }

  render() {
    const HomePage = () => {
      return (
        <Home 
          dish = {this.props.dishes.dishes.filter((dish)=> dish.featured)[0] } 
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          promotion = {this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promosLoading = {this.props.promotions.isLoading}
          promosErrMess = {this.props.promotions.errMess}
          leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading = {this.props.leaders.isLoading}
          leadersFailed = {this.props.leaders.error}
        />
      )
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail 
          dish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))}
          commentsErrMess = {this.props.comments.errMess}
          postComment = {this.props.postComment}
        />
      )
    }

    return (
      <div>
        <Header/>
            <Switch>
              <Route path = "/home" component = { HomePage } />
              <Route exact path = "/menu" component = { () => <Menu dishes = {this.props.dishes} /> } />
              <Route path = "/menu/:dishId" component = { DishWithId } />
              <Route exact path = "/contactus" component = { () => <Contact postFeedback = {this.props.postFeedback} resetFeedbackForm = {this.props.resetFeedbackForm} /> } />
              <Route exact path = "/aboutus" component = { () => <About leaders = {this.props.leaders} /> } />
              <Redirect to = '/home' />
            </Switch>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
