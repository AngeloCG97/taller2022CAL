import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

import styles from './styles'

const useStyles = makeStyles(styles)

const VoteItem = ({ item }) => {
  const classes = useStyles()

  return (
    <Grid
      item
      xs={12}
      md={6}
      className={classes.gridButton}
      onClick={() => console.log('TESTING')}
    >
      <Box width="100%" justifyContent="center" display="flex" paddingY={4}>
        <img height="300px" width="80%" alt={item.alt} src={item.image} />
      </Box>
      <Typography align="center" variant="h5" fontWeight="bold">
        {item.name}
      </Typography>
    </Grid>
  )
}

VoteItem.propTypes = {
  item: PropTypes.object
}

export default memo(VoteItem)
