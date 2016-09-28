import React from 'react';
import { connect } from 'react-redux';

import { getUserInfo } from '../actions/api';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getUserChallenges = this.getUserChallenges.bind(this);
  }
  componentWillMount() {
    this.props.getUserInfo();
    // console.log('userinfo:', this.props.userInfo);
  }
  getUserChallenges() {
    const userChallenges = this.props.userInfo.completed_challenges.map((item) => {
      console.log('ITEM:', item);
      return item;
    });
  }
  render() {
    if(!Object.keys(this.props.userInfo).length) {
      return <div>loading</div>;
    } else if (this.props.userInfo === 'Not logged in!') {
      return (
        <div>
          <div className="container text-center not-logged-in">
            <h2>Please sign in to see your profile page.</h2>
          </div>
        </div>
      );
    } else {
      console.log('loaded:', this.props.userInfo);
      return (
        <div>
          <div className="text-center">
            <hr className="profile-hr"></hr>
            <div className="container">
              <table className="table-responsive">
                <tbody>
                  <tr>
                    <td>
                      <img className="about-img" src={this.props.userInfo.avatar_url}/>
                    </td>
                    <td>
                      <h1>{this.props.userInfo.name}</h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row" id="complete-challenge">
              <h4>Complete Challenges</h4>
              {console.log('CHALLENGES', this.props.userInfo.completed_challenges)}
              {this.getUserChallenges()}
            </div>
            <div className="row" id="tutorial-progress">
              <h4>Tutorial Progress</h4>
            </div>

            <div className="row" id="contributions">
              <h4>Contributions</h4>
            </div>

          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
	return { userInfo: state.userInfo };
};

export default connect(mapStateToProps, { getUserInfo })(UserProfile);