import React, {Component} from 'react';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Picker,
  Alert,
} from 'react-native';

import {
  addQty,
  reduceQty,
  deleteCart,
  cancleCart,
  postOrder,
} from '../redux/actions/cart';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class CartProduct extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#2e9fff',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            marginRight: 20,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('AddProduct')}>
          <Text style={{color: '#fff'}}>Add Product</Text>
        </TouchableOpacity>
      ),
    };
  };

  onRefreshing = () => {
    this.getProduct();
  };
  onAddQty = id => {
    this.props.dispatch(addQty(id));
  };

  onReduceQty = id => {
    this.props.dispatch(reduceQty(id));
  };
  onDeleteCart = id => {
    this.props.dispatch(deleteCart(id));
  };
  onOrder = async e => {
    e.preventDefault();

    const data = {
      id_product: this.props.carts[0].id,
      user: this.props.carts[0].name,
      quantity: this.props.carts[0].quantity,
      price: this.props.carts[0].price,
      stock: this.props.carts[0].stock,
    };
    await this.props.dispatch(postOrder(data));
    console.log(this.props.response);
    if (this.props.response == 200) {
      alert('success', 'order success');
    } else {
      alert('Error', 'Failed order');
    }
  };
  renderRow = ({item}) => {
    return (
      <View style={styles.viewCard}>
        <Image
          source={{
            uri: item.image,
            width: '50%',
            height: '90%',
          }}
        />

        <Text style={{fontSize: 18, marginLeft: 10, marginBottom: 5}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 18}}>
          Stock {item.stock}
        </Text>
        <View style={styles.btnOrder}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.onReduceQty(item.id)}>
            <Text style={{fontSize: 30, color: 'red'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingLeft: 10, marginTop: 6}}>
            <Text style={{fontSize: 18}}>{item.quantity}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 20}}
            onPress={() => this.onAddQty(item.id)}>
            <Text style={{fontSize: 30, color: 'red'}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: '30%',
              marginTop: 1,
            }}
            onPress={() => this.onDeleteCart(item.id)}>
            <Text style={{fontSize: 18, padding: 4}}>
              <Icon name="trash-can" size={35} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {carts, total} = this.props;
    // console.log(response);
    return (
      <View style={{backgroundColor: 'white'}}>
        {/* <Spinner isLoading={isLoading} /> */}
        <View style={styles.header}>
          <View style={styles.headerOrder}>
            <Icon name="cart-arrow-down" size={50} />
          </View>
        </View>
        <View>
          <FlatList
            data={carts}
            renderItem={this.renderRow}
            // refreshing={products.isLoading}
            // onRefresh={this.onRefreshing}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={{margin: 8, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>
            Total Rp. {total}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            marginBottom: 5,
            backgroundColor: 'blue',
          }}
          onPress={this.onOrder}>
          <Text style={{color: 'white'}}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.carts.response);
  return {
    products: state.products.products,
    carts: state.carts.carts,
    total: state.carts.total,
    response: state.carts.response,

    // cart: state.products.carts.carts[0],
    // total: state.products.carts.total,
  };
};
const styles = StyleSheet.create({
  inputText: {
    height: 50,
  },
  btnOrder: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: '-40%',
    marginBottom: 10,
  },
  viewCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 5,
    borderBottomWidth: 5,
    borderColor: '#efecea',
    borderRadius: 15,
    height: '90%',
  },
  picker: {
    marginTop: 7,
    width: '40%',
    backgroundColor: '#2e9fff',
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#a3e0f7',
    borderRadius: 10,
    height: 70,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerOrder: {
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 20,
    alignItems: 'center',
  },
  inputView: {
    marginTop: 7,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
});
export default connect(mapStateToProps)(CartProduct);
