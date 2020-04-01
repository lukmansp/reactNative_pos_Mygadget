import React from 'react';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  TextView,
  Text,
  Image,
  View,
} from 'native-base';

import {postProduct} from '../../redux/actions/product';
import Spinner from '../Spinner/Spinner';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

class ProductAdd extends React.Component {
  state = {
    name: '',
    description: '',
    image: '',
    category_id: '',
    price: '',
    stock: '',
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    // await this.props.dispatch(postProduct(this.state));

    // if (!this.props.products.isLoading) {
    //   this.props.navigation.navigate('Product');
    // }
    let data = new FormData();
    let file = {
      name: this.state.image.fileName,
      type: this.state.image.type,
      uri: this.state.image.uri,
    };
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('image', file);
    data.append('category_id', this.state.category_id);
    data.append('price', this.state.price);
    data.append('stock', this.state.stock);
    await this.props.dispatch(postProduct(data));
    if (!this.props.products.isLoading) {
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    const {image} = this.state;
    return (
      <Container>
        <Spinner isLoading={this.props.products.isLoading} />
        <Content>
          <Form style={{marginRight: 10}}>
            <Item>
              <Input
                placeholder="name"
                onChangeText={text => this.setState({name: text})}
              />
            </Item>
            <Item>
              <Input
                placeholder="description"
                onChangeText={text => this.setState({description: text})}
              />
            </Item>
            <Button
              primary
              style={{margin: 10}}
              title="Choose Photo"
              onPress={this.handleChoosePhoto}>
              <Text>Choose photo</Text>
            </Button>
            <Item>
              <Input
                placeholder="category"
                onChangeText={text => this.setState({category_id: text})}
              />
            </Item>
            <Item>
              <Input
                placeholder="price"
                onChangeText={text => this.setState({price: text})}
              />
            </Item>
            <Item>
              <Input
                placeholder="stock"
                onChangeText={text => this.setState({stock: text})}
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

export default connect(mapStateToProps)(ProductAdd);
