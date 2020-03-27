import React, {useState} from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: {
    hex: ""
  }
};

const ColorList = ({colors, updateColors}) => {
  console.log("color data: ", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color think about where will you get
    // the id from... where is is saved right now?
    // console.log("color id: ", colorToEdit.id);
    axios
      .put(`http://localhost:5000/api/colors/${colorToEdit.color}`, colorToEdit, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log("res data: ", res.data)
      })
      .catch(err => console.log(err));
    
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axios
      .delete(`http://localhost:5000/api/colors/${color}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }}>
                x
              </span>{" "} {color.color}
            </span>
            <div
              className="color-box"
              style={{
              backgroundColor: color.code.hex
            }}/>
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e => setColorToEdit({
              ...colorToEdit,
              color: e.target.value
            })}
              value={colorToEdit.color}/>
          </label>
          <label>
            hex code:
            <input
              onChange={e => setColorToEdit({
              ...colorToEdit,
              code: {
                hex: e.target.value
              }
            })}
              value={colorToEdit.code.hex}/>
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer"/>
        <h3>Form: Add Color</h3>
        <form>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              type="text"
              name="color"
              value=""
              placeholder="color name"
            />
          </label>
          <label>
            hex code:
            <input
              type="text"
              name="hex"
              value=""
              placeholder="hex color"
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      </div>
  );
};

export default ColorList;
