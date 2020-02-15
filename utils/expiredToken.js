const expiredToken = tokenLife => {
  const currentTime = new Date().getTime() / 1000;
  if (currentTime > tokenLife) {
    return false;
  } else {
    return true;
  }
};

export default expiredToken;
