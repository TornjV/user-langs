import { VictoryPie, VictoryTooltip, VictoryTheme } from 'victory';
import CSSModules from 'react-css-modules';
import prettysize from 'prettysize';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import styles from './LanguageStats.scss';

@CSSModules(styles)
class LanguageStats extends React.Component {

  render() {
    const { langData, sortBy, chart } = this.props;

    const title = sortBy === 'totalSize' ? 'By total size on disk' : 'By total project count';

    if (chart) {
      return (
        <div styleName="chart">
          <h3>{title}</h3>

          <VictoryPie
            theme={VictoryTheme.material}
            data={[...langData]}
            x={lang => lang[0]}
            y={lang => lang[1][sortBy]}
            labels={d => `${d.x} - ${d.y}`}
            innerRadius={80}
            labelComponent={<Label />}
            style={{ labels: { fill: 'white' } }}
          />
        </div>
      );
    }

    return (
      <div styleName="language-stats">
        <h3>{title}</h3>

        <div styleName="languages">
          {
            _.sortBy([...langData], obj => -obj[1][sortBy]).map((lang) => {
              const name = lang[0];
              const value = lang[1][sortBy];

              return (
                <h4 styleName="language" key={name}>
                  {name} - {sortBy === 'totalSize' ? prettysize(value) : value}
                </h4>
              );
            })
          }
        </div>
      </div>
    );
  }
}

LanguageStats.propTypes = {
  sortBy: PropTypes.oneOf(['count', 'totalSize']).isRequired,
  chart: PropTypes.bool,
  langData: PropTypes.object.isRequired,
};

const Label = props => (
  <VictoryTooltip
    {...props}
    text={props.text}
    flyoutStyle={{ fill: 'black' }}
    width={100}
    height={100}
    x={0}
    y={50}
    orientation="top"
    pointerLength={0}
    cornerRadius={50}
  />
);

Label.defaultEvents = VictoryTooltip.defaultEvents;

export default LanguageStats;
