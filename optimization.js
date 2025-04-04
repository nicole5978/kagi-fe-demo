// First implementation
// function court(name, judges, others) {
//   const peopleArr = others.split(" ").concat(name).sort()

//   const index = peopleArr.indexOf(name)

//   // Calculate time by index position and # judges
//   return Math.ceil((index + 1) / judges) * 30
// }

// Second implementation
function court(name, judges, others) {
  const peopleArr = others.split(" ")
  let position = 1

  // Directly compare name to others names
  for (let i = 0; i < peopleArr.length; i++) {
    if (peopleArr[i] < name) {
      position++
    }
  }

  // Calculate time by index position, # judges, and wait time
  return Math.ceil(position / judges) * 30
}

function benchmark() {
  const testCases = [
    ["Jules", 3, "Adam Betty Frank Mike"],
    ["Zane", 1, "Mark Hank Ana Vivian"],
    ["Thom", 1, "Ed Philip Colin Jonny"],
    ["Nicole", 3, "Jorge Zack Chris Timothy"],
    ["Alice", 2, "Bob Charlie David Eve"],
    ["Michael", 2, "Buster Tobias Lindsay Gob"],
  ]

  console.time("Benchmark (total)")

  const iterations = 500
  const testResults = []

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    const testName = `[Case ${i + 1}]: "${testCase[0]}", ${testCase[1]}, "${testCase[2]}"`

    const start = performance.now()
    for (let j = 0; j < iterations; j++) {
      court(...testCase)
    }
    const end = performance.now()

    const avgTime = (end - start) / iterations

    testResults.push({
      name: testName,
      time: avgTime,
    })
  }

  console.log("Benchmark Results:")
  testResults.forEach((result) => {
    console.log(`${result.name} [Average Time]: ${result.time} ms`)
  })

  console.timeEnd("Benchmark (total)")
}

benchmark()
