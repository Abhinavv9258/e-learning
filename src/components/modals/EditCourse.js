import React,{useState,useEffect} from 'react';
import { Button, Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const EditCourse = ({modal, toggle, updateBoard, boardObj}) => {
    const [cardList, setCardList] = useState('');
    const [cardHolderColour, cardColour] = useState('');

    useEffect(() => {
        setCardList(boardObj.Title);
        cardColour(boardObj.Colour);
    },[])
    
    const handleChange = (e) => {
        const {name,value} = e.target
        if(name === "cardList"){
            setCardList(value);
        }else{
            cardColour(value);
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Title'] = cardList;
        tempObj['Colour'] = cardHolderColour;
        updateBoard(tempObj);
    }

    const blueColor = () => {
        cardColour("#A7F0F9");

    }
    const violetColor = () => {
        cardColour("#C5C5FC");
    }
    const pinkColor = () => {
        cardColour("#FFAEC0");
    }
    const yellowColor = () => {
        cardColour("#FFCC66");
    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} aria-labelledby="contained-modal-title-vcenter" centered >
                <form className="form-control">
                    <div className="header">
                        <h4 classsName="headTitle">Add a name for your board</h4>
                        <button type="button" className="btn-close" aria-label="Close" onClick={toggle}></button>
                    </div>
                    <div className="title">
                        <input className="form-control" type="text" name="cardList" onChange={handleChange} placeholder="Board Name" value={cardList}/>
                    </div>
                    <div className="templete-color">
                        <h4 classsName="headTitle">Select post colour</h4>
                    </div>
                    <h5 className="colorSet">Here are some templates to help you get started</h5>
                    <div className="colorPick">
                        <div onClick={blueColor} className="blueColor"></div>
                        <div onClick={violetColor} className="violetColor"></div>
                        <div onClick={pinkColor} className="pinkColor"></div>
                        <div onClick={yellowColor} className="yellowColor"></div>
                    </div>
                    <div className="create-board">
                        <Button color="primary" onClick={handleUpdate}>Update Board</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default EditCourse;