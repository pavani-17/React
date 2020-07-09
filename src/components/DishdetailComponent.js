import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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

function renderComments(comments)
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
    const a = renderDish(props.dish);
    const b = renderComments(props.comments)
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
                    {b}
                </div>

            </div>
        </div>
    )
}

export default Dishdetail;