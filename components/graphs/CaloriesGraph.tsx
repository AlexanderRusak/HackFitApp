import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory-native';
import {Calories, GraphMain} from '../../constants/interfaces/GraphMain';
import {IStore} from '../../store';
import {caloriesGraphColors, graphColors, theme} from '../../styles/theme';
import {
  addZero,
  dayInMs,
  getCaloriesAreaData,
  getFormattedDate,
  getLineData,
  getPieData,
  getRangeDays,
  getSingleLineData,
  getSummaryData,
  isMinBrush,
  PieDataType,
} from '../ui/Graph/helpers';
import {BrushDomain} from './GlucoseGraphs/Glucose';
import {BrushComponent} from './GraphsComponent/BrushComponent';
import {HeaderComponent} from './GraphsComponent/HeaderComponent';
import {DomainTuple} from 'victory-core';
import {PeriodTextComponent} from './GraphsComponent/PeriodTextComponent';

interface CaloriesGraphProps extends GraphMain {}

export const CaloriesGraph = ({}: CaloriesGraphProps) => {
  const {energy, color} = useSelector(
    (store: IStore) => store.settingsParameter,
  );

  const {day, month, year, hours, minutes} = getFormattedDate(new Date());

  const initData: Calories[] = [
    {
      x: new Date(year, month, day - 5),
      y: {
        dailyCaloriesLimit: 2700,
        carbs: 90,
        fats: 150,
        prots: 200,
      },
    },
    {
      x: new Date(year, month, day - 4),
      y: {
        dailyCaloriesLimit: 2700,
        carbs: 110,
        fats: 180,
        prots: 220,
      },
    },
    {
      x: new Date(year, month, day - 3),
      y: {
        dailyCaloriesLimit: 3000,
        carbs: 120,
        fats: 170,
        prots: 290,
      },
    },
    {
      x: new Date(year, month, day - 2),
      y: {
        dailyCaloriesLimit: 3000,
        carbs: 50,
        fats: 200,
        prots: 150,
      },
    },
    {
      x: new Date(year, month, day - 1),
      y: {
        dailyCaloriesLimit: 3000,
        carbs: 150,
        fats: 160,
        prots: 190,
      },
    },
    {
      x: new Date(year, month, day),
      y: {
        dailyCaloriesLimit: 3000,
        carbs: 90,
        fats: 180,
        prots: 210,
      },
    },
  ];

  const [carbs, fats, prots] = useMemo(
    () => getCaloriesAreaData({array: initData}),
    [initData],
  );

  const lineData = useMemo(() => getSingleLineData(initData), [initData]);
  const brushData = useMemo(() => getSummaryData(initData), [initData]);

  const initialZoom = useMemo(() => [...brushData].splice(-2), [initData]);
  const initialDomain: BrushDomain = useMemo(
    () => ({
      x: [
        initialZoom[initialZoom.length - 2].x,
        initialZoom[initialZoom.length - 1].x,
      ],
    }),
    [initData],
  );

  const [zoomDomain, setZoomDomain] = useState<BrushDomain | DomainTuple>(
    initialDomain,
  );
  const [selectedDomain, setSelectedDomain] = useState<
    BrushDomain | DomainTuple
  >(initialDomain);

  const selectedDays = useMemo(() => getRangeDays(zoomDomain), [zoomDomain]);

  const pieData: PieDataType = useMemo(
    () => getPieData(initData, zoomDomain as BrushDomain),
    [initData],
  );

  const handleZoom = (selectedDomain: BrushDomain) => {
    setSelectedDomain(selectedDomain);
  };

  const handleBrush = (zoomDomain: BrushDomain) => {
    setZoomDomain(zoomDomain);
  };

  const {formattedDate: startPiePeriod} = useMemo(
    () => getFormattedDate(pieData[0].date[0], '.'),
    [pieData],
  );
  const {formattedDate: finishPiePeriod} = useMemo(
    () => getFormattedDate(pieData[0].date[1], '.'),
    [pieData],
  );

  console.log(brushData);
  

  return (
    <View style={styles.container}>
      <HeaderComponent
        currentValue={brushData[brushData.length-1].y}
        headerTitle={'Calories Graph'}
        measuringUnit={energy}
      />

      <View style={styles.graphsContainer}>
        <View style={styles.chartContainer}>
          <VictoryChart
            maxDomain={{
              y: 3600,
            }}
            minDomain={{
              x: new Date(year, month, day - 5).getTime(),
            }}
            height={250}
            scale={{
              x: 'time',
            }}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryZoomContainer
                responsive={true}
                zoomDimension="x"
                zoomDomain={zoomDomain as BrushDomain}
                onZoomDomainChange={handleZoom}
              />
            }>
            <VictoryLine
              labelComponent={
                <VictoryLabel
                  dy={-10}
                  dx={() => `${100 / (selectedDays - 1) / 2}%`}
                  style={{
                    fill: ({index, data}: any) => {
                      return data[index].y >
                        fats[index].y -
                          fats[index].y0 +
                          carbs[index].y -
                          carbs[index].y0 +
                          prots[index].y -
                          prots[index].y0
                        ? color
                        : graphColors.red;
                    },
                    fontSize: 14,
                  }}
                />
              }
              labels={({index}: any) => {
                const sum =
                  fats[index].y -
                  fats[index].y0 +
                  carbs[index].y -
                  carbs[index].y0 +
                  prots[index].y -
                  prots[index].y0;

                return +index === lineData.length - 1 ? null : sum;
              }}
              data={lineData}
              style={{data: {stroke: graphColors.red}}}
            />
            <VictoryArea
              interpolation={'stepAfter'}
              labelComponent={
                <VictoryLabel
                  dy={12}
                  dx={() => `${100 / (selectedDays - 1) / 2}%`}
                  style={{
                    fill: color,
                  }}
                />
              }
              labels={({datum, index}) =>
                +index === prots.length - 1 ? null : datum.y - datum.y0
              }
              data={prots}
              style={{
                data: {
                  fill: caloriesGraphColors.PROTEIN,
                },
              }}
            />
            <VictoryArea
              interpolation={'stepAfter'}
              labelComponent={
                <VictoryLabel
                  dx={() => `${100 / (selectedDays - 1) / 2}%`}
                  dy={12}
                  textAnchor="middle"
                  style={{
                    fill: color,
                  }}
                />
              }
              labels={({datum, index}) =>
                +index === fats.length - 1 ? null : datum.y - datum.y0
              }
              data={fats}
              style={{
                data: {
                  fill: caloriesGraphColors.FAT,
                },
              }}
            />
            <VictoryArea
              interpolation={'stepAfter'}
              labelComponent={
                <VictoryLabel
                  dx={() => `${100 / (selectedDays - 1) / 2}%`}
                  dy={0}
                  textAnchor="middle"
                  style={{
                    fill: color,
                  }}
                />
              }
              labels={({datum, index}) =>
                +index === carbs.length - 1 ? null : datum.y - datum.y0
              }
              data={carbs}
              style={{
                data: {
                  fill: caloriesGraphColors.CARBOHYDRATES,
                },
              }}
            />
            <VictoryAxis crossAxis />
          </VictoryChart>
        </View>
        <View style={styles.pieContainer}>
          <View style={styles.pieGraph}>
            <VictoryPie
              width={250}
              height={250}
              data={pieData}
              colorScale={[
                caloriesGraphColors.CARBOHYDRATES,
                caloriesGraphColors.FAT,
                caloriesGraphColors.PROTEIN,
              ]}
              labels={({datum}) => `${datum.y}%`}
              labelRadius={30}
              labelPlacement={() => 'parallel'}
              padAngle={() => 5}
              innerRadius={20}
              style={{
                labels: {
                  fill: color,
                  fontSize: 16,
                },
              }}
            />
          </View>
          <View style={styles.pieLegendContainer}>
            <Text style={{...styles.pieLegendText, ...styles.pieCarbs}}>
              Carbs: {pieData[0].y}%
            </Text>
            <Text style={{...styles.pieLegendText, ...styles.pieFats}}>
              Fats: {pieData[1].y}%
            </Text>
            <Text style={{...styles.pieLegendText, ...styles.pieProts}}>
              Prots: {pieData[2].y}%
            </Text>
          </View>
        </View>
        <View>
          
            <PeriodTextComponent
              start={startPiePeriod}
              finish={finishPiePeriod}
            />

          <BrushComponent
            data={brushData}
            color={color}
            rangeX={[brushData[0].x, brushData[brushData.length - 1].x]}
            rangeY={[0, 3600]}
            brushDomain={selectedDomain as BrushDomain}
            onBrushDomainChange={handleBrush}
            interpolationType="stepAfter"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    padding: theme.padding,
    alignItems: 'center',
  },
  graphsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    height: '40%',
  },
  pieContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '83%',
    height: '30%',
  },
  pieLegendContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  pieGraph: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  pieLegendText: {
    fontSize: 18,
    fontWeight: '500',
  },
  pieProts: {
    color: caloriesGraphColors.PROTEIN,
  },
  pieCarbs: {
    color: caloriesGraphColors.CARBOHYDRATES,
  },
  pieFats: {
    color: caloriesGraphColors.FAT,
  },
});
