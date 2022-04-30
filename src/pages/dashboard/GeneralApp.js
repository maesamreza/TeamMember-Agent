import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, FormControl, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const userID = localStorage.getItem('UserID')

  useEffect(() => {
    AgentData()
    GetAllSaleMan()
  }, [])
  const [RawNewAutoQuotesTotal, setRawNewAutoQuotesTotal] = useState(0)
  const [RawNewAutoWrittenTotal, setRawNewAutoWrittenTotal] = useState(0)
  const [TotalFireWrittenTotal, setTotalFireWrittenTotal] = useState(0)
  const [LifeApplicationsTotal, setLifeApplicationsTotal] = useState(0)
  const [AnnualizedLifePremiumTotal, setAnnualizedLifePremiumTotal] = useState(0)
  const [HealthApplicationsTotal, setHealthApplicationsTotal] = useState(0)
  const [AnnualizedHealthPremiumTotal, setAnnualizedHealthPremiumTotal] = useState(0)
  const [OtherFinancialServicesTotal, setOtherFinancialServicesTotal] = useState(0)
  const AgentData = async (e) => {

    const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}`);
    const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
    setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
    setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
    setTotalFireWrittenTotal(TotalFireWrittenTotal)
    setLifeApplicationsTotal(LifeApplicationsTotal)
    setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
    setHealthApplicationsTotal(HealthApplicationsTotal)
    setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
    setOtherFinancialServicesTotal(OtherFinancialServicesTotal)

  }
  const [StartDate, setStartDate] = useState('')
  const [EndDate, setEndDate] = useState('')
  const [Names, setNames] = useState('')
  const [Sales, setSales] = useState([])
  const handleChange = (event) => {
    console.log(event)
    setNames(event.target.value);
  };
  const StartDateState = (event) => {
    setStartDate(event.target.value);
  }
  const EndDateState = (event) => {
    setEndDate(event.target.value);
  }
  const GetAllSaleMan = async () => {
    const response = await axios.get(`api/data/sellers/${userID}`);
    const { salePersons } = response.data;
    setSales(salePersons)


  }
  const FitlerReports = async () => {
    if (StartDate !== '' && EndDate !== '' && Names === '') {
      const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}?startdate=${StartDate}&enddate=${EndDate}`);
      const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
      setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
      setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
      setTotalFireWrittenTotal(TotalFireWrittenTotal)
      setLifeApplicationsTotal(LifeApplicationsTotal)
      setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
      setHealthApplicationsTotal(HealthApplicationsTotal)
      setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
      setOtherFinancialServicesTotal(OtherFinancialServicesTotal)
    } else if (StartDate === '' && EndDate === '' && Names === '') {
      const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}`);
      const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
      setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
      setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
      setTotalFireWrittenTotal(TotalFireWrittenTotal)
      setLifeApplicationsTotal(LifeApplicationsTotal)
      setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
      setHealthApplicationsTotal(HealthApplicationsTotal)
      setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
      setOtherFinancialServicesTotal(OtherFinancialServicesTotal)
    } else if (StartDate === '' && EndDate === '' && Names === '') {
      const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}`);
      const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
      setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
      setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
      setTotalFireWrittenTotal(TotalFireWrittenTotal)
      setLifeApplicationsTotal(LifeApplicationsTotal)
      setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
      setHealthApplicationsTotal(HealthApplicationsTotal)
      setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
      setOtherFinancialServicesTotal(OtherFinancialServicesTotal)
    } else if (StartDate !== '' && EndDate !== '' && Names !== '') {
      const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}?startdate=${StartDate}&enddate=${EndDate}&name=${Names}`);
      const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
      setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
      setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
      setTotalFireWrittenTotal(TotalFireWrittenTotal)
      setLifeApplicationsTotal(LifeApplicationsTotal)
      setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
      setHealthApplicationsTotal(HealthApplicationsTotal)
      setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
      setOtherFinancialServicesTotal(OtherFinancialServicesTotal)
    } else if (StartDate === '' && EndDate === '' && Names !== '') {
      const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}?name=${Names}`);
      const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
      setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
      setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
      setTotalFireWrittenTotal(TotalFireWrittenTotal)
      setLifeApplicationsTotal(LifeApplicationsTotal)
      setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
      setHealthApplicationsTotal(HealthApplicationsTotal)
      setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
      setOtherFinancialServicesTotal(OtherFinancialServicesTotal)
    } if (StartDate === '' && EndDate === '' && Names === '') {
      const response = await axios.get(`api/totalof/agent/sellers/reports/${userID}`);
      const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.SalePersonReports;
      setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
      setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
      setTotalFireWrittenTotal(TotalFireWrittenTotal)
      setLifeApplicationsTotal(LifeApplicationsTotal)
      setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
      setHealthApplicationsTotal(HealthApplicationsTotal)
      setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
      setOtherFinancialServicesTotal(OtherFinancialServicesTotal)
    }
  }

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>

            <Stack direction="row-reverse" >

              <Button sx={{ m: 4, width: 20, height: 50 }} variant='contained' onClick={(e) => { FitlerReports() }}>Search</Button>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                End Date<TextField
                  type='date'
                  placeholder="End Date"
                  onChange={(e) => { EndDateState(e) }}
                  required
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                Start Date  <TextField
                  type='date'
                  placeholder="Start Date"
                  onChange={(e) => { StartDateState(e) }}
                  required
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                {/* <InputLabel >Age</InputLabel> */}
                SalesPerson<Select
                  value={Names}
                  label="SalesPerson"
                  onChange={(e) => { handleChange(e) }}
                >
                  <MenuItem  value="">Select</MenuItem>
                  {
                    Sales.map((x) => (<MenuItem value={x.name}>{x.name}</MenuItem>))
                  }
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Raw New Auto Quotes"
              // percent={2.6}
              total={RawNewAutoQuotesTotal}
              chartColor={theme.palette.primary.main}
              chartData={[0, RawNewAutoQuotesTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Raw New Auto Written"
              // percent={-0.1}
              total={RawNewAutoWrittenTotal}
              chartColor={theme.palette.chart.main}
              chartData={[60, RawNewAutoWrittenTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Fire Written"
              // percent={0.6}
              total={TotalFireWrittenTotal}
              chartColor={theme.palette.chart.main}
              chartData={[40, TotalFireWrittenTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Life Applications"
              // percent={2.6}
              total={LifeApplicationsTotal}
              chartColor={theme.palette.primary.main}
              chartData={[22, LifeApplicationsTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="AnnualizedLifePremium"
              // percent={2.6}
              total={AnnualizedLifePremiumTotal}
              chartColor={theme.palette.primary.main}
              chartData={[22, AnnualizedLifePremiumTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Health Applications"
              // percent={2.6}
              total={HealthApplicationsTotal}
              chartColor={theme.palette.primary.main}
              chartData={[0, HealthApplicationsTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Annualized Health Premium"
              // percent={2.6}
              total={AnnualizedHealthPremiumTotal}
              chartColor={theme.palette.primary.main}
              chartData={[8, AnnualizedHealthPremiumTotal]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Other Financial Services"
              // percent={2.6}
              total={OtherFinancialServicesTotal}
              chartColor={theme.palette.primary.main}
              chartData={[22, OtherFinancialServicesTotal]}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
