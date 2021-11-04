import React from 'react';
import './Category.css'


function Category(props){

    return (
        <div id="categories">
            <label id="difficulty-label">Select Category</label><br></br>
            <select name="dropdown" id="cat-dropdown" onChange={function(event){
                props.setCategory(event.target.value);
            }}>
                <option value="all">Select All</option>
                <option value="entertainment">Entertainment</option>
                <option value="science">Science</option>
                <option value="general knowledge">General Knowledge</option>
                <option value="history">History</option>
                <option value="geography">Geography</option>
            </select>
        </div>
    );
}

export default Category;