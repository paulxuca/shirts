import React from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';
import CartItem from './cartItem';
import { createStructuredSelector } from 'reselect';
import { selectIsCartOpen, selectCartItems } from './selectors';
import { closeCart } from './actions';

class Cart extends React.Component { // eslint-disable-line
  onClickOverlay(e) {
    if (this.props.cartOpen && this.sidebar && !this.sidebar.contains(e.target)) {
      this.props.closeCart();
    }
  }

  render() {
    return (
      <div
        className={this.props.cartOpen ? styles.cartOverlayOpen : styles.cartOverlayClosed}
        onClick={(e) => this.onClickOverlay(e)}
      >
        <div
          className={this.props.cartOpen ? styles.cartOpen : styles.cartClosed}
          ref={(slideOutContainer) => {
            this.sidebar = slideOutContainer;
          }}
        >
          <div className={styles.cartElement}>
            <h2>Your Cart</h2>
            <hr
              style={{
                height: 6,
                backgroundColor: '#000',
                width: '100%',
              }}
            />
            <h5>Order Summary</h5>
            {this.props.cartItems.map((each, index) => <CartItem key={index} data={each} />)}
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartOpen: React.PropTypes.bool,
  closeCart: React.PropTypes.func,
  cartItems: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cartOpen: selectIsCartOpen(),
  cartItems: selectCartItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeCart: () => dispatch(closeCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
