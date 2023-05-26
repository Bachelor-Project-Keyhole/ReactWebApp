import * as React from 'react'
import DatapointCard from '../DatapointCard/DatapointCard'
import UserCard from '../UserCard/UserCard'
import UserService from '../../contexts/Authentication/UserService'

export interface CardListProps /* extends NodeList */ {
  cardType: 'DatapointCard' | 'MemberCard'
  data: any[] // probably card
  editHandler: (key: number) => void
}

const CardList = ({ cardType: card, data, editHandler, ...porps }: CardListProps): JSX.Element => {
  return (
        <div>
            {data
              ? data.map((item, index) => {
                return (
                    <div key={index}>
                      {card === 'DatapointCard' &&
                         <DatapointCard title={item.displayName || item.dataPointKey} value={item.latestValue} onEdit={() => { editHandler(index) }}></DatapointCard>
                      }
                      {card === 'MemberCard' &&
                          <UserCard name={item.fullName} email={item.email}
                            role={UserService.getUserRole(item.accessLevels)}
                              onEdit={() => { editHandler(index)}} ></UserCard>
                      }
                    </div>
                )
              })
              : <div>no data</div>
          }
        </div>
  )
}

export default CardList
