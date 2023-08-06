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
    return (
        <>
          <div className='languages'>
            <h1>Unfinished</h1>
          </div>
            <PageFlip />
        </>
    )
}
