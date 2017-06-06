import CSSModules from 'react-css-modules';
import { graphql } from 'react-apollo';
import { Spinner } from 'components';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './UserView.scss';
import UserQuery from './UserQuery.graphql';
import LanguageStats from './LanguageStats';

@graphql(UserQuery, {
  options: props => ({
    variables: {
      username: props.params.username,
    },
  }),
})
@CSSModules(styles)
class UserView extends React.Component {

  agregateLangData = () => {
    const languages = new Map();

    this.props.data.user.contributedRepositories.edges.map(repo =>
      repo.node.languages.edges.map((language) => {
        const name = language.node.name;
        const size = language.size;

        if (!languages.has(name)) return languages.set(name, { count: 1, totalSize: size });

        const oldValues = languages.get(name);
        const newValues = {
          count: oldValues.count + 1,
          totalSize: oldValues.totalSize + size,
        };

        languages.set(name, newValues);
      }));

    return languages;
  }

  render() {
    if (this.props.data.loading) {
      return (
        <Spinner />
      );
    }

    if (this.props.data.error) {
      return (
        <div>{this.props.data.error.message}</div>
      );
    }

    const user = this.props.data.user;
    const langData = this.agregateLangData();

    return (
      <div styleName="user-view">
        <div styleName="info">
          <img alt={user.name} src={user.avatarUrl} />
          <div styleName="container">
            <a href={user.url} target="_blank" rel="noopener noreferrer"><h1 >{user.name}</h1></a>
            <h4>{user.location}</h4>
          </div>
        </div>

        <div styleName="stats">
          <h2>Language Statistics</h2>

          <div styleName="list">
            <LanguageStats langData={langData} sortBy="count" chart />
            <LanguageStats langData={langData} sortBy="totalSize" />
          </div>
        </div>

        <div styleName="repos">
          <h2>Repos contributed to</h2>

          <div styleName="list">
            {
              user.contributedRepositories.edges.map(repo => (
                <div key={repo.node.id} styleName="repo">
                  <a href={repo.node.url} target="_blank" rel="noopener noreferrer">{repo.node.nameWithOwner}</a>

                  <div styleName="languages">
                    {
                      repo.node.languages.edges.map(language => (
                        <h5 key={language.node.id} >{language.node.name}</h5>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

UserView.propTypes = {
  params: PropTypes.shape({
    username: (props, propName) => {
      const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
      if (!usernameRegex.test(props[propName])) return new Error('Username invalid!');
    },
  }),
};

export default UserView;
