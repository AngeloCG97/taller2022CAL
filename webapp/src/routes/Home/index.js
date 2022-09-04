import React, { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Grid } from '@mui/material'

import { useSharedState } from '../../context/state.context'
import VoteItem from '../../components/VoteItem'
import Pay from '../../components/Pay'
import { mainConfig } from '../../config'
import { vote, pay, hasPay } from '../../utils'

const options = [
  {
    name: 'Introducción a Blockchain',
    image: 'images/bc-image.png',
    alt: 'Introducción a Blockchain image',
    value: 'IC-BC01'
  },
  {
    name: 'Introducción a la Inteligenci Artificial',
    image: 'images/ia-image.jpg',
    alt: 'Introducción a la Inteligenci Artificial',
    value: 'IC-IA01'
  }
]

const Home = () => {
  const { t } = useTranslation('homeRoute')
  const [userPay, setUserPay] = useState()
  const [state, { showMessage }] = useSharedState()

  const handleVote = async course => {
    try {
      const transaction = vote({
        actor: state?.ual?.activeUser?.accountName,
        election: course
      })

      const result = await state.ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      showMessage({
        type: 'success',
        content: {
          content: 'Voto exitoso, consulte su transacción aquí:',
          link: {
            href: `${mainConfig.bloksExplorer}${result?.transactionId}`,
            text: result?.transactionId
          }
        }
      })
    } catch (error) {
      showMessage({
        type: 'error',
        content: error.message
      })
    }
  }

  const handlePay = async () => {
    try {
      const transaction = pay({
        actor: state?.ual?.activeUser?.accountName
      })

      const result = await state.ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      showMessage({
        type: 'success',
        content: {
          content: 'Pago exitoso, consulte su transacción aquí:',
          link: {
            href: `${mainConfig.bloksExplorer}${result?.transactionId}`,
            text: result?.transactionId
          }
        }
      })
    } catch (error) {
      showMessage({
        type: 'error',
        content: error.message
      })
    }
  }

  const checkPayment = async () => {
    const enrolled = await hasPay(state?.ual?.activeUser?.accountName)
    setUserPay(enrolled)
    console.log('HAS-PAY', enrolled)
  }

  useEffect(checkPayment, [state.user])

  return (
    <Grid container>
      <Typography variant="h5">{t('welcomeMessage')}</Typography>
      {state.user ? (
        userPay ? (
          options.map((option, index) => (
            <VoteItem key={index} item={option} action={handleVote} />
          ))
        ) : (
          <Pay action={handlePay} />
        )
      ) : (
        <></>
      )}
    </Grid>
  )
}

Home.propTypes = {}

export default memo(Home)
