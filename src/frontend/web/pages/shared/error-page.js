const React = require('react');
const PropTypes = require('prop-types');
const Footer = require('../../components/footer');

module.exports = class ErrorPage extends React.PureComponent {
  static get propTypes() {
    return {error: PropTypes.any};
  }

  static get defaultProps() {
    return {error: 'Error'};
  }

  state = {};

  constructor(props) {
    super(props);
    this.state.status = props.error.status || '';
    this.state.message = props.error.message ? props.error.message : `${props.error}`;
    if (this.state.status === 404) {
      document.title = 'Not found - Chat';
    } else {
      document.title = 'Error - Chat';
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow my-5">
                <div className="card-body text-center py-5">
                  <h2 className="card-title mb-4">Error {this.state.status}</h2>
                  <p className="card-title mb-4">{this.state.message}</p>
                  <a className="btn btn-outline-primary btn-lg" href="/">
                    Go to home page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  }
};
