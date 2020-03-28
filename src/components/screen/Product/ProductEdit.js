import React from 'react';
import {connect} from 'react-redux';

import {
  Container,
  View,
  Image,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
} from 'native-base';

import {updateProduct} from '../../redux/actions/product';
import Spinner from '../Spinner/Spinner';
import ImagePicker from 'react-native-image-picker';

class ProductEdit extends React.Component {
  state = {
    name: '',
    description: '',
    photo: null,
    category_id: '',
    price: '',
    stock: '',
  };

  componentDidMount() {
    const product = this.props.navigation.getParam('product');

    this.setState({
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
    });
  }

  onSubmit = async () => {
    const product = this.props.navigation.getParam('product');
    await this.props.dispatch(updateProduct(product.id, this.state));

    if (!this.props.products.isLoading) {
      this.props.navigation.navigate('Product');
    }
  };
  // handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.launchImageLibrary(options, response => {
  //     if (response.uri) {
  //       this.setState({photo: response});
  //     }
  //   });
  // };

  render() {
    const {photo} = this.state;
    // console.log(this.state);
    return (
      <Container>
        <Spinner isLoading={this.props.products.isLoading} />
        <Content>
          <Form style={{marginRight: 10}}>
            <Item>
              <Input
                placeholder="name books"
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                placeholder="description"
                onChangeText={text => this.setState({description: text})}
                value={this.state.description}
              />
            </Item>
            {/* <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {photo && (
                <Image
                  source={{uri: photo.uri}}
                  style={{width: 300, height: 300}}
                />
              )}
              <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
            </View> */}
            <Item>
              <Input
                placeholder="category_id"
                onChangeText={text => this.setState({category_id: text})}
                value={this.state.category_id}
              />
            </Item>
            <Item>
              <Input
                placeholder="price"
                onChangeText={text => this.setState({price: text})}
                value={this.state.price}
              />
            </Item>
            <Item>
              <Input
                placeholder="stock"
                onChangeText={text => this.setState({stock: text})}
                value={this.state.stock}
              />
            </Item>
          </Form>
          <Button primary style={{margin: 10}} onPress={this.onSubmit}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductEdit);
