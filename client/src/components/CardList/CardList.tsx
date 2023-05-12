import * as React from 'react'
import DatapointCard from '../DatapointCard/DatapointCard'
import UserCard from '../UserCard/UserCard'

export interface CardListProps /* extends NodeList */ {
  cardType: 'DatapointCard' | 'MemberCard'
  data: any[] // probably card
  editHandler: (key: string) => void
}

const CardList = ({ cardType: card, data, editHandler, ...porps }: CardListProps): JSX.Element => {
  return (
        <div>
            {data.map((item, index) => {
              return (
                    <div key={index}>
                      {card === 'DatapointCard' &&
                         <DatapointCard title={item.title} value='12345' onEdit={() => { editHandler(item.key) }}></DatapointCard>
                      }
                      {card === 'MemberCard' &&
                          <UserCard name={item.name} email={item.email} role={item.role} status={item.status}></UserCard>
                      }
                    </div>
              )
            })}
        </div>
  )
}

export default CardList
