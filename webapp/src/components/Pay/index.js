import React, { memo, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import Box from '@mui/material/Box'
import { useSharedState } from '../../context/state.context'
import Grid from '@mui/material/Grid'
// import { makeStyles } from '@mui/styles'
import { Button, Typography } from '@mui/material'
import { hasPay } from '../../utils'

// import styles from './styles'

// const useStyles = makeStyles(styles)

const Pay = () => {
  // const classes = useStyles()
  const [state] = useSharedState()

  const checkPayment = async () => {
    console.log('CHECKING-PAYMENT')
    const enrolled = await hasPay(state?.ual?.activeUser?.accountName)
    console.log('HAS-PAY', enrolled)
  }

  useEffect(checkPayment, [])

  return (
    <Grid item xs={12}>
      <Typography variant="h5" fontWeight="bold">
        Selección de electivas
      </Typography>
      <Typography variant="body1">
        Antes de realizar la votación por la electiva que desea que impartan el
        proximo semetre en el CAL(Centro Académico de Limón), debe realizar el
        pago de matricula del curso el cual tiene un costo de 3 EOS.
      </Typography>
      <Button variant="contained">Pagar</Button>
    </Grid>
  )
}

// Pay.propTypes = {
//   item: PropTypes.object,
//   action: PropTypes.func
// }

export default memo(Pay)
