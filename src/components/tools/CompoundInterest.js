import React, { useRef, useState } from 'react';

// Loadable
import loadable from '@loadable/component';

// Util
import { isNumeric, isNumericOrFloat } from '../../util/helpers';

// UI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

const D3 = loadable.lib(() => import('d3'));

const makeData = (principal, compoundFrequency, interestRate, years, months) => {
  const yearNum = Number(years);
  const monthNum = Number(months);
  const compoundFrequencyNum = Number(compoundFrequency);
  const principalNum = Number(principal);
  const interestRateNum = Number(interestRate) / 100;
  const totalYears = (yearNum + monthNum / 12);
  const delta = totalYears / (Math.log2(yearNum + 10) * 4);
  let t = 0;
  const T = totalYears;
  const data = [];
  while (t < T) {
    data.push({ y: principalNum * Math.pow((1 + (interestRateNum / compoundFrequencyNum)), compoundFrequencyNum * t), x: t });
    t += delta;
  }
  data.push({ y: principalNum * Math.pow((1 + (interestRateNum / compoundFrequencyNum)), compoundFrequencyNum * T), x: T });
  return data;
}

const CompoundInterest = props => {
  const graphRef = useRef(null);
  const [params, setParams] = useState({
    years: '10', months: '0', days: '0', compoundFrequency: '12', interestRate: '8', principal: '100'
  });
  const [graphState, setGraphState] = useState({ init: false });
  return (
    <div style={{ maxWidth: '1230px', margin: 'auto', padding: '0 15px' }}>
      <div style={{ margin: '25px 0' }}>
        <Typography align='center' variant='h5' style={{ textDecoration: 'underline', textDecorationColor: '#f44336' }}>Compound Interest Calculator</Typography>
      </div>
      <Grid container spacing={0}>
        <Grid style={{ paddingRight: '16px' }} item xs={6} sm={6} md={5} lg={5} xl={5}>
          <Paper style={{ padding: '5px 12px', height: '100%' }}>
            <Typography style={{ margin: '15px 0' }} align='center' variant='h6'>Set Parameters</Typography>
            <Grid container spacing={1}>
              <Grid style={{ marginBottom: '6px' }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant='subtitle2' color='primary'>Time Period</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField InputLabelProps={{ shrink: true }} label='Years' fullWidth variant='outlined' value={params.years} onChange={e => {
                  const value = e.target.value;
                  if (isNumeric(value)) {
                    setParams({ ...params, years: value });
                  }
                }} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField InputLabelProps={{ shrink: true }} label='Months' fullWidth variant='outlined' value={params.months} onChange={e => {
                  const value = e.target.value;
                  if (isNumeric(value)) {
                    setParams({ ...params, months: value });
                  }
                }} />
              </Grid>
              <Grid style={{ marginTop: '15px', marginBottom: '6px' }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant='subtitle2' color='primary'>Compounding and Interest</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField InputLabelProps={{ shrink: true }} label='Times Compounded Per Year' fullWidth variant='outlined' value={params.compoundFrequency} onChange={e => {
                  const value = e.target.value.split('.');
                  if (isNumericOrFloat(value)) {
                    setParams({ ...params, compoundFrequency: value.join('.') });
                  }
                }} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField InputLabelProps={{ shrink: true }} InputProps={{ endAdornment: <InputAdornment position='end'><Typography>%</Typography></InputAdornment> }} label='Interest Rate' fullWidth variant='outlined' value={params.interestRate} onChange={e => {
                  const value = e.target.value.split('.');
                  if (isNumericOrFloat(value)) {
                    setParams({ ...params, interestRate: value.join('.') });
                  }
                }} />
              </Grid>
              <Grid style={{ marginTop: '15px', marginBottom: '6px' }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant='subtitle2' color='primary'>Principal</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position='start'><Typography>$</Typography></InputAdornment> }} label='Principal' fullWidth variant='outlined' value={params.principal} onChange={e => {
                  const value = e.target.value;
                  if (isNumeric(value)) {
                    setParams({ ...params, principal: value });
                  }
                }} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid style={{ paddingLeft: '16px' }} item xs={6} sm={6} md={7} lg={7} xl={7}>
          <Paper style={{ padding: '18px 18px 5px 5px' }}>
            <div ref={graphRef}></div>
          </Paper>
        </Grid>
      </Grid>
      <D3>
        {
          d3 => {
            if (!graphState.init && graphRef.current) {
              const svg = d3.select(graphRef.current).append('svg').attr('width', '100%').attr('height', graphRef.current.clientWidth * 0.65);
              const pathGroup = svg.append('g').style('pointer-events', 'bounding-box').attr('width', Number(svg.style('width').replace('px', '')) - 65).attr('height', Number(svg.style('height').replace('px', '')) - 45).attr('transform', 'translate(55, 5)').style('cursor', 'crosshair');;
              const data = makeData(params.principal, params.compoundFrequency, params.interestRate, params.years, params.months);

              const xScale = d3.scaleLinear()
                .domain([0, Number(params.years) + Number(params.months / 12)])
                .range([0, pathGroup.attr('width')]);

              const yScale = d3.scaleLinear()
                .domain([Number(params.principal), (data[data.length - 1] && data[data.length - 1].y) || 0])
                .range([pathGroup.attr('height'), 0]);

              const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

              const xAxis = d3.axisBottom()
                .scale(xScale);

              const yAxis = d3.axisLeft()
                .tickFormat(d3.format('3.2s'))
                .scale(yScale);

              pathGroup.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line);

              pathGroup.append('g').attr('class', 'x axis').attr('pointer-events', 'none').attr('transform', `translate(0, ${pathGroup.attr('height')})`).call(xAxis);
              pathGroup.append('g').attr('class', 'y axis').attr('pointer-events', 'none').attr('transform', `translate(0, )`).call(yAxis);
              svg.append('text').attr('class', 'text').attr('transform', `translate(${(graphRef.current.clientWidth / 2) + 17}, ${graphRef.current.clientWidth * 0.65})`).style('text-anchor', 'middle').text('Years');
              svg.append('text').attr('class', 'text').attr('transform', 'rotate(-90)').attr('y', 0).attr('x', 0 - (graphRef.current.clientWidth * 0.65 / 2) + 23).attr('dy', '1em').style('text-anchor', 'middle').text('USD');

              pathGroup.on('mousemove', () => {
                const target = d3.event.target;
                const coords = d3.mouse(target);
                let years = xScale.invert(coords[0]);
                const dollars = Number(params.principal) * Math.pow((1 + ((Number(params.interestRate) / 100) / Number(params.compoundFrequency))), Number(params.compoundFrequency) * years)
                const mouseLine = d3.line()
                  .x(d => d.x)
                  .y(d => d.y);
                d3.selectAll('.indicator-line').remove();
                d3.selectAll('.indicator-circle').remove();
                pathGroup.append('path')
                  .datum([{ x: coords[0], y: 0 }, { x: coords[0], y: pathGroup.attr('height') }])
                  .attr('class', 'indicator-line')
                  .attr('d', mouseLine);
                pathGroup.append('circle')
                  .attr('class', 'indicator-circle')
                  .attr('cx', coords[0])
                  .attr('cy', yScale(dollars))
                  .attr('r', 5);
              });

              setGraphState({ init: true, svg, xAxis, yAxis, line, pathGroup });
            } else if (graphRef.current) {
              const data = makeData(params.principal, params.compoundFrequency, params.interestRate, params.years, params.months);

              const xScale = d3.scaleLinear()
                .domain([0, Number(params.years) + Number(params.months / 12)])
                .range([0, graphState.pathGroup.attr('width')]);

              const yScale = d3.scaleLinear()
                .domain([Number(params.principal), (data[data.length - 1] && data[data.length - 1].y) || 0])
                .range([graphState.pathGroup.attr('height'), 0]);

              d3.selectAll('.line').remove();

              const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

              graphState.pathGroup.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line);

              graphState.xAxis.scale(xScale);
              graphState.yAxis.scale(yScale);

              graphState.pathGroup.append('g').attr('class', 'x axis').attr('pointer-events', 'none').attr('transform', `translate(0, ${graphState.pathGroup.attr('height')})`).call(graphState.xAxis);
              graphState.pathGroup.append('g').attr('class', 'y axis').attr('pointer-events', 'none').call(graphState.yAxis);

              graphState.pathGroup.on('mousemove', null);

              graphState.pathGroup.on('mousemove', () => {
                const target = d3.event.target;
                const coords = d3.mouse(target);
                const years = xScale.invert(coords[0]);
                if (years > Number(params.years) || years < 0) {
                  d3.selectAll('.indicator-line').remove();
                  d3.selectAll('.indicator-circle').remove();
                } else {
                  const dollars = Number(params.principal) * Math.pow((1 + ((Number(params.interestRate) / 100) / Number(params.compoundFrequency))), Number(params.compoundFrequency) * years)
                  const mouseLine = d3.line()
                    .x(d => d.x)
                    .y(d => d.y);
                  d3.selectAll('.indicator-line').remove();
                  d3.selectAll('.indicator-circle').remove();
                  graphState.pathGroup.append('path')
                    .datum([{ x: coords[0], y: 0 }, { x: coords[0], y: graphState.pathGroup.attr('height') }])
                    .attr('class', 'indicator-line')
                    .attr('d', mouseLine);
                  graphState.pathGroup.append('circle')
                    .attr('class', 'indicator-circle')
                    .attr('cx', coords[0])
                    .attr('cy', yScale(dollars))
                    .attr('r', 5);
                  d3.selectAll('.axis').remove();
                  graphState.pathGroup.append('g').attr('class', 'x axis').attr('pointer-events', 'none').attr('transform', `translate(0, ${graphState.pathGroup.attr('height')})`).call(graphState.xAxis);
                  graphState.pathGroup.append('g').attr('class', 'y axis').attr('pointer-events', 'none').call(graphState.yAxis);
                }
              });
            }
            return null;
          }
        }
      </D3>
    </div>
  )
}

export default CompoundInterest;