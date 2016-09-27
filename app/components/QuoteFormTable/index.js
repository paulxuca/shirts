import React from 'react';
import styles from './styles.css';

function QuoteFormTable({ data }) {
  const needNumbers = data.get('addNumbers');
  const needNames = data.get('addNames');
  if (needNames || needNumbers) {
    return (
      <table
        className={styles.quoteFormTable}
      >
        <thead>
          <tr>
            {needNames ? <td>
              Name
            </td> : null}
            {needNumbers ? <td>
              Number
            </td> : null}
            <td>
              Apparel Size
            </td>
          </tr>
        </thead>
        <tbody>
          {data.filter((each) => typeof each === 'number' && each > 0).entrySeq().map((each, k, i) => {
            let iter = 0;
            const eachRow = [];
            for (; iter < each[1]; iter += 1) {
              eachRow.push(<tr>
                {needNames ?
                  <td>
                    <input type="text" />
                  </td>
                : null}
                {needNumbers ?
                  <td>
                    <input type="number" min="0" />
                  </td>
                : null}
                <td style={{ textTransform: 'uppercase' }}>
                  {each[0]}
                </td>
              </tr>);
            }
            return eachRow;
          })}
        </tbody>
      </table>
    );
  }
  return null;
}

QuoteFormTable.propTypes = {
  data: React.PropTypes.object,
};

export default QuoteFormTable;
