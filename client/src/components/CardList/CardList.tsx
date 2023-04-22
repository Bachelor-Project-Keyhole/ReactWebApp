import * as React from 'react'
import Card from '../Card/Card'

export interface CardListProps /* extends NodeList */ {
  data: any[] // probably card
  editHandler: () => void

}

const CardList = ({ data, editHandler, ...porps }: CardListProps): JSX.Element => {
  return (
        <div>
            {data.map((item, index) => {
              return (
                    <div key={index}>
                        <Card title={item.title} description={item.description} onEdit={editHandler}></Card>
                    </div>
              )
            })}
        </div>
  )
}

export default CardList
