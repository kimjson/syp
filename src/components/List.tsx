import * as React from 'react'
import ListItem from '@src/components/ListItem'
import { User } from '@src/types'

type Props = {
  items: User[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
