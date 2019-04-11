import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

var elementRefMeasures = {}

function MasonryLayout(props) {
  const [columns, setColumns] = useState(0);
  const [transition, setTransition] = useState(false)
  const [layout, setLayout] = useState({
    elements: [],
    width: 0,
    height: 0,
    endline: {
      start: {x: undefined, y: undefined},
      end: {x: undefined, y: undefined},
      byColumns: [],
      enterEvent: {
        elementsNum: 0,
        eventHandler: props.onEndlineEnter && props.onEndlineEnter,
      }
    }
  })
  const [onErrorCount, setOnErrorCount] = useState(0)
  const [onLoadCount, setOnLoadCount] = useState(0)

  const masonryLayout = useRef(); // top wrapper
  const elementRef = useRef(); // asign on a first element for representing general styles
  const endlineStartRef = useRef() // endline start sensor
  const endlineEndRef = useRef() // endline end sensor

  useEffect(() => { // Mount and unmount only
    // add/remove event listeners
    checkLayout()
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  const handleResize = (evt) => {
    checkLayout(evt)
  }

  const checkLayout = (evt) => {
    updateCardRefMeasures()
    const wrapperWidth = masonryLayout.current.offsetWidth;
    setColumns(Math.floor(wrapperWidth / elementRefMeasures.totalWidth));
    // turn on transition if window resizing
    setTransition(evt !== undefined)
  };

  const handleScroll = () => {
    checkEndlineEnterEvent()
  }

  const checkEndlineEnterEvent = () => {
    setLayout(layout => {
        if (
          endlineStartRef.current &&
          endlineStartRef.current.getBoundingClientRect().top
          - window.innerHeight <= 0 &&
          layout.endline.enterEvent.elementsNum !== layout.elements.length
        ) { // enter endline event
          layout.endline.enterEvent.elementsNum = layout.elements.length
          // execute enter endline event handler
          layout.endline.enterEvent.eventHandler && layout.endline.enterEvent.eventHandler()
        }
      return layout
    })    
  }

  useEffect(() => { // component did mount or update
    if (masonryLayout.current.offsetHeight > 0) {
    // if layout rendered
      checkEndlineEnterEvent()  
    }
  })

  useEffect(() => { // set of children changed
    setTransition(false)
  }, [props.children])

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

  useEffect(() => { // set layout
    var elements = [];
    var endline = layout.endline
    endline.byColumns = []
    for (let i = 0; i < columns; i++) {
      endline.byColumns[i] = 0;
    }
    updateCardRefMeasures()
    React.Children.map(props.children, (child, index) => {
      // Calculate positions of each element
      let height =
        document.getElementById(child.key).offsetHeight +
        elementRefMeasures.marginTop +
        elementRefMeasures.marginBottom
      let leastNum = Math.min(...endline.byColumns);
      let leastNumIndex = endline.byColumns.indexOf(leastNum);
      var posX = leastNumIndex * elementRefMeasures.totalWidth;
      var posY = endline.byColumns[leastNumIndex];
      elements[index] = { x: posX, y: posY,};
      endline.byColumns[leastNumIndex] += height;
    });
    endline.start.x = elementRefMeasures.totalWidth * endline.byColumns.indexOf(Math.min(...endline.byColumns))
    endline.start.y = Math.min(...endline.byColumns)
    endline.end.x = elementRefMeasures.totalWidth * endline.byColumns.indexOf(Math.max(...endline.byColumns))
    endline.end.y = Math.max(...endline.byColumns)
    setLayout({
      elements: elements, // list of all elements with coorditares
      width: elementRefMeasures.totalWidth * columns, // width of the whole layout
      height: endline.end.y, // height of the whole layout
      endline: endline,
    })
  }, [columns, onLoadCount, onErrorCount, props.children]);

  const errorHandler = index => {
    setOnErrorCount(onErrorCount + 1);
    console.log("can't load: ", index);
  };

  const loadHandler = index => {
    setOnLoadCount(onLoadCount + 1);
  };

  const renderChildren =
    React.Children.map(props.children, (child, index) => {
      // Change eash child
      let newComponent = (
        <div
          className="element-bounding"
          id={child.key}
          style={{
            position: "absolute",
            top: `${layout.elements[index] ? layout.elements[index].y : 0}px`,
            left: `${layout.elements[index] ? layout.elements[index].x : 0}px`,
            transition: `${transition ? 'top 0.4s, left 0.4s' : 'none'}`,
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
    <div 
      className="masonry" 
      ref={masonryLayout}
    >
      <div
        style={{
          position: 'relative',
          width: `${layout.width}px`,
          height: `${layout.height}px`,
          margin: '0 auto 0 auto',
        }}
        className="boundry-box"
      >
        {renderChildren}
        {layout.endline.start.y != undefined && 
          <React.Fragment>
            <div 
              id="MasonryLayoutEndlineStart"
              ref={endlineStartRef} 
              style={{
                position: "absolute",
                top: `${layout.endline.start.y}px`,
                left: `${layout.endline.start.x}px`,
              }}
            />
            <div 
              id="MasonryLayoutEndlineEnd"
              ref={endlineEndRef}
              style={{
                position: "absolute",
                top: `${layout.endline.end.y}px`,
                left: `${layout.endline.end.x}px`,
              }}
            />
          </React.Fragment>
        }
      </div>
    </div>
  );
}

MasonryLayout.propTypes = {
  onEndlineEnter: PropTypes.func
};

export default MasonryLayout;