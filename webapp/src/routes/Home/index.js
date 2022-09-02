import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Grid } from '@mui/material'

import { useSharedState } from '../../context/state.context'
import VoteItem from '../../components/VoteItem'
import { mainConfig } from '../../config'
import { vote } from '../../utils'

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
  const [state, { showMessage }] = useSharedState()

  const handleVote = async course => {
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
  }

  return (
    <Grid container>
      <Typography>{t('welcomeMessage')}</Typography>
      {options.map((option, index) => (
        <VoteItem key={index} item={option} action={handleVote} />
      ))}
    </Grid>
  )
}

Home.propTypes = {}

export default memo(Home)
