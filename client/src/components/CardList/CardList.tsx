import * as React from 'react'
import DatapointCard from '../DatapointCard/DatapointCard'

export interface CardListProps /* extends NodeList */ {
  cardType: 'DatapointCard' | 'MemberCard'
  data: any[] // probably card
  editHandler: (key: number) => void
}

const CardList = ({ cardType: card, data, editHandler, ...porps }: CardListProps): JSX.Element => {
  return (
        <div>
            {data.map((item, index) => {
              return (
                    <div key={index}>
                      {card === 'DatapointCard' &&
                         <DatapointCard title={item.displayName || item.dataPointKey} value='12345' onEdit={() => { editHandler(index) }}></DatapointCard>
                      }
                      {card === 'MemberCard' &&
                      <></>
                      // MEMBER CARD GOES HERE
                      }
                    </div>
              )
            })}
        </div>
  )
}

export default CardList
