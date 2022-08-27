import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'

import VoteItem from '../../components/VoteItem'
import { Grid } from '@mui/material'

const options = [
  {
    name: 'Introducción a Blockchain',
    image: 'images/bc-image.png',
    alt: 'Introducción a Blockchain image'
  },
  {
    name: 'Introducción a la Inteligenci Artificial',
    image: 'images/ia-image.jpg',
    alt: 'Introducción a la Inteligenci Artificial'
  }
]

const Home = () => {
  const { t } = useTranslation('homeRoute')

  return (
    <Grid container>
      <Typography>{t('welcomeMessage')}</Typography>
      {options.map((option, index) => (
        <VoteItem key={index} item={option} />
      ))}
    </Grid>
  )
}

Home.propTypes = {}

export default memo(Home)
