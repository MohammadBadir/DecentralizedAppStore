import React from 'react';
import Web3 from 'web3';

class UploadApp extends React.Component{
    render(){
      return (
        <div>
            <form onSubmit={this.props.addNewApp} style={{size:"50px"}}> 
              <label>
                <b>App name</b>      
                <input placeholder='enter app name' id='appNameInput' size={53}/>
              </label>

              <label>
              <b>Category</b>
              <select id="appCategory" name="appCategory">
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="News">News</option>
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Shopping">Shopping</option>
                <option value="Business">Business</option>
              </select>
              </label>

              <label>
                <b>App description </b>
                <textarea id='appDescriptionInput' rows="5" cols="50"/>
              </label>

              <label>
                 <b>Developer name</b>
                 <input placeholder='enter developer name' id='developerNameInput' size={53}/>
              </label>

              <label>
                <b>App bundle</b>
                <input type="file" id='developerNameInput'/>
              </label>

               <input type="submit" value="Upload" />
            </form>

        </div>
         );

    }
  }

  export default UploadApp;