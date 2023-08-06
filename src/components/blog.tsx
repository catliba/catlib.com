import PageFlip from './page-flip';
import '../css/blog.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ItWasADarkAndStormyNight from '../pngs/a742803651b99a3eec9633fbaa644711.jpg'

const GET_ALL_POSTS = gql`
query getPost {
    blogPosts {
      data {
        attributes {
          title
          urlSlug
          date
        }
      }
    }
  }
`;

export default function Blog() {
    const {loading, error, data} = useQuery(GET_ALL_POSTS);
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    const posts = data?.blogPosts.data;
    const ascendingPosts = posts.slice().reverse();
    return (
        <>
            <div className="blogs">
                <div className='comic'>
                    <img src={ItWasADarkAndStormyNight} alt="It was a dark and stormy night..."/>
                </div>
                {ascendingPosts.map((val:any,i:any) => {
                return (
                    <Link to={val.attributes.urlSlug} className="link">
                        <div key={i} className="card">
                            <div className="card-num">
                               No. {i + 1}
                            </div>
                            <div className="card-title">
                                {val.attributes.title}
                            </div>
                            <div className="card-date">{val.attributes.date}</div>
                        </div>
                    </Link>
                )})}
            </div>
            <PageFlip />
        </>
    )
}