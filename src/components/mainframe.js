import styled from "styled-components";
import React from "react";
import { useState } from "react";
import Sand from "../assets/sand.jpg";
import Water from "../assets/water.png";
import Sheep from "../assets/amogus.png";
import Wolf from "../assets/auf.png";
import Letucce from "../assets/lettuce.png";
import Ship from "../assets/ship.png";
import Toolbar from "./toolbar";

//////////////////////////////////////////[Styles section]//////////////////////////////////////////

const MainWrapper = styled.div`
    display: flex;

    width: 100%;
    height: 95vh;
`;

const Field = styled.div`
    display: flex;

    width: ${(props) =>
        props.title === "Левый берег"
            ? `calc(100%/4)`
            : props.title === "Правый берег"
            ? `calc(100%/4)`
            : `calc(100%/2)`};
    height: 100%;

    background: ${(props) =>
            props.title === "Река"
                ? `no-repeat center/60% url(${Ship})`
                : `none`},
        ${(props) =>
            props.title === "Левый берег"
                ? `center/120px url(${Sand})`
                : props.title === "Правый берег"
                ? `center/120px url(${Sand})`
                : `center/120px url(${Water})`};

    padding: 20px;

    align-items: center;
    justify-content: center;

    flex-direction: ${(props) => (props.title === "Река" ? `row` : `column`)};
`;

const Item = styled.div`
    width: 150px;
    height: 150px;

    background: ${(props) =>
        props.title === "Волк"
            ? `no-repeat center/100px url(${Wolf})`
            : props.title === "Овца"
            ? `no-repeat center/100px url(${Sheep})`
            : `no-repeat center/100px url(${Letucce})`};
    background-size: 100%;

    margin: 20px;

    cursor: grab;
`;

const Mainframe = () => {
    //////////////////////////////////////////[States section]//////////////////////////////////////////

    const [fields, setFields] = useState([
        {
            id: 1,
            title: "Левый берег",
            items: [
                { id: 1, title: "Волк" },
                { id: 2, title: "Овца" },
                { id: 3, title: "Капуста" },
            ],
        },
        { id: 2, title: "Река", items: [] },
        { id: 3, title: "Правый берег", items: [] },
    ]);

    const [currentField, setCurrentField] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    //////////////////////////////////////////[Logic section]//////////////////////////////////////////

    const dragStartHandler = (e, field, item) => {
        setTimeout(() => {
            setCurrentField(field);
            setCurrentItem(item);
        }, 10);
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
    };

    const dragLeaveHandler = () => {};

    const dragEndHandler = () => {};

    const dropHandler = (e, field, item) => {
        e.preventDefault();
        const currentIndex = currentField.items.indexOf(currentItem);
        const dropIndex = field.items.indexOf(item);

        if (field === currentField) {
            const newFields = [...fields];
            [newFields[currentIndex], newFields[dropIndex]] = [
                newFields[dropIndex],
                newFields[currentIndex],
            ];
            setFields(newFields);
            console.log(fields);
        }

        /*
        if (currentIndex > dropIndex) {
            currentField.items.splice(currentIndex, 1);
            currentField.items.splice(dropIndex, 1);
            field.items.splice(dropIndex, 0, currentItem);
            field.items.splice(currentIndex, 0, item);

        } else {
            currentField.items.splice(dropIndex, 1);
            currentField.items.splice(currentIndex, 1);
            field.items.splice(currentIndex, 0, item);
            field.items.splice(dropIndex, 0, currentItem);
        }
        */

        setFields(
            fields.map((f) => {
                if (f.id === field.id) {
                    return field;
                }
                if (f.id === currentField.id) {
                    return currentField;
                }
                return f;
            })
        );
    };

    /*
      const dropItemHandler = (e, field) => {
  
          field.items.push(currentItem);
          const currentIndex = currentField.items.indexOf(currentItem);
          currentField.items.splice(currentIndex, 1);
          setFields(fields.map(f => {
              if (f.id === field.id) {
                  return field;
              }
              if (f.id === currentField.id) {
                  return currentField;
              }
              return f
          }))
  
      } */

    return (
        <>
            <Toolbar />

            <MainWrapper>
                {fields.map((field) => (
                    <Field
                        onDragOver={(e) => dragOverHandler(e)}
                        /* onDrop={(e) => dropItemHandler(e, field)}*/
                        title={field.title}
                        key={field.id}
                    >
                        {field.items.map((item) => (
                            <Item
                                draggable={true}
                                onDragStart={(e) =>
                                    dragStartHandler(e, field, item)
                                }
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, field, item)}
                                title={item.title}
                            ></Item>
                        ))}
                    </Field>
                ))}
            </MainWrapper>
        </>
    );
};

export default Mainframe;
