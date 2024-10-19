function generateDetailInputs() {
  const noftypeshovels = parseInt(
    document.getElementById("noftypeshovels").value
  );
  const noftypedumpers = parseInt(
    document.getElementById("noftypedumpers").value
  );

  const detailsInputs = document.getElementById("detailsInputs");
  detailsInputs.innerHTML = ""; // Clear previous inputs

  for (let i = 1; i <= noftypeshovels; i++) {
    detailsInputs.innerHTML += `
        <h3>Shovel Type ${i}</h3>
        <label>Capacity of Shovel ${i}:</label>
        <input type="number" id="caps${i}" required>
        <label>Cycle Time of Shovel ${i}:</label>
        <input type="number" id="cycs${i}" required>
        <label>Number of Shovels of this Type ${i}:</label>
        <input type="number" id="nofshovelst${i}" required>
      `;
  }

  for (let i = 1; i <= noftypedumpers; i++) {
    detailsInputs.innerHTML += `
        <h3>Dumper Type ${i}</h3>
        <label>Capacity of Dumper ${i}:</label>
        <input type="number" id="capd${i}" required>
        <label>Cycle Time of Dumper ${i}:</label>
        <input type="number" id="cycd${i}" required>
        <label>Number of Dumpers of this Type ${i}:</label>
        <input type="number" id="nofdumperst${i}" required>
      `;
  }

  document.getElementById("calculateButton").classList.remove("hidden");
}

function customRound(num) {
  const decimalPart = num % 1; // Get the decimal part of the number
  const integerPart = Math.floor(num); // Get the integer part

  return decimalPart <= 0.33 ? integerPart : integerPart + 1;
}

// to input an array to the lcm function

function productOfArray(arr) {
  return arr.reduce((acc, num) => acc * num, 1);
}

function sumOfArray(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}

function lcm(a) {
  return productOfArray(a) / gcdOfArray(a);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function gcdOfArray(arr) {
  return arr.reduce((acc, num) => gcd(acc, num));
}

// function lcm(a, b) {
//   return (a * b) / gcd(a, b);
// }

// function gcd(a, b) {
//   return b === 0 ? a : gcd(b, a % b);
// }

function calculateMatchFactor() {
  let dictionary = {};

  const noftypeshovels = parseInt(
    document.getElementById("noftypeshovels").value
  );
  const noftypedumpers = parseInt(
    document.getElementById("noftypedumpers").value
  );

  let totalDumpers = 0;
  let dumperCycleTimeSum = 0;
  // let lcmLoadingTimesSum = 0;
  let arrayofdumperthistype = [];
  let lcmofdumpertype = 0;
  let lcmofdumpertypes = [];

  for (let i = 1; i <= noftypedumpers; i++) {
    const capd = parseInt(document.getElementById(`capd${i}`).value);
    const cycd = parseInt(document.getElementById(`cycd${i}`).value);
    const nofdumperst = parseInt(
      document.getElementById(`nofdumperst${i}`).value
    );

    totalDumpers += nofdumperst;
    dumperCycleTimeSum += nofdumperst * cycd;
    arrayofdumperthistype = [];
    lcmofdumpertype = 0;

    for (let j = 1; j <= noftypeshovels; j++) {
      const caps = parseInt(document.getElementById(`caps${j}`).value);
      const cycs = parseInt(document.getElementById(`cycs${j}`).value);

      const swings = customRound(capd / caps);
      const loadingTime = swings * cycs;

      const key = `t${i}loadings${j}`;
      const value = loadingTime;
      dictionary[key] = value;
      arrayofdumperthistype.push(loadingTime);
    }

    lcmofdumpertype = lcm(arrayofdumperthistype);
    lcmofdumpertypes.push(lcmofdumpertype);
  }

  console.log(lcmofdumpertypes);
  console.log(totalDumpers);

  let loderssum = 0;

  for (let i = 1; i <= noftypedumpers; i++) {
    for (let j = 1; j <= noftypeshovels; j++) {
      const varName = `t${i}loadings${j}`;
      loderssum +=
        parseInt(document.getElementById(`nofshovelst${i}`).value) *
        (lcmofdumpertypes[i - 1] / dictionary[varName]);
    }
  }

  const matchFactor =
    (Math.pow(totalDumpers, 2) * sumOfArray(lcmofdumpertypes)) /
    (loderssum * dumperCycleTimeSum);
  console.log(dictionary);
  console.log("lcmofdumpertypes  " + sumOfArray(lcmofdumpertypes));
  console.log("dumperCycleTimeSum  " + dumperCycleTimeSum);
  console.log("loderssum  " + loderssum);

  document.getElementById(
    "result"
  ).innerHTML = `<h3>Match Factor: ${matchFactor.toFixed(2)}</h3>`;
}
