import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from '@blueprintjs/core'
import DataSourceComponent from '../DataSourceComponent'
import defaultPageExtractor from './defaultPageExtractor'
import defaultPageMover from './defaultPageMover'

class Pagination extends React.PureComponent {
  render() {
    const { dataSource, pageExtractor, pageMover } = this.props

    return (
      <DataSourceComponent
        autofetch={false}
        cached={true}
        dataSource={dataSource}
        render={() => {
          const { page, pages } = pageExtractor(dataSource)

          return do {
            const isFirst = page < 2
            const isLast = page >= pages

            if (page != null && pages != null && pages > 0) {
              <ButtonGroup minimal className="rf-pagination">
                <Button
                  icon="chevron-backward"
                  disabled={isFirst}
                  onClick={() => pageMover(dataSource, 1)}
                />
                <Button
                  icon="chevron-left"
                  disabled={isFirst}
                  onClick={() => pageMover(dataSource, page - 1)}
                />
                <div className="rf-pages">
                  <span className="bp3-text-muted">Page</span> <strong>{page}</strong> <span className="bp3-text-muted">of {pages}</span>
                </div>
                <Button
                  icon="chevron-right"
                  disabled={isLast}
                  onClick={() => pageMover(dataSource, page + 1)}
                />
                <Button
                  icon="chevron-forward"
                  disabled={isLast}
                  onClick={() => pageMover(dataSource, pages)}
                />
              </ButtonGroup>
            } else {
              null
            }
          }
        }}
      />
    )
  }
}

Pagination.defaultProps = {
  pageExtractor: defaultPageExtractor,
  pageMover: defaultPageMover
}

Pagination.propTypes = {
  dataSource: PropTypes.object.isRequired,
  pageExtractor: PropTypes.func.isRequired,
  pageMover: PropTypes.func.isRequired
}

export default Pagination
