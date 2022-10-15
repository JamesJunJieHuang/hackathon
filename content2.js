try {
  cleanUp && cleanUp();
} catch (error) {
  console.log(error);
  location.reload();
}

location.reload();
