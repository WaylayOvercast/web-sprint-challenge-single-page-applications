import React, {useState, useEffect} from "react";
import './App.css'
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Schema from './Schema';
import * as yup from 'yup';
const App = () => {

  const formDefault = {
    name: '',
    size: '',
    pepperoni: false,
    sausage: false,
    bacon: false,
    greenPepper: false,
    grilledChicken: false,
    special: '',
  }
  const [disable, setDisable] = useState(true)
  const [serverRes, setRes] = useState([])
  const [fillForm,setFill] = useState(formDefault)
  const [dataErr,setErr]= useState({
    name: '',
    size: '',
    pepperoni: false,
    sausage: false,
    bacon:false,
    greenPepper:false,
    grilledChicken:false,
    special: '',
  })

  const validate = (name,value) => {
    yup.reach(Schema, name)
    .validate(value)
    .then(() => setErr({...dataErr, [name]: ''}))
    .catch(err => setErr({...dataErr, [name]: err.errors[0] }))
  }

  const update = (name, value) => {
    validate(name, value)
    setFill({...fillForm, [name]: value});
  }

  const onUpdate=(evt)=>{
    const {name, value, checked, type} = evt.target
    const valueIs = type === 'checkbox'? checked : value
        update(name, valueIs)
  }


  const postValues = (newVal) =>{
    axios.post('https://reqres.in/api/orders', newVal)
    .then(res =>{
      setRes([res.data,...serverRes])
      console.log(res)
    })
    .catch(valueError => console.error(valueError)
    )
    .finally(()=> {
      setFill(formDefault)
    })
  }

  useEffect(()=>{
    Schema.isValid(fillForm).then(valid =>
      setDisable(!valid)) 
   },[fillForm])
  

  const submit = () => {

    const newForm = {
      name: fillForm.name.trim(),
      size: fillForm.size,
      pepperoni: fillForm.pepperoni,
      sausage: fillForm.sausage,
      bacon: fillForm.bacon,
      greenPepper: fillForm.greenPepper,
      grilledChicken: fillForm.grilledChicken,
      special: fillForm.special.trim()
    }
    postValues(newForm)
  }

  const onSub = event =>{
    event.preventDefault();
    submit();
  }





  return (
  <Router>
    <header>
      <div className="h-div">
        <h1 className="h-text">Lambda Eats</h1>
        <div className="h-sub">
          <Link to='/pizza' className="order b" >Order</Link>
          <Link to='/' className="home-button b" id='home'>Home</Link>
          <Link to='/help' className="help b">Help</Link>
        </div>
      </div>
    </header>
    <Route exact path='/'>
      <div className="home-main">
        <div className="home-top">
          <div className="top-imgDiv">
            <img className="top-img" src='https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg' alt='pizza'/>
          </div>
          <div className='bottom'>
            <p className="home-desc">Welcome to lambda eats, we deliver pizza straight from the oven straight to your desk! order any of our handcrafted quality gamer/coder grade pizzas! theyre chalk'full of delicious heart stopping cholesterol!</p>
            <div className="make">
              <img className="make-img" src="https://cdn.pixabay.com/photo/2015/09/16/20/10/dough-943245_960_720.jpg"></img>
              <Link className="create-btn" to='/pizza' id='order-pizza'> Create Your Own! </Link>  {/*not sure why the test cant see this, ive moved it to many other places and it seems to be because it is inside router*/}
            </div>
          </div>
        </div>
      </div>
    </Route>
    <Route path='/pizza'>
      <form id='pizza-form' onSubmit={onSub}>
        <div className="fill-form">
          <div className="inner-form">
            <p className="fill-form-desc">Fillout our custom form made by a grade A computer proggramer that totally knows what hes doing and learns as fast as your grandmother runs! we've got everything from pizza to.....pizza!</p>
            <div className="flex-div">
              <div className="right">
                <label className="i">
                  Name on order:&nbsp;
                  <input
                  id='name-input'
                  onChange={onUpdate}
                  value={fillForm.name}
                  name='name'
                  type='text'/>
                </label>
                <label className="i"> Choose your Size
                <div className="error">{dataErr.size}</div>
                  <select 
                  id='size-dropdown'
                  onChange={onUpdate}
                  name='size'>
                    <option value="">-- Select a size here --</option>
                    <option value='10inch' >10inch</option>
                    <option value='12inch' >12inch</option>
                    <option value='14inch' >14inch</option>
                    <option value='16inch' >16inch</option>
                  </select>
                </label>
              </div>
              <div className="left">
                <p className="i">Choice of Topping</p>
                <label className="i">Pepperoni
                  <input
                  type="Checkbox"
                  name="pepperoni"
                  onChange={onUpdate}/>
                </label>
                <label className="i">Sausage
                  <input
                  type="Checkbox"
                  name="sausage"
                  onChange={onUpdate}/>
                </label>
                <label className="i">Bacon
                  <input
                    type="Checkbox"
                    name="bacon"
                    onChange={onUpdate}/>
                </label>
                <label className="i">Green Pepper
                  <input
                  type="Checkbox"
                  name="greenPepper"
                  onChange={onUpdate}/>
                </label>
                <label className="i">Grilled Chicken
                  <input
                  type="Checkbox"
                  name="grilledChicken"
                  onChange={onUpdate}/>
                </label>
              </div>
            </div>
            <label className="special i" >
                Custom instructions:&nbsp;
                <textarea 
                id="special-text"
                value={fillForm.special}
                onChange={onUpdate}
                className='spec-input' 
                rows="5" 
                cols="60" 
                name="special" 
                placeholder="Enter Custom instructions or additional notes here.">
                </textarea>
            </label>
            <div className="error">{dataErr.name}</div>
            <input className='sub' name='sub' type='submit' value='submit' id='order-button' disabled={disable}/>
          </div>
        </div>
      </form>
    </Route>
  </Router>
  );
};
export default App;
