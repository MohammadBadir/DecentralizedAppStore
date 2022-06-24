import React from 'react';
import Web3 from 'web3';

class UploadApp extends React.Component{

  constructor(props){
    super(props);
    this.state={
      appNameInput : "",
      categoryInput : "Education",
      appDescriptionInput : "",
      developerNameInput : "",
    };
  }

  addNewApp = async (event) =>{
   event.preventDefault();
    await this.props.addNewApp(this.state.appNameInput,this.state.categoryInput,this.state.appDescriptionInput,this.state.developerNameInput)
    this.setState({
      appNameInput : "",
      appDescriptionInput : "",
      developerNameInput : "",
    });
    alert('app has been uploaded successfully')
  }

   render(){
      return (
       <div>
          <form onSubmit={this.addNewApp} style={{size:"50px"}}> 
            <label>
              <b>App name</b>      
                <input onChange={this.inputChangeHandle} name='appNameInput' id='appNameInput' value={this.state.appNameInput} placeholder='enter app name' size={53}/>
              </label>
              <label>
              <b>Category</b>
              <select onChange={this.selectCategory} id="appCategory" value={this.state.categoryInput} name="appCategory">
                {
                this.props.categories.map((category, index) => (
                  <option key={category} value={category}>{category}</option>
                ))
                }
              </select>
              </label>

              <label>
                <b>App description</b>
                <textarea onChange={this.inputChangeHandle} name='appDescriptionInput'  id='appDescriptionInput' value={this.state.appDescriptionInput} rows="5" cols="50"/>
              </label>

              <label>
                 <b>Developer name</b>
                 <input onChange={this.inputChangeHandle} name='developerNameInput'  placeholder='enter developer name' id='developerNameInput' value={this.state.developerNameInput} size={53}/>
              </label>

              <label>
                <b>App logo</b>
                <input type="file" id='appLogoInput'/>
              </label>

               <input type="submit" value="Upload" />
            </form>

        </div>
         );
    }

    inputChangeHandle =(event) => {
      this.setState({
        [event.target.name] : event.target.value
      });
    }

    selectCategory = (event) => {
      this.setState({
        categoryInput : event.target.value
      })
    }
  }

  export default UploadApp;