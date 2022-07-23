import List, { Entry } from 'components/templates/List';
import Modal from 'components/templates/Modal/Modal';
import { useOptions, useSetOptions } from 'hooks/useOptions';
import React from 'react'
import { POSSIBLE_OPTIONS } from 'hooks/useOptions';
import { useIsMobile } from 'hooks/useIsMobile';


const Options = () => {
  const options = useOptions();
  const setOptions = useSetOptions();
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);
  const isMobile = useIsMobile();
    
  const objectButtons = Object.entries(POSSIBLE_OPTIONS).map(([key, values]) => {
      const currentValue = options[key];
      

      const handleChange = (e: any) => {
        console.log(e)
        setOptions({ ...options, [key]: e.target.value });
      }

      const buttons = values.map((value) => {
        return(
          <div key={value}className={"flex w-full h-full justify-center items-center " + (isMobile && "flex-col")}>
            <label className="text-center">{value}</label>
            <input type="radio"
                  name={key}
                  value={value}
                  checked={currentValue === value}
                  onChange={handleChange}
                  className=""
                  />
          </div>
        )
      }
      )

      return (
          <div key={key} 
              className={"flex flex-col items-center w-full h-full " + 
              (isMobile && "py-2 border-b-2")}>
              <h3 className="text-2xl">{key}</h3>
              <div className={"flex flex-col justify-evenly w-full h-1/3 grow"}>
                  {buttons}
              </div>
          </div>
      )
  })
  
  const handleClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex w-1/12 justify-center items-center w-full">
        <i className="fas fa-bars fa-xl" onClick={() => setIsModalOpen(true)}></i>
        <Modal isOpen={isModalOpen} onClose={handleClose}>
          <div className={"p-2 flex w-full " + (isMobile && "flex-col")}>
            {objectButtons}
          </div>
        </Modal>
    </div>
  )
}

export default Options