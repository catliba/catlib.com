import React from 'react';
import PageFlip from './page-flip';
import '../css/class-notes.css';
import { useQuery, gql } from '@apollo/client/';

const INTRO = gql`
query getImages {
    homepage {
      data {
        attributes {
          docker
          nodejs
          java
          htmlcssjs
          react
          python
          language {
            data {
              attributes {
                url
              }
            }
          }
          contact {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`
export default function ClassNotes() {
    const {loading, error, data} = useQuery(INTRO);
    const languageImages = data?.homepage.data.attributes.language.data.map((item:any) => item.attributes.url);
    return (
        <>
        <div className='languages'>
                <h1>I'm familiar with...</h1>
                <div className='grid-container'>
                    <img src={"http://localhost:1337" + languageImages[4]} alt="frontend" className='frontend'/>
                    <p>
                        {data?.homepage.data.attributes.htmlcssjs}
                    </p>
                </div>
                <div className='grid-container'>
                    <img src={"http://localhost:1337" + languageImages[0]} alt="Java"/>
                    <p>
                        {data?.homepage.data.attributes.java}
                    </p>
                </div>
                <div className='grid-container'>
                    <img src={"http://localhost:1337" + languageImages[3]} alt="React"/>
                    <p>
                        {data?.homepage.data.attributes.react}
                    </p>
                </div>
                <div className='grid-container'>
                    <img src={"http://localhost:1337" + languageImages[5]} alt="Python"/>
                    <p>
                        {data?.homepage.data.attributes.python}
                    </p>
                </div>
                <div className='grid-container'>
                    <img src={"http://localhost:1337" + languageImages[1]} alt="Node.js"/>
                    <p>
                        {data?.homepage.data.attributes.nodejs}
                    </p>
                </div>
                <div className='grid-container'>
                    <img src={"http://localhost:1337" + languageImages[2]} alt="Docker"/>
                    <p>
                        {data?.homepage.data.attributes.docker}
                    </p>
                </div>
            </div>
            <PageFlip />
        </>
    )
}
