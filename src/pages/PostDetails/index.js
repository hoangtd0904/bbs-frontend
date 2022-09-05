import Details from '../../components/Details';
import { useParams } from 'react-router-dom';

function PostDetails() {
    let id = useParams();

    return (
        <>
            <Details id={id.postId} />
        </>
    );
}

export default PostDetails;
