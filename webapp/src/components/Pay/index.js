import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'

const Pay = ({ action }) => {
  return (
    <Grid item xs={12}>
      <Box pt={4}>
        <Typography variant="body1">
          Antes de realizar la votación por la electiva que desea que impartan
          el próximo semestre en el CAL(Centro Académico de Limón), debe
          realizar el pago de matricula del curso el cual tiene un costo de 3
          EOS.
        </Typography>
        <Box pt={2}>
          <Button variant="contained" onClick={action}>
            Pagar
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

Pay.propTypes = {
  action: PropTypes.func
}

export default memo(Pay)
