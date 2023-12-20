import Grid from '@mui/material/Grid'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'
import { useEffect, useState } from 'react'
import apiContext from '../../../configs/api'
import axios from 'axios'

const AnalyticsDashboard = () => {
  const [simpanan, setSimpanan] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const convertRupiah = require('rupiah-format')

  useEffect(() => {
    const getSimpanan = async () => {
      try {
        await axios
          .get(apiContext.baseUrl + '/simpanan/total', {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
          .then(res => {
            setSimpanan(res.data.totalSimpanan)
          })
      } catch (error) {
        console.log(error)
      }
    }
    getSimpanan()
  }, [authToken])

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          {simpanan &&
            simpanan.map((s, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <CardStatsWithAreaChart
                  stats={convertRupiah.convert(s.total)}
                  chartColor='success'
                  avatarColor='success'
                  title={s.simpanan.nama_simpanan}
                  avatarIcon='tabler:credit-card'
                  chartSeries={[{ data: [6, 35, 25, 61, 32, 84, 70] }]}
                />
              </Grid>
            ))}
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
