import React from "react";
import { Map } from "react-kakao-maps-sdk";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { selectGeo } from "../../../toolkit/geo/geoSlice";
import { isOpenTrigger } from "../../../toolkit/isOpen/isOpenSlice";

interface IProps {
  children?: any;
}

const KakaoMap = ({ children }: IProps) => {
  const dispatch = useAppDispatch();

  const geo = useAppSelector(selectGeo);

  const isOpenAction = (type: "isSearch" | "isAnsimInfo", boolean: boolean) => {
    dispatch(isOpenTrigger({ [type]: boolean }));
  };

  return (
    <Map
      center={{ lat: geo.lat, lng: geo.lng }}
      level={3}
      style={{ width: "100%", height: "100vh" }}
      onClick={() => {
        isOpenAction("isAnsimInfo", false);
      }}
    >
      {children}
    </Map>
  );
};

export default KakaoMap;
