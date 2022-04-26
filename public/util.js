function getPosition() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}
const geocoder = new kakao.maps.services.Geocoder();

export async function getReverseGeocoding() {
  const {
    coords: { latitude, longitude },
  } = await getPosition();

  return new Promise((res, rej) => {
    geocoder.coord2RegionCode(longitude, latitude, (msg, status) => {
      if (status === kakao.maps.services.Status.OK) {
        res(msg[0].address_name);
      } else {
        return rej(new Error("Bad Status"));
      }
    });
  });
}
