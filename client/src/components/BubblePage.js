import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts

  const getColors = () => {
    axios
      .get(`http://localhost:5000/api/colors`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then( res => {
        // console.log(res.data);
        setColorList(res.data);
      })
      .catch( err => console.log(err))
  }

  useEffect(() => {
    getColors();
  }, []);

  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
