import React from 'react';
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';
import {addZero} from '../../ui/Graph/helpers';
import {BrushDomain} from '../GlucoseGraphs/Glucose';
import {InterpolationPropType} from 'victory-core';
import {Text} from 'react-native-paper';

export interface BrushComponentData {
  x: any;
  y: number;
}

interface BrushComponentProps {
  color: string;
  rangeX: [number, number];
  rangeY: [number, number];
  data: BrushComponentData[];
  onBrushDomainChange: (zoomDomain: BrushDomain) => void;
  brushDomain: BrushDomain;
  interpolationType?: InterpolationPropType;
}

export const BrushComponent = ({
  color,
  rangeX,
  rangeY,
  data,
  brushDomain,
  onBrushDomainChange,
  interpolationType,
}: BrushComponentProps) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      height={120}
      scale={{x: 'time'}}
      padding={{top: 0, left: 50, right: 50, bottom: 30}}
      domain={{
        x: rangeX,
        y: rangeY,
      }}
      containerComponent={
        <VictoryBrushContainer
          responsive={false}
          brushDimension="x"
          brushDomain={brushDomain}
          onBrushDomainChange={onBrushDomainChange}
        />
      }>
      <VictoryAxis
        crossAxis
        /* tickFormat={x =>
          addZero(new Date(x).getHours()) +
          ':' +
          addZero(new Date(x).getMinutes())
        } */
      />
      <VictoryArea
        interpolation={interpolationType}
        style={{data: {fill: color}}}
        data={data}
      />
    </VictoryChart>
  );
};
