import React, { useEffect, useRef, useState } from "react";

var elementRefMeasures = {}

function MasonryLayout(props) {
  const masonryLayout = useRef();
  const elementRef = useRef(); // asign on a first element for representing general styles
  // declare vars for general styles of all elements
  const checkLayout = (evt) => {
    updateCardRefMeasures()
    const wrapperWidth = masonryLayout.current.offsetWidth;
    setColumns(Math.floor(wrapperWidth / elementRefMeasures.totalWidth));
    setTransition(evt !== undefined)
  };
  useEffect(() => {
    // mount and unmount only
    checkLayout()
    window.addEventListener("resize", checkLayout);
    return () => {
      window.removeEventListener("resize", checkLayout);
    };
  }, []);

  const [onErrorCount, setOnErrorCount] = useState(0);
  const errorHandler = index => {
    setOnErrorCount(onErrorCount + 1);
    console.log("can't load: ", index);
  };

  const [onLoadCount, setOnLoadCount] = useState(0);
  const loadHandler = index => {
    setOnLoadCount(onLoadCount + 1);
  };

  const updateCardRefMeasures = () => {
    const style = window.getComputedStyle(elementRef.current)
    elementRefMeasures = {
      width: elementRef.current.offsetWidth,
      marginTop: Number(style.marginTop.replace(/[^0-9]/g, "")),
      marginRight: Number(style.marginRight.replace(/[^0-9]/g, "")),
      marginBottom: Number(style.marginBottom.replace(/[^0-9]/g, "")),
      marginLeft: Number(style.marginLeft.replace(/[^0-9]/g, "")),
      totalWidth: (
        elementRef.current.offsetWidth 
        + Number(style.marginRight.replace(/[^0-9]/g, "")) 
        + Number(style.marginLeft.replace(/[^0-9]/g, ""))
      )
    }
  }

  // everytime window resize
  const [columns, setColumns] = useState(0);

  const [transition, setTransition] = useState(false)
  useEffect(() => {
    setTransition(false)
  }, [props.children])
  

  const [layout, setLayout] = useState({
    elements: [],
    width: 0,
    height: 0
  })
  useEffect(
    () => {
      var protoElements = [];
      var endline = [];
      for (let i = 0; i < columns; i++) {
        endline[i] = 0;
      }
      updateCardRefMeasures()
      React.Children.map(props.children, (child, index) => {
        // Calculate positions of each element
        let height =
          document.getElementById(child.key).offsetHeight +
          elementRefMeasures.marginTop +
          elementRefMeasures.marginBottom
        let leastNum = Math.min(...endline);
        let leastNumIndex = endline.indexOf(leastNum);
        var posX = leastNumIndex * elementRefMeasures.totalWidth;
        var posY = endline[leastNumIndex];
        protoElements[index] = { x: posX, y: posY,};
        endline[leastNumIndex] += height;
      });
      setLayout({
        elements: protoElements, // list of all elements with coorditares
        width: elementRefMeasures.totalWidth * columns, // width of the whole layout
        height: endline[endline.indexOf(Math.max(...endline))] // height of the whole layout 
      })
    }, [columns, onLoadCount, props.children]
  );

  const renderChildren =
    React.Children.map(props.children, (child, index) => {
      // Change eash child
      let newComponent = (
        <div
          className="element-bounding"
          id={child.key}
          style={{
            position: "absolute",
            transform: `translate(${layout.elements[index] ? layout.elements[index].x : 0}px, ${
              layout.elements[index] ? layout.elements[index].y : 0
            }px)`,
            transition: `${transition ? 'transform 0.4s' : 'none'}`,
            visibility: layout.elements[index] ? 'visible' : 'hidden',
          }}
          onLoad={loadHandler}
          onError={errorHandler}
          ref={index === 0 ? elementRef : null}
        >
          {child}
        </div>
      )
      return newComponent;
    });
  return (
    <div className="masonry" ref={masonryLayout}>
      <div
        style={{
          width: `${layout.width}px`,
          height: `${layout.height}px`,
          margin: 'auto',
        }}
        className="boundry-box"
      >
        {renderChildren}
      </div>
    </div>
  );
}

export default MasonryLayout;
