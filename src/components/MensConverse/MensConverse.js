import React, { Component } from 'react';
import './MensConverse.css';
//import MensNikeShoes from '../../jsonFile/nikeMensLifeShoes.json';
import Categories from '../Categories/Categories';
//import Product from '../Product/Product';
import {Link} from 'react-router-dom';
import Scroll from '../Scroll/Scroll';
import {connect} from 'react-redux';
import axios from 'axios';

class MensConverse extends Component {
  constructor () {
    super();
    this.state = {
      converse: []
    };
  }


// componentDidMount(){
//   console.log('hittttttt compdidmout')
//   setTimeout(() => {
//     this.getShoes()
//   },1001);
  
//   //this.forceUpdate();
// }

componentDidMount() {
  this.getConverse();
}


getConverse() {
  axios.get(`/api/product/${'converse'}`).then(res => {
    //console.log(res.data[0].shoes_name)
    console.log(res.data)
    this.setState({converse: res.data})
  })
}

addToCart = (name, price, image, id) => {
  axios.post('/api/cart', {name:name, price:price, image:image, id:id}).then(res => {
    console.log('added to cart', res)
  })
}



  render() {
    const { user } = this.props;
    //console.log('this.state.nikeshoes', this.state.nikeShoes)
      //console.log('hit rennderrrrr')
 let mappedShoes = this.state.converse && this.state.converse.map(shoe => {
   return <div className="eachShoe" key={shoe.id}>
    <div className="img-box">
      <Link to={{pathname: `/product/${shoe.name}`, state:{shoe}}}><img className="shoeimg" src={shoe.image} alt=""/></Link>
    </div>
    <div className="plus-heart">
      <div className="shoe-desc">
        <h4>{shoe.name}</h4>
        <h3>{shoe.brand}</h3>
        <p>${shoe.price}</p>
      </div>
      <div>
        <button onClick={() => {
          user
          ?
            this.addToCart(shoe.name, shoe.price, shoe.image, shoe.id)
          :
            alert('please log in to add to cart')
          }}>
 
          Add to cart
        </button>
      </div>
      <div><i className="far fa-heart icon"></i></div> 
    </div>
   </div>
 })
    
    return (
      
          <div className="mensShoespage">
                
              <div className="displayShoes">
                <h1>CONVERSE</h1>
                <div className="shoeCat-container">
                  <Categories />
                  <Scroll>
                    {mappedShoes}
                  </Scroll>
                </div>
              </div>
    
          </div>
        
    )
  }
}

function mapStateToProps (state) {
  const {user} = state;
  return {user};
}

export default connect(mapStateToProps)(MensConverse);
