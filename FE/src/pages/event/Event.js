import React from 'react'
import event from '../../assets/event/event.jpg'
import BackButton from '../../components/buttons/BackButton'
import Header from '../../components/layouts/Header'

const Event = () => {
  return (
    <div>
      <Header
        leftNone={true}
        centerChildren='이벤트'
        leftChildren={<BackButton onClick={() => { window.history.go(-1) }}
        />}></Header>
      <img src={event} alt='이벤트 사진' width='100%'></img>
    </div>
  )
}

export default Event