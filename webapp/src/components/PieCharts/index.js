import React from 'react'
import { PieChart, Pie, Cell, Tooltip, LabelList, Legend } from 'recharts'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import styles from './styles'

const useStyles = makeStyles(styles)

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const PieGraphic = ({ data, title }) => {
  const classes = useStyles()
  const renderColorfulLegendText = (value, entry) => {
    return <span className={classes.legenthColor}>{value}</span>
  }

  return (
    <Box>
      {console.log({ data })}
      <Typography align="center" variant="h5">
        {title}
      </Typography>
      <PieChart width={350} height={350}>
        <Legend
          height={36}
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          iconSize={10}
          padding={5}
          formatter={renderColorfulLegendText}
        />
        <Pie
          data={data}
          cx="50%"
          cy="60%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          formatter={renderColorfulLegendText}
        >
          {data.map((entry, index) => (
            <>
              <Cell
                key={`cell-${index}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
              <LabelList
                className={classes.labelStyle}
                dataKey="value"
                position="outside"
              />
            </>
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  )
}

PieGraphic.propTypes = { data: PropTypes.array, title: PropTypes.string }

PieGraphic.defaultProps = {
  data: [],
  title: ''
}

export default PieGraphic
