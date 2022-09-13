import React from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import BackButton from '../../components/buttons/BackButton'

const PillDetail = () => {
  return (
    <>
      <Header leftNone={true} leftChildren={<BackButton />} />
      <Footer />
    </>
  )
}

export default PillDetail