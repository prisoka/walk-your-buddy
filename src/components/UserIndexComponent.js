import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserIndex extends Component {
  render() {
    return (
      <div>
        <section className="hero is-warning is-medium is-bold">
          <div className="hero-body has-bg-img">
            <div className="container has-text-centered">
              <h1 className="title">
                Hi, USER_NAME!
              </h1>
              <br/>
              <p class="has-text-centered">
                <Link to="/" className="button is-warning is-inverted is-rounded is-focused is-medium">Book A Walk</Link> &nbsp;
              </p>
            </div>
          </div>
        </section>
        <section>
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="columns is-centered">
                <div class="column is-6 is-offset-1">
                  <h2 class="subtitle is-4">
                    Available walkers near you:
                  </h2>
                  <p class="has-text-centered">
                    <Link to="/add_dog" className="button is-warning is-medium">Add Your Dog</Link>
                  </p>
                  <br/>
                  <p class="has-text-centered">
                    <Link to="/" className="button is-warning is-medium">Upcoming Walks</Link>
                  </p>
                  <br/>
                  <p class="has-text-centered">
                    <Link to="/" className="button is-warning is-medium">Past Walks</Link>
                  </p>
                </div>
                <div class="column is-5">
                  <figure class="image is-4by3">
                    <img src="https://picsum.photos/800/600/?random" alt="Description" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default UserIndex;