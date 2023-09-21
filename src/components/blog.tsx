import '../css/blog.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ItWasADarkAndStormyNight from '../pngs/a742803651b99a3eec9633fbaa644711.jpg'
import {GiReturnArrow} from 'react-icons/gi'

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
    let earliest = new Array()
    //let latest = new Array()
    if (posts) {
        earliest = [...posts].sort((a, b) => {
          const dateA = new Date(a.attributes.date).getTime();
          const dateB = new Date(b.attributes.date).getTime();
          
          return dateA - dateB;
        });
      }
    // if (posts) {
    // latest = [...posts].sort((a, b) => {
    //     const dateA = new Date(a.attributes.date).getTime();
    //     const dateB = new Date(b.attributes.date).getTime();
        
    //     return dateB - dateA;
    //     });
    // }

    return (
        <>
            <div className="blogs">
                <div className="return">
                    <Link to={"/aboutcatlib"} className='symbol'>
                        <GiReturnArrow />
                    </Link>
                </div>
                <div className='comic'>
                    <img src={ItWasADarkAndStormyNight} alt="It was a dark and stormy night..."/>
                </div>
                {earliest.map((val:any,i:any) => {
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
        </>
    )
}