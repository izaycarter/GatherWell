import React from 'react';
import {Button,  Modal } from "react-bootstrap";
import "../CSS/ChurchDetail.css"

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <img className="church-picture" src={props.selectedChurch.image} atl={props.selectedChurch.name} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{props.selectedChurch.name}</h3>
        <div>Denomination: {props.selectedChurch.denomination}</div>
        <div>Worship Style: {props.selectedChurch.worship_type}</div>
        <p>
         {props.selectedChurch.description}
        </p>

        <a href={props.selectedChurch.website} target="_blank">{props.selectedChurch.website}</a>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
