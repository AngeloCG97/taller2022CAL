import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { getVotes } from '../../utils'
import PieGraphic from '../../components/PieCharts'

const COURSE_ID = {
  ia: 'IC-IA01',
  blockchain: 'IC-BC01'
}

const Results = () => {
  const [votes, setVotes] = useState([
    { name: 'Inteligencia Artificial', value: 0 },
    { name: 'Blockchain', value: 0 }
  ])

  const calculateVotes = async () => {
    const votes = await getVotes()

    if (!votes.length) return

    const { ia, blockchain } = votes.reduce(
      (prev, current) => {
        prev[
          current.course === COURSE_ID.blockchain ? 'blockchain' : 'ia'
        ].push(current.voter)

        return prev
      },
      { ia: [], blockchain: [] }
    )

    setVotes([
      { name: 'Inteligencia Artificial', value: ia.length },
      { name: 'Blockchain', value: blockchain.length }
    ])
  }

  useEffect(calculateVotes, [])

  return (
    <Grid container>
      <Box width="100%" display="flex" justifyContent="center">
        <PieGraphic data={votes} title="Total de votos actuales" />
      </Box>
    </Grid>
  )
}

export default Results
