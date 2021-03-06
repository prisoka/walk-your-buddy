import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DogCard from './DogCardComponent'
import { fetchRequests } from '../redux/actions/requestsActions'

class WalkerIndex extends Component {
  componentDidMount(){
    const { fetchRequests } = this.props
    fetchRequests()
  }
  render() {
    const { requests, user_id } = this.props

    return (
      <div>
        <section className="hero is-link is-medium is-bold">
          <div className="hero-body has-bg-img">
            <div className="container has-text-centered">
              <h1 className="title">
                Hi, {localStorage.getItem('userObjectFirstName')}!
              </h1>
              <br/>
              <h2 className="subtitle">
                Here are the dogs requests in your area:
              </h2>
            </div>
          </div>
        </section>
        <section>
          <div id="eventContainer" className="columns is-left is-multiline" style={{padding: "2rem"}}>
            {
              requests.map((request) => (
                  <DogCard
                    key={request.id}
                    request={request}
                    {...this.props} // passing the props to inject history to child/children
                  />
              ))
            }

            {/* another solution w/o AUTH on the backend */}
            {/* {
              requests.map((request) => (
                request.walker_id === null || request.walker_id === parseInt(localStorage.getItem('userObjectId')) &&
                  <DogCard
                    key={request.id}
                    request={request}
                    {...this.props} // passing the props to inject history to child/children
                  />
              ))
            } */}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    requests: state.requests
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRequests
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalkerIndex)
