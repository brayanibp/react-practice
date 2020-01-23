import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';

class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  }

  componentDidMount () {
    this.fetchData();
  }

  fetchData = async ()=>{
    this.setState({ loading: true, error: null });
    try {
      // const data = [];
      const data = await api.badges.list();
      this.setState({ loading: false, data: data });
    } catch(err) {
      this.setState({ loading: false, error: err });
    }
  }

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    if (this.state.error) {
      // return (
      //   <div className="container">
      //     <h3>Something Goes Wrong.</h3>
      //     <p>{ this.state.error.message }</p>
      //   </div>
      // );
      return <PageError error={this.state.error} />;
    }
    if (this.state.data.length === 0) {
      return (
        <div className="container">
          <h3>No badges were found.</h3>
          <Link to="/badges/new" className="btn btn-primary">Create new Badge</Link>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>

          <BadgesList badges={this.state.data} />
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
