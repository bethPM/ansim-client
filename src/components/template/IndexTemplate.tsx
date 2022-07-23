// import { useSnackbar } from "notistack";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { selectAnsimList } from "../../toolkit/ansim/ansimListSlice";
import { getAnsimsAction } from "../../toolkit/ansim/func/ansimListSlice.func";
import { geoAction, selectGeo } from "../../toolkit/geo/geoSlice";
import { isOpenTrigger, selectIsOpen } from "../../toolkit/isOpen/isOpenSlice";
import AnsimInfo from "../molecules/AnsimInfo/AnsimInfo";
import KakaoMap from "../molecules/KakaoMap/KakaoMap";
import Marker from "../organisms/Marker/Marker";
import Search from "../organisms/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const IndexTemplate = () => {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const geo = useAppSelector(selectGeo);

  const { isSearch, isAnsimInfo } = useAppSelector(selectIsOpen);

  const isOpenAction = (type: "isSearch" | "isAnsimInfo", boolean: boolean) => {
    dispatch(isOpenTrigger({ [type]: boolean }));
  };

  const ansims = useAppSelector(selectAnsimList);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const onSuccess = async (nav: any) => {
    handleSearchAnsims(nav.coords.latitude, nav.coords.longitude);
  };

  const handleSearchAnsims = async (lat: number, lng: number) => {
    try {
      await dispatch(getAnsimsAction({ lat, lng }));

      dispatch(geoAction({ lat, lng }));
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, (err) =>
      enqueueSnackbar("위치 검색을 허용해 주세요!", { variant: "error" })
    );
  }, []);

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      {isSearch ? (
        <Search />
      ) : (
        <>
          <div
            style={{
              width: "100%",
              height: "70px",
              backgroundColor: "#4276f9",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <img src="/4x.png" alt="안심이" style={{ width: "60px" }} />
            </div>
            <h1
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              안심이지킴이집
            </h1>
          </div>
          <div
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#4852e3",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              isOpenAction("isSearch", true);
            }}
          >
            <div
              style={{
                width: "15%",
                height: "85%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={"2x"}
                style={{ color: "white" }}
              />
            </div>
            <div
              style={{
                width: "79.6%",
                height: "89.5%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                fontSize: "17px",
                color: "#ccc",
              }}
            >
              검색하러 가기
            </div>
          </div>
          <KakaoMap>
            <MapMarker
              image={{ src: "/Group2085.png", size: { width: 29, height: 42 } }}
              draggable={true}
              onMouseOver={() => {
                setIsMouseOver(true);
              }}
              onMouseOut={() => {
                setIsMouseOver(false);
              }}
              onDragEnd={(e) => {
                handleSearchAnsims(
                  e.getPosition().getLat(),
                  e.getPosition().getLng()
                );
              }}
              position={{
                // 마커가 표시될 위치입니다
                lat: geo.lat,
                lng: geo.lng,
              }}
            >
              <div style={{ width: "220px", textAlign: "center" }}>
                여기있어요!<br/>(현재위치를 이동시킬수있어요!)
      </div>
            </MapMarker>
            {/* <MapMarker
              position={{
                // 마커가 표시될 위치입니다
                lat: geo.lat,
                lng: geo.lng - 0.028,
              }}
            >
              <div>Min X</div>
            </MapMarker>
            <MapMarker
              position={{
                // 마커가 표시될 위치입니다
                lat: geo.lat - 0.022,
                lng: geo.lng,
              }}
            >
              <div>Min Y</div>
            </MapMarker>
            <MapMarker
              position={{
                // 마커가 표시될 위치입니다
                lat: geo.lat,
                lng: checkDot(geo.lng + 0.028, 0.028),
              }}
            >
              <div>Max X</div>
            </MapMarker>
            <MapMarker
              position={{
                // 마커가 표시될 위치입니다
                lat: checkDot(geo.lat + 0.022, 0.022),
                lng: geo.lng,
              }}
            >
              <div>Max Y</div>
            </MapMarker> */}
            {ansims.map((ansim, index) => (
              <Marker key={ansim.adres + index} ansim={ansim} />
            ))}
          </KakaoMap>
          {isAnsimInfo && <AnsimInfo />}
          <div
            style={{
              position: "absolute",
              left: "10px",
              bottom: "20px",
              zIndex: "100",
            }}
          >
            <h3>자료출처-[경찰청]</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default IndexTemplate;
