import * as React from "react";
import { Card } from 'react-bootstrap';
import { ICardProps } from "./ICard";

export default function Page(props: ICardProps) {
    const { card } = props;
    return (
        <Card>
            { (card.contentHeader) 
                ? <Card.Header>
                    { card.contentHeader }
                </Card.Header>
                : null
            }
            { (card.contentBody) 
                ? <Card.Body>
                    { card.contentBody }
                </Card.Body>
                : null
            }
        </Card>
    );
}