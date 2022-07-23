import React from 'react'


export interface Entry {
  name: string;
  onSelect: () => void;
}
type Props = {
  entries: Entry[];
}

const List = (props: Props) => {
  return (
    <ul className="w-full">
      {props.entries.map((entry, index) => (
        <li key={index} className="hover:bg-black/50">
          <button onClick={entry.onSelect} className="w-full text-white">{entry.name}</button>
        </li>
      ))}
    </ul>
  )
}

export default List