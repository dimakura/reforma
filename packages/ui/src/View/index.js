import React from 'react'
import PropTypes from 'prop-types'
import { HTMLTable } from '@blueprintjs/core'
import RecordComponent from '../RecordComponent'
import Data from './Data'

class View extends React.PureComponent {
  render() {
    const {
      id,
      autofetch,
      cached,
      dataSource,
      fields,
      condensed,
      interactive,
      style,
      labelWidth
    } = this.props

    return (
      <RecordComponent
        autofetch={autofetch}
        cached={cached}
        dataSource={dataSource}
        id={id}
        render={() => {
          const data = dataSource.data
          // XXX: review this!!!!
          const hasData = data != null

          return (
            <HTMLTable
              bordered
              condensed={condensed}
              interactive={hasData && interactive}
              style={style}
              className="rf-view"
            >
              <tbody>
                <Data
                  data={data}
                  fields={fields}
                  skeleton={!hasData}
                  labelWidth={labelWidth}
                />
              </tbody>
            </HTMLTable>
          )
        }}
      />
    )
  }
}

View.defaultProps = {
  autofetch: true,
  cached: true,
  condensed: true,
  interactive: true,
  labelWidth: 140
}

View.propTypes = {
  id: PropTypes.any.isRequired,
  autofetch: PropTypes.bool.isRequired,
  cached: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  condensed: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
  style: PropTypes.object,
  labelWidth: PropTypes.number.isRequired
}

export default View
