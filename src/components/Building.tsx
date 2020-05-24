import React from 'react';
import styled from 'styled-components';

export const DEFAULT_BUILDING_WIDTH = 84;

type FloorAreaProps = {
  x: number;
  y: number;
  width: number;
};

const FloorImageStyle = styled.img<FloorAreaProps>`
  position: absolute;
  width: ${(props) => props.width}px;
  height: auto;
  object-fit: contain;
`;

const FloorStyle = styled(FloorImageStyle as any).attrs((props: FloorAreaProps) => ({
  style: {
    bottom: `${props.y}px`,
    left: `${props.x}px`,
  },
}))``;

type BuildingProps = {
  x: number;
  y: number;
  buildingWidth: number;
  buildingIndex: number;
  difficulty: number;
  building: IFloor[];
};

export type IFloor = {
  img: HTMLImageElement;
  height: number;
  type: string;
};

export function Building(props: BuildingProps) {
  return (
    <div>
      {props.building.map((floor, index) => {
        const floorHeight = getFloorHeight(props.building, index);
        return (
          <FloorStyle
            key={index}
            src={floor.img.src}
            x={props.x + props.buildingWidth * props.buildingIndex}
            y={props.y + floorHeight}
            width={props.buildingWidth}
          />
        );
      })}
    </div>
  );
}

function getFloorHeight(building: IFloor[], index: number): number {
  let height = 0;
  for (let i = 0; i < index; i++) {
    height += building[i].height;
  }
  return height;
}

export function getBuildingHeight(building: IFloor[]) {
  let height = 0
  for (let i = 0; i < building.length; i++) {
    height += building[i].height;
  }
  return height
}