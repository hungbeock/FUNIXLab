import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish(dishes) {
    // console.log("dishes", dishes)
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" object src={dishes.dishes.image} value={dishes.name} />
                <CardBody>
                    <CardTitle>{dishes.dishes.name}</CardTitle>
                    <CardText>{dishes.dishes.description}</CardText>
                </CardBody>
            </Card>

        </div>
    )
}

function RenderComments(commentFoods) {
    // console.log("commentFoods", commentFoods)
    if (commentFoods != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments</h4>
                <ul className="list-unstyled">
                    {commentFoods.commentFoods.map((comment) => {
                        return (
                            <li key={comment.id} >
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',
                                    {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {

    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dishes={props.dish} />

                    <RenderComments commentFoods={props.dish.comments} />


                </div>
            </div>
        );

    } else {
        return <div></div>;
    }
}

export default DishDetail;