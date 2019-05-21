import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function Ghost(props) {
  return (
    <div
      style={{
        position: "fixed",
        visibility: "visible",
        transform: `translate(${props.x}px, ${props.y}px)`,
        pointerEvents: "none"
      }}
    >
      {props.children}
    </div>
  );
}

//////////////////////////////
/* Masonry layout component */
//////////////////////////////
var longPress;

function DraggableMasonryLayout(props) {
  const generateItems = () =>
    React.Children.map(props.children, (child, index) => {
      console.log("init item");
      if (child.props.separator) {
        return {
          index: index,
          id: child.key,
          order: child.props.order,
          separator: child.props.separator,
          element: child
        };
      }
      return {
        index: index,
        id: child.key,
        order: child.props.order,
        separator: child.props.separator,
        element: React.cloneElement(child, {
          draggableItem: {
            onMouseDown: e => onMouseDown(e, index),
            onMouseEnter: e => onMouseEnterItem(e, index),
            onDragEnd: e => onDragEnd(e, index),
            onTouchStart: e => onTouchStart(e, index),
            onTouchMove: e => onTouchMove(e, index),
            onTouchEnd: onTouchEnd,
            onClick: onClickEvent
          }
        })
      };
    });
  // General
  const [items, setItems] = useState(() => generateItems());
  useEffect(() => {
    setItems(() => generateItems());
  }, [props.children]);
  const [overItemIndex, setOverItemIndex] = useState(undefined);
  const [dragItemPrevOrder, setDragItemPrevOrder] = useState(undefined);
  const [dragItemNewOrder, setDragItemNewOrder] = useState(undefined);
  const [isRearranges, setIsRearranges] = useState(false);
  // Touch events
  const [touch, setTouch] = useState(false);
  const [touchPos, setTouchPos] = useState();
  const [touchFingers, setTouchFingers] = useState();
  const [firstTouchPos, setFirstTouchPos] = useState();
  const [UILog, setUILog] = useState("");
  // Mouse
  const [mousePos, setMousePos] = useState();
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownPos, setMouseDownPos] = useState();
  // Drag events
  const [drag, setDrag] = useState(false);
  const [dragItemIndex, setDragItemIndex] = useState();
  const [preventClick, setPreventClick] = useState();
  const [dragPoint, setDragPoint] = useState();
  const [rearrangePoint, setRearrangePoint] = useState();
  // Ghost
  const [ghost, setGhost] = useState();
  const [ghostPos, setGhostPos] = useState();

  /////////////////////
  /* Events' methods */
  /////////////////////

  const getItemById = id => {
    // Return object with required id from items array
    let indexOfItem;
    for (var i = 0, len = props.children.length; i < len; i++) {
      if (items[i].id === id) {
        indexOfItem = i;
        break;
      }
    }
    // not support IE8
    // let indexOfItem = items.findIndex(item => item.id === id);
    return items[indexOfItem];
  };

  useEffect(() => {
    var newItems;
    var newOrder = [];
    setItems(items => {
      if (
        dragItemIndex !== undefined &&
        overItemIndex !== undefined &&
        overItemIndex !== dragItemIndex &&
        !isRearranges
      ) {
        console.log("rearrange");
        console.log("drag item order", items[dragItemIndex].order);
        console.log("drag item new order", items[overItemIndex].order);
        setDragItemNewOrder(items[overItemIndex].order);
        items.forEach((item, index) => {
          newOrder[index] = item.order; // Item is out of range. Keep same order
          // Override for items need to be changed
          if (items[dragItemIndex].order < items[overItemIndex].order) {
            // Drag toward the end
            if (
              item.order > items[dragItemIndex].order &&
              item.order <= items[overItemIndex].order
            )
              // Inbetween notes. Replace on one to the start
              newOrder[index] = item.order - 1;
            if (item.order === items[dragItemIndex].order)
              // Assign new order to the draggable
              newOrder[index] = items[overItemIndex].order;
          }
          if (items[dragItemIndex].order > items[overItemIndex].order) {
            // Drag toward the start
            if (
              item.order < items[dragItemIndex].order &&
              item.order >= items[overItemIndex].order
            )
              // Inbetween notes. Replace on one to the end
              newOrder[index] = item.order + 1;
            if (item.order === items[dragItemIndex].order)
              // Assign new order to the draggable
              newOrder[index] = items[overItemIndex].order;
          }
        });
        newItems = items.map((item, index) => {
          item.order = newOrder[index];
          return item;
        });
        setIsRearranges(true);
        setTimeout(() => {
          console.log("rearrange is done");
          setIsRearranges(false);
        }, 500);
        return newItems;
      }
      return items;
    });
  }, [overItemIndex, dragItemIndex, items, isRearranges]);

  const cleanupDrag = () => {
    // Mouse
    setMouseDown(false);
    setMousePos(undefined);
    // Touch
    setTouch(false);
    setTouchPos(undefined);
    setFirstTouchPos(undefined);
    // Drag
    setDrag(false);
    setDragPoint(undefined);
    setDragItemIndex(undefined);
    setOverItemIndex(undefined);
    // setCursorPos(undefined);
    setGhost(undefined);
    setGhostPos(undefined);
    // Log
    setUILog("cleanup");
  };

  //////////////////////////
  /* Touch screens events */
  //////////////////////////

  const onTouchStart = (e, itemIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    setTouch(true);
    setTouchFingers(e.touches.length);
    setFirstTouchPos({
      x: touchX,
      y: touchY
    });
    setTouchPos({
      x: touchX,
      y: touchY
    });
    setDragItemIndex(itemIndex);
  };

  const onTouchMove = (e, itemIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    setDrag(drag => {
      !drag && clearTimeout(longPress);
      if (drag) {
        let overElementId = document.elementFromPoint(touchX, touchY).id;
        let overElementItem = getItemById(overElementId);
        setOverItemIndex(overElementItem && overElementItem.index);
      }
      return drag;
    });
    setTouchPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    // setOverItemIndex(itemIndex);
  };

  const onTouchEnd = e => {
    setUILog("touch end");
    setDragItemIndex(dragItemIndex => {
      dragItemIndex !== undefined && clearTimeout(longPress); // Cancel drag event for touch scn
      return dragItemIndex;
    });
    cleanupDrag();
    setTouch(false);
  };

  //////////////////
  /* Mouse events */
  //////////////////

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (
      dragItemPrevOrder &&
      dragItemNewOrder &&
      dragItemNewOrder !== dragItemPrevOrder &&
      !drag
    ) {
      console.log(items[dragItemIndex]);
      props.onRearrange(items[dragItemIndex], dragItemNewOrder);
      setDragItemPrevOrder(undefined);
      setDragItemNewOrder(undefined);
    }
  }, [dragItemNewOrder, dragItemIndex, items, dragItemPrevOrder, props, drag]);

  const onMouseUp = e => {
    console.log("mouse up");
    cleanupDrag();
  };

  const onMouseDown = (e, itemIndex) => {
    let freshTouch;
    setTouch(touch => {
      freshTouch = touch;
      return touch;
    });
    freshTouch && e.preventDefault();
    setMousePos({ x: e.clientX, y: e.clientY });
    setMouseDown(true);
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    console.log(e.clientY);
    setPreventClick(false);
    setDragItemIndex(itemIndex);
  };

  const onMouseEnterItem = (e, itemIndex) => {
    setOverItemIndex(itemIndex);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragItemIndex(dragItemIndex => {
      setMousePos(mousePos =>
        dragItemIndex !== undefined ? { x: e.clientX, y: e.clientY } : mousePos
      );
      return dragItemIndex;
    });
  };

  const onDragEnd = () => {
    // Cleanup after dragging
    cleanupDrag();
  };

  const onClickCapture = e => {
    // Prevent onClick event when dragging
    preventClick && e.stopPropagation();
  };

  useEffect(() => {
    // Set drag
    if (mouseDown && !drag) {
      // For mouse interface
      if (
        Math.abs(mousePos.x - mouseDownPos.x) >= 3 ||
        Math.abs(mousePos.y - mouseDownPos.y) >= 3
      ) {
        console.log("set drag");
        setDrag(true);
        setPreventClick(true);
        setDragItemPrevOrder(items[dragItemIndex].order);
      }
    }
    if (touch && !drag) {
      // For touch interface
      longPress = // Long press event
        touchFingers === 1 &&
        setTimeout(() => {
          setDrag(true);
        }, 500);
    }
  }, [touch, touchFingers, mouseDown, drag, mouseDownPos, mousePos]);

  useEffect(() => {
    // Start dragging
    if (drag && !ghost) {
      let dragElementWrapper = document.getElementById(
        `${items[dragItemIndex].id}-wrapper`
      );
      setDragPoint({
        x:
          (touch ? firstTouchPos.x : mouseDownPos.x) -
          dragElementWrapper.offsetLeft,
        y:
          (touch ? firstTouchPos.y : mouseDownPos.y) -
          dragElementWrapper.offsetTop
      });
    }
  }, [drag, dragItemIndex, firstTouchPos, mouseDownPos, touch, items, ghost]);

  useEffect(() => {
    // Set ghost position to mouse move position
    if (drag && dragPoint && (touchPos || mousePos)) {
      !ghost && setGhost(React.cloneElement(items[dragItemIndex].element));
      setGhostPos({
        x: (touch ? touchPos.x : mousePos.x) - dragPoint.x - window.scrollX,
        y: (touch ? touchPos.y : mousePos.y) - dragPoint.y - window.scrollY
      });
    }
  }, [mousePos, touchPos, touch, drag, dragPoint, dragItemIndex, ghost, items]);

  ////////////////////
  /* Masonry Layout */
  ////////////////////
  const [layoutIsMount, setLayoutIsMount] = useState(false);
  const [columns, setColumns] = useState(0);
  const [transition, setTransition] = useState(false);
  const [layout, setLayout] = useState({
    elements: [],
    width: 0,
    height: 0,
    endline: {
      start: { x: undefined, y: undefined },
      end: { x: undefined, y: undefined },
      byColumns: [],
      enterEvent: {
        elementsNum: 0,
        eventHandler: props.onEndlineEnter && props.onEndlineEnter
      }
    }
  });
  const [onErrorCount, setOnErrorCount] = useState(0);
  const [onLoadCount, setOnLoadCount] = useState(0);

  const masonryLayout = useRef(); // Top wrapper
  const endlineStartRef = useRef(); // Endline start sensor
  const endlineEndRef = useRef(); // Endline end sensor

  useEffect(() => {
    // Mount and unmount only
    // Add/remove event listeners
    checkLayout();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleResize = evt => {
    checkLayout(evt);
  };

  const checkLayout = evt => {
    const wrapperWidth = masonryLayout.current.offsetWidth;
    var cardRefItem;
    for (let i = 0; i < items.length; i++) {
      if (!items[i].separator) {
        cardRefItem = items[i];
        break;
      }
    }
    let cardWrapperWidth = document.getElementById(`${cardRefItem.id}-wrapper`)
      .offsetWidth;
    setColumns(Math.floor(wrapperWidth / cardWrapperWidth));
    // turn on transition if window resizing
    setTransition(evt !== undefined);
  };

  const handleScroll = e => {
    checkEndlineEnterEvent();
  };

  const checkEndlineEnterEvent = () => {
    setLayout(layout => {
      if (
        endlineStartRef.current &&
        endlineStartRef.current.getBoundingClientRect().top -
          window.innerHeight <=
          0 &&
        layout.endline.enterEvent.elementsNum !== layout.elements.length
      ) {
        // enter endline event
        layout.endline.enterEvent.elementsNum = layout.elements.length;
        // execute enter endline event handler
        layout.endline.enterEvent.eventHandler &&
          layout.endline.enterEvent.eventHandler();
      }
      return layout;
    });
  };

  useEffect(() => {
    // component did mount or update
    if (masonryLayout.current.offsetHeight > 0) {
      // if layout rendered
      setLayoutIsMount(true);
      checkEndlineEnterEvent();
      // setTransition(true);
    }
    layoutIsMount && setTransition(true);
  });

  useEffect(() => {
    // if number of items
    setTransition(() => {
      if (items.length > layout.elements.length) {
        // disable transition for infinite scroll
        return false;
      } else if (items.length === layout.elements.length) {
        // enable for creation or change
        return true;
      } else if (items.length < layout.elements.length) {
        // enable for deletion
        return true;
      }
    });
  }, [items]);

  useEffect(() => {
    // set layout
    var elements = [];
    var endline = layout.endline;
    var cardWrapperWidth;
    endline.byColumns = [];
    for (let i = 0; i < columns; i++) {
      endline.byColumns[i] = 0;
    }
    let itemsSortedByOrder = items.concat().sort((a, b) => a.order - b.order);
    itemsSortedByOrder.forEach((item, index) => {
      // Calculate positions of each element
      let cardWrapperElement = document.getElementById(`${item.id}-wrapper`);
      let height = cardWrapperElement.offsetHeight;
      cardWrapperWidth = cardWrapperElement.offsetWidth;
      let cardElement = document.getElementById(item.id);
      let cardWidth = cardElement.offsetWidth;
      let cardHeight = cardElement.offsetHeight;
      let cardOffsetLeft = cardElement.offsetLeft;
      let cardOffsetTop = cardElement.offsetTop;
      let leastNum = Math.min(...endline.byColumns);
      let leastNumIndex = endline.byColumns.indexOf(leastNum);
      let maxNum = Math.max(...endline.byColumns);
      let maxNumIndex = endline.byColumns.indexOf(maxNum);
      let x, y;
      if (item.separator) {
        x = 0;
        y = endline.byColumns[maxNumIndex];
        let newLine = endline.byColumns[maxNumIndex] + height;
        endline.byColumns.fill(newLine);
      } else {
        x = leastNumIndex * cardWrapperWidth;
        y = endline.byColumns[leastNumIndex];
        endline.byColumns[leastNumIndex] += height;
      }
      elements[item.index] = {
        x,
        y,
        cardWidth,
        cardHeight,
        cardOffsetLeft,
        cardOffsetTop
      };
    });
    endline.start.x =
      cardWrapperWidth *
      endline.byColumns.indexOf(Math.min(...endline.byColumns));
    endline.start.y = Math.min(...endline.byColumns);
    endline.end.x =
      cardWrapperWidth *
      endline.byColumns.indexOf(Math.max(...endline.byColumns));
    endline.end.y = Math.max(...endline.byColumns);
    setLayout({
      elements: elements, // list of all elements with coorditares
      width: cardWrapperWidth * columns, // width of the whole layout
      height: endline.end.y, // height of the whole layout
      endline: endline
    });
  }, [columns, onLoadCount, onErrorCount, items]);

  const errorHandler = index => {
    setOnErrorCount(onErrorCount + 1);
    console.log("can't load: ", index);
  };

  const loadHandler = index => {
    setOnLoadCount(onLoadCount + 1);
  };

  const onClickEvent = e => {
    console.log("click");
  };

  var renderItems = items.map((item, index) => {
    // Render eash child
    let newComponent = (
      <div
        className="element-bounding"
        id={`${item.id}-wrapper`}
        key={`${item.id}-wrapper`}
        style={{
          position: "absolute",
          margin: 0,
          padding: 0,
          touchAction: "none",
          userSelect: "none",
          top: `${layout.elements[index] ? layout.elements[index].y : 0}px`,
          left: `${layout.elements[index] ? layout.elements[index].x : 0}px`,
          transition: `${
            transition && layoutIsMount ? "top 0.4s, left 0.4s" : "none"
          }`,
          visibility:
            layout.elements[index] && layoutIsMount ? "visible" : "hidden",
          opacity: ghostPos && dragItemIndex === items[index].index ? 0 : 1
        }}
        onLoad={loadHandler}
        onError={errorHandler}
        onClickCapture={onClickCapture}
      >
        {items[index].element}
      </div>
    );
    return newComponent;
  });

  return (
    <div className="masonry" ref={masonryLayout}>
      <div
        style={{
          position: "relative",
          width: `${layout.width}px`,
          height: `${layout.height}px`,
          margin: "0 auto 0 auto"
        }}
        className="boundry-box"
      >
        {renderItems}
        {drag && ghostPos && (
          <Ghost x={ghostPos.x} y={ghostPos.y}>
            {ghost}
          </Ghost>
        )}
        {layout.endline.start.y !== undefined && (
          <React.Fragment>
            <div
              id="MasonryLayoutEndlineStart"
              ref={endlineStartRef}
              style={{
                position: "absolute",
                top: `${layout.endline.start.y}px`,
                left: `${layout.endline.start.x}px`
              }}
            />
            <div
              id="MasonryLayoutEndlineEnd"
              ref={endlineEndRef}
              style={{
                position: "absolute",
                top: `${layout.endline.end.y}px`,
                left: `${layout.endline.end.x}px`
              }}
            />
          </React.Fragment>
        )}
      </div>
      <h5 style={{ position: "fixed", bottom: "150px" }}>
        ghost pos:{" "}
        {ghostPos &&
          `x: ${Math.floor(ghostPos.x)}, y: ${Math.floor(ghostPos.y)}`}
      </h5>
      <h5 style={{ position: "fixed", bottom: "130px" }}>
        scroll Y: {window.scrollY}
      </h5>
      <h5 style={{ position: "fixed", bottom: "110px" }}>
        touch pos:{" "}
        {touchPos &&
          `x: ${Math.floor(touchPos.x)}, y: ${Math.floor(touchPos.y)}`}
      </h5>
      <h5 style={{ position: "fixed", bottom: "90px" }}>
        drag point:{" "}
        {dragPoint &&
          `x: ${Math.floor(dragPoint.x)} y: ${Math.floor(dragPoint.y)}`}
      </h5>
      <h5 style={{ position: "fixed", bottom: "70px" }}>
        drag item: {dragItemIndex && items[dragItemIndex].order}
      </h5>
      <h5 style={{ position: "fixed", bottom: "50px" }}>
        over item: {overItemIndex && items[overItemIndex].id}
      </h5>
      <h5 style={{ position: "fixed", bottom: "30px" }}>
        is touch: {touch.toString()}
      </h5>
      <h5 style={{ position: "fixed", bottom: "10px" }}>ui log: {UILog}</h5>
    </div>
  );
}

DraggableMasonryLayout.propTypes = {
  reverse: PropTypes.bool,
  onEndlineEnter: PropTypes.func
};

export default DraggableMasonryLayout;
