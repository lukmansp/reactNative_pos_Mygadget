import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Card, ListItem, Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {getProducts} from '../../redux/actions/product';
import {addCart} from '../../redux/actions/cart';
import {searchProducts} from '../../redux/actions/product';
import {FlatList} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      search: '',
      page: '',
      data: [],
    };
  }
  updateSearch = search => {
    this.setState({search});
  };
  async getProducts() {
    await this.props.dispatch(getProducts());
  }
  async addCart(data) {
    await this.props.dispatch(addCart(data));
    // console.log(data);
  }
  searchProducts = async search => {
    //console.log(event.target.value)
    this.setState({search});
    await this.props.dispatch(searchProducts(search, this.state.category));
    // console.log(search);
  };
  componentDidMount() {
    this.getProducts();
  }
  renderRow = ({item}) => {
    return (
      <View style={{width: 190, marginLeft: -6}}>
        <Card title={item.name}>
          <View>
            <Image
              source={{
                uri: item.image,
                width: 110,
                height: 70,
              }}
            />
          </View>
          <Text style={{marginBottom: 10}}>Stock: {item.stock}</Text>
          <View style={{flexDirection: 'row', width: 60, alignSelf: 'center'}}>
            {/* <Button title="Add cart" onPress={this.addCart.bind(this, item)} /> */}
            <TouchableOpacity
              style={{marginLeft: -25}}
              onPress={this.addCart.bind(this, item)}>
              <Icons name="cart-arrow-down" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() =>
                this.props.navigation.navigate('EditProduct', {product: item})
              }>
              <Icons name="lead-pencil" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 20}}>
              <Icons name="trash-can" size={25} />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };
  render() {
    const {search} = this.state;
    const {products} = this.props.products;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.titleBanner}>
            <Text style={styles.title}>My^gadget</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Search..."
              placeholderTextColor="#003f5c"
              onChangeText={this.searchProducts}
              value={`${this.state.search}`}
            />
          </View>
        </View>
        <ScrollView>
          <View>
            <Image
              source={require('../../image/promo.jpg')}
              style={styles.promo}
            />
          </View>

          <View style={styles.info}>
            <View>
              <View style={styles.editCard}>
                <Text style={{alignSelf: 'center', marginTop: 5}}>Edit</Text>
              </View>
              <Text style={styles.status}>Cashier</Text>
            </View>
            <Image
              source={require('../../image/_DSC6834.jpg')}
              style={{
                marginLeft: 225,
                borderRadius: 80,
                width: 90,
                height: 100,
              }}
            />
            <View style={styles.infoCard}>
              <View style={styles.infotext}>
                <Text>Name: Lukman Sefriyanto</Text>
                <Text>Saldo: 900.000</Text>
                <Text style={{fontWeight: 'bold'}}>0823xxxx</Text>
              </View>
            </View>
          </View>
          <FlatList
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            data={products}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderRow}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state);
  return {
    products: state.products,
  };
};

const styles = StyleSheet.create({
  titleBanner: {
    backgroundColor: 'white',
    width: 110,
    height: 40,
    marginTop: 15,
    marginLeft: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: 'skyblue',
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 5,
  },
  editCard: {
    backgroundColor: '#f7f7f7',
    width: 70,
    height: 40,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#efecea',
    marginLeft: 5,
    marginTop: 5,
  },
  status: {fontWeight: 'bold', color: 'green', marginTop: -20, marginLeft: 90},
  infoCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 9,
    width: 300,
    height: 70,
    marginLeft: 10,
    borderColor: '#efecea',
  },
  infotext: {
    marginLeft: 12,
    marginTop: 5,
  },
  image: {
    height: 50,
  },
  container: {
    height: 70,
    backgroundColor: 'skyblue',
  },

  inputText: {
    height: 50,
  },
  inputView: {
    marginTop: -40,
    marginLeft: 160,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 40,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  promo: {
    height: 170,
    width: 400,
  },
  info: {
    marginTop: -30,
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 230,
    width: 320,
    borderRadius: 8,
    borderBottomWidth: 5,
    borderColor: '#efecea',
  },
  card: {
    alignSelf: 'center',
    backgroundColor: 'green',
    height: 230,
    width: 320,
    borderRadius: 8,
  },
});
export default connect(mapStateToProps)(HomeScreen);
