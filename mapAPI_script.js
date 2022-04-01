
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
    center: new kakao.maps.LatLng(37.4956115411133, 127.05766654001489), // 지도의 중심좌표
    level: 5 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
imageSize = new kakao.maps.Size(24, 35); // 마커이미지의 크기입니다 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
markerPosition = new kakao.maps.LatLng(37.4956115411133, 127.05766654001489); // 마커가 표시될 위치입니다


// 마커를 생성합니다
var marker = new kakao.maps.Marker({
map: map,
position: markerPosition,
title: 'DKSH',
image: markerImage // 마커이미지 설정
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

//// 당시 대충 때려만든 함수입니다. 이 코드에서 제가 만든 유일한 함수입니다. 만드는데 며칠 걸린거 같습니다.

function search_similar_company(input){
    positions = [];
  
    // 업소명에 대한 idx값을 input_idx에 저장
    var input_idx = dict_company_to_index[input];
  
    // input_idx에 대한 비슷한 업소 세개를 simi_company_idx에 저장
    var simi_company_idx = simi_company[input_idx];
  
    // simi_company_idx의 회사들을 각각 돌며 이름과 location을 positions에 저장
    for (i=0; i < 3; i++){
      simi_info = dict_index_to_location[simi_company_idx[i]];
      content_constructor = ('<div>' + simi_info[0] + '</div>');
      info_temp = {
        content: content_constructor,
        latlng: new kakao.maps.LatLng(simi_info[1], simi_info[2])
      };
      positions.push(info_temp);
    };
  
    marker(positions);
  }
  
  function marker(positions) {
  
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  
    for (var i = 0; i < positions.length; i ++) {
  
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
      });
  
      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content // 인포윈도우에 표시할 내용
      });
  
      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }
  }
  
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  function makeOverListener(map, marker, infowindow) {
      return function() {
          infowindow.open(map, marker);
      };
  }
  
  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
      return function() {
          infowindow.close();
      };
  }