function slowFunction() {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve("hi");
    }, 2000);
  })
}

async function main() {
  const b = await slowFunction();
  console.log(b);
}

main();