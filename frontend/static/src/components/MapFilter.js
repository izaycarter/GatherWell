import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "../Css/MapFilter.css"

class MapFilter extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }



    render(){
      return (
        <Row className="justify-content-around no-gutters nav-filters">
            <div className="d-flex">
            <Form.Group className="">
                <Form.Label className="filter-labels">Denomination Type</Form.Label>
                <Form.Control as="select" defaultValue="Any" name="denomination" onChange={this.props.handleChange}>
                    <option value="Any" >Any</option>
                    <option value="NON DENOMINATIONAL">Non Denominational</option>
                    <option value="CATHOLIC">Catholic</option>
                    <option value="ADVENTIST">Adventist</option>
                    <option value="ANABAPTIST">Anabaptist</option>
                    <option value="ANGLICAN">Anglican</option>
                    <option value="BAPTIST">Baptist</option>
                    <option value="CALVINIST">Calvinist</option>
                    <option value="EVANGELICAL">Evangelical</option>
                    <option value="HOLINESS">Holiness</option>
                    <option value="LUTHERAN">Lutheran</option>
                    <option value="METHODIST">Methodist</option>
                    <option value="PENTECOSTAL">Pentecostal</option>
                    <option value="PRESBYTERIAN">Presbyterian</option>
                    <option value="ASSYRIAN">Assyrian</option>
                    <option value="EASTERN ORTHODOX">Eastern Orthodox</option>
                    <option value="JEHOVAH'S WITNESS">Jehovah's Witness</option>
                    <option value="LATTER DAY SAINT">Latter Day Saint</option>
                </Form.Control>
            </Form.Group>
            </div>
            <div className="d-flex ">
            <Form.Group className="">
                <Form.Label className="filter-labels">Worship Type</Form.Label>
                <Form.Control as="select" defaultValue="Any" name="worship_type" onChange={this.props.handleChange}>
                    <option value="Any" >Any</option>
                    <option value="NON LITURGICAL">Liturgical</option>
                    <option value="TRADITIONAL">Traditional</option>
                    <option value="BLENDED">Blended</option>
                    <option value="CONTEMPORARY">Contemporary</option>
                    <option value="MODERN">Modern</option>
                </Form.Control>
            </Form.Group>
            </div>
        </Row>
      )
  }
}

export default MapFilter;
