import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component
{
    constructor(props)
    {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen : false
        };
    }

    toggleModal()
    {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values)
    {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name,values.comment);
    }

    render()
    {
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-tag fa-lg"/>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name" placeholder="Your name" className="form-control" 
                                        validators= {{
                                            minLength : minLength(3), maxLength: maxLength(15)}}
                                    />
                                    <Errors className="text-danger" model=".name" show="touched"
                                        messages = {{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />                                
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
} 

function renderDish(dish)
{
    if(dish!=null)
    {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else
    {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments, addComment, dishId})
{
    if(comments!=null)
    { 
        const a = comments.map(
            (comment) => 
            {
                var p = Date(comment.date);
                const k = p.split(" ");
                return (
                    <div className="container">
                    <ul key={comment.id} className="list-unstyled">
                        <div className="row">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="row">
                            <p>--{comment.author}, {k[1]} {k[2]}, {k[3]} </p>
                        </div>
                    </ul>
                    </div>
                )
            }
        );
        return (
            <div>
                <h4>Comments</h4>
                {a}
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
    }
    else
    {
        return(
            <div></div>
        );
    }
}

const Dishdetail = (props) =>
{
    if(props.isLoading)
    {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess)
    {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else
    {
        const a = renderDish(props.dish);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {a}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                    </div>

                </div>
            </div>
        )
    }
}

export default Dishdetail;