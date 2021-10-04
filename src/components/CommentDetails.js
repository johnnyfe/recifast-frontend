import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function CommentDetails({comment}) {

    
    return (
        <div>
            <p>{comment.description}</p>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={comment.rating} readOnly />
            </Box>
        </div>
    );
}

export default CommentDetails;