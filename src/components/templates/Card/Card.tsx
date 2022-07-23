import React, { PropsWithChildren } from 'react'


const Card = (props: PropsWithChildren) => {

  return (
    <div className={`flex flex-col p-2 rounded-lg 
                    border-2 border-white
                  overflow-hidden h-full min-w-max max-h-80 w-full `}>
      {props.children}
    </div>
    
  )
}

export default Card