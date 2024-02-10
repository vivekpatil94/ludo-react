import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Stats_Card = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                    {props.title}
                </Typography>
                <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
                    {props.value}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Stats_Card;