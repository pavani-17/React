import {Card, CardImg,CardBody, CardText, CardTitle, CardImgOverlay} from 'reactstrap';
import React, { Component } from 'react';

class Dishdetail extends Component
{

    renderDish(dish)
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

    renderComments(dish)
    {
        if(dish!=null)
        { 
            const a = dish.comments.map(
                (comment) => 
                {
                    var p = Date(comment.date);
                    const k = p.split(" ");
                    console.log(k);
                    return (
                        <div>
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

    render() 
    {
        const a = this.renderDish(this.props.selectedDish);
        const b = this.renderComments(this.props.selectedDish)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {a}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {b}
                    </div>

                </div>
            </div>
        )
    }
}

export default Dishdetail;