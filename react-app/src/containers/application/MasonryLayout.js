import React, { useEffect, useRef, useState } from "react";

var elementRefMeasures = {}

function MasonryLayout(props) {
  const masonryLayout = useRef();
  const elementRef = useRef(); // asign on a first element for representing general styles
  const endlineStartRef = useRef()
  const endlineEndRef = useRef()

  const checkLayout = (evt) => {
    updateCardRefMeasures()
    const wrapperWidth = masonryLayout.current.offsetWidth;
    setColumns(Math.floor(wrapperWidth / elementRefMeasures.totalWidth));
    // turn on transition if window resizing
    setTransition(evt !== undefined)
  };

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

  const handleScroll = () => {
    checkEndlineEnterEvent()
  }

  useEffect(() => { // add/remove event listeners
    // mount and unmount only
    checkLayout()
    window.addEventListener("resize", checkLayout);
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", checkLayout);
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);
  
  useEffect(() => { // component did mount or update
    if (masonryLayout.current.offsetHeight > 0) {
      checkEndlineEnterEvent()  
    }
  })

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
  useEffect(
    () => {
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

export default MasonryLayout;
